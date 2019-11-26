---
layout: default2
---

{% include header_small.html %}

<div id="english">
  <h1>Hey</h1>
  <p>Hey, before start, my name is Javi Santana and I spend my time developing software products. Let's get to the point:</p>
  <ul>
    <li>Contact me at <b>jsantfer@gmail.com</b></li>
    <li>I write on twitter <a href="http://twitter.com/javisantana">twitter</a> and my <a href="/blog.html">blog</a> (mostly spanish tho)</li>
    <li>Check what I've been doing for a living on <a href="http://www.linkedin.com/in/javisantana">linkedin</a></li>
  </ul>


</div>

<div id="spanish">
  <h1>Hola</h1>
  <p>Me dedico a diseñar software, al grano:</p>
  <ul>
    <li>Me puedes contactar por correo en <b>jsantfer@gmail.com</b>.</li>
    <li>O leer lo que escribo en <a href="http://twitter.com/javisantana">twitter</a>, en mi <a href="/blog.html">blog</a> o en mi <a href="/digest">lista de correo</a>.</li>
    <li>Revisar mi historial laboral en <a href="http://www.linkedin.com/in/javisantana">linkedin</a>.</li>
  </ul>
  <h2>Lo último en el blog es <a href="{{ site.baseurl }}{{ site.posts.first.url }}">{{ site.posts.first.title }}</a></h2>

  <div class="footer">
    <p>suscribete a mi lista de correo, un artículo quincenal sobre diseño de software, tecnología y negocios:</p>
    {% include subscribe.html %}
  </div>
</div>

{% include js_multilanguage.html %}
