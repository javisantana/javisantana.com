---
name: 'Buenas prácticas en el uso de subversion'
title: 'Buenas prácticas en el uso de subversion'
date: 2008-12-15T19:06:00.003+01:00
layout: post2
published: true
url: /2008/12/buenas-prcticas-en-el-uso-de-subversion.html
tags: 
- programacion
- subversion
---

Aparte de saber manejar subversion, conviene saber una serie de normas básicas a seguir que facilitan bastante la vida del programador sobretodo a futuro. El futuro se puede definir como el momento en el que necesitas saber que hiciste pero no te acuerdas :).  
Al grano:  
  
\- Cada commit con su tema: Intenta no mezclar código con ficheros de datos o ficheros de proyecto. Es preferible hacer muchos commits con pocas cosas que ahorrarte medio minuto en no mirar lo que tienes y subirlo todo de una vez.  
  
\- Dios los cría y ellos se juntan. Si una serie de ficheros tienen que ver con un determinado tema, por ejemplo una corrección de bug, súbelos en el mismo commit. Esto es muy útil por si luego quieres mezclar esa revisión a otra rama para corregir el bug.  
  
\- Pon comentario en todos los commits: sobra decir que comentarios del tipo "commit", "subido" no son descriptivos y no ayudan :).  
  
\- Haz TAGS. Tags para todo, cuando envíes una demo, cuando saques una release, cuando termine el año. Los tags son gratis, así que úsalos y meta-etiquetalos bien.  
  
\- Automatiza la creación de tags con cada release. Puedes usar un script parecido a este:  

>   
> import subprocess;  
> SVN = 'svn'  
> SERVER = 'svn://localhost/agroguia/TAGS/'  
> version = open("scripts/instalation/version.txt").read().split(':')\[-1\].strip();  
> cmd = \[SVN, 'copy', '.', SERVER + version , '-m', '"released version '+ version + '"'\];  
> print " ".join(cmd);  
> subprocess.call(cmd);  

  
  
Además, si lo haces así podrás automatizar otras muchas cosas, como por ejemplo obtener los binarios de una release en concreto (con [svn export](http://svnbook.red-bean.com/en/1.0/re10.html)). Puedes usar otras cosas como make, rake o lo que te de la gana.  
  
Son unas pocas normas, aplicables a cualquier sistema de control de versiones, pero si se aplican bien mejoran mucho el uso de subversion.