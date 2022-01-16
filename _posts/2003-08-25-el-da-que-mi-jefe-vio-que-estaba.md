---
name: 'undefined'
title: 'undefined'
date: 2003-08-25T11:46:00.000+02:00
layout: post2
published: true
url: /2003/08/el-da-que-mi-jefe-vio-que-estaba.html
---

El día que mi jefe vio que estaba pasando de usar visual basic y empezando a usar python el me preguntó si podría hacer lo que estaba programando en visual basic para poder ejecutar la aplicacion en access. Yo le dije que para programar lo que había hecho en visual basic me tiraría unas 10 veces más - con python encontré librerías y recursos rápidamente en la red -. Pensé algunas soluciones y creo que la más acertada es COM. He estado mirando los ejemplos que traen las [extensiones para win32 de python](http://starship.python.net/crew/mhammond/win32/) y es simplísimo crear tanto una clase en python y registrarla para poderla usar usando COM - [servidor](http://www.python.org/windows/win32com/QuickStartServerCom.html) - como poder usar objetos - [cliente](http://www.python.org/windows/win32com/QuickStartClientCom.html) -.  
  
Mi siguiente pregunta fue: ¿puedo crear una dll al igual que hice un ejecutable con [py2exe](http://py2exe.sf.net) en la cual no tenga que tener instalado python y todas las dependencias? - estoy obsesionado con que la gente de mi empresa tenga que instalar lo minimo y el adminitrador no tenga que romperse la cabeza-. Mirando la documentación de py2exe vi una opción - --com-dll - que parece ser que me puede servir, aunque después de probarla, fallar debido a que necesita la versión 2.3 de python, instalarme python2.3, fallar de nuevo y intentar buscar el fallo he desistido hasta encontrar algo mñás de información. He posteado en la [lista de python en español](http://listas.aditel.org/listinfo/python-es) - llevo poco tiempo suscrito pero hay un ambiente muy bueno y mucha información interesante- espero que alguien sepa ayudarme o tenga alguna idea.  
  
De momento me conformare con tener las clases - para acceder con COM - en un .py :D  
  
besos ;\*\*\*\*