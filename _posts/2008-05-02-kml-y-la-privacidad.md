---
name: 'KML y la privacidad'
title: 'KML y la privacidad'
date: 2008-05-02T21:38:00.005+02:00
layout: post2
published: true
url: /2008/05/kml-y-la-privacidad.html
tags: 
- kml
- programacion
---

Este post pretender ser dos cosas: primero un pequeño manual de como hacer un servidor de KML con python y [cherrypy](http://www.cherrypy.org/) y segundo demostrar qué se puede hacer para recibir feedback indiscriminado usando lo anterior.  
  
Conocimientos previos:  
\- cherrypy es un API que permite implementar una aplicación web en dos patadas  
\- [KML](http://code.google.com/apis/kml/documentation/) es un formato usando principalmente por Google Earth que sirve como contenedor de información geográfica, puntos de interés, etc, etc  
  
KML no deja de ser un xml (\*sic\*) en el cual cabe de todo puntos, líneas, elementos 3D, animaciones y lo que nos interesa, conexiones a un servidor para obtener datos enumrados anteriormente. De esta forma es posible indicarle en un enlace que vaya a un servidor a buscar datos. Hay un pequeño pero efectivo [tutorial](http://code.google.com/apis/kml/documentation/kml_tut.html#network_links) en la página del api de google earth.  
  
Tomando ese ejemplo creamos el servidor con cherrypy:  
  
import cherrypy  
  
**class** Root:  
**def** get\_kml(self, latitude, longitude):  
kml = (  
'<?xml version="1.0" encoding="UTF-8"?>\\n'  
'<kml xmlns="[http://earth.google.com/kml/2.2](http://earth.google.com/kml/2.2)">\\n'  
'<Placemark>\\n'  
'<name>Random Placemark</name>\\n'  
'<Point>\\n'  
'<coordinates>%f,%f</coordinates>\\n'  
'</Point>\\n'  
'</Placemark>\\n'  
'</kml>'  
) %(longitude, latitude)  
**return** kml  
  
**def** index(self, directory="."):  
cherrypy.response.headers\["Content-Type"\] = "application/vnd.google-earth.kml+xml"  
**return** self.get\_kml(-3.332565,42.600353);  
  
index.exposed = True  
  
**if** \_\_name\_\_ == '\_\_main\_\_':  
root = Root()  
cherrypy.quickstart(root);  
  
  
El tema web no me va, pero estaba interesado en saber como va este tema en python. Me da la impresión que aún está por detrás de Ruby. He estado mirando [turbogears](http://turbogears.org/) y la verdad me ha gustado.  
  
En el tutorial ponen un ejemplo de KML que se conecta a un servidor, podríamos cambiar la sentencia Link por lo siguiente:  
  
<link>  
<href>http://localhost:8080/</href>  
</link>  
  
De esta forma al cargar ese fichero en google earth se conectaría al servidor y bajaría kml.  
  
Ahora la segunda parte: qué pasa si ese kml es generado por una aplicación y el usuario lo carga en su google earth. Pongamos, por ejemplo, un software de guiado para maquinaria agrícola, en el cual después de haber trabajado se puede guardar ese trabajo a KML para poder verlo más tarde en el PC. Pongamos que ese software escribe algo así dentro del fichero kml:  

>   
> <link>  
> <href>http://servidor.com/?license\_no=1234&lat=-3.332565&lon=42.600353</href>  
> </link>  

  
  
Gracias al número de licencia conoces al usuario y con latitud y longitud conoces la localización de sus parcelas. Eso por no hablar que con unos pocos bytes se puede enviar \_de todo\_. Tiene su parte mala, pero también su parte buena, se le pueden dar bastantes usos.  
  
Por cierto, y no digo que tenga algo que ver, ya he implementado el writer para kml de agroguía :):  
  
[![](http://4.bp.blogspot.com/_XzuP3e63Ok8/SBt0iTmt08I/AAAAAAAAA3s/BklMrhhdG28/s320/_bis.png)](http://4.bp.blogspot.com/_XzuP3e63Ok8/SBt0iTmt08I/AAAAAAAAA3s/BklMrhhdG28/s1600-h/_bis.png)