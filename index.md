---
layout: default2
---

{% include header_small.html %}

<div id="english">
  <p>I'm Javi Santana and I spend my time developing software products. Let's get to the point:</p>
  <ul>
    <li>Contact me at <b>jsantfer@gmail.com</b></li>
    <li>I write on twitter <a href="http://twitter.com/javisantana">twitter</a> and my <a href="/blog/">blog</a> (mostly spanish tho)</li>
    <li>Check what I've been doing for a living on <a href="http://www.linkedin.com/in/javisantana">linkedin</a></li>
  </ul>
  <p>This is what I write (99% spanish, sorry)</p>
</div>

<div id="spanish">
  <p>Hola, diseño software de alto rendimiento en <a href="https://tinybird.co">Tinybird</a>.</p>
  
  <p>Algunos cosas que puedes hacer: <a href="/about">saber quien soy</a>, <a href="mailto://jsantfer@gmail.com">contactarme por correo</a>, leer lo que escribo en <a href="http://twitter.com/javisantana">twitter</a> o revisar mi historial laboral en <a href="http://www.linkedin.com/in/javisantana">linkedin</a>.
  </p>
  <p style="margin-top: 30px">Lo que escribo y que a veces coincide con lo que pienso:</p>
</div>
  <div>
    {% for post in site.posts limit:100 %}

      {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
      {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}

      {% if forloop.first %}
      <h2 id="{{ this_year }}-ref">{{this_year}}</h2>
      <ul class="home-post-list">
      {% endif %}

      <li>
      <!--<time>{{ post.date | date: "%b %-d"}}</time>--><a href="{{site.url}}{{post.url}}">{{ post.title }}</a> </li> 

      {% if forloop.last %}
      </ul>
      {% else %}
          {% if this_year != next_year %}
          </ul>
          <h2 id="{{ next_year }}-ref">{{next_year}}</h2>
          <ul class="home-post-list">
          {% endif %}
      {% endif %}

    {% endfor %}
  </div>
  <div class="footer">
    <p>Te aviso cada vez que escriba algo, aunque siempre lo vas a poder leer aquí.</p>
    {% include subscribe.html %}
  </div>
  
  {% include js_multilanguage.html %}
