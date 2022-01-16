---
name: 'Por qué QT debería ser más popular'
title: 'Por qué QT debería ser más popular'
date: 2009-11-19T14:53:00.003+01:00
layout: post2
published: true
url: /2009/11/por-que-qt-deberia-ser-mas-popular.html
tags: 
- programacion
---

Llevo trabajando 6 meses con Qt y me estoy preguntado por qué Qt no es mucho más popular de lo que es. Apenas se ve código, fuera de aplicaciones con interfaz gráfico y zulos de talibanes pro-software libre, hecho con Qt.  
  
Voy a enumerar las cosas por las cuales creo que Qt es una librería de muy buena calidad:  
  
\- Completa: tiene api para la mayoría de cosas comunes, no solo hablo de interfaz gráfico, hablo también de manejo de ficheros, threads, procesos... vaya lo típico que puedes necesitar a diario  
  
\- Documentación: Buena documentación, todos los métodos comentados adecuadamente, ejemplos de uso, ejemplos, demos. Todo lo necesario para hacer una aplicación lo puedes encontrar en la documentación que instalas al instalar Qt, no tienes apenas que estar mendigando por foros.  
  
Ya solo con estas dos merece la pena ser usada, pero además tiene:  
  
\- Sistema de build: autotools y familia son realmente penosas de usar. Qt tiene qmake que permite, de forma sencilla y clara crear los ficheros de build. Es posible que no sea tan completo como autotools, pero es que normalmente es lo que necesitas.  
  
\- Integración con Webkit: puedes perfectamente tener todo el interfaz gráfico en html/css/javascript y la parte de controlador y modelo en C++.  
  
\- Sistema de script: tiene un sistema de script similar a javascript que se integra a la perfección con la aplicación. Símple de usar, fácil de comunicar (gracias a las signals y slots) e integrado.  
  
\- Signals/Slots: esto es una extensión de Qt sobre C++, pero es especialmente interesante. Puedes enlazar señales (por ejemplo un click en un botón), con acciones en otro objecto. Es \_extremadamente\_ útil cuando tienes una aplicación multithread ya que puedes hacer paso de mensajes usando esta técnica.  
  
\- Internacionalización: sí amigos, olvidaos para siempre de "char\*". Qt usa QString para todo, lo cual te "fuerza" a olvidarte del ascii y trabajar con unicode. Además tiene herramientas para traducir.  
  
En mi opinión Qt debería ser algo mucho más usado por los programadores C++.  
  
La única pega de Qt es que ahora es propiedad de Nokia y esta está empeñada en hacer que todo vaya en symbian (lo peor que he visto en muchos años), como se puede ver en el [anuncio de la rc 4.6.](http://qt.nokia.com/developer/qt-4.6-preview). Espero que Nokia la mantenga por muchos años.