---
layout: base_data
---

<div class="container desierto" style="margin-top:7em">
  <div class="entry space">
  <!-- <p style="font-size: 160%;margin:5em 0 5em 0;width: 80vw;position: relative;left: calc(-40vw + 50%);text-align: center;">Hey Twitter friend! Welcome to my digital home.</p> -->
  <p style="margin: 4em 2em 2em 2em;font-size: 100%">
  Hello I'm Javi Santana, you are landing here from a social network, this is the 101 about me:<br/>
      <br />
   • Tinybird co-founder<br/>
   • I'm a tech person, love data, databases but my career started as a graphics/game programmer<br/>
   • I write about technical stuff, startups and low quality philosophy (I'm getting older and that's what you do)<br/>
  </p>

  <p style="margin: 1em 2em;font-size: 100%">
  <strong>Subscribe to my newsletter</strong><br/>
  • <a href="https://failingwithdata.substack.com">English mailing list</a> - Technical content about data engineering, product building, and startups<br/>
  • <a href="https://javisantana.substack.com">Spanish mailing list</a> - Contenido técnico sobre ingeniería de datos, construcción de productos y startups
  </p>
  </div>

  <div class="entry space">
    <h2 style="margin-bottom: 1em">Latest Articles</h2>
   {% assign alldocs = site.posts | concat: site.inspiration |  concat: site.fastdata | sort:"date"%}	
   {% for post in alldocs reversed %}
   {% if post.title != "Index" %}
        {% if forloop.index < 40 %}
        <div class="entry " id="{{post.slug}}">
        {% if post.title %} 
        <p style="margin: 0 0 0 5%;font-size: 100%">• <a style="background-color: transparent; color: white;" href="{{ post.url}}">{{post.title}}</a></p>
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
