---
name: 'Partes de un negocio: la trazabilidad'
title: 'Partes de un negocio: la trazabilidad'
date: 2008-02-12T21:14:00.001+01:00
layout: post2
published: true
url: /2008/02/partes-de-un-negocio-la-trazabilidad.html
tags: 
- negocio
- programacion
- subversion
---

Sigo con la mini-serie con el original título "partes de un negocio". Esta vez voy a hablar de algo más cercano a lo técnico, esto es, no me basaré en suposiciones ni en historietas del abuelo :).  
  
Los desarrolladores tenemos la costumbre de incluir errores en las aplicaciones, algunos dicen que son bugs, otros pequeños errores... por lo general cuando un error llega a una versión release quiere decir que vas a perder dinero y es proporcional a la gravedad y al número de licencias vendidas.  
  
Pongamos un caso real, yo vendo un sistema con un software a 10 personas, todo parece funcionar perfecto, así que incluyo algunas mejoras y vendo esta nueva versión a otras 10. Pasa un año y resulta que una de esas personas te reporta un error. No pasa nada, un error aislado no es un error, es un contratiempo... sin embargo te llama otro y te cuenta lo mismo, empiezas a sospechar. Haces tus pruebas y todo parece funcionar bien, por tanto echas la culpa al usuario. Por experiencia, cuando te llaman dos personas con el mismo problema el fallo es tuyo, con lo cual ponte a buscar el error como un loco.  
  
Comos unos hachas desarrollando reproducimos el error con los ficheros de log que hemos guardado (somos unos bestias y no se nos escapa ni un dato), vemos que es una buena metedura de pata, lo arreglamos y se lo corregimos a los clientes que han llamado.  
  
¿Cual es el problema? De las 20 versiones que hemos vendido, cuántas tienen el error y cuantas no? Les estará funcionando mal al resto y no se han dado cuenta? solo hemos vendido 3 licencias de esa versión?  
  
Para tener esto controlado hay dos reglas muy simples que hay que seguir:  
  
\- Congela tú código y marcalo: da igual que sea un cambio de un espacio en una línea de código, un cambio en un script de compilación... lo que sea, lo marcas y lo congelas de alguna forma (con ficheros zip, con tags en [subversion](http://blep.blogspot.com/2006/02/usa-subversion-por-favor.html), lo que sea).  
Corolario: Ten siempre a mano y usables TODAS las versiones. Esto es, en cualquier momento pueden venir unos datos de una versión y tienes que sacarla del baúl y usarla. Hay que ser muy muy estricto con esto, no hay que dejar pasar ni un solo cambio sin marcar.  
Corolario: todos los datos que genere la aplicación deben llevar en alguna parte la versión que corresponde.  
  
Si no haces esto vas a perder mucho tiempo en encontrar la versión que usaste, no vas a saber si es un error propagado por diferentes versiones, es decir, estás en pelotas.  
  
Como ejemplo yo mantengo ahora mismo 3 ramas de desarrollo mas una estable, en las ramas pruebo cosas sin desestabilizar la estable. Además, todos los datos que recojo de mis pruebas o de clientes los tengo también en el repositorio convenientemente marcadas y asociadas a las versiones de las que partieron, todo eso junto a información de las pruebas.  
  
\- Mantén un mapeo cliente-versión: parece de sentido común, pero se suele dejar porque es un coñazo. Además ten un mapeo de cosas que creas que nunca van a afectar... por ejemplo, nosotros guardamos la versión del software, marca, modelo y números de serie de todos los componenetes, marca del tractor, zona de trabajo, metros de las máquinas que tiene, cuantos tractores tiene la persona, etc, etc.  
De esa forma puedes obtener una relación directa si te llama más de una persona.  
  
Subversion es una herramienta básica para cualquier persona que use un PC y tenga que mantener versiones de datos, la gente se rie cuando le dices que usas subversion hasta para el currículum, pero es una de esas herramientas que deberían venir por defecto instaladas en el sistema operativo. Con un sistema de control de versiones con muy poco trabajo tendrás todo etiquetado, con un histórico envidiable, acceso a cualquier cosa, puedes ver el diferencial, mantener copias de seguridad... no es necesario mantener un tracker ni complejos scripts si no tienes demasiado tiempo como es mi caso. No me cansaré de hablar bien de subversion.