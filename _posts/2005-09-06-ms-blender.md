---
name: 'Más Blender'
title: 'Más Blender'
date: 2005-09-06T13:27:00.000+02:00
layout: post2
published: true
url: /2005/09/ms-blender.html
---

Lo que tiene el estar pillado de tiempo es que no lo pierdes en crear código o herramientas que no usarás. En el juego que estamos preparando tiene un contenido de física bastante importante y para ahorrar unos cuantos ciclos de máquina hacemos por separado los escenarios (malla, texturas) y su modelo físico.  
  
Como tengo cierta experiencia con blender, decidí crear un exportador para agilizar las cosas, así no tenía que ajustar los modelos físicos por código (un rollo). Busqué cosas que tenía hechas de un exporter que hice para un raytracer, hice unos cambios y solucionado. Como además los escenarios tendrán partes móviles y objetos por ahí, decidí también exportar animación y posiciones de "otros objetos". Todo esto es exportado a un fichero del tipo ini de windows, tenía pensado hacerlo a binario serializando los datos, pero era más cómodo para editar (si sabes interpretar matrices 4x4 XD).  
  
Qué mejor que una imagen para ilustrar el proceso.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/blender_exporter.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/blender_exporter.jpg)  
  
  
  
A la derecha se tiene el modelo físico (que se ha adaptado en base a la malla del escenario), a la derecha arriba la curva de animación de un objeto, en concreto un cubo que se ve en la parte superior de la vista 3D que va de un lado a otro y por último la ventana del script de exportación.  
  
Lo mejor del proceso es que después hay un script del nivel que permite hacer todo lo que se quiera, desde meter nuevos objetos, crear sistemas de partículas... sería simplísimo crear un juego de plataformas con esto, pero ese tema ya lo comentaré otro día..., incluso podreis toquetear, incluso los usuarios de linux... e incluso los de maxos XDD  
  
Blender rocks :)