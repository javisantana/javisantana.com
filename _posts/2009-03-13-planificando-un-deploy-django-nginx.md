---
name: 'Planificando un deploy (django + nginx)'
title: 'Planificando un deploy (django + nginx)'
date: 2009-03-13T14:03:00.003+01:00
layout: post2
published: true
url: /2009/03/planificando-un-deploy-django-nginx.html
tags: 
- deploy
- django
- programación
- python
---

Si algo he aprendido a lo largo de mi corta vida como perfil mixto entre desarrollador web y adminitrador de sistemas es que los deploys sí importan. Ahora mismo tengo una aplicación web en django y mis requisitos para el deploy son los siguientes (lo cierto es que servirían para cualquier aplicación web):  
  
\- Hacer el setup del servidor en un solo paso  
\- Poder tener la aplicación en el servidor funcionando con un solo comando  
\- Poder volver a una versión anterior en cualquier momento  
  
Simples de describir, pero complicados de llevar a cabo.  
  
Hay 3 cosas que tengo que tener en cuenta en la configuración:  
\- el servidor web  
\- la aplicación  
\- la base de datos  
  
Por mi parte he elegido nginx como servidor web ya que soporta fastcgi y parece ligero, para la aplicación uso django y como base de datos mysql. La elección no se basa nada más que en mi experiencia, no quiero entrar en el juego de que es mejor o peor.  
  
Para el deploy estoy usando [fabric](http://www.nongnu.org/fab/), un sistema que permite en 3 puntos:  
\- ejecutar comandos en local  
\- ejecutar comandos en un server remoto  
\- subir y bajar ficheros  
  
Y todo con sintaxis python :), con lo cual puede además usar todo el api de python.  
  
El layout de carpetas es el siguiente:  
  
 - /srv/agroguia/  
   - versions  
       - 0  
          - timestamp  
          - ....  
          - last (enlace simbólico a la última versión subida de esta versión)  
       - 1  
       - ...  
    - current (enlace simbólico a la carpeta dentro de versions/X/timestamp)  
  
  
El servidor web está dividio en dos rutas:  
\- la parte estática que apunta a current/assets. De momento el peso de los assets es muy bajo (<1M), puedo permitirme el tenerlos replicados.  
\- la parte dinámica que usa fastcgi contra un socket unix que se crea al levantar django.  
  
Y por qué dividir la aplicación en versiones y dentro de cada una en timestamp (en realidad timestamp + hash de la revisión del sistema de control de versiones). Cada versión tiene un esquema de base de datos y una base de datos diferente dentro de mysql, de forma que todas las versiones de la aplicación dentro de esa carpeta pueden usar la misma base de datos sin problemas de integridades ni nada por el estilo. Similar a este sistema de versiones y timestamps lo usa el sistema de deploy de google app engine.  
  
Del mismo modo, cada vez que cambie el esquema de la base de datos, se creará una carpeta nueva, se llamará al comando de creación de base de datos de django (manage.py syncdb) y luego llamaré a la migración (manual, django aún no soporta migraciones al estilo rails, una pena) que usará los datos de la versión anterior.  
  
Si en cualquier momento quiero volver a una versión anterior puedo símplemente cambiar el enlace simbólico de current y levantar de nuevo el servidor. Incluso si quiero tener una versión en producción y una para desarrollar basta con que levante un servidor de desarrollo en otro puerto diferente al 80 (google en este caso lo hace con subdominios, pero yo no soy tan guay)  
  
Otro detalle importante es la posibilidad de hacer un setup del sistema desde 0. Me baso en un servidor ubuntu, así que tengo unos cuantos targets que instalan dependencias (mercurial, nginx...), módulos python con [pip](http://pypi.python.org/pypi/pip) (el reemplazo de easy\_install), carpetas, usuarios y permisos varios.