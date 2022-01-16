---
name: 'Las herramientas que uso'
title: 'Las herramientas que uso'
date: 2011-01-17T20:10:00.003+01:00
layout: post2
published: true
url: /2011/01/las-herramientas-que-uso.html
tags: 
- programacion
---

Una de las cosas interesantes del desarrollo es ver como trabajan los demás. Es difícil sentarte al lado de un desarrollador y no aprender ese pequeño truco o herramienta, siempre hay algún detalle que te puede servir o que puedes aportar, así que voy a comentar las que uso a diario y me hacen la vida más fácil.

  

Fundamentalmente uso Linux y OSX, aunque prácticamente uso las mismas herramientas en ambos. Aparte de las que todos conocemos, grep, ls, cp, mv... mis favoritas son las siguientes:

  

\- vim: lo uso como único editor. No sé si será el mejor, pero usar el mismo editor para todo tipo de fichero es realmente eficiente.

  

\- [tmux](http://tmux.sourceforge.net/): es una herramienta que permite tener varias terminales virtuales dentro de una. Es similar a [GNU screen](http://www.gnu.org/software/screen/). Permite además conmutar rápidamente entre terminales (ctrl-b + NUM o ctrl-b + l), partir la pantalla vertical y horizontalmente (muy útil por si ejecutas un comando y quieres ver la salida de un tail -f).

  

\- [ack-grep](http://betterthangrep.com/): es un grep con esteroides, te saca las búsquedas coloreadas, ignora las carpetas .git .svn y demás especiales. Fundamental si eres programador

  

\- git svn: es una parte de git, pero es tan útil para trabajar contra servidores subversion... :)

  

\- gitk y gitg en linux, gitx en osx: son herramientas gráficas para ver las historia de un repo git, la mar de útiles cuando quieres ver los commit, hacer diffs y demás.

  

\- rsync: espectacular herramienta para sincronizar ficheros entre carpetas, sobretodo entre diferentes máquinas.

  

\- curl: para hacer peticiones web, permite hacer test, revisar las cabeceras (con -I, confieso que no puedo evitar echar un ojo a las cabeceras de los servidores web)

  

\- ab (apache benchmark), para ir teniendo idea de las reqs/s, tiempo de respuesta, etc que tiene la applicación web.

  

\- fabric: es una herramienta para automatizar tareas en servidores y permite hacer cosas un poco más complejas que con un simple ssh. Junto con bash y rsync automatizar es un gusto :P.

  

\- firebug y web developer tools de chrome

  

\- ipython: consola python con esteorides

  

Últimamente estoy probando vagrant (para gestionar máquinas virtuales), cada día trato de hacer músculo con vim, usar más los trucos de bash...