---
name: 'Global Illumination usando GPU'
title: 'Global Illumination usando GPU'
date: 2006-09-16T23:44:00.000+02:00
layout: post2
published: true
url: /2006/09/global-illumination-usando-gpu.html
---

Para no variar iñigo quilez vuelve a sacar [un estupendo artículo](http://rgba.scenesp.org/iq/computer/articles/simplegi/simplegi.htm) de cómo precalcular la GI usando la GPU(\*). La técnica es muy simple y es un paso más allá de la [técnica que ya descibrió hace tiempo para calcular el Ambient occlusion](http://rgba.scenesp.org/iq/demoscene/195_95_256/how/lighting/lighting.htm). La imagen habla por si sola.  

  
![](http://rgba.scenesp.org/iq/computer/articles/simplegi/gfx_02.jpg)  

  
  
(\*) Actualmente cuando se habla de GPU lo primero que te viene a la mente son los vertex y pixel shaders y quizás en alguna técnica para fakear alguna propiedad física de la luz o de los materiales, sin embargo la técnica que comenta no los usa necesariamente, tranquilamente se podría calcular usando la "fixed pipeline"