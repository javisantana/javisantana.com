---
name: 'Una historia de ventanas rotas'
title: 'Una historia de ventanas rotas'
date: 2010-05-30T17:54:00.003+02:00
layout: post2
published: true
url: /2010/05/una-historia-de-ventanas-rotas.html
tags: 
- programacion
---

Sí, otra historia, y esta es de las que no tiene final feliz.  
  
Las [ventanas rotas](http://www.joangarnet.com/blog/?p=457) en programación se pueden explicar con una variación del sabio refrán español:  
  

> No dejes para mañana lo que puedes hacer pasado mañana

  
  
Estás tirando unas líneas de código, ves que hay un problema, lo das unas vueltas, te pones a otra cosa y cuando te das cuenta el problema no está. Lo siguiente es un:  
  

> De puta madre -piensas- marrón que me quito de encima, soy un hacha, resuelvo sin querer

  
  
  
Total, que sabes que has dejado un error y además estás [programado por coincidencia](http://pragprog.com/the-pragmatic-programmer/extracts/coincidence).  
  
Pero los programadores somos muy orgullosos, así que buscamos una solución rápida:  
  
\- seguro que era una gilipollez  
\- la informática es así, a veces a los ordenadores les da por hacer "cosas raras"  
\- habrá sido "el driver"  
\- seguro que ha sido un pete de la base de datos  
\- le ha pasado a Jose el comercial, no tiene ni puta idea y lo habrá jodido  
\- eso ha sido porque estoy en debug  
\- eso ha sido porque estoy en release  
  
Total, pasa el tiempo y un día estás programando algo que nada tiene que ver y el pete vuelve. Tú sabes que aquello volvería y en el peor momento aparece para joderte.  
  
Bien, como los accidentes de tráfico nunca piensas que algo así te va a pasar a ti, pero siempre llega el día. Hace dos días encontré una ventana rota en agroguía (nuestro sistema de [guiado GPS para la agricultura](http://agroguia.es)) de hace 4 años y medio.  
  
Un error al teclear ha generado cáncer que se ha expandido por toda la aplicación. En el momento de convertir las coordenadas del GPS a cartesianas cometí el error de poner la coordenada Y donde debería estar la X y viceversa. Seguramente fue de lo primero que programé y está al principio de toda la cadena de la aplicación, ya que las posiciones del GPS son la fuente de datos.  
  
En principio es un flip de los ejes, no debería causar problema pero eso ha causado que, sin saber porque, cambié el render del eje X (por tanto todo el render está "flipeado" en el eje X), toda la exportación está cambiada de lado, tuve que hacer ñapas para que el render cuadrase con la realidad... etc.  
  
Ahora he estado integrando un formato de fichero GIS para darle una vuelta más de tuerca al guiado GPS de bajo coste y he tenido que arrastrar todo el fallo para que la cosa funcionase.  
  
Casos como este y otros puedes encontrar en el libro [The Pragmatic Programmer,](http://www.pragprog.com/the-pragmatic-programmer) indispensable para cualquier programador.