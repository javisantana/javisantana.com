---
name: 'Pruebas con AO'
title: 'Pruebas con AO'
date: 2006-06-16T11:44:00.000+02:00
layout: post2
published: true
url: /2006/06/pruebas-con-ao.html
---

En estos días de relax he decidido ponerme a hacer un pequeño motor que use shaders y procedural (no hay entrada en la wikipedia española, lo mismo la creo), como viene siendo habitual.  
  
No había trabajado todavía con GLSL, el lenguaje de OpenGL para shaders, y me ha sorprendido la facilidad y la potencia para hacer todo tipo de cosas, las que antes se hacían sin shaders y las que ahora son posibles gracias a los shaders.  
  
En un par de días, miré la [referencia de GLSL (pdf)](http://oss.sgi.com/projects/ogl-sample/registry/ARB/GLSLangSpec.Full.1.10.59.pdf) que por cierto tiene agradecimientos a un español, y programé un sistema muy simple que me permite trabajar con shaders.  
  
[![](http://static.flickr.com/44/167634442_183c08d0e3_m.jpg)](http://static.flickr.com/44/167634442_183c08d0e3_m.jpg) Lo primero que programé es la generación de mallas; además de la [subdivisión y smootheado](http://blep.blogspot.com/2006/05/subdivisin-de-mallas.html) de las mismas, he creado un sistema de extrusión y generación por revolución. Creo que además añadiré algo que permita hacer un dupliverts a lo largo de un spline y que el sistema de extrusión permita hacerlo también usando un spline.  
Con una textura basada en perlin, un cuerpo de revolución y un cubo he creado la escena de la derecha. EL cubo tiene un toon shader muy simple y el cuerpo de revolución iluminación direccional por pixel. El suelo usa el render habitual de OpenGL (el shader program 0 :).  
  
  
  
[![](http://static.flickr.com/75/167633572_1ec4001f57_m.jpg)](http://static.flickr.com/75/167633572_1ec4001f57_m.jpg)  
Subdividiendo mucho las mallas y usando un shader adecuado se pueden conseguir imágenes como la de la derecha. Es interesante ver como puedes ajustar la iluminación como te de la gana, por ejemplo en la imagen quito la componente especular (no me gusta la luz especular!) y la atenuación que meto en función de la distancia la varío como quiero :).  
  
  
  
  
Ya que estaba me he puesto a jugar un poco con una aproximación de Ambient oclussion, pero las cosas a la primera nunca funcionan bien:  
  
[![](http://static.flickr.com/75/167633971_4065044706_m.jpg)](http://static.flickr.com/75/167633971_4065044706_m.jpg)  
  
Otras pruebecillas, algo mejor:  
  
[![](http://static.flickr.com/46/167634116_cf06a1cf7d_m.jpg)](http://static.flickr.com/46/167634116_cf06a1cf7d_m.jpg)  
  
Subdividiendo algo más el suelo (la componente de AO se calcula por vértice):  
  

![](http://static.flickr.com/72/167634181_0b447ed5f4_m.jpg)

  

![](http://static.flickr.com/42/167634226_1893cd1b33_m.jpg)

  
  
Ahora estoy probando la generación de unos arbolitos con unos perlin... :)  
  
Gracias a iq por la [información de su web](http://rgba.scenesp.org/iq/demoscene/195_95_256/how/how.htm) acerca de su demosystem.