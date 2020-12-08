#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sys
import feedparser
from twython import Twython, TwythonError


class Settings:
    """Twitter bot application settings.

    Enter the RSS feed you want to tweet, or keywords you want to retweet.
    """
    # RSS feed to read and post tweets from.
    feed_url = "http://example.net/feed/"

    # Log file to save all tweeted RSS links (one URL per line).
    posted_urls_output_file = "posted-urls.log"

    # Log file to save all retweeted tweets (one tweetid per line).
    posted_retweets_output_file = "posted-retweets.log"

    # Include tweets with these words when retweeting.
    retweet_include_words = ["#hashtag"]

    # Do not include tweets with these words when retweeting.
    retweet_exclude_words = []


class TwitterAuth:
    """Twitter authentication settings.

    Create a Twitter app at https://apps.twitter.com/ and generate
    consumer key, consumer secret etc. and insert them here.
    """
    consumer_key = "XXX"
    consumer_secret = "XXX"
    access_token = "XXX"
    access_token_secret = "XXX"


def compose_message(item: feedparser.FeedParserDict) -> str:
    """Compose a tweet from an RSS item (title, link, description)
    and return final tweet message.

    Parameters
    ----------
    item: feedparser.FeedParserDict
        An RSS item.

    Returns
    -------
    str
        Returns a message suited for a Twitter status update.
    """
    title, link, _ = item["title"], item["link"], item["description"]
    desc = shorten_text(strip_html(item['description']).split('\n')[0], 128)
    msg = f"""
    🏁 blog post => {item['title']}

    {desc}...

    {item["link"]}
    """
    return msg


import re
def strip_html(text: str):
    return re.sub('<[^<]+?>', '', text)

def shorten_text(text: str, maxlength: int) -> str:
    """Truncate text and append three dots (...) at the end if length exceeds
    maxlength chars.

    Parameters
    ----------
    text: str
        The text you want to shorten.
    maxlength: int
        The maximum character length of the text string.

    Returns
    -------
    str
        Returns a shortened text string.
    """
    return (text[:maxlength]) if len(text) > maxlength else text


def post_tweet(message: str):
    """Post tweet message to account.

    Parameters
    ----------
    message: str
        Message to post on Twitter.
    """
    print(message)
    try:
        twitter = Twython(TwitterAuth.consumer_key,
                          TwitterAuth.consumer_secret,
                          TwitterAuth.access_token,
                          TwitterAuth.access_token_secret)
        twitter.update_status(status=message)
    except TwythonError as e:
        print(e)


def read_rss_and_tweet(url: str):
    """Read RSS and post feed items as a tweet.

    Parameters
    ----------
    url: str
        URL to RSS feed.
    """
    feed = feedparser.parse(url)
    if feed:
        for item in feed["items"]:
            link = item["link"]
            if is_in_logfile(link, Settings.posted_urls_output_file):
                print("Already posted:", link)
            else:
                post_tweet(message=compose_message(item))
                write_to_logfile(link, Settings.posted_urls_output_file)
                print("Posted:", link)
    else:
        print("Nothing found in feed", url)

def is_in_logfile(content: str, filename: str) -> bool:
    """Does the content exist on any line in the log file?

    Parameters
    ----------
    content: str
        Content to search file for.
    filename: str
        Full path to file to search.

    Returns
    -------
    bool
        Returns `True` if content is found in file, otherwise `False`.
    """
    if os.path.isfile(filename):
        with open(filename) as f:
            lines = f.readlines()
        if (content + "\n" or content) in lines:
            return True
    return False


def write_to_logfile(content: str, filename: str):
    """Append content to log file, on one line.

    Parameters
    ----------
    content: str
        Content to append to file.
    filename: str
        Full path to file that should be appended.
    """
    try:
        with open(filename, "a") as f:
            f.write(content + "\n")
    except IOError as e:
        print(e)


def display_help():
    """Show available commands."""
    print("Syntax: python {} [command]".format(sys.argv[0]))
    print()


if __name__ == "__main__":
    if len(sys.argv) == 2:
        TwitterAuth.consumer_key, TwitterAuth.consumer_secret, TwitterAuth.access_token, TwitterAuth.access_token_secret = os.getenv('API_KEY'), os.getenv('API_KEY_SECRET'), os.getenv('ACCESS_TOKEN'), os.getenv('ACCESS_SECRET')
        read_rss_and_tweet(url=sys.argv[1])
    else:
        display_help()
