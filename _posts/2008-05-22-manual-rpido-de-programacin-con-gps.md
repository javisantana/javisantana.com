---
name: 'Manual rápido de programación con GPS'
title: 'Manual rápido de programación con GPS'
date: 2008-05-22T20:53:00.004+02:00
layout: post2
published: true
url: /2008/05/manual-rpido-de-programacin-con-gps.html
tags: 
- programacion
- GPS
---

Hace tiempo que tenía ganas de poner un post de este tipo, así que vamos allá. Pongamos que no sabes lo que es GPS y quieres hacer una aplicación que necesite saber donde estás, estás en el sitio correcto, voy a tratar de enumerar lo que necesitas saber de forma clara y concisa:  
  
\- Qué es [GPS](http://es.wikipedia.org/wiki/DGPS): es un sistema que permite saber en qué posición del globo estás situado  
\- En qué se basa: Hay una serie de satélites orbitando que emiten señales, el receptor las interpreta y gracias a triangulación determina tu posición  
\- Necesito saber triangular: no, el receptor hace todo por tí, olvida a doppler, trigonometría, etc :)  
\- qué información da el GPS: te da la posición gracias a la latitud y longitud, esto es, lo hace en [coordenadas polares](http://es.wikipedia.org/wiki/Coordenadas_polares). Además el GPS da mucho más información...  
\- Cómo me da la información el GPS: usa [NMEA](http://es.wikipedia.org/wiki/NMEA), un protocolo de texto separado por comas donde viene la información bien clarita.  
\- Cómo recojo la información del GPS: pues normalmente a través de puerto serie... "pero mi receptor GPS es bluetooth", no te preocupes, tu bluetooth se comportará como un [puerto serie](http://es.wikipedia.org/wiki/Puerto_serie).  
\- Cómo uso la información desde mi aplicación: abres el puerto y vas leyendo linea a linea los datos NMEA, extraes la información y la usas, por ejemplo, para poner un punto en un mapa.  
\- Las coordenadas polares no son útiles para mi: lógico, estamos acostumbrados a trabajar en [coordenadas cartesianas](http://es.wikipedia.org/wiki/Coordenadas_cartesianas) (el plano XY de toda la vida). [Alguien](http://es.wikipedia.org/wiki/Gerardus_Mercator) ya pensó en eso e inventó UTM, que no es más que un sistema para proyectar latitud y longitud a nuestro querido plano castesiano. En resumen, al final tendremos X e Y y con eso es muy fácil empezar a trabajar  
  
\- Ya, dicho así es fácil, pero cómo lo hago en la realidad?. Lo primero es tener un GPS, [por ejemplo](http://www.activagps.com/GPS-Cable_25.htm) , como mi pc no tiene puerto serie uso un [conversor USB->serie](http://www.activagps.com/_Adaptador-USB-PS2-Hembra_235.htm). De esta forma ya puedo acceder al GPS... cómo? pues con python y los siguientes pasos:  
  
\- [instalo python](http://www.python.org/download/)  
\- instalo [Python for Windows](http://downloads.sourceforge.net/pywin32/pywin32-210.win32-py2.5.exe?modtime=1159009392&big_mirror=0) extensions si estoy en windows  
\- instalo [pyserial](http://pyserial.sourceforge.net/) que nos da acceso al pueto serie.  
\- instalo [pygps](http://pygps.org): este hará el trabajo de interpretar NMEA y proyectar a UTM por nosotros  
  
\- abro el editor y programo:  
  
  
import serial;  
from threading import Thread;  
from NMEA import NMEA;  
from LatLongUTMconversion import LLtoUTM;  
  
**class** GPSPosition(Thread):  
    **def** \_\_init\_\_(self, callback):  
        Thread.\_\_init\_\_(self);  
        #serial conf  
        s = serial.Serial()  
        s.baudrate = 4800  
        s.port = "COM1"   
        s.open();  
        self.serial = s  
        self.nmea = NMEA();  
        self.callback = callback  
        self.\_run = 1;  
        self.start();  
  
    **def** end(self):  
        self.\_run = 0;  
    **def** run(self):          
        **while** self.\_run:  
            nmea\_data = self.serial.readline();  
            self.nmea.handle\_line(nmea\_data);  
            zone, easting, northing = LLtoUTM(23, self.nmea.lat, self.nmea.lon)  
            self.pos = (easting, northing);  
            self.callback(self.nmea.lat,  self.nmea.lon, self.pos, self.nmea.mode > 0);  
  
**if** \_\_name\_\_ == '\_\_main\_\_':  
    **def** position(lat, lon, pos, valid\_pos):  
        **if**(valid\_pos):  
            **print** "current position", pos, "lat: ", lat, " lon:", lon;  
        **else**:  
            **print** "invalid position  
    
    gps = GPSPosition(position);  
      
  
  
ejecuto:  

>   
> C:\\temp>c:\\Python25\\python gps.py  
> invalid position  
> invalid position  
> current position: 314418.53, 4575413.58 lat: 41.31 lon: -5.22  
> current position: 314418.53, 4575413.58 lat: 41.31 lon: -5.22  
> current position: 314418.80, 4575413.20 lat: 41.31 lon: -5.22  

  
  
\- qué es posición inválida? Pues resulta que un GPS no sabe su posición nada más conectarse, necesita un tiempo (que depende de muchas cosas) para tener una posición válida.  
\- Lo hago y no me funciona: sal a la calle porque en casa el GPS no es capaz de coger señal de satélite dentro de casa!!  
\- No me da bien la posición: Lo habitual son 10 metros de error como mucho, normalmente está entre los 2 o 3 metros.  
\- Lo hago pero me oscilan las posiciones: en GPS es bueno pero milagros no hace.  
  
Fin, espero no haberme dejado nada.