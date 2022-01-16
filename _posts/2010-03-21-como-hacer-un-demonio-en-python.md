---
name: 'Como hacer un demonio en python'
title: 'Como hacer un demonio en python'
date: 2010-03-21T18:02:00.003+01:00
layout: post2
published: true
url: /2010/03/como-hacer-un-demonio-en-python.html
tags: 
- programacion
- python
---

Siempre llega ese día en el que necesitas tener un [demonio](http://es.wikipedia.org/wiki/Demonio_(inform%C3%A1tica)) funcionando en una máquina. Y cuando llegas ves que necesitas hacer un par de forks, cosas con stdin y stdout... un peñazo, por suerte en python existe una librería llamada [python-daemon](http://pypi.python.org/pypi/python-daemon/), aunque no está demasiado bien documentada (hay que bucear un poco en los fuentes), es muy útil para no tener que liarte demasiado para hacer el demonio. Aquí demo un [ejemplo de uso de python-daemon](http://gist.github.com/339430) con su log y sus redirecciones de los std\*.  
  
Para ejecutar el demonio se usa el interfaz típico de start|stop|restart, por ejemplo:  

> $ python daemon.py start