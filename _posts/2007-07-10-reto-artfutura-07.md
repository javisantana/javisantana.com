---
name: 'reto artfutura 07'
title: 'reto artfutura 07'
date: 2007-07-10T21:21:00.000+02:00
layout: post2
published: true
url: /2007/07/reto-artfutura-07.html
tags: 
- juegos
- development
---

Siguiendo [la idea de colson](http://www.funmangames.com/edeviblog/?p=60) lo mismo me planteo presentar un jueguecillo a artfutura.  
  
La verdad es que no tengo demasiado tiempo, entre programar nuevas caracterísitcas de agroguía, mantenerlo, probar GPS's nuevos y demás tareas me quedo casi sin tiempo. Por ello me planteo coger un uno de esos juegos que tengo a medio hacer, olvidades y terminarlo para presentar una demo. Rascando un poco en mi carpeta prog he encontrado 3 pequeños juegos a medio hacer que me llaman la atención.  
  
El primero de ellos es un viejo conocido de este blog, un juego de naves en el que casi todo es procedural. La base del juego está hecha, el editor de pistas está creado, la lógica de los enemigos también... solo me falta un 10% para tener una demo, o sea el "otro" 90%. Hablando en términos un poco más técnicos, me queda ajustar la jugabilidad, el control, hacer más pistas, mejorar el aspecto gráfico (un glow por aquí, unos cubitos con blend más por allá, unos fondos chulos) y poco más. Creo que puede ser un mes más de coding tranquilo, a ratos:  
  
Cubeout:  
[![](http://lh5.google.es/qualopec/RpPbDm0zwtI/AAAAAAAAAII/ElU71PQmkjM/s400/cubeout1.jpg)](http://picasaweb.google.es/qualopec/Juegos_wip/photo#5085649259239555794)  
  
El segundo es un juego de puzle llamado puzbe (suma de puzle y cube)basado en físicas. El objetivo es hacer que dos bolas se choquen. La primer de ellas es fija, la segunda de ellas está a cierta altura, entonces en un determinado tiempo el jugador debe poner diferentes objetos a elegir entre una lista por todo el escenario para quesas dos bolas se coquen. En la primera imagen se ve como hay una bola arriba, la cual se tiene que chocar con la que está al fondo... pero hay una de por medio. Para quitarla podemos dejar caer (la posición de la caida lo indica la flecha azul) una pelota gorda a modo de bola de billar para separarla.  
  
[![](http://lh3.google.es/qualopec/RpPbAG0zwrI/AAAAAAAAAH4/H9SSSqEQ_CE/s400/puzzle.jpg)](http://picasaweb.google.es/qualopec/Juegos_wip/photo#5085649199110013618)  
El juego tiene programado la edición de niveles en blender con su exportador, toda la física, un scenegrpah básico, efectos de partículas y un poco de la lógica del gui. EL juego está hecho con toonshader, de esa forma puedo darle un "buen" aspecto sin necesidad de grafista. Me faltaría bastante, aunque el grueso principal está hecho.  
  
[![](http://lh6.google.es/qualopec/RpPbA20zwsI/AAAAAAAAAIA/FcsbvPjLZJE/s400/puzzle2.jpg)](http://picasaweb.google.es/qualopec/Juegos_wip/photo#5085649211994915522)  
  
[![](http://lh4.google.es/qualopec/RpPfSW0zwvI/AAAAAAAAAIg/2zanhawrjNM/s288/puzzle_editor1.jpg)](http://picasaweb.google.es/qualopec/Juegos_wip/photo#5085653910689137394)  
  
Por último un pequeño concept de juego de naves llamado haty (no sé porque puse ese nombre) que solo tiene implementada la lógica básica de colisiones y un generador estúpido de naves procedurales. Una de ellas se ve en el shot. Este prácticamente lo descarto, aunque últimamente me apetece hacer un shooter  
  
[![](http://lh6.google.es/qualopec/RpPbE20zwuI/AAAAAAAAAIQ/sDuCVpmFYSg/s288/naves1.jpg)](http://picasaweb.google.es/qualopec/Juegos_wip/photo#5085649280714392290)  
  
con cual seguiriais?  
  
PD: por cierto, cubeout está programado en C (me dio por ahí) y los demás en C++, como buen hombre que soy. Porque, efectivamente, los que somos hombres de verdad usamos C++, con sus destructores, sus unsigneds y sus deletes :)