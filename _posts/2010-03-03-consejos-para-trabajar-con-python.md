---
name: 'Consejos para trabajar con python'
title: 'Consejos para trabajar con python'
date: 2010-03-03T16:33:00.003+01:00
layout: post2
published: true
url: /2010/03/consejos-para-trabajar-con-python.html
tags: 
- programacion
- python
---

Cada lenguaje tiene sus herramientas, su forma de trabajar, sus reglas de estilo, etc... aparte cada uno tenemos nuestros pequeños trucos y reglas para trabajar lo más ordenado posible. Por ello voy a dar una serie de consejos que he ido aprendiendo a medida que he ido programando en python que espero puedan ser de utilidad a otras personas que así lo hagan.  
  
\- Sigue las reglas de python. Para conocerlas basta con que ejecutes python -c "import this" en la consola. No son específicas python, creo que sirven para cualquier lenguaje, muy recomendable "lectura".  
  
\- Trata de seguir las recomendaciones de la guía de estilo del [PEP-008](http://www.python.org/dev/peps/pep-0008/) (Style Guide for Python Code). Los PEP (Python Enhancement Proposals) son documentos que se redactan y siguen cuando se implementa una nueva característica.  
  
\- Aprovecha la potencia del lenguaje. Si sabes ruby o similar sabrás de lo que hablo, los que vienen de java, C, C++ están acostumbrados a lenguajes más bien estáticos, se usa poco la metaprogramación. Python tiene cosas muy interesantes, por ejemplo las [list comprehesions](http://docs.python.org/tutorial/datastructures.html#list-comprehensions) que agilizan mucho el desarrollo. Siempre con mucho cuidado de no pasarse (la gente de ruby me entenderá). Por ejemplo, la gente que viene de java suele escribir interfaces y luego heredar para a implementación. En python directamente usa [duck typing](http://es.wikipedia.org/wiki/Duck_typing).  
  
\- Cuidado con los imports. Salvo que sepas lo que haces trata de no hacer "from module import \*". Primero porque si lo haces posiblemente es que no sepas ni lo que quieres usar, segundo porque puede ser una fuente de bugs importante. Es mejor hacer "from module import MyClass, MyClass2". A mi me gusta primero poner los imports de la librería estandard y después lo propios de la aplicación, pero es algo personal.  
  
\- Unicode: siempre especifica la codificación del fichero, en el [pep-0263](http://www.python.org/dev/peps/pep-0263/) tienes toda la información, pero el resumen es, pon la siguiente cabecera:  

>   
> #!/usr/bin/python  
> \# -\*- coding: \-\*-  

  
Si no lo haces tarde o temprano tendrás alguna excepción al ejecutar tu código por haber puesto caracteres fuera del ascii. Además, trata de entender como qué es unicode, como [se hace para usarlo en python](http://www.amk.ca/python/howto/unicode).  
  
\- Excepciones. No captures una excepción y no hagas nada. La gente que programa en java lo puede hacer (y de hecho lo hace), pero si eres un hombre de bien haz algo. Captura la excepción que corresponde, esto es, si esperas un socket.error no pongas un except que recoja a troche y moche, solo captura esa excepción.  
  
\- Las doctest son una verdadera virguería para documentar a la vez que testear. No en todos los sitios se pueden usar, pero por ejemplo si al comienzo de un módulo pones una explicación usando doctest mejorará bastante, por ejemplo:  
  

>   
> """  
> Este módulo sirve para sumar 3 números usando la función add3.  
> Un ejemplo de uso es:  
> \>>> add3(1,2,3)  
> 6  
> """"  
> def add3(....  

  
  
Luego desde la consola puedes hacer:  

>   
> python -m doctest modulo.py  

  
  
y ver si algo casca. Más información de [doctest y ejemplos](http://docs.python.org/library/doctest.html). Además luego hay el módulo unittest, hay frameworks para stubs y mocks, helpers para facilitar los test como [nose](http://somethingaboutorange.com/mrl/projects/nose/0.11.1/) y [pytest](http://codespeak.net/py/dist/test/), todo lo necesario para estar a la última moda del TDD.  
  
\- usa la consola. Unas de las cosas más útiles es que tienes la consola siempre a mano para probar cosillas. La mayoría de las veces no me acuerdo como hacer algo, en la consola lo pruebas instantaneamente. Recomiendo usar [ipython](http://ipython.scipy.org/moin/), que viene ser igual que la consola original python, pero con facilidades para acceder a la documentación, autocompletado, etc.  
  
\- Usar [pip](http://pypi.python.org/pypi/pip) o easy\_install. Es similar a gem en ruby, lo que hace es instalar módulos de terceros desde internet con un solo comando. Esto es fundamental y agiliza el desarrollo muchísimo. Para buscar el software usa [Python Package Index](http://pypi.python.org/pypi) donde tú mismo puedes subir tus paquetes. De hecho el paquete de la librería standard para empaquetar módulos lo sube automáticamente con un comando. Prefiero pip a easy\_install porque pip está construído con más lógica (tiene uninstall) y más características que cuento dos puntos más abajo.  
  
\- Haz pequeños módulos y empaqueta. Empaquetar es súmamente sencillo, con hacer un fichero setup.py con pocos parámetros tienes el empaquetado hecho. Aparte de los benficios que tiene separar las aplicaciones en modulos, tiene otros muy interesantes. El módulo que se usa para estas cosas es distutils, donda hay un [ejemplo de setup.py](http://docs.python.org/distutils/introduction.html#a-simple-example) muy sencillo.  
  
\- Usa pip. Sí, es repetido, pero pongamos que tienes el caso que has separado tu aplicación en varios módulos que tienes en un repositorio. Desarrollas una aplicación que los necesita, pip te va a ayudar a resolver este problema ya que puede instalar módulos directamente del repositorio (siemre que tengan su setup.py), por ejemplo:  
  

>   
> pip install svn+https://mirepo/project/module#egg=module  

  
  
Todos los paquetes necesarios se pueden poner en un fichero requirements.txt que todas las aplicaciones tengan.  
  
\- virtualenv. Herramienta fundamental, permite aislar entornos de ejecución. Puedes crear tantos entornos como quieras, cada uno con una versión de python diferente, cada uno con sus librerías. Esta herramienta es, repito, fundamental. Yo lo uso junto a [virtualenvwrapper](http://pypi.python.org/pypi/virtualenvwrapper) que simplifica la creación y gestión de entornos. Además junto con pip hacen el combo perfecto. Por ejemplo, para tener un entorno de trabajo funcionando basta con hacer:  
  

>   
> pip install -E env -r requirements.txt  

  
pip creará un entorno nuevo, e instalará todo los especificado en el fichero requirements.txt, bajándose lo necesario. Luego basta con activar el entorno y a trabajar:  
  

>   
> . ./env/bin/activate  

  
  
\- Aprender a usar el debugger, pdb. Sé que ya no mola hacer debug en la línea de comando, que eclipse te lo da todo mascadito, pero si estás en un servidor remoto es útil cuando solo tienes ssh y vim :).  
  
\- Usa el log. Python tiene un módulo llamado logging, úsalo, luego se puede configurar para redireccionar a un fichero, al syslog, a stdout. Tiene las típicas error, info, debug... pero lo importante es que lo uses.  
  
En general, cuando no sé la mejor forma de hacer algo, suelo ir al código de la librería standard y mirar paquetes que suelo usar.