---
name: 'desarrollando software, un paso más'
title: 'desarrollando software, un paso más'
date: 2007-06-10T23:24:00.000+02:00
layout: post2
published: true
url: /2007/06/desarrollando-software-un-paso-ms.html
tags: 
- programacion
- trac
- svn
---

Hasta ahora estaba llevando el desarrollo de agroguía con subversion y haciendo builds a pelo desde el editor. Los binarios se los pasaba a mi tutor (ahora probador) por correo electrónico sin ningún tipo de control, ni changelog, ni nada.  
  
Subversion es vital, pero llevar "la cuenta" de lo que haces, de lo que te queda por hacer y de lo que has hecho es algo más que fundamental. Para ello, siguiendo la política que seguimos en Unkasoft, he instalado trac y scons.  
  
[trac](http://trac.edgewall.org/) la voy a user como sistema de control de bugs y de caravterísticas a implementar. Por suerte hace tiempo que no salen bugs, pero me interesa mucho tener control sobre nuevas cosas a implementar, porque últimamente es un jaleo saber qué está probado y qué no. De esta forma sé en qué rama de subversion está cierta característica. Esta es otra, he empezado a usar ramas en subversion para poder siempre tener una rama estable que poder vender. De momento es un infierno hasta que subversión saque su versión 1.5 en la que lleva tracking de ramas.  
  
[scons](http://www.scons.org/) lo voy a user para generar las diferentes releases. De esta forma, junto con trac podré saber qué va dentro de cada versión y podré llevar un conteo lógico de versiones para poder diferenciarlas. En el trabajo estoy usando [ant](http://es.wikipedia.org/wiki/ANT) una herramienta, me atrevo a decir con todas las de la ley, que es una bazofia. La única razón por la cual se usa es que tiene unas tareas muy buenas para compilar java y derivados, pero como lenguaje para algo más, es malo a rabiar, no puedes hacer un bucle for de forma lógica, tienes que programarte mil tareas para hacer algo potente, etc... y es que XML no vale para todo.  
  
Aparte el formato wiki de trac me viene de perlas para incluir ficheros de test, pruebas de cada uno de los GPS que usamos, gráficas y un montón de cosas.  
  
Me falta tiempo, arg!