---
name: 'Diccionario RAE con python'
title: 'Diccionario RAE con python'
date: 2005-05-10T23:32:00.000+02:00
layout: post2
published: true
url: /2005/05/diccionario-rae-con-python.html
---

Este post es solo para enseñar lo que es un lenguaje de verdad a [alguien que yo me sé :)](http://aloriel.no-ip.org/)  
```
C:\\temp>rae.py barruntar  
barruntar  
\-> Prever, conjeturar o presentir por alguna se├▒al o indicio.  
  
C:\\temp>type rae.py  
import re;  
import sys;  
import urllib;  
if(len(sys.argv) > 1):  
      s =re.compile("<span class=\\"eAcep\\">(.\*?)</span>");  
      rm = re.compile("<.\*?>(.\*?)<.\*?>");  
      l = urllib.urlopen("http://buscon.rae.es/draeI/SrvltGUIBusUsual?TIPO\_BUS=1&LEMA=%s" % sys.argv\[1\]).read();  
      g = s.findall(l)  
      if(g):  
              print sys.argv\[1\]  
              for i in g:  
                       print "->"+ rm.sub(lambda x:x.group(1),i);  
  
  
C:\\temp>  

```  
  
  
Falla el character enconding, pero en 3 minutos no me da tiempo a mirar la documentación (realmente tampoco me interesa :P). Siempre se ha dicho que parsear HTML con regexp es un asesinato, pero ahí esta.  
a dormir