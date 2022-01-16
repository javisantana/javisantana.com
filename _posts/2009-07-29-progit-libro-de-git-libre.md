---
name: 'progit, libro de git libre'
title: 'progit, libro de git libre'
date: 2009-07-29T19:41:00.003+02:00
layout: post2
published: true
url: /2009/07/progit-libro-de-git-libre.html
tags: 
- libros
- programación
- git
---

Hay dos o tres blogs que leo habitualmente de los cuales no me interesa para nada la tecnología, pero que están escritos por gente tan buena que merece la pena leerlos. Unos de ellos es el [blog de github](http://github.com/blog/), y esta mañana me encuentro con que han liberado un [libro sobre git](http://github.com/blog/465-pro-git-book).  
  
El libro merece la pena para aprender git, aunque me da la impresión que es una amalgama de la estupenda guía [git magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/) y el [libro de la web oficial de git](http://book.git-scm.com/).  
  
Dejando a un lado la parafernalia de la libertad, creative commons y otras hierbas, lo que hace el libro redondo es el último capítulo, [git internals](http://progit.org/book/ch9-0.html), donde explica, bien clarito, con 2 comandos básicos, como funcioan git por dentro. Asombra lo realmente simple que es.  
  
Como me gusta saber como funcionan las cosas, he mirado el código fuente de git, pero no el actual, si no el primero publicado, [git-0.01](http://www.kernel.org/pub/software/scm/git/git-0.01.tar.bz2), donde se puede apreciar claramente todas las cosas que explica en el capítulo. Una pena que el capítulo no haga referencia a ese código.  
  
Y ya que estaba metido en harina he buscado el primer código liberado de mercurial, [mercurial-0.1](http://mercurial.selenic.com/release/mercurial-0.1.tar.bz2), para ver si el sistema usado es el mismo. Me han llamado la atención dos cosas, la primera de ellas es que si ejecutas hg, el script principal, sin parámetros la aplicación te lanza la típica excepción... no comprueba los parámetros, la segunda es el propio "announce.txt". El código dista de ser ordenado y documentado, pero 4 años después ahí lo tienes..  
  
Otra curiosidad, la primera release de git fue el 7 de abril, la primera de mercurial el 27 de mayo del mismo año (2005), 39kb de C frente a 6.2kb de python :).