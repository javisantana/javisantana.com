---
name: 'Razones para NO usar un IDE'
title: 'Razones para NO usar un IDE'
date: 2010-06-24T19:49:00.004+02:00
layout: post2
published: true
url: /2010/06/razones-para-no-usar-un-ide.html
tags: 
- programación
---

Un IDE, con permiso de la [definición en la wikipedia](http://es.wikipedia.org/wiki/Entorno_de_desarrollo_integrado), no deja de ser un editor de texto y una serie de utilidades que facilitan el trabajo de desarrollo, tales como configuración de los parámetros del compilador, debugger, ayuda en la sintáxis, documentación del lenguaje, etc.  
  
Hace ya cosa de un par de años que no uso un IDE, bueno, uso vim como "IDE" y las razones son las siguientes:  
  
\- Me obliga normalmente a usar el editor que el IDE quiere. Con vim uso siempre, para editar lo que edite, las mismas combinaciones de teclas, misma configuración y en todas las máquinas en las que trabajo solo con llevarme el .vimrc  
  
\- Tiende a añadir complejidad. Los makefiles que se generan, los wizards de código, etc tienden a añadir mucho código que realmente no sabes como funciona y que es difícil de modificar.  
  
\- La ayuda con la sintáxis o el autocomplete. Aunque pueda parecer una maravilla me parece uno de los inventos más perversos. Usé eclipse durante más de un año y medio con java y un día intenté hacer un pequeño programa en el editor de texto y compilarlo con javac... fue imposible, no recordaba nada, cual eran los imports que debía hacer (eclipse lo hace como mágia), nombres de clases, excepciones que debía capturar...  
  
\- Trabajo en máquinas remotas. Muchas veces tienes que editar ficheros o incluso programar en una máquina que solo tienes acceso ssh. Usando vim es transparente el estar en tu máquina o en otra por ssh.  
  
\- Si no lo usas aprendes a manejar las cosas que pasan por debajo. Cuántos habrá que no sepan crear un .jar sin eclipse, como se especifica a gcc una librería o el path donde encontrar las cabeceras... sin contar aquellos que se sorprenden cuando puedes hacer todas esas cosas que hace el IDE pero sin el IDE. Si sabes como crear un .jar puedes estar tranquilo que con el IDE sabrás hacerlo igual de bien.  
  
  
Sé que todo esto que digo suena a programador masoca, pero si de verdad quieres conocer lo que estás haciendo con detalle debes conocer lo que hay por debajo.  
  
Bien es cierto que hay cosas muy útiles, por ejemplo la documentación siempre a mano, pero qué tiene eso que no tenga un man o un pydoc en la consola, una búsqueda en todo el proyecto, aunque no la cambio un [ack-grep](http://betterthangrep.com/)... lo único para lo que no he encontrado algo tan potente como eclipse es para las refactorizaciones... pero los buenos programadores nunca nos confundimos :P