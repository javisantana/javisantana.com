---
name: 'Tus fotos en flickr'
title: 'Tus fotos en flickr'
date: 2006-02-23T19:08:00.000+01:00
layout: post2
published: true
url: /2006/02/tus-fotos-en-flickr.html
---

Me gusta tener siempre una carpeta con shots de las cosas que veo y me van gustando, de alguna demo, de una web o de el avance de un programa creado por mi. La verdad es que me gustaría tenerlas en flickr para poner una pequeña tira en el blog, pero es un verdadero tostón hacerlo a mano... hasta hoy, gracias a [libgmail](http://libgmail.sourceforge.net/) he creado un script en python que sube las fotos que haya en una carpeta que tu le indiques. Además mantiene una base de datos con las fotos enviadas para que no haya repeticiones.  
  
El mecanismo es simple, busca los nuevos ficheros y gracias a la cuenta gmail que \_debes\_ tener manda a flickr gracias a la [posibilidad de enviar por mail](http://www.flickr.com/account/uploadbyemail/). Es un script muy simple, lo puedes encontrar [aquí](http://qualopec.googlepages.com/subiraflickr) (gracias a google [pagecreator](http://pages.google.com/)).  
  
La configuración es simple:  
  
path\_to\_shots = "C:\\\\path\\\\a\\\\tus\\\\shots" <- aquí la carpeta donde están las capturas  
mail\_to = "tu\_correo\_flickr@photos.flickr.com"; <- la dirección que te asigna flickr para enviar fotos  
  
  
account\_user = "tu\_correo@gmail.com" #esta claro no?  
account\_pass = "tu\_pass" #está también claro no?  
  
Y por supuesto bajarte libgmail y poner los ficheros lgconstants.py y libgmail.py en el mismo directorio del script :).  
  
Cierto es que hay [herramientas para hacerlo de format simple](http://www.flickr.com/tools/), pero como las comida de casa no hay ninguna.