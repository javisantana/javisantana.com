---
name: 'Bugs en la centralita de mi coche'
title: 'Bugs en la centralita de mi coche'
date: 2008-05-29T20:19:00.004+02:00
layout: post2
published: true
url: /2008/05/bugs-en-la-centralita-de-mi-coche.html
tags: 
- programacion
- coches
---

[![](http://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Microchips.jpg/200px-Microchips.jpg)](http://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Microchips.jpg/200px-Microchips.jpg)  
Cuando hablamos de un bug en una aplicación para dibujar hablamos de una pequeña putada, llega grafista, dibuja un logotipo de muerte y tras 3 horas intenta grabar y la aplicación casca. No pasa nada, el grafista pierde 3 horas de su vida, se cabrea y listo. Si hablamos de un software que se ejecuta en un hardware que controla un vehículo, un avión o un sistema donde se hacen transacciones bancarias la cosa cambia. Un error puede matar a una persona que circula en su vehículo y pierde los frenos.  
  
Dada el impacto que puede producir un error en un software de estas características cabe pensar que los desarrolladores de estas aplicaciones estén muy formados y que las pruebas de calidad que pasen sean muy minuciosas.  
  
Hace unos días me llegó una carta certificada de Renault, indicándome que tenía que llevar mi coche a un concesionario oficial para hacerme una reprogramación por peligro de "bloqueo del motor durante su utilización". No creo que después de 50mil kilómetros me vaya a petar el motor, aunque quien sabe. En resumen, me ha cambiado el software que controla la inyección de carburante, que suena importante.  
  
Me imagino que el software de inyección irá en un hardware aparte que el ordenador de a bordo, el cual me estima mi consumo instantáneo, medio, etc. Bien, después de este reinicio ahora el coche no calcula bien el consumo medio, lo que me hace pensar que el software de mi ordenador de a bordo no se ha enterado de la reprogramación del software de inyección y por tanto sigue teniendo "algunos" datos antiguos y algunos otros nuevos. En resumen, mi consumo medio es 0.1 litros/100km (al precio del gasoil es una ganga).  
  
Pero bueno, es un caso muy raro, se puede tolerar, sin embargo hay otro problema que me da más que pensar: 2000 kilómetros antes de cambiar el aceite me avisa y justo cuando llega ese aviso el ordenador curiosamente corrige otro bug, este es de la máquina de estados que controla lo que se muestra en pantalla. Cuando me ha avisado siempre vuelve a la pantalla a la que estaba después de usar el regulador. Cuando pongo el regulador en la pantalla me muestra la velocidad y en su funcionamiento normal se queda fijo, sin embargo, como digo, después del aviso vuelve a mostrarme lo que tenía. Esto me dice dos cosas:  
  
1.- Los que prueban y programan no saben el comportamiento que debe tener, de otra forma se hubiesen dado cuenta de lo que tenía que pasar.  
  
2.- No usan ningún tipo de test y si lo hacen no tienen un informe de cobertura de test. En caso de que lo usaran podría haber detectado rápidamente que el caso de funcionamiento con aviso de ir al taller estaba testeado. Un artículo referente a esto en el [blog de testing de google](http://googletesting.blogspot.com/2008/05/tott-invisible-branch.html).  
  
No quiero ni decir nada acerca de algún que otro código que he visto que controla ciertas transacciones con tarjetas de crédito, ahora me da miedo real pagar con tarjeta de crédito.  
  
Para cuando un coche donde dejen el código fuente abierto y cada uno podamos programarnos nuestro software a medida ? :D Hay gente que hace [hacks](http://www.hackaday.com/2008/05/29/mpgduino-injector-level-fuel-montoring/) (con [arduino](http://arduino.cc/) por cierto), pero no lo veo muy claro  
  
pd: la imagen está tomada de la [wikipedia en inglés](http://en.wikipedia.org/wiki/Integrated_circuit)