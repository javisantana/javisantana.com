---
name: 'Compartiendo datos entre python y C++'
title: 'Compartiendo datos entre python y C++'
date: 2006-11-27T21:15:00.000+01:00
layout: post2
published: true
url: /2006/11/compartiendo-datos-entre-python-y-c.html
tags: 
- programación
- python
---

Es muy babitual usar python como herramienta para labores anexas a otras, por ejemplo para extraer datos de un fichero de texto, hacer tareas previas la compilación y multitud de cosas. De esta forma podemos aprovechar la capacidad de tratar texto u otros datos de python (y su amplia librería) para dejarselo fácil a la aplicación en C++. Y qué significa dejarselo fácil? pues en pocas palabras en dejarle un fichero que podamos leer directamente a estructuras y que no tengamos que parsear ficheros de texto.  
  
Para ello python provee un módulo cojonudo, struct. Con él en dos líneas podemos guardar datos que posteriormente podemos leer en python, por ejemplo.  
  
\- python  
open("fichero.bin","wb").write(struct.pack('3f2f',x,y,z,u,v));  
  
\- C++  
struct vertex  
{  
  float x,y,z;  
   float u,v;  
};  
  
vertex v;  
FILE\* f = fopen("fichero.bin","rb");  
if(f)  
  fread(&v,1,sizeof(vertex),f);  
  
Con este módulo podemos hacer, por ejemplo, un exportador de geometría en python para Blender en cosa de segundos:  
  
scn= Blender.Scene.GetCurrent()  
object= scn.getActiveObject()  
mesh = BPyMesh.getMeshFromObject(object, None, True, False, scn)  
file = open(filename, 'wb')  
file.write(pack('i',len(mesh.faces));  
for f in mesh.faces:  
   for v in f.v:  
      file.write(pack('3f',v.co\[0\],v.co\[1\],v.co\[2\]);