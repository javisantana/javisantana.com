---
name: 'Usa python por favor'
title: 'Usa python por favor'
date: 2006-02-19T16:12:00.000+01:00
layout: post2
published: true
url: /2006/02/usa-python-por-favor.html
---

En mi serie de artículos sobre "usa %s por favor" % cosa no puedo por menos que exponer por qué una personas de la calle \_debe\_ usar python en el día a día de su relación con su máquina (no hablo de PC, ojo).  
  
Joder, quién no ha querido cambiar un montón de ficheros de una vez, procesaor ficheros de texto, modificar imágenes, capturar imágenes de una webcam, hacer un juego, abrir una hoja de excel y modificarla, hacer una web, [dar de comer a tu gato de forma remota](http://www.linuxjournal.com/article/7403), hacer un sistema distribuído, hacer una aplicación de contabilidad, manejar el puerto paralelo/serie o símplemente que querido librarse de crear la típica tarea que sabes que se puede hacer automáticamente pero que realmente no sabes como o eres demasiado vago para ponerte a programarla.  
  
Todos estas cosas y muchas más las puedes hacer con [python](http://www.python.org/). Para el que no sepa ni de lo que estoy hablando te diré que python es un lenguaje de programación simple y potente y que en no demasiado tiempo te puede permitir hacer cosas que ahora mismo piensas que son imposibles de hacer para tí. Para abrir boca puedes leer la página de [wikipedia sobre python](http://es.wikipedia.org/wiki/Python). Si ya sabes lo que es python, no sé qué haces que no estás usandolo pero ya.  
  
Qué tiene python de bueno:  
  
\- Es simple de usar y de aprender.  
\- Permite hacer desde programas de una línea hasta el infinito.  
\- Permite hacer prácticamente de todo en casi cualquier dispositivo.  
  
Basta con bajarse la última versión para tu SO preferido ([windows](http://www.python.org/ftp/python/2.4.2/python-2.4.2.msi), en linux suele venir con la distribución, [aunque puedes bajarlo y compilarlo tú mismo](http://www.python.org/ftp/python/2.4.2/Python-2.4.2.tar.bz2)) y empezar a echar un vistazo a la documentación, en concreto al tutorial ([inglés](http://www.python.org/doc/2.4.2/tut/tut.html), [español](http://pyspanishdoc.sourceforge.net/tut/tut.html)) y empezar a hacer cosas. Cuando digo cosas no digo el típico printf("hola mundo"), hablo de cosas que pueden resultar útiles. En mi caso lo uso casi siempre para ahorrarme trabajo en la edición de código, extraer datos de cabeceras... por ejemplo, en mi proyecto fin de carrera lo uso para generar un fichero de texto con la simulación de una trayectoria de un tractor en una tierra. Es totalmente posible hacerlo en C/C++ o cualquier otro lenguaje, pero Python ofrece un montón de herramientas, por ejemplo , en este caso me permite manipular las cadenas con facilidad, usar perlin noise (para hacer variar la trazada suavemente), grabarlo a fichero, etc.  
  
Lo que más me gusta de python es que cuando llevas un tiempo usándolo puedes empezar a hacer verdaderas virguerías. Por ejemplo, puedes [capturar imágenes de tu webcam](http://videocapture.sourceforge.net/) y procesarlas y todo esto con poquísimas líneas de código:  
  
_  
from VideoCapture import Device  
  
cam = Device()  
cam.saveSnapshot('image.jpg')  
_  
  
Simple no?, pues con esa extensión y, por ejemplo, PIL ([python image library](http://www.pythonware.com/products/pil/)) puedes crear [listas de las capturas tomadas en pequeñín](http://www.pythonware.com/library/pil/handbook/introduction.htm). Seguro que hay muchísmas cosas que se te puede ocurrir y que fácilmente se pueden hacer con python.  
  
Pero no solo hay esto, puedes hacer juegos con [pygame](http://pygame.org/) (por ejemplo como [este de r3d de rgba](http://www.rgba.org/r3d/molefusion.zip) XDD) o como makefight (pronto noticias), puedes embeberlo para usarlo desde tu aplicación en C++ con las facilidades que da [swig](http://www.swig.org/), puedes usarlo en tu nokia, en tu pocketpc... qué más se puede pedir?.  
  
Como lenguaje se puede decir que tiene un API brutal, que es interpretado, que es orientado a objetos incluídas las facilidades del garbage collector y que prácticamente te obliga a mantener un código limpio. No voy a enumerar algunos de sus problemas para no ensuciar el post :/.  
  
Nada más, solo que visites la [página oficial](http://www.python.org/) de vez en cuando, alguna [página de noticias](http://www.pythonhispano.org/) para saber lo que hay de nuevo o el weblog del [creador](http://www.artima.com/weblogs/index.jsp?blogger=guido)... Ah! y que no dejes de practicar :).  
  
![](http://www.python.org/pics/PythonPowered.gif)