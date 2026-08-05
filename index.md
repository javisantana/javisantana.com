---
layout: base_data
---

<div class="container desierto">
  <div class="entry space">
  <!-- <h1><span>@javisantana</span></h1> -->
  <p style="font-size: 160%;margin:5em 0 5em 0;width: 80vw;position: relative;left: calc(-40vw + 50%);text-align: center;">Pixels are the humble bricks with which one can build cathedrals</p>
  <p style="margin-bottom: 7em;font-size: 120%">
  Hi, Javi Santana typing. Builder working at the intersection of tech and data, cofounder of <a href="https://tinybird.co">Tinybird</a>. Find me on <a href="http://x.com/javisantana">X</a>, <a href="http://www.linkedin.com/in/javisantana">linkedin</a></p>
  </div>


  {% assign alldocs = site.posts | concat: site.inspiration |  concat: site.fastdata | sort:"date"%}	
    

   {% for post in alldocs reversed %}
   {% if post.title != "Index" %}
        {% if forloop.index < 40 %}
        <div class="entry space" id="{{post.slug}}">
        {% else %}
        <div class="entry " id="{{post.slug}}">
        {% endif %}
            {% if post.title %} 
            <h2>{{post.title}} {% if forloop.index < 40 %}<a href="#{{ post.slug }}">#</a>{% endif %}</h2>
        
            {% endif %}
            <a href="{{ post.url }}"><span class="date">{{ post.date | date: "%b %d, %Y" }}</span></a>
            {% if post.collection != "inspiration" %}
              {% if forloop.index < 40 %}
              <p>{{ post.content | strip_html | truncatewords: 50 }}
              <a href="{{ post.url }}">read more</a>
              </p>
              {% endif %}
            {% else %}
              {{ post.content | split:'<!--break-->' | first }}
              {% if post.content contains '<!--break-->' %}
                  <a href="{{ post.url }}">read more</a>
              {% endif %}
            {% endif %}
        </div>
    {%endif %}
  {% endfor %}
