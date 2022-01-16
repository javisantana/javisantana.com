---
name: 'intento de augmented reality'
title: 'intento de augmented reality'
date: 2008-05-18T00:54:00.003+02:00
layout: post2
published: true
url: /2008/05/intento-de-augmented-reality.html
tags: 
- GPS
- Augmented reality
---

"Para quien tiene un martillo todo son clavos".  
  
Esta mañana me he levantado pronto y como no tenía sueño y nada que hacer productivo en todo el día, he pensado en hacer algo con mi webcam (tranquilos, no salgo en ningún momento :). Hace unos días vi como con un gps, una webcam y una brújula gracias a google earth conseguían poner una [capa por encima de la realidad con información la ubicación de diferentes cosas](http://www.navigadget.com/index.php/2008/04/16/enkin-for-android/). El proyecto estaba hecho sobre android, en el enlace hay un video muy interesante. Tambien hace relativamente poco vi como un navegador proyectaba información sobre el parabrisas que indicaba qué calle debías coger (no encuentro el link). Con lo cual me planteé por qué no podría hacer lo mismo para agroguía, que el agricultor mirase la cámara y viese por donde había ya pasado superpuesto con la realidad.  
  
En esta mañana he hecho un prototipo de [augmented reality](http://en.wikipedia.org/wiki/Augmented_reality) de forma que en la pantalla del PC se mostrase información de por donde ya había pasado mostrando la visión en ese momento del conductor unido a un capa generada que se lo indicase.  
  
He cogido la webcam, un GPS, python y opengl y he preparado un prototipo. He colocado la webcam arriba en el coche (ver foto) junto al GPS de forma que a medida que el GPS me da información de posición con OpenGL renderizo las zonas por las que ya se ha pasado justo con la cámara en ese lugar.  
  
[![](http://lh4.ggpht.com/qualopec/SC8jQxF1XhI/AAAAAAAAA5o/o7rg5LxHkKk/s800/100_4933.JPG)](http://picasaweb.google.es/qualopec/Agroguia02/photo#5201414865598897682)  
  
  
La prueba no ha quedado demasiado mal teniendo en cuenta que es un prototipo rápido, un video:  
  
  
  
Problemas:  
\- La resolución de la cámara es malísima.  
\- El GPS lleva retardo, de ahí que no estén sincronizados  
\- No he calibrado la cámara adecuadamente, la he puesto a ojo, un fov e inclinación más o menos parecida a la de la webcam  
  
Mañana voy a probar con un GPS de 5hz y con menos retardo, además intentaré ajustar mejor la cámara.