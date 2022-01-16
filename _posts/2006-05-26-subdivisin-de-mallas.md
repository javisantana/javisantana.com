---
name: 'Subdivisión de mallas'
title: 'Subdivisión de mallas'
date: 2006-05-26T19:58:00.000+02:00
layout: post2
published: true
url: /2006/05/subdivisin-de-mallas.html
---

Me dio el otro día por implementar un sistema de subdivisión de mallas, no sé para qué y por qué, pero ya está. La entrada en el caso de la imagen fue un cubo, en la parte de la izquierda, abajo, subdivisión simple y arriba smooth. En la parte derecha idem pero con un nivel más de subdivisión.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/subdiv.png)](http://photos1.blogger.com/blogger/2315/213/1600/subdiv.png)  
El interface que se ve en la foto es el de Blender. En vez de complicarse la vida creas un exporter a obj que es un formato muy simple, lo cargas en blender y visulizas la malla a tu gusto.  
  
Links interesantes:  
\- [subdivision.org](http://www.subdivision.org/subdivision/index.jsp) donde explican el proceso de subdivisión paso a paso.  
\- La página de la wikipedia donde explican al [algortimo catmull-clark](http://en.wikipedia.org/wiki/Catmull-Clark_subdivision_surface). Como curiosidad decir que el [paper](http://www.idi.ntnu.no/~fredrior/files/Recursively%20generated%20B-spline%20surfaces%20on%20arbitrary%20topological%20surfaces.PDF) que describe el algoritmo data del 1978 y que fue creado por Jim Clark y [Edwin Catmull](http://en.wikipedia.org/wiki/Edwin_Catmull) de Pixar. Pero no fue lo más interesante que descubrió el pájaro, también hizo lo propio con el zbuffer y texture mapping. Da gusto leer su [biografía](http://en.wikipedia.org/wiki/Edwin_Catmull).