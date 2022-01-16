---
name: 'Testing con datetime en python'
title: 'Testing con datetime en python'
date: 2010-06-09T20:59:00.003+02:00
layout: post2
published: true
url: /2010/06/testing-con-datetime-en-python.html
tags: 
- programacion
- python
---

Este es un pequeño "truco" para testear métodos o funciones que usen [datetime.now](http://docs.python.org/library/datetime.html). Se podrían usar trucos aprovechando que python es un lenguaje muy dinámico, pero siempre que se pueda hacer explícito y simple, para qué complicarnos?  
  
```
  
def method(param1, param2, now=None):   
    now = now or datetime.now()  
    # do something with now  
    pass  

```  
  
En el uso normal la llamaremos normalmente, pero en el test podremos pasarle un datetime concreto para testear.