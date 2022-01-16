---
name: 'whitebrd.me - detalles técnicos'
title: 'whitebrd.me - detalles técnicos'
date: 2011-04-08T18:11:00.005+02:00
layout: post2
published: true
url: /2011/04/whitebrdme-detalles-tecnicos.html
tags: 
- programación
- python
---

El pasado fin de semana (primero de abril del 2011 por si lees esto en un futuro lejano) organizamos [alltogethernow](http://alltogether.es/), un encuentro de un fin de semana para hacer una aplicación en 48 horas. La aplicación que hicimos nosotros (@[flopezluis](http://twitter.com/flopezluis) y yo)fue [whitebrd.me](http://whitebrd.me/), una pizarra compartida en tiempo real. Voy a dar una pinceladas de los detalles técnicos y un pequeño post-morten después de 1 semana funcionando.

  

Para empezar optamos por usar toda la tecnología del servidor asíncrona. Pensarás que lo hicimos porque es lo que mola, ahora lo asíncrono está en todos lados, si no tienes algo asíncrono no puedes montar algo como dios manda... si toda la gente que se le llena la boca con "asíncrono" hubiese leído la famosa (en mi época) "[beej's socket guide](http://beej.us/guide/bgnet/output/html/multipage/index.html)"... :).

  

El caso es que [tornado](http://www.tornadoweb.org/), un pequeño framework web creado por friendfeed (después comprada por facebook) y ahora matenido por facebook, hizo las veces de servidor web y redis como sistema de persistencia. La elección de redis fue por dos razónes. La primera por hypearnos a más no poder y la segunda es que permite escribir muy rápido, tiene funcionalidad de publisher/sibscriber y un sistema de VM que encaja muy bien (luego veremos cómo). Para rematar usamos nginx como frontend. Se puede ser más asíncrono? :)

  

La razón para usar asíncrono realmente es muy sencilla: es una aplicación con MUY poca carga de CPU y mucha E/S, así que el paradigma encaja perfectamente.

  

En la parte de cliente usamos websockets para enviar todos los comandos y canvas para dibujar. Es una tecnología novedosa, así que sabíamos que muchos navegadores no lo soportarían (FF4 lo tiene desactivado por defecto, primer #FAIL).

  

Manos a la obra, nos pusimos y en 48 horas teníamos [el código](https://github.com/javisantana/whitebrd.me) en cuestión. Más que comentar el código, prefiero centrarme en las cosas que han pasado en estos días y algunas conclusiones técnicas que he sacado.

  

\- El segundo día a la gente de github les dio por poner un enlace en su [blog](https://github.com/blog/829-github-reflog-v1-4-04). No sé cual será el tráfico de ese blog, pero en el nuestro generó 4.5Gb de tráfico en 12 horas. Iluso de mi, no había activado la memoria virtual en redis, de forma que redis no podía tirar a disco las pizarras ya no usadas ([se almacenan todos los comandos que genera una pizarra](https://github.com/javisantana/whitebrd.me/blob/master/src/models.py#L20)), así que empezó a "swapear" como un demonio. Suerte que teníamos el [deploy automático](https://github.com/javisantana/whitebrd.me/blob/master/fabfile.py), así que la activé rápido y medio solucionado. Finalmente la clave que almacenaba esa pizarra terminó con más de 20mb de datos. He tenido que eliminarla porque el VPS de 256mb no da para mucho más :). La CPU de la máquina no pasó de un 8%.

  

\- tornado funciona excepcionalmente bien, además de ser un framework muy interesante para cosas "sencillas" (no tiene ORM por ejemplo) es realmente rápido. Además el [nucleo](https://github.com/facebook/tornado/blob/master/tornado/ioloop.py) es fácil de entender y está bien documentado. Podríamos haber optado por twisted, gevent o algún otro sistema asíncrono en python.

  

\- tratamos de usar el mecanismo [pub/sub de redis](http://redis.io/topics/pubsub), pero la librería asíncrona cliente redis para python es completamente inestable, así que terminamos por implementar lo misma funcionalidad en una [pequeña clase](https://github.com/javisantana/whitebrd.me/blob/master/src/publisher.py) . Moraleja: a veces la solución más simple es la mejor.

  

\- no conocía redis, pero es realmente un descubrimiento. Funciona muy bien: el setup es muy rápido, prácticamente configuración 0, la integración con los tipos de python buena y además rápida. El model de memoria virtual encaja muy bien ya que si es necesaria más memoria las claves que no se usan las vuelca a disco, de forma que todas las pizarras que ya no se usan no están malgastando los 256mb memoria.

  

Ahora mismo hay más de 1000 pizarras creadas y la mayoría de ellas tienen dibujos de aparatos reproductores masculinos :)