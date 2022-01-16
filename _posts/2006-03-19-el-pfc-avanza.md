---
name: 'El PFC avanza'
title: 'El PFC avanza'
date: 2006-03-19T12:16:00.000+01:00
layout: post2
published: true
url: /2006/03/el-pfc-avanza.html
---

Ahora mismo estoy documentando el diseño de clases que he usado para la aplicación y necesitaba generar los diagramas UML para ir explicando el tema. Es cierto que lo lógico hubiera sido partir de los diagramas UML y después generar el código, pero mi nivel personal no ha llegado aún al de empezar por el diseño en papel y seguir por el editor de código. Habitualmente siempre hago un pequeño diagrama de bloques donde más o menos indico qué y cómo, pero nunca hasta el nivel de detalle que exigiría UML.  
  
Gracias a [doxygen](http://www.stack.nl/~dimitri/doxygen/) es posible generar diagramas la mar de chulos de la aplicación... bueno, debería decir gracias a doxygen y a [graphviz](http://www.graphviz.org/). Basta con indicarle el path de graphviz a doxygen en el fichero de configuración y genera unos gráficos bastante interesantes. De por si la herramienta tiene cosas que habrá que ver si se le puede sacar más partido porque promete. Como ejemplo de grafo que genera pongo el que ha generado de la parte de la aplicación que renderiza en el PFC.  
![](http://static.flickr.com/46/114559373_6c03ed5cc0_b.jpg)  
  
Por cierto, doxygen ya soporta python!