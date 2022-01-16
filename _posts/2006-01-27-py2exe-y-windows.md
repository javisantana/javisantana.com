---
name: 'py2exe y windows'
title: 'py2exe y windows'
date: 2006-01-27T19:23:00.000+01:00
layout: post2
published: true
url: /2006/01/py2exe-y-windows.html
---

[py2exe](http://www.py2exe.org/) es una utilidad para crear un ejecutable a partir de uno o varios script escritos en python. La ventaja de este sistema es que puedes distribuir tu programa sin necesidad de que la persona que lo use tenga instalado python en su sistema, lo cual, como todos sabemos, es un error que nadie se puede permitir.  
  
Creando el ejecutable final de makefigth (noticias en breve) me ha sido de gran utilidad, pero, como siempre, tiene que habe run problema de última hora que joda la alegría. En este caso se trataba de un error en forma de messagebox cuando cerraba el juego. En él me indicaba que no podía abrir "main.exe.log". Supuse que era un fichero donde iban a parar todos los datos escritos en stdout, aunque mirando el código te das cuenta de que no es stdout, si no stderr.  
  
Bien, para solucionarlo he optado por el camino corto y fácil y que paso a reproducir por si alguno tiene este mismo problema. En Lib\\site-packages\\py2exe hay un archivo llamado boot\_common.py, pues basta con comentar las líneas 49 y 59:  
  
49:#sys.stderr = Stderr()  
...  
59:#sys.stdout = Blackhole()  
  
Por cierto, curioso el nombre de la clase donde redireciona la salida estándar.