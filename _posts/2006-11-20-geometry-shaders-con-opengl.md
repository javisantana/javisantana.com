---
name: 'Geometry Shaders con OpenGL'
title: 'Geometry Shaders con OpenGL'
date: 2006-11-20T19:47:00.000+01:00
layout: post2
published: true
url: /2006/11/geometry-shaders-con-opengl.html
tags: 
- OpengGL
- programación
- shaders
---

Hace bien poco salía la nvidia 8800 que promete que será capaz de tirar dx10. Entre tantas cosas, añade a su funcionalidad el tema de geometry shaders, esto es, shaders que permiten añadir vértices. Hasta ahora nos habíamos conformado con transformar los vértices que teníamos pero ahora es posible generarlos.  
  
Y para qué leches quiere alguien generar vértices? Por ejemplo, imaginemos el caso de querer usar billboards. Tenemos la opción de usar fixed pipeline, transformando uno por uno los vértices de los quads para orientarlos a la cámara. Otra opción es usar un vertex shader, de forma que le pasamos un "quad" con los 4 vértices centrados en el centro del quad, luego en una coordenada de textura se le pasas el número de esquina y por último dos uniforms con los ángulos de cámara. Con simple trigonometría y un vector de vec3 en el que se haga lookup con el número de esquina se puede transformar el vértice. Con geometry shaders se puede, indicar que la entrada es un punto, la salida es un triangle strip y en el shader generar los 4 vértices a partir del primero, con el consecuente ahorro de cálculo en el VS y de transferencia de datos.  
  
Este es un ejemplo, pero seguro que hay cosas mucho más útiles que eso :). [Un buen tutorial](http://appsrv.cse.cuhk.edu.hk/~ymxie/Geometry_Shader/) lo he visto hoy en una [noticia](http://www.cse.cuhk.edu.hk/~ymxie/Geometry_Shader/) de hace 4 días en la web de opengl. Bien explicado, con sus gráficos de rigor. A ver que hace ATI (aka, quisquillosa con GLSL) ahora.