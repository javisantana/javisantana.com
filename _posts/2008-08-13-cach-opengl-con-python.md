---
name: 'Caché Opengl con Python'
title: 'Caché Opengl con Python'
date: 2008-08-13T23:09:00.003+02:00
layout: post2
published: true
url: /2008/08/cach-opengl-con-python.html
tags: 
- programacion
- opengl
- python
---

Los [decorators en python](http://www.python.org/dev/peps/pep-0318/) son tremendamente útiles, cada día veo cosas más interesantes creadas con decoratos. Últimamente sobretodo relacionadas con Django (me imagino que por su pronta 1.0), para temas de cachés.  
  
Como python es bastante más lento que C++, cuando renderizo geometría estático con python la máquina tiende a morirse donde con c++ iría suavemente. Lo habitual en OpenGL es usar listas precompiladas para optimizar geometría estática, una especie de caché que deja en gpu los datos a renderizar.  
  
tenemos el siguiente método:  
  

>   
> def draw\_complex\_geometry():  
> glBegin(GL\_QUADS);  
> for x in vertex:  
> ....  
> glEnd();  

  
  
Nada impide hacer el siguiente decorator:  
  
**def** list\_compiler(fn):  
    fn.\_\_gl\_compiled = -1;  
    **def** render():  
        **if**(fn.\_\_gl\_compiled < 0):  
            fn.\_\_gl\_compiled = glGenLists(1);  
            glNewList(fn.\_\_gl\_compiled,GL\_COMPILE);  
            fn();  
            glEndList();  
        **else**:  
            glCallList(fn.\_\_gl\_compiled);  
    **return** render;  
  
de esta forma decoramos el método:  
@list\_compiler  
def draw\_complex\_geometry()...  
  
De forma que la primera vez que se llame compilará ls lista opengl y las siguientes veces símplemente llamará a la geometría "cacheada"