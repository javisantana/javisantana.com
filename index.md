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
  <ul class="home-post-list">
    {% for post in site.posts limit:100%}
      <li><time>{{ post.date | date_to_string }}</time> · <a href="{{site.url}}{{post.url}}">{{ post.title }}</a> </li> 
    {% endfor %}
  </ul>
</div>

<div id="spanish">
  <p>Hola, diseño software de alto rendimiento en <a href="https://tinybird.co">Tinybird</a>.</p>
  
  <p>Algunos cosas que puedes hacer: <a href="/about">saber quien soy</a>, <a href="mailto://jsantfer@gmail.com">contactarme por correo</a>, leer lo que escribo en <a href="http://twitter.com/javisantana">twitter</a> o revisar mi historial laboral en <a href="http://www.linkedin.com/in/javisantana">linkedin</a>.
  <p>Mis artículos más leídos</p>
  <ul>
    <li><a href="/2020/05/24/la-nueva-normalidad.html?top">La nueva normalidad</a></li>
    <li><a href="/2019/04/29/diseño-api.html?top">Consejos de como diseñar un API</a></li>
    <li><a href="/2017/02/19/escalar-el-equipo-tecnico-en-una-startup.html?top">Como escalar el equipo en una empresa de 4 a 100 personas</a></li>
    <li><a href="/2020/01/04/una-decada.html?top">Análisis de una década de tecnología</a></li>
    <li><a href="/2018/03/01/the-jira-moment.html?top">The JIRA moment: o cuando te das cuenta que necesitas gestionar tu equipo</a></li>
    <li><a href="/2013/06/27/como-aguantamos-una-portada-de-google.html?top">Como aguantamos el tráfico de un link desde google.com</a></li>
  </ul>
  <p style="margin-top: 30px">La lista completa:</p>
  <ul class="home-post-list">
    {% for post in site.posts limit:100 %}
      <li><time>{{ post.date | date_to_string }}</time> · <a href="{{site.url}}{{post.url}}">{{ post.title }}</a> </li> 
    {% endfor %}
  </ul>
  <div class="footer">
    <p> Suscribete a mi lista de correo, un artículo quincenal sobre diseño de software, tecnología y negocios:</p>
    {% include subscribe.html %}
  </div>
  
  {% include js_multilanguage.html %}
