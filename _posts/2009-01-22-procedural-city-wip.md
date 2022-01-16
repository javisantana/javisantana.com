---
name: 'Procedural city WIP'
title: 'Procedural city WIP'
date: 2009-01-22T23:33:00.005+01:00
layout: post2
published: true
url: /2009/01/procedural-city-wip.html
tags: 
- programacion
- procedural
---

Estoy preparando un pequeño juego, un shooter con estilo [kenta choo](http://www.asahi-net.or.jp/~cs8k-cyu/index_e.html) en blanco y negro, y pensando en los fondos que van a aparecer detrás de la escena principal se me ocurrió que fuese una ciudad.  
  
Para crear la ciudad traté de usar el mecanismo que uso la [demo insignia](http://complexification.net/gallery/machines/substrate/index.php) del toolkit [processing](http://www.processing.org), y que creo que también usan los de introversion en el nuevo juego que están preparando a la vista de los [videos que van publicando en su blog](http://forums.introversion.co.uk/defcon/introversion/viewtopic.php?t=1860&highlight=head) (id buscando los post titulados "it's all in your head"), aunque finalmente no era demasiado compacto y opté por usar una [textura celular](http://www.blackpawn.com/texts/cellular/default.html) (muy buen tutorial de [@blackpawn](http://twitter.com/blackpawn) por cierto) que da buenos resultados con poco código (últimamente me obsesiona el menos es más).  
  
Generando la textura, usándola como mapa de alturas y haciéndola pasa por unos steps y unos rands se puede generar lo que veis en el video. Encima de cada edificio he puesto unos "[doodads](http://www.nccn.net/~w_rosky/evan/evan/programs/discombobulator/tutorial.html)", un plagio del interesantísimo plugin de blender, que da un toque a la imagen. Eso sí, todo con cubos.  
  
Luego he añadido unas entidades que hacen lo que les sale del cuerpo, tengo que depurarlas para que de la sensación de que van por las calles.  
  

  
  
[procedural city](http://vimeo.com/) from [javisantana](http://vimeo.com/user856080) on [Vimeo](http://vimeo.com).