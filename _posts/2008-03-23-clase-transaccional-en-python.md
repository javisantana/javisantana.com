---
name: 'clase transaccional en python'
title: 'clase transaccional en python'
date: 2008-03-23T21:43:00.005+01:00
layout: post2
published: true
url: /2008/03/clase-transaccional-en-python.html
tags: 
- programacion
- python
---

Después de unas "largas" vacaciones sin tocar el pc (apenas recuerdo donde están las teclas :) apetece leerse algún buen artículo, como por ejemplo uno de [clases transaccionales en python](http://www.harald-hoyer.de/linux/pythontransactionclass).  
  
Interesante artículo por varios motivos:  
  
\- La propia clase, personalmente creo que puede ser bastante útil, luego pongo un ejemplo  
\- El uso de introspection (o reflexion o como quiera que se llame) en python. Simple y efectivo  
\- La explicación, paso a paso, y el código final con sus test unitarios.  
  
Este es el típico ejemplo de pequeña clase que se complica y que termina siendo un verdadero infierno si no se tienen claros los contratos. Personalmente he tenido muy malas experiencias con clases en teoría simples, pero que dado su uso intensivo terminan por matar una aplicación. Por ejemplo, una clase tan simple como un vector, que en resumen no dejan de ser 4 métodos, es usada en todo el código, seguramente por varias personas que no tendrán ni idea de como está implementada (con razón), de la cual se pueden sacar unas cuantas "condiciones de contorno" que pueden hacer que la aplicación fracase estrepitosamente ya que cada persona puede decir: "es que yo pensé que funcionaba así"  
  
En cuanto a la clase transaccional, se me ocurre un uso muy práctico. Estamos acostumbrados a ver diálogos wizards y configururaciones en todas las aplicaciones. El usuario cambia valores, toquetea y al final pulsa sobre 'Ok' o sobre 'Cancel'. El planteamiento de la lógica del diálogo podría ser el siguiente:  
  
\- al comienzo del diálogo se hace una copia de los datos.  
\- se modifica la copia en función de los eventos de usuario  
\- si el usuario acepta, se vuelcan los cambios que están en la copia en los datos originales.  
  
Queda mucho más elegante el siguiente funcionamiento:  
\- se modifican los datos (que implementan el modelo transacional) en función de los eventos de usuario.  
\- si el usuario cancela se hace rollback.  
  
Pero es que además, con este modelo tenemos solucionado el típico undo que tantos quebraderos de cabeza da de forma "transparente" (de hecho implementa el típico patron memento). Si unes esto a una serialización como dios manda ya tienes solucionado medio modelo de datos de la aplicación :).  
  
Eso sí, la clase tiene varios problemas, por lo menos dos que yo vea:  
\- si hay atributos muy pesados en 4 commits te has zumbado unos megas de ram y estos lenguajes dinámicos no son precisamente ahorradores en este aspecto  
\- a poco mal que hagas el modelo de datos habrá variables que no te interese, perdón, que no deban guardar el estado. Pasa exactamente lo mismo que con la serialización.