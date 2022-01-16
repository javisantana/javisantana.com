---
name: 'undefined'
title: 'undefined'
date: 2003-08-04T09:03:00.000+02:00
layout: post2
published: true
url: /2003/08/bien-una-vez-solucionados-los.html
---

Bien, una vez solucionados los problemas técnicos con el maldito blog lo lógico sería decir porque cojones me pongo a escribir esta basura. En principio lo hago debido a la cantidad de tiempo libre que genera mi trabajo y la segunda es para plasmar mis inquietudes y mis avances en lo que voy programando. Si por casualidad lees esto y te interesa el desarrollo me puedes encontrar como ethernet en el [foro de stratos](http://www.stratos-ad.com/forums).  
  
Actualmente en mis ratos libres de mi tiempo libre estoy programando un sistema de red. Qué pollas es esto? En realidad es un conjunto de clases para facilitar la transmisión de datos a través de internet o cualquer otra red que trabaje sobre IP. El sistema está testeado en principio para win32 aunque es fácilmente portable cambiando la capa más baja del API. El sistema tiene desarrollado en la actualidad lo siguiente:  
  
\- Capa para el control de sockets  
\- Diseño del sistema de conexiones  
\- Herramientas para el control de buffers, muy útiles debido a que todo el sistema se basa en el pattern serialize.