---
name: '"Making of" de cubyshot'
title: '"Making of" de cubyshot'
date: 2009-09-28T18:41:00.003+02:00
layout: post2
published: true
url: /2009/09/making-of-de-cubyshot.html
tags: 
- programacion
- juegos
- proyectos
---

Este año he presentado un pequeño juego a artfutura, en realidad hemos presentado, ya que [wonder](http://wonder.stravaganza.org/) es el creador de la música. Se trata de un juego mata-mata, hecho exclusivamente con cubos, procedural y en <96kb.  
  
Antes de nada el video y los links, después la miga.  
  

[cubyshot](http://vimeo.com/6671092) from [javisantana](http://vimeo.com/user856080) on [Vimeo](http://vimeo.com).

  
  
codigo fuente: [cubyshot en github](http://github.com/javisantana/cubyshot)  
exe: [cubyshot](http://github.com/javisantana/cubyshot/raw/master/exe/cubyshot.exe) (ojo, si tienes antivirus es posible que te de un toque por la auto-descompresión del ejecutable). Puedes compilarlo con el visual c++ express.  
  
El juego lo empecé allá por enero y en unas tardes saqué un pequeño prototipo ([video](http://vimeo.com/3959672)). Partí del [framework de 4kb de iq](http://iquilezles.org/www/material/isystem1k4k/isystem1k4k.htm) (muy bueno aunque no sea para una 4kb) y sobre él empecé a trabajar basándome sobretodo en los juegos de [kenta cho](http://www.asahi-net.or.jp/~cs8k-cyu/index_e.html), aunque luego lo deje hasta retomarlo hace un par de semanas más o menos.  
  
El código es bastante simple (a pesar del sprint de los últimos dos días antes de art futura está bastante limpio), está en C, aunque está "orientado a objectos" conlos típicos punteros a funciones. Hay partes que me gustaría destacar:  
  
\- Todo está sobre el objeto actor\_t, cualquier cosa que se mueva "implementa" ese interfaz, de forma que con un pool de objetos y unas pocas funciones tienes todo moviendose. La separación entre controlador y vista es, creo yo, bastante clara :).  
  
\- La mayoría de las animaciones son fijas, esto es, son una función matemática. normalmente basada en sin/cos. Por ejemplo el [movimiento de los enemigos finales](http://github.com/javisantana/cubyshot/blob/master/src/boss.cpp#L165) es:  

>   
> a->pos\[0\] = 10.0f\*perlin2d(a->time\*0.001f, a->time\*0.001f)\*sinf(a->time\*0.4f);  
> a->pos\[1\] = 14.0f + 3.0f\*sinf(a->time\*0.4f);  

  
Esto da bastante libertad, porque siempre hay una fórmula matemática que más o menos se ajusta a lo que quieres. El mago de esto es iñigo quilez, te aconsejo que leas el [making of de elevated](http://iquilezles.org/www/material/function2009/function2009.htm).  
  
\- Para la mayoría de elementos en la pantalla no hay posiciones prefijadas, símplemente se situan en posiciones aleatorias, lo único que varía es el seed, dicho de otra forma, es el ADN de cada objeto.  
  
\- Casi ningún movimiento es directo, casi todos los movimientos de objectos están filtrado paso bajo, por ejemplo, el [cambio del color del escenario](http://github.com/javisantana/cubyshot/blob/master/src/palete.cpp#L49).  
  
\- He usado [fixed timestep](http://www.flipcode.com/archives/Main_Loop_with_Fixed_Time_Steps.shtml), de esa forma simplifica mucho la lógica, no tienes que preocuparte del dt.  
  
\- Los efectos de sonido son sintetizados (puedes [leer un tutorial que escribí hace años de como está hecho](http://qualopec.googlepages.com/4ksynth)) y la música (XM) se reproduce con minifmod. La música se lleva el 80% del peso del exe :).  
  
\- Los [enemigos finales están calculados proceduralmente con un efecto mirror](http://github.com/javisantana/cubyshot/blob/master/src/random_ship.cpp#L154). De hecho si arrancas el juego y no comienzas, cada 20 segundos más o menos se genera una nave nueva. Entre una nave y otra solo varía la semilla de números aleatorios. Para generarlas me he basado en [invader fractal](http://www.complexification.net/gallery/machines/invaderfractal/).  
  
\- Curiosidades. El código de la [ciudad procedural](http://github.com/javisantana/cubyshot/blob/master/src/city.cpp) ([video](http://vimeo.com/2925243)) está en el código pero no me ha dado tiempo a usarlo... y parte de las ñapas de inicialización de direct sound están tomadas del código fuente del quake1 :)  
  
Partes de las que no estoy contento son la generación de los enemigos, apenas hay variabilidad, la dificultad, el poco uso que le di a la paleta (fundamental en juegos con gráficos de coder), no haber preparado un objeto timer, etc, etc.  
  
Todo se andará.