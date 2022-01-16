---
name: 'asserts en release'
title: 'asserts en release'
date: 2008-07-17T23:08:00.003+02:00
layout: post2
published: true
url: /2008/07/asserts-en-release.html
tags: 
- programacion
- assert
---

Tradicionalmente se ha dicho que los assert deben eliminarse en la compilación para release. La razón es la de siempre, la velocidad. Pongamos que en un bucle hacemos una comprobación:  
  
for(int i = 0; i < len; ++i)  
{  
ASSERT(array\[i\] != NULL);  
array\[i\]->method();  
}  
  
Es cierto que cada vuelta hará la comprobación y eso puede resultar caro computacionalmente (aunque en este caso con la predicción de saltos no habría agujeros en el pipeline para un funcionamiento normal). Este es un ejemplo simple, pero puede complicarse lo que se quiera.  
  
Ahora, si miramos desde otro punto de vista, puede que no resulte tan caro. Si piensas el tiempo que te tiras buscando un error que se podría haber solucionado en poco tiempo viendo el rastro de asserts, seguro que no es tan caro.  
  
Es cierto que en lenguajes como java, python, etc tienes los "stacktraces" que son un buen debugger, pero en C++ no es tan fácil y hay que andar con cuidado, sobretodo con punteros no válidos. Trabajando en un entorno de PC es fácil hacer debug, el entorno de desarrollo de lo pone en bandeja, ya que para cualquier pete enseguida te saca la típica ventana preguntándote si deseas debugear. En entornos como windows ce, donde no avisa al usar un puntero inválido, prácticamente es obligatorio poner unos cuantos asserts al comienzo de cada método.  
  
En resumen, deja los assert en release :)