---
name: 'Creación de juegos en 7 días'
title: 'Creación de juegos en 7 días'
date: 2005-10-29T20:33:00.000+02:00
layout: post2
published: true
url: /2005/10/creacin-de-juegos-en-7-das.html
---

Recientemente en [gamasutra](http://www.gamasutra.com/) ha aparecido un artículo sobre la experiencia de unos chavales en la [creación de juegos en 7 días](http://www.gamasutra.com/features/20051026/gabler_01.shtml). La experiencia en concreto se llama experimental gameplay y tiene [una web](http://www.experimentalgameplay.com/) en la que están a disposición todos los juegos.  
[![](http://www.experimentalgameplay.com/experimentalGameplayProject_title.gif)](http://www.experimentalgameplay.com/experimentalGameplayProject_title.gif)  
El tema es simple, construir un juego, siguiendo una linea muy básica, en una semana. Estas líneas que comento son, por ejemplo, usar muelles, simular gravedad o crear un juego de estrategia por turnos que es el último hit propuesto.  
  
En el documento de gamasutra se comentan algunas cosas interesantes, sobretodo referentes a la búsqueda de la idea del juego y las más interesantes a mi modo de ver, las técnicas para que el juego sea realmente un juego, desde el punto de vista del jugador, pero también del programador.  
  
En la primera parte habla del brainstorming y del ciclo de trabajo. Viene a decir la importancia de hacer un buen brainstorming y la necesidad de recibir feedback de los compañeros a su debido tiempo, en concreto al comienzo y al final de la creación . Es cierto que es de mucha ayuda un buen feedback e intercambio de ideas al comienzo, sobretodo entre coder y grafo, porque las ideas que puede tener el coder quizás más orientadas al apartado tecnológico o pensando en "cómo implemento esto" suelen ser bastante diferentes a las del grafo que muchas veces no sabe la complejidad de implementarla.  
  
Después de comentar algunas cosas que son lógicas como la de crear un prototipo en tu cabeza antes de escribir código, dice una frase que me gusta bastante:  
  
_Often the “correct” solution is not the best solution._  
  
O dicho de otra forma, "lo mejor es enemigo de lo bueno". Esta frase, tomada con reservas, te puede sacar de más de un apuro. Lo cierto es que muchas veces puedes hacerte, por ejemplo, un manager de recursos cojonudo, con todo lo que uno puede pensar, perfectamente reusable... pero a la hora de la verdad quizás baste con una lista enlazada o un simple std::map para salir del bache. Supongo que para superproducciones esa filosofía no será la correcta y a la larga contraproducente, pero para un desarrollo de corta duración, puede servir.  
  
Otra frase que a los programadores les sienta bastante mal es la siguiente:  
  
_Nobody Cares About Your Great Engineering_  
  
Es muy cierto, el 99% de las personas \_NO\_ se fijará en si el motor de físicas es la bomba o si ha sido capaz de implementar el octree en 84 bytes de código. Lo que interesa y que realmente queda es la jugabilidad y lo divertido que se el juego además de la calidad gráfica, pero a un nivel nada técnico, más bien subjetivo. Esto es "difícil" entenderlo para un coder porque el detalle más simple puede llevar horas implementarlo para que quede bien y a veces es un poco frustrante ver como días de trabajo llevan a algo que solo lo puedes jugar tú y tu hermano. En mi opinión una de las grandes dificultades del que programa videojuegos es saber usar la tecnología como herramienta para crear juego y no demos tecnológicas. Esta frase la tendré muy presente de aquí en adelante.  
  
Otra frase que viene al hilo de todo lo anterior es la siguiente:  
  
_Complexity is Not Necessary for Fun_  
  
Al final del artículo queda muy claro que es muy importante marcar un objetivo en el juego y que sea fácilmente reconocible. Hay frases para la posteridad:  
  
\- _Without a gameplay goal, a prototype is just a toy – not a game._  
\- _For some reason, people seem to enjoy having the opportunity to fail._  
  
Lo último que dice acerca es esto es interesante:  
_The best goals, we found, were an innate part of the gameplay like in "Tower of Goo," where the implicit goal was to simply “build up”._  
[![](http://www.experimentalgameplay.com/Prototypes/01_Springs/tn_TowerOfGoo.gif)](http://www.experimentalgameplay.com/Prototypes/01_Springs/tn_TowerOfGoo.gif)El juego que comenta trata de construir una torre con una especie de pelotas que están pegadas por una especie de gelatina y lo primero que haces al iniciarlo es intentar llegar más arriba. Sin darte cuenta el juego por su dinámica te está diciendo cual es objetivo. Me vienen a la cabeza juegos con mucho éxito en lo que sucede esto mismo. Por ejemplo, tetris, nada más comenzar tratas de no dejar huecos, el pacman, en cuanto comes una bola tratas de seguir comiendo las demás aunque no sepas que el objetivo real sea ese, o el matamarcianos de toda la vida.  
  
Muy buen artículo, recomiendo su lectura.