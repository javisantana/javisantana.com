---
name: 'undefined'
title: 'undefined'
date: 2003-08-21T08:01:00.000+02:00
layout: post2
published: true
url: /2003/08/despus-de-terminar-este-trabajillo-me.html
---

Después de terminar este trabajillo, me decidí buscar el fallo que me daba el boa-constructor al ejecutar. La verdad es que no tuve mucho trabajo, sólamente ir a su web y descargarme a última versión, parece que no era el único que había tenido ese problema. No lo he mirado mucho, pero creo que merece la pena usarlo :D.  
  
Otro detalle importante es la posibilidad de crear un ejecutable sin ninguna dependencia con python por aquello de no asustar a la gente con intérpretes u otro tipo de librerías o módulos. He usado py2exe - [http://py2exe.sf.net](http://py2exe.sf.net) - en combinación con upx -[http://upx.sf.net](http://upx.sf.net)\- ( por aquello del tamaño de los ejecutables y dependencias ). La primera impresión no es mala, tarda más en ejecutar que si lo hacemos con el propio intérprete y consume gran cantidad de memoria, pero se sigue ejecutando más rápido que el equivalente en visual basic. Además encontré el problema de que ciertas partes del código no funcionan (concretamente el manejo del clipboard) si no hago una aplicación que tenga consola, no importa, pero molesta y queda poco profesional, veré como puedo solucionarlo.  
  
He encontrado un post de los típicos que arremolinan a coders fanáticos, esta vez macros aunque alguno se ha confundido con el conscurso anual aquel de ofuscar código (¿alguien recuerda la web?, tal vez google). Aquí está la dirección:  
  
[http://www.gamedev.net/community/forums/topic.asp?topic\_id=175850](http://www.gamedev.net/community/forums/topic.asp?topic_id=175850)