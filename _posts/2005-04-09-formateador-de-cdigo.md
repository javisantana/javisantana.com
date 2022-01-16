---
name: 'Formateador de código'
title: 'Formateador de código'
date: 2005-04-09T23:24:00.000+02:00
layout: post2
published: true
url: /2005/04/formateador-de-cdigo.html
---

En un post de hace tres días comenté que me vengaría del formato del código que puse. Por casualidad visitando el weblog de Sencillo encontré [un artículo sobre formateo de código]( http://www.aleamb.net/?post=37). Con este código, un par de herramientas (CPP2HTML y python2html) he creado un script que exporta un código formateado y con sintaxis coloreada (de momento python y C++, mis dos amores, bueno... sin contar a mi novia XD ). Como muestra que mejor que el programa origen:  
  
  

  
  

```
  
    
  html = """  
  <table class="ContenedorCodigo">  
   <tr>  
    <td class="Codigo">  
      <div class="Embalaje">  
        <table class="FondoCode">  
          <tr>  
            <td class="Codigo">  
              <pre>  
               %s  
              </pre>  
            </td>  
          </tr>  
        </table>  
 </div>   
     </td>  
   </tr>  
  </table>  
    
  """;  
    
  css = """<style type="text/css">  
    
  .ContenedorCodigo  
  {  
  table-layout: fixed;  
  width: 90%;  
  padding: 0px;  
  }  
    
  .Embalaje  
  {  
  width: 100%;  
 overflow: auto;   
  }  
    
  .FondoCode  
  {  
  border: 1px solid black;  
  background-color: #efefef;  
  width: 100%;  
  padding: 7px;  
  }  
    
  .Codigo  
  {  
  width: 100%;  
  }  
    
  </style>  
  """  
  import sys;  
  import os;  
    
  def CPP(file):  
  os.popen("c:\\\\bin\\\\formats\\\\cpp2html.exe %s" % file);  
  lines = open(file +".html","r").readlines();  
  css\_cpp = """<style type="text/css">""" + open("c:\\\\bin\\\\formats\\\\cpp.css").read() + "</style>";  
  lines\[0\] = "<pre>";  
  lines\[-1\] = "<pre>";  
  return css\_cpp + "".join(lines);  
     
    
  def Python(file):  
  os.popen("c:\\\\bin\\\\formats\\\\python2html.1.py %s" % file);  
  return open(file +".html","r").read();  
    
    
    
    
  class Format:  
  def \_\_init\_\_(self,formats):  
   """ \["py",fn\];  
  """  
   self.\_formats = {};  
   for x in formats:  
    self.\_formats\[x\[0\]\] = x\[1\];  
      
  def get\_ext(self,file):  
   try:  
    return file.split(".")\[1\];  
   except:  
    return "";  
    
    
  def Do(self,fich):  
   code = \[\];  
   for x in fich:  
    ext = self.get\_ext(x);  
    if(self.\_formats.has\_key(ext)):  
     code.append(self.\_formats\[ext\](x));  
   c = open("code.txt.html","w");  
   c.write(css);  
   for x in code:  
    c.write(html % x);  
   c.close();  
      
    
    
    
  formats = \[("py",Python), ("cpp",CPP), ("h",CPP),("c",CPP)\];  
    
  if \_\_name\_\_ == "\_\_main\_\_":  
  if(len(sys.argv) < 2):  
   sys.exit();  
    
  f = Format(formats);  
    
  f.Do(sys.argv\[1:\]);  
    
  
```  
  
  

  

  

  
  
un saludo  
  
PD: después de tener problemas con blogger ya que añade unos cuantos br's "by the face", gracias a la ayuda de Sencillo y un poco de ñapeo he consiguido que quede decentillo. Trataré de mejorarlo.