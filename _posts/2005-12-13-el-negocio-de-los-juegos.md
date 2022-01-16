---
name: 'El negocio de los juegos independientes y PSP'
title: 'El negocio de los juegos independientes y PSP'
date: 2005-12-13T19:15:00.000+01:00
layout: post2
published: true
url: /2005/12/el-negocio-de-los-juegos.html
---

A traves de un comentario en una de mis páginas diarias, [extralife!](http://www.zonalibre.org/blog/dondepre/), que conocía a través del [blog de Zaelsius](http://zitronensaft.blogspot.com/), encuentro el [blog de  
txomn](http://crapofthenet.blogspot.com/) y vi uno de sus [post acerca de los juegos de ABA Games](http://crapofthenet.blogspot.com/2005/12/matamarcianos-retrovectoriales.html) que tantas veces he comentado aquí. En él habla sobre los juegos de ABA en PSP, de lo que no tenía noticia alguna. Después de asimilarlo, visitando [gamesetwatch](http://www.gamesetwatch.com/) veo un post titulado "[rRootage Goes Homebrew PSP](http://www.gamesetwatch.com/2005/12/rrootage_goes_homebrew_psp.php)". Parece ser que han portado uno de los juegos de nuestro amigo Kenta cho y lo han [portado a PSP](http://forums.ps2dev.org/viewtopic.php?t=4301), incluso se pueden bajar los fuentes de [repositorio SVN](svn://svn.pspdev.org/pspware/trunk/rRootage).  
  
[![](http://psp.jim.sh/mrbrown/rRootage-1.png)](http://psp.jim.sh/mrbrown/rRootage-1.png)  
  
Imagino que SONY o Nintendo no aceptarán que gente que no tiene su consentimiento saque al mercado juegos independientes, aunque sería un lujazo poder ver juegos superventas de la escena indie en máquinas como la nueva PSP o Nintendo DS. Técnicamente es muy simple, no hay más que ver un comentario de hace no demasiado tiempo en barrapunto donde trataban el tema de "[qué consola me compro para programar](http://barrapunto.com/article.pl?sid=05/12/11/0046218&mode=thread&threshold=-1)". Sería un buen filón para los desarrolladores independientes, portan su juego a PSP o crean nuevos, y lo venden a un precio razonable usando las vías que se están usando habitualmente para los juegos indie, sin necesidad de distribuirlo. Es cierto que es muy parecido al sistema de los juegos para móviles, que no sé si funcionará bien :/.  
  
Estoy por portar el juego a PocketPC, el código fuente de rRotage para PSP a primera vista parece muy fácilmente portable a PocketPC, la única pega son los puñeteros vertex arrays ya que la implementación de OpenglES para PPC no soporta glVertex, de los cuales está plagado el juego. Aunque bueno, también habría que lidiar con el fixed point :), uf, mejor dejarlo XD.