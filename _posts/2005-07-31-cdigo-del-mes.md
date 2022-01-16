---
name: 'código del mes'
title: 'código del mes'
date: 2005-07-31T12:42:00.000+02:00
layout: post2
published: true
url: /2005/07/cdigo-del-mes.html
---

En el [juego que estamos preparando para art-futura05](http://rumboartfutura.blogspot.com/) tenemos que hacer un editor para que el usuario se construya sus propios objetos. El juego está fuertemente orientado al 3D, con lo cual el editor tiene que dar un interface sencillo pero que permita controlar perfectamente las 3 dimensiones. Lógicamente el objeto se construye en base a otros más simples que el usuario debe colocar. Aquí es cuando viene el problema, hay que diseñar un sistema que permita que el usuario con el ratón seleccione en su pantalla (un entorno 2D) un objeto que está en un entorno 3D. Para ello OpenGL aporta un mecanismo llamado picking, que dándole las coordenadas del ratón (x,y) te retorna el objeto que se ha pinchado. Dicho así resulta simple, pero tiene algunos escollos que conviene salvar antes de hacer algo decente.  
  
Para resolver el problema he creado una pequeña clase, que, aunque es muy simple, ayuda bastante:  
  
```
  
class Picking:  
 def \_\_init\_\_(self):  
  pass;  
  self.\_buf = 1024\*\[1\];  
    
 def Init(self, cursor):  
  
  #viewport = \[0,0,0,0\];  
  self.\_buf = glSelectBuffer(1024);  
    
  glRenderMode(GL\_SELECT);  
  
  glMatrixMode(GL\_PROJECTION);  
  glPushMatrix();  
  glLoadIdentity();  
   
  viewport = glGetInteger(GL\_VIEWPORT);  
  gluPickMatrix(cursor\[0\],viewport\[3\]-cursor\[1\],  
   1,1,viewport);  
    
  gluPerspective(45,1.3333,0.2,200);  
  glMatrixMode(GL\_MODELVIEW);  
  glInitNames();  
 def Push(self,i):  
  glPushName(i);  
 def Pop(self):  
  glPopName();  
  
 def End(self):  
  glMatrixMode(GL\_PROJECTION);  
  glPopMatrix();  
  glMatrixMode(GL\_MODELVIEW);  
  glFlush();  
   
  return  glRenderMode(GL\_RENDER);  

```  
  
De esta forma le das las coordenadas del ratón, renderizas indicando los identificadores de los objetos y al terminar te retorna lo que has pinchado.  
  
Lo paradójico del tema es que mirando después la documentación de pyopengl me doy cuenta que en GL\_\_init\_\_.py hay un wrapper muy parecido a este, pero que en vez de usar una clase, usa una función con un callback, que será la función de render.  
  
En fins.. :\_)