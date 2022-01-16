---
name: 'Cálculo de ambient occlusion'
title: 'Cálculo de ambient occlusion'
date: 2006-02-06T21:31:00.000+01:00
layout: post2
published: true
url: /2006/02/clculo-de-ambient-occlusion.html
---

Hace unos días [link-aba a un artículo sobre ambient occlusion](http://blep.blogspot.com/2006/01/ambient-occlusion.html) que explicaba de forma muy simple una forma de calcularlo llamada spherical armonics, procedimiento que también rgba usa en 195/95/256 del cual puse un [post](http://blep.blogspot.com/2006/02/making-of-19595256.html) hace dos días (o tres).  
  
Leyendo con más detenimiento ls artículos de iq [leo (párrafos 5 y 6) la forma que tienen de calcularlo en la intro](http://rgba.scenesp.org/iq/demoscene/195_95_256/how/introsys/scene.htm). En resumidas cuentas colocan la cámara (con un fov de 170º)en el vértice considerado mirando en dirección al vector normal y renderizan la escena, bueno, me parece haber leído que cada objeto tiene información de los objetos que debe renderizar para el cálculo del AO. El truco del asunto está en haber borrado el bit-buffer de blanco y dibujar todos los polígonos de negro, de forma que el resultado de esa escena es renderizado a una textura que es "descargada" en memoria de sistema y sobre la que se hace un cáculo de los puntos negros que hay. Como explica iq, la escena es renderizada en un viewport de 32x32 con el objetivo de minimizar el tiempo que se tarda en transferir la textura de la memoria de la gráfica a la de sistema. Una técnica la mar de simple, pero muy inteligente. La calidad del resultado [salta a la vista](http://rgba.scenesp.org/iq/demoscene/195_95_256/how/lighting/lighting.htm).  
  
Y ya que estamos con GLSL, gracias a [pingüino](http://pinguino.dyndns.org), [manual de referencia GLSL online referencia del API de GLSL](http://developer.3dlabs.com/documents/glslmanpage_index.htm) y un [tutorial desde 0](http://www.lighthouse3d.com/opengl/glsl/index.php).  
  
EDIT: mientras cenaba me he dado cuenta que en este caso GLSL no es necesario para absolutamente nada, donde de verdad interesa es a la hora de renderizar la escena con AO.