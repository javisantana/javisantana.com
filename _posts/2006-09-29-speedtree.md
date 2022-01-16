---
name: 'SpeedTree'
title: 'SpeedTree'
date: 2006-09-29T19:19:00.000+02:00
layout: post2
published: true
url: /2006/09/speedtree.html
---

Dado que he estado trabajando con esta librería, voy a hacer un pequeño resumen de qué es y para qué sirve además de comentar algunos apartados técnicos que me han resultado curioso.  
  
SpeedTree es una librería que genera proceduralmente árboles en base a una definición de parámetros. En esencia es solo eso y lo dejan muy claro en la documentación, speedtree es solo un motor de cálculo, no un motor de render ni nada similar. Speedtree te da todos los datos para renderizar el árbol... las texturas (que no genera, claro), los vértices, las normales, el tangent space de cada vértice, los pesos de los "bones", y otros parámetros realmente curiosos.  
  
Ciertamente la librería genera unos árboles de alta calidad y perfectamente preparados para renderizarlos y animarlos en tiempo real. Y es que bien se podría llamar SpeedHack, porque utiliza todas las artimañas posibles para renderiza más rápido. Usa el mal llamado pseudo-instancing, esto es, pasa todos los parámetros del árbol en coordenadas de textura (posición, rotación y otros) dejándo todo el trabajo al vertex shader, de esta forma se ahorran los cambios de matrices de cada uno de los árboles.  
  
Pero la cosa no queda ahí, especifican claramente como debes renderizar, en qué orden y casi te imponen un sistema de oclusión basado en celdas con batches de vértices para renderizar todos los árboles lejanos como billboards. Aparte de todos los trucos típicos de cambiar lo mínimo posible el contexto, organizar los vértices para no tener fallos de caché, usar un lod precalculado, usan otros trucos curiosos. Por ejemplo, una vez conoces las especies de árboles que vas a usar, una herramienta que te trae el SDK, SpeedTreeCAD, te genera texturas batch, esto es, en ella acumulan todos los billboards de cada árbol, las texturas de las ramas, etc.  
  
Sin embargo lo que más me ha gustado es la parte del movimiento de los árboles con el viento. Cada vértice tiene unos pesos, al igual que cuando se hace skinning, sin embargo aquí se han ideado un sistema por el cual todos los árboles, sea de la especia que sean, comparten matrices de transformación. Cada frame las matrices de viento cambian (puede ser 2 o más) y cada árbol tiene un índice a una de las matrices, de forma que el mecanismo de pseudo-instancing funciona de miedo ya que parece que cada árbol se mueve a su ritmo a pesar de tener las misma mastices, la misma malla y los mismo pesos. Y todo eso con solo un parámetro por shader.  
  
Para concluir decir que la librería se nota que está currada, pero ciertamente esta enrevesada y es muy rígida a la hora de integrarla. No compila en GCC para PC (he tenido que hacer unos cuantos hacks), aunque sí está preparada para compilarse en PS3 con gcc, además de XBOX y DX. Decir que la demo que viene a modo de tutorial no funciona en tarjetas ATI y que hace conversiones a de float a enteros en el shader que tan pesadas son en algunas tarjetas.  
  
Otro día sigo hablando de ella, tendría para horas...  
  
Links:  
\- [sitio oficial](http://www.speedtree.com/)  
\- [demo de trees of pangaea](http://www.speedtree.com/html/pangaea_main.htm), demuestran lo que puede llegar a hacer speedtree