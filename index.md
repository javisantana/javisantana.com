---
layout: default2
---

{% include header_small.html %}

<div id="english">
  <p>I'm Javi Santana and I spend my time developing software products. Let's get to the point:</p>
  <ul>
    <li>Contact me at javi @ company I work for</li>
    <li>I write on twitter <a href="http://twitter.com/javisantana">twitter</a> and my <a href="/blog/">blog</a> (mostly spanish tho)</li>
    <li>Check what I've been doing for a living on <a href="http://www.linkedin.com/in/javisantana">linkedin</a></li>
  </ul>
  <p>This is what I write (99% spanish, sorry)</p>
</div>

<div id="spanish">
  <p>Hola, diseño software de alto rendimiento en <a href="https://tinybird.co">Tinybird</a>.</p>
  
  <p>Algunos cosas que puedes hacer: <a href="/about">saber quien soy</a>, <a href="mailto://javi@company I work for">contactarme por correo</a>, leer lo que escribo en <a href="http://twitter.com/javisantana">twitter</a> o revisar mi historial laboral en <a href="http://www.linkedin.com/in/javisantana">linkedin</a>.
  </p>
  <p style="margin-top: 30px">Lo que escribo y que a veces coincide con lo que pienso:</p>
</div>
  <div>
    <h2>En mi lista de correo (<a href="https://javisantana.substack.com/">suscríbete</a>)</h2>
    <ul class="home-post-list">
      <li><a href="https://javisantana.substack.com/p/el-brazo-bionico">El brazo biónico</a> </li>
      <li><a href="https://javisantana.substack.com/p/por-que">¿Por qué?</a> </li>.  
      <li><a href="https://javisantana.substack.com/p/puede-chatgpt-trabajar-en-tinybird">Puede chatGPT trabajar en Tinybird</a> </li>
    </ul>
    <h3>Temporada "a la segunda todo sale bien"</h3>
    <p>Una serie sobre algunas de las cosas que pienso después de volver a montar un equipo desde cero</p>
    <ul class="home-post-list">
      <li><a href="https://javisantana.substack.com/p/a-la-segunda-todo-sale-bien-la-espada">A la segunda todo sale bien: la espada de Damocles</a> </li>
      <li><a href="https://javisantana.substack.com/p/a-la-segunda-siempre-sale-bien-el">A la segunda todo sale bien: el soporte técnico</a> </li>
      <li><a href="https://javisantana.substack.com/p/a-la-segunda-todo-sale-bien-la-recetita">A la segunda todo sale bien: la recetita</a> </li>
      <li><a href="https://javisantana.substack.com/p/a-la-segunda-todo-sale-bien-el-end">A la segunda todo sale bien:el end-to-end developer</a> </li>
    </ul>
    
    {% for post in site.posts limit:1000 %}

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
