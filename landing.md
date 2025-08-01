---
layout: base_data
---

<div class="container desierto">
  <div class="entry space">
  <!-- <p style="font-size: 160%;margin:5em 0 5em 0;width: 80vw;position: relative;left: calc(-40vw + 50%);text-align: center;">Hey Twitter friend! Welcome to my digital home.</p> -->
  <p style="margin: 2em;font-size: 100%">
  <strong>Who is Javi Santana</strong><br/>
  Hello, you are landing here from a social network, this is the 101 about me:<br/>
   • Tinybird co-founder<br/>
   • Tech person, builder working at the intersection of tech and data. My mother language is C++, was addopted by Python<br/>
   • I write about technical stuff, startups and low quality philoshopy (I'm getting older and that's what you do)<br/>
  </p>

  <p style="margin: 2em;font-size: 100%">
  <strong>Subscribe to my newsletter</strong><br/>
  • <a href="https://failingwithdata.substack.com">English mailing list</a> - Technical content about data engineering, product building, and startups<br/>
  • <a href="https://javisantana.substack.com">Spanish mailing list</a> - Contenido técnico sobre ingeniería de datos, construcción de productos y startups
  </p>
  </div>

  <div class="entry space">
    <h2>Latest Articles</h2>
   {% assign alldocs = site.posts | concat: site.inspiration |  concat: site.fastdata | sort:"date"%}	
   {% for post in alldocs reversed %}
   {% if post.title != "Index" %}
        {% if forloop.index < 40 %}
        <div class="entry " id="{{post.slug}}">
        {% if post.title %} 
        <p style="margin: 0 0 0 2.5em;font-size: 80%">• <a style="background-color: transparent; color: white;" href="#{{ post.slug }}">{{post.title}}</a></p>
        {% endif %}
        </div>
        {% endif %}

    {% endif %}
    {% endfor %}

  </div>

  <div class="entry space">
    <p style="margin-bottom: 7em;font-size: 120%">
    Find me on <a href="http://twitter.com/javisantana">twitter</a>, <a href="http://www.linkedin.com/in/javisantana">linkedin</a> or javi@tinybird.co</p>
  </div>
</div>