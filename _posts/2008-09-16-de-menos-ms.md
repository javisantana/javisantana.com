---
name: 'De menos a más'
title: 'De menos a más'
date: 2008-09-16T20:43:00.004+02:00
layout: post2
published: true
url: /2008/09/de-menos-ms.html
tags: 
- programacion
---

La programación web no ha sido lo mio, aunque tengo que reconocer que cada día me atrae más, no tanto la parte front end, el interfaz de usuario, javascripts, html y tecnologías varias, si no la parte de servicio.  
  
Para llevar un tracking de los usuarios de demos agroguía implementé un sistema de tracking muy rudimentario, la herramienta enviaba -de alguna forma, no voy a revelar el secreto, aunque si sigues el blog sabrás como- datos a un servicio web (http más bien). Cuando planeé el servicio estaba pensado para funcionar, siempre y cuando no hubiese accesos recurrentes.  
  
Con ese requisito, hice un script cgi en dos minutos que me ha funcionado hasta hace una semana. Desde hace una semana tengo una cantidad razonable de peticiones al server, las justas para que haya posibilidad de accesos múltiples al mismo tiempo, de forma que los datos se han corrompido.  
  
La pregunta es la siguiente: hubiera merecido la pena hacer el servicio bien desde el principio o es preferible trabajar dos veces?.  
  
Los puristas responderían sin dudarlo: "deberías haber hecho las cosas bien y planificarlo para el futuro", los pragmáticos hubieran hecho lo que yo hice :). Si analizas bien la aplicación te das cuenta que la probabilidad de accesos recurrentes era bajísima y la probabilidad de perder los datos muy baja (teniendo en cuenta los backups del server) y el valor de los datos bajo, con lo cual no merecía la pena.  
  
Vale, pero ahora te toca hacer lo que no hiciste hace tiempo, con lo cual si lo hubieras hecho hace un tiempo ahora no tendrías problemas. FALSO, porque con esa herramienta de dos minutos que ha funcionado a modo de test he aprendido ciertas cosas -el know how famoso- que ahora voy a tener en cuenta. Esa es la principal razón de no intentar hacer todo desde el principio, cosa que he visto repetida cientos de veces en diferentes entornos empresariales.  
  
Moraleja: "no trates de correr antes de aprender a andar"