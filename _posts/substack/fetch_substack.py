#!/usr/bin/env python3
"""Fetch all posts from Substack newsletters and save as Jekyll-compatible markdown."""

import json
import os
import re
import urllib.request
from html.parser import HTMLParser
from datetime import datetime


class HTML2Markdown(HTMLParser):
    """Simple HTML to Markdown converter."""

    def __init__(self):
        super().__init__()
        self.result = []
        self.tag_stack = []
        self.list_type_stack = []
        self.list_counter_stack = []
        self.ignore = False
        self.in_pre = False
        self.in_code = False
        self.href = None
        self.link_text = []
        self.in_link = False
        self.img_queue = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag in ('script', 'style', 'button', 'form'):
            self.ignore = True
            return
        if tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', '')
            if src:
                self.result.append(f'\n\n![{alt}]({src})\n\n')
        elif tag == 'a':
            self.href = attrs_dict.get('href', '')
            self.in_link = True
            self.link_text = []
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            level = int(tag[1])
            self.result.append(f'\n\n{"#" * level} ')
        elif tag == 'p':
            self.result.append('\n\n')
        elif tag == 'br':
            self.result.append('\n')
        elif tag == 'blockquote':
            self.result.append('\n\n> ')
        elif tag == 'strong' or tag == 'b':
            self.result.append('**')
        elif tag == 'em' or tag == 'i':
            self.result.append('*')
        elif tag == 'code':
            self.in_code = True
            self.result.append('`')
        elif tag == 'pre':
            self.in_pre = True
            self.result.append('\n\n```\n')
        elif tag == 'ul':
            self.list_type_stack.append('ul')
            self.result.append('\n')
        elif tag == 'ol':
            self.list_type_stack.append('ol')
            self.list_counter_stack.append(0)
            self.result.append('\n')
        elif tag == 'li':
            indent = '  ' * (len(self.list_type_stack) - 1)
            if self.list_type_stack and self.list_type_stack[-1] == 'ol':
                self.list_counter_stack[-1] += 1
                self.result.append(f'\n{indent}{self.list_counter_stack[-1]}. ')
            else:
                self.result.append(f'\n{indent}- ')
        elif tag == 'hr':
            self.result.append('\n\n---\n\n')
        elif tag == 'figure':
            pass
        elif tag == 'figcaption':
            self.result.append('\n*')
        self.tag_stack.append(tag)

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'button', 'form'):
            self.ignore = False
            return
        if tag == 'a' and self.in_link:
            text = ''.join(self.link_text)
            if self.href and text.strip():
                self.result.append(f'[{text}]({self.href})')
            elif text.strip():
                self.result.append(text)
            self.in_link = False
            self.href = None
            self.link_text = []
        elif tag in ('strong', 'b'):
            self.result.append('**')
        elif tag in ('em', 'i'):
            self.result.append('*')
        elif tag == 'code':
            self.in_code = False
            self.result.append('`')
        elif tag == 'pre':
            self.in_pre = False
            self.result.append('\n```\n')
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.result.append('\n')
        elif tag == 'ol' and self.list_type_stack:
            self.list_type_stack.pop()
            if self.list_counter_stack:
                self.list_counter_stack.pop()
            self.result.append('\n')
        elif tag == 'ul' and self.list_type_stack:
            self.list_type_stack.pop()
            self.result.append('\n')
        elif tag == 'figcaption':
            self.result.append('*\n')
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()

    def handle_data(self, data):
        if self.ignore:
            return
        if self.in_link:
            self.link_text.append(data)
        else:
            self.result.append(data)

    def get_markdown(self):
        text = ''.join(self.result)
        # Clean up excessive newlines
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()


def html_to_markdown(html):
    parser = HTML2Markdown()
    parser.feed(html)
    return parser.get_markdown()


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())


def fetch_posts(subdomain):
    """Fetch all posts from a substack subdomain."""
    posts = []
    offset = 0
    while True:
        url = f'https://{subdomain}.substack.com/api/v1/posts/?limit=50&offset={offset}'
        batch = fetch_json(url)
        if not batch:
            break
        posts.extend(batch)
        if len(batch) < 50:
            break
        offset += 50
    return posts


def save_post(post, output_dir, source_substack):
    """Save a single post as a Jekyll-compatible markdown file."""
    title = post.get('title', 'Untitled')
    slug = post.get('slug', slugify(title))
    date_str = post.get('post_date', post.get('published_at', ''))[:10]
    if not date_str:
        date_str = datetime.now().strftime('%Y-%m-%d')

    body_html = post.get('body_html', '')
    if not body_html:
        print(f"  Skipping '{title}' - no body content")
        return None

    body_md = html_to_markdown(body_html)
    subtitle = post.get('subtitle', '') or ''
    cover = post.get('cover_image', '') or ''
    canonical = post.get('canonical_url', f'https://{source_substack}.substack.com/p/{slug}')
    substack_id = post.get('id', '')

    front_matter = f"""---
title: "{title.replace('"', '\\"')}"
date: {date_str}
layout: post
source_url: "{canonical}"
substack: "{source_substack}"
substack_id: {substack_id}"""

    if subtitle:
        front_matter += f'\ndescription: "{subtitle.replace(chr(34), chr(92)+chr(34))}"'
    if cover:
        front_matter += f'\ncover_image: "{cover}"'

    front_matter += "\n---"

    filename = f"{date_str}-{slug}.md"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(front_matter + '\n\n' + body_md + '\n')

    print(f"  Saved: {filename}")
    return filename


def main():
    substacks = {
        'javisantana': '/Users/javi/repos/javisantana.com/_posts/substack/javisantana',
        'failingwithdata': '/Users/javi/repos/javisantana.com/_posts/substack/failingwithdata',
    }

    for subdomain, output_dir in substacks.items():
        os.makedirs(output_dir, exist_ok=True)
        print(f"\nFetching posts from {subdomain}.substack.com...")
        posts = fetch_posts(subdomain)
        print(f"  Found {len(posts)} posts")

        for post in posts:
            save_post(post, output_dir, subdomain)


if __name__ == '__main__':
    main()
