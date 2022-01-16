---
name: 'Desarrollo de Makefight (I)'
title: 'Desarrollo de Makefight (I)'
date: 2005-09-28T13:25:00.000+02:00
layout: post2
published: true
url: /2005/09/desarrollo-de-makefight-i.html
---

Bueno, en este post y los que le siguen voy a comentar los aspectos más destacados del desarrollo de MakeFight. Supongo que muchos de los que lean esto no sabrán qué es. MakeFight es un juego desarrollado por devilishgames y un servidor para presentarlo en el concurso de videojuegos de art futura 05.  
  
.Los Comienzos.  
  
Allá por junio de este año, medio en broma medio en serio, zwitter, miembro del núcleo de devilishgames me propuso hacer un juego que tenía en mente. Como no podía ser de otra forma acepté el reto, sabiendo que yo nunca había creado un juego y el tiro podía salir por la culata. En cuanto le dije que sí, zwitter se puso manos a la obra con el concepto.  
  
.El concepto.  
  
El concepto es simple, la creación de un juego de peleas de coches construídos por el usuario. La idea me parecía interesantísima, incluso alguna vez se me había pasado por la cabeza realizar algo así. Enseguida empecé a pensar en qué herramientas usar, cómo enfocarlo, etc, etc. No tardé mucho en darme cuenta que el desarrollo no sería fácil porque, aunque el concepto es simple, llevarlo a cabo no lo es tanto.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/concepto.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/concepto.jpg)La primera imagen que me envió es el punto de partida para todo el desarrollo. Viendo dos meses después el resultado final no se parece demasiado, pero la idea permaneció. En la imagen las pelotas son el cerebro director de la máquina y en el caso de tocar el suelo se perdería la partida.  
  
  
  
  
  
  
  
  
  
. Primeros pasos .  
  
Lo primero fue plantear la idea general y cómo llevarla a cabo. Mi idea era hacerlo con física real, aprovechando que había estado trasteando con ODE, usando opengl como renderer y usando python como lenaguaje de programación (el primer "error").  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/30.6.051.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/30.6.051.jpg)  
  
Lo primero fue probar a ver si python era capaz de usar ODE con soltura y para ello creé unos cuantos modelos y los probé. Cubos y más cubos fueron pasando por mis manos, después pasé a esferas... python era capaz de manejar con soltura gran cantidad de objetos sin problema. Obviemente era capaz porque todo el cálculo de la física se hace con un módulo programado en C, python solo introduce cierta sobrecarga.  
  
  
. La lógica principal .  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/solucionado_problema_inestabilidad.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/solucionado_problema_inestabilidad.jpg)  
  
La idea principal y lo que me estaba comiendo el tarro fue la de crear estructuras rompibles. La primera idea fue crear unos palos y unirlos mediante fixed joints, esto es, uniones fijas. Todo a las mil maravillas hasta que puse el método de integración rápido que tiene ODE, en aquel momento todo empezó a oscilar. Una verdadera lástima porque en ese caso la forma de romper una unión era tan simple como romper el Joint. Navegué un poco y encontré la forma de "unir" geometrías sin necesidad de recurrir a uniones, el truco, glue geoms. El mecanismo es tan simple como asociar múltiples geometrías a un único cuerpo. La idea parecía cojonudísima, y sabía que me daría problemas a la hora de calcular las roturas, pero continué. En la imagen se ve la primera prueba, una estructura simple funcionando. En ese momento ya tenía el diseño definitivo de la clase estructura (cosa que me facilitó mucho las cosas después).  
  
. Primeros coches .  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/test_coches_1.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/test_coches_1.jpg)  
  
Además del bastidor, el coche debía tener ruedas (JUAZ). El modelo físico dela rueda es un cilindro, aunque una de las restricciones de pyODE es que no da interface para crear un cilindro normal, si no un capped cilinder, que es un cilindro con las caras con esferas... A pesar de todo cotinué y lo metí unas ruedecillas, unos botones que controlaran las ruedas y zumbando. En la imagen aparece un coche algo más completo (creado sin editor, a manita con código).  
  
  
  
Mañana más :)