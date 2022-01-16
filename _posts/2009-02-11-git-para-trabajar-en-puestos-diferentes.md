---
name: 'Git para trabajar en puestos diferentes'
title: 'Git para trabajar en puestos diferentes'
date: 2009-02-11T21:05:00.003+01:00
layout: post2
published: true
url: /2009/02/git-para-trabajar-en-puestos-diferentes.html
tags: 
- programacion
- git
---

Sea por la razón que sea hace unas semanas comencé a usar git. Realmente no sabía si era una gilipollez más de los programadores Rails o de verdad es tan útil y pragmático como algunas de las herrameintas que usan.  
  
Como soy un hombre de los que quedan pocos, lo instalé y comencé a llevar mi aplicación web para mi nuevo proyecto-negocio con git, al principio un poco contrariado debido al cambio que hay de subversion (centralizado) a git (distribuído), sin embargo pronto esa confusión se tornó en sorpresas (y para bien!):  
  
\- No necesitaba tener ningún servidor, cosa que se agradece, puedo montar mi repositorio en cualquier sitio sin ningún proceso funcionando. Hace ya unos años explicaba como [montar un pequeño server svn](http://blep.blogspot.com/2006/02/usa-subversion-por-favor.html), ahora eso ya no sirve para nada.  
  
\- Basta con copiar la carpeta ya tienes todo el repositorio en otro sitio ya que el propio repositorio va dentro de la típica carpeta .git.  
  
\- Si quiero tenerlo centralizado no tengo que tener nada especial, con un demonio ssh ya lo tienes.  
  
Y para qué lo uso. Aparte de para llevar la [trazabilidad](http://blep.blogspot.com/2008/02/partes-de-un-negocio-la-trazabilidad.html) adecuadamente, me permite compartir el trabajo de un puesto a otro. A lo largo del día trabajo a veces hasta en 3 máquinas diferentes, algunas sin conexión a internet, así que puedo llevarme mi trabajo en el pincho USB. Cómo funciona?  
  
para empezar se crea un repositorio y se añade el código  
#git init .  
#git add \*  
#git commit -a -m "fist commit"  
  
Imaginemos que voy a otro lado y quiero hacer unos cambios, clono el repositorio y trabajo allí:  
  
#cd /media/disk  
#git clone /home/javi/repo/project  
  
ahora trabajo sobre ese repositorio, puedo crear ramas, "comitear", "revertear" (ojo con los comandos que no son iguales que svn) y toda la parafernalia que puedes hacer en svn, git o cual quiera que sea tu sistema preferido.  
  
Cuando llegas a casa de nuevo símplemente mezclas los cambios  
  
#cd /home/javi/repo/project  
#git pull /media/disk/project  
  
los cambios se mezclan como si tal cosa. Así de fácil.  
  
De momento no he jugado demasiado con las ramas, seguramente por mi malísima experiencia en svn con las ramas y posteriores merges (todos los conocemos). Todo se andará.