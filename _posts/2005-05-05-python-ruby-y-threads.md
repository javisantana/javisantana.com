---
name: 'Python, Ruby y threads'
title: 'Python, Ruby y threads'
date: 2005-05-05T18:13:00.000+02:00
layout: post2
published: true
url: /2005/05/python-ruby-y-threads.html
---

Estaba ayer terminando de portar uno de los wizards de configuración de red de [soleupix](http://soleup.eup.uva.es/mediawiki/index.php/Estado_soleupix). El código en cuestión lanza un thread para hacer unas llamadas a la shell para ejecutar los comandos necesarios para configurar la red. El problema surge al portar el código en Ruby (usa GTK pero es caso a parte, digno de unos miles de post) a python, concretamente los threads y los callbacks son la parte más compleja ya que Ruby implementa una especie de delegates. En un primer momento pensé en hacerlo con lambda, pero dada la complejidad de las funciones opté por implementarlo con funciones normales (según escribo esto creo que será mejor hacerlo con funciones locales). Resumiendo, en ruby para crear el thread se hace más o menos así:  
```
  
 thread = Thread.new do  
        # cleanup first  
        system("/sbin/pump -k -i \\"#{Global.device}\\"")  
 ...  
         
 end  

```  
  
Yo lo traduje a python de la siguiente forma:  
```
  
 th =thread.start\_new\_thread(self.Thread\_func,(self,None)); #hack   

```  
  
Pero no ejecutaba la función que le especificaba. Pensé los argumentos podrían estar mal y probé unas cosas en un fichero de pruebas:  
```
  
  
  
from threading import Thread;  
import thread;  
  
class B:  
   
 def \_\_init\_\_(self,name):  
  self.\_th = Thread(target = self.Func);  
  self.\_name = name;  
  self.\_th.run();  
 def Func(self):  
  print "aqui otro thread (%s)" % self.\_name  
    
class C:  
   
 def \_\_init\_\_(self,name):  
  self.\_th = thread.start\_new\_thread(self.Func,());  
  self.\_name = name;  
 def Func(self):  
  print "aqui otro thread (%s)" % self.\_name;  
  
  
def fn(data):  
 print data;  
c = thread.start\_new\_thread(fn,("holax",));   
  
C("2");  
B("3");  
  
  
  

```  
La clase B funciona correctamente (de hecho así lanzo ahora el thread), sin embargo la clase C no funciona y es precisamente porque usa la función _start\_new\_thread_ del módulo _thread_. Un poco más abajo uso esta función para lanzar un thread, pero ahora es una función que no pertenece a una clase, y en este caso funciona correctamente. En la documentación de python2.4 no dice nada acerca de cómo usar la función _start\_new\_thread_ y mucho menos su uso en clases, tendré que googlear un poco para ver qué pasa, aunque mi instinto me dice que puede ser por el parámetro self que debería pasarle y no le paso, sin embargo en este caso lanzaría una excepción.  
  
PD: lamento el formateo pero blogger parece que no se lleva nada bien con el HTML embebido  
PD2: viendolo desde blogger quedaba mal formateado, pero desde [Planet AUG-CYL](http://soleup.eup.uva.es/planet-augcyl/)(hola a todos por cierto:) es prácticamente ilegible, así que he optado por eliminar el code y poner un italic y un pre (mis conocimientos de HTML no dan para más).