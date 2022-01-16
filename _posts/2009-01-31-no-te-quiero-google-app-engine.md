---
name: 'No te quiero "google app engine"'
title: 'No te quiero "google app engine"'
date: 2009-01-31T19:33:00.003+01:00
layout: post2
published: true
url: /2009/01/no-te-quiero-google-app-engine.html
tags: 
- programacion
- google app engine
---

Y no es que no me guste por que me quite todo el trabajo de mantener un servidor en producción, gestionar la base de datos, escalar adecuadamente según lo necesite, tener esos deploys tan extraordinariamente fáciles y rápidos (esto me enamoró)... es simplemente por la política de descarga de MIS datos.  
  
Según google los datos almacenados en su bigtable son del usuario y puede hacer con ellos lo que te de la real gana. Es cierto, los datos se pueden borrar y subir con toda la facilidad del mundo, sin embargo la descarga no es trivial y digamos que no la "facilitan suficientemente". Hace ya tiempo que [plantearon una cuestión en las listas de correo para obtener requisitos para la herramienta de descarga](http://groups.google.com/group/google-appengine/browse_thread/thread/18d246b30e267da4), de esto hace ya 9 meses y nada, hay herramientas para [subir datos](http://code.google.com/intl/es-ES/appengine/articles/bulkload.html), pero para sacar de allí, nada de nada.  
  
Y ojo a la frase del [post del blog oficial de app engine](http://googleappengine.blogspot.com/2008/04/getting-your-data-on-and-off-of-google.html):  
"""  
With Google App Engine, you own all the data in your app. As stated in our terms, you always have the right to get your data out of Google App Engine at any point. We wouldn't have it any other way.  
"""  
  
Y es que me da pena, porque puedes usar parte del API de django - el framework de moda al estilo ruby on rails para python-, incluso me darían igual las limitaciones que imponen en su sistema de base de datos, son prereribles esas limitaciones al infierno que suponen normalmente los deploys y mantenimiento de la infraestructura. Además, las limitaciones casi siempre son mejores que tener vía libre (esto es tema para otro post).  
  
Llevo con una aplicación que corre en google app engine ya unos meses, lo cierto es que ha funcionado muy bien y gracias a ella he podido dar soporte a mis clientes, pero me niego a no poder coger los datos de una forma fácil. Tan difícil es que lo hagan de pago y den un servicio completo de calidad? yo lo pagaría.