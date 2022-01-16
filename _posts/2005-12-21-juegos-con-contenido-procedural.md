---
name: 'juegos con contenido procedural'
title: 'juegos con contenido procedural'
date: 2005-12-21T21:03:00.000+01:00
layout: post2
published: true
url: /2005/12/juegos-con-contenido-procedural.html
---

Leyendo [el post que puso sole en su blog acerca del juego que hice para la compo de stratos](http://www.soledadpenades.com/index.php?pos=10) me hizo pensar acerca de la utilidad de generar contenidos procedurales en los juegos. En mi caso el objetivo era usar el mínimo de memoria en disco posible usando solo unos datos clave para generar los niveles.  
  
En general la técnica usada para no meter datos en disco no tiene demasiado sentido si hablamos de juegos actuales ya que no hay problema en meter megas y megas debido a los soportes de almacenamiento. Por ejemplo, es muy ineficiente que un juego sintetice la música y los efectos de sonido en varios sentidos. El primero de ellos es el que comentaba, carece de sentido intentar ahorrarse 60Mb en disco a costa de tener 2 minutos de precalculo. El segundo de ellos, y más grave, es la de la productividad. Es mucho más lógico que el músico haga su música con su programa favorito y la guarde en un formato conocido y legible por cualquier programador en pocos minutos. De otra forma el músico tendría que adapatarse a la forma de generar la música/efectos de sonido y el coder tendría que programar el sintetizador y posibles herramientas. Asímismo esto se puede aplicar a la generación de texturas, etc.  
  
Sin embargo la generación de contenidos procedurales en mi opinión sí puede tener sentido para dar un paso más. Qué jugador de videojuegos no ha tenido el sueño de tener un juego en el que nunca se acabe el nivel o que vayan variando a medida que avanzamos, etc. Yo pensé que GTA cumplía esos requisitos, pero después de jugar una temporada te terminas aprendiendo la ciudad :).  
  
Voy a poner un par de ejemplos de andar por casa muy relacionados con GTA y en otro post comento cosas acerca de juegos que usan técnicas procedurales.  
  
Hace cosa de unos meses vi en [codepixel](http://www.codepixel.com/displayarticle2459.html) un artículo sobre [generación de ciudades semi aleatorias](http://www.schloerb.com/written/tutorial/greeblecity_1.htm). A grandes rasgos el tutorial se basa en crear la planta de la ciudad y gracias al pugglin [grebble](http://www.pinacoderm.com/tsx/greeble/) ([aquí se puede ver una imagen generada a partir de una caja](http://www.speakerpixel.com/gallery/showphoto.php/photo/42/sort/1/cat/all/page/1)) se generan diferentes alturas. Es cierto que el sistema es manual, pero se podría automatizar un poco más usando una lógica algo más elaborada.  
[![](http://www.schloerb.com/written/tutorial/18.gif)](http://www.schloerb.com/written/tutorial/18.gif)  
  
Otro script del mismo tipo para blender (\\o/) se puede encontrar en [elYsium](http://www.elysiun.com/forum/viewtopic.php?p=154278#154278). Este es más mecánico, solo es necesario dar unos parámetros para que creer una especie de ciudad con rasca cielos u otro tipo de construcciones dependiendo del set que modeles, como por ejemplo chozas, etc. Lógicamente es algo muy básico, pero sí que podría servir de punto de partida. Yo me imagino un juego de rol por internet o MMORPG como se suele decir ahora en el que tengas una casita en propiedad (esto ya le da tintes de fantasía) dentro de un pueblo y a medida que vienen nuevos usuarios se vayan creando pequeñas casitas en base a unos parámetros. Oh dios, para!  
  
[![](http://www.kino3d.com/forum/files/kinocity.jpg)](http://www.kino3d.com/forum/files/kinocity.jpg)  
  
  
Otro día más, que hay mucho de que hablar.