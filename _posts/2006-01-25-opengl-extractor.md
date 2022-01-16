---
name: 'OpenGL extractor'
title: 'OpenGL extractor'
date: 2006-01-25T21:59:00.000+01:00
layout: post2
published: true
url: /2006/01/opengl-extractor.html
---

Leo en [slashdot](http://games.slashdot.org/article.pl?sid=06/01/25/1536256) lo siguiente:  
  
"""  
OGLE: The [OpenGLExtractor](http://ogle.eyebeamresearch.org/) is a tool that lets you grab 3d data out of an OpenGL application and output it as models again. What does that mean? It means that someone with a 3d printer can get 3d statuettes of their Second Life character. They can send it off to be manufactured, if they like. It means that you can snag any 3d model you like out of someone else's game data, and insert it into your own 3d scene. So much for stealing textures... ;)  
"""  
  
En pocas palabras, captura toda la información sobre la geometría de todo lo que sale por tu gráfica y que ha sido renderizado usando opengl y lo guarda en un fichero de datos. A la memoria me vino [GLIntercept](http://glintercept.nutty.org/) que es capaz de salvar todas las llamadas de a OpenGL en un fichero legible además de hacer otras muchas cosas, es más, parece ser que esta apliación no es más que una extensión de GLIntercept. Parece que funciona bien a tenor de las [imágenes de muestra](http://ogle.eyebeamresearch.org/results). Voy a probarlo con [sandstorm](http://www.pouet.net/prod.php?which=18258) y después me hago unos renders de la virgen con yafray (que le estoy cogiendo gustito).  
  
[![](http://ogle.eyebeamresearch.org/files/world-of-warcraft-small.jpg)](http://ogle.eyebeamresearch.org/files/world-of-warcraft-small.jpg)