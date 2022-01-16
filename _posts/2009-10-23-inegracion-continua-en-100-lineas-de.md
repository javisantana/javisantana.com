---
name: 'integración continua en 100 líneas de código'
title: 'integración continua en 100 líneas de código'
date: 2009-10-23T19:41:00.005+02:00
layout: post2
published: true
url: /2009/10/inegracion-continua-en-100-lineas-de.html
tags: 
- integración continua
- python
- juno
---

Actualmente estoy trabajando con un embebido con linux, la potencia de la placa es bastante limitada y a la hora de compilar una aplicación mediana el sistema demasiado. Como tengo varias placas decidí montar un servidor de integración continua en uno de ellos usando compilación distribuída con [distcc](http://distcc.samba.org/). La forma de trabajar es la siguiente:  
  
\- programo haciendo mis commits en local (usando git)  
\- cuando necesito probar mi código en el embebido hago "git push ci" de forma que ci es un remote parecido a ssh://user@ciserver/home/ci/project.  
\- Este repositorio tiene un [post-recieve-hook](http://www.kernel.org/pub/software/scm/git/docs/githooks.html) que lanza una petición al servidor de integración continua, este compila (distribuido, con distcc) y si la compilación va bien lanza un "build\_pass" que usando [rsync](http://samba.anu.edu.au/rsync/) hace deploy en la máquina de pruebas.  
  
Parece muy complicado, pero realmente es poca la configuración que se necesita, casi todo va sobre ssh.  
  
Sentía la necesidad imperiosa de tener un servidor de integración continua pequeño y manejable, así que decidí hacer uno :).  
  
Con [juno](http://github.com/breily/juno), un miniframework web que permite en dos patadas tener una pequeña aplicación web.  
  
Si quereis probarlo o ver el código, el código está en github: [cipy, servidor de integración continua](http://github.com/javisantana/cipy).  
  
Funciona bien, realmente no hace demasiado, pero basta. Solo soporte un proyecto, pero no hay problema para lanzar varias instancias, cada una en un puerto diferente, apuntando ngnix ( o tu servidor web favorito) con un "proxy pass" a cada una con un "location" diferente.  
  
Si realmente quieres un servidor de integración continua potente puedes usar [hudson](https://hudson.dev.java.net/).  
  
Un shot:  
[![](http://4.bp.blogspot.com/_XzuP3e63Ok8/SuHwqpsmQwI/AAAAAAAABy4/cyMiSg5l4DM/s320/cipy_2.png)](http://4.bp.blogspot.com/_XzuP3e63Ok8/SuHwqpsmQwI/AAAAAAAABy4/cyMiSg5l4DM/s1600-h/cipy_2.png)