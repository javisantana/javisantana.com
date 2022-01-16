---
name: 'Filtro paso bajo con python'
title: 'Filtro paso bajo con python'
date: 2009-04-27T22:03:00.003+02:00
layout: post2
published: true
url: /2009/04/filtro-paso-bajo-con-python.html
tags: 
- python
---

Es muy común tener un señal con mucho ruido, si es de un GPS más aún y normalmente interesa que los movimientos sean suaves. Bien sabido es que con un filtro paso bajo podemos atenuar el ruido y hacer que todo sea suave y maravilloso.  
  
Si además no tenemos que filtrar al vuelo, esto es, tenemos ya toda la señal bien guardadita en un array, es posible usar el truco de teleco viejo, utilizar la fft. ¿Cómo? pues símplemente haciendo la transformada discreta de la señal, quitando los armónicos más altos y haciendo la transformada inversa.  
  
Aquí el código, todo gracias a numpy :)  
  
from numpy import fft  
  
def low\_pass\_filter(x, samples = 20):  
  """ fft based brute force low pass filter """  
   a = fft.rfft(x)  
   tot = len(a)  
   for x in xrange(tot-samples):  
   a\[samples + x\] = 0.0  
   return fft.irfft(a)  
  
  
El código seguro que es mejorable, numpy tiene métodos para trabajar con arrays de forma eficiente, etc, pero funciona a las mil maravillas y permite un control bastante lógico, cuantos más samples de la fft no sean 0, mayor será la variación de la señal. Para que luego digan que lo que se aprende en la carrera no sirve de nada...