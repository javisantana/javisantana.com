---
name: 'Qué no hacer al diseñar software'
title: 'Qué no hacer al diseñar software'
date: 2006-08-13T13:04:00.000+02:00
layout: post2
published: true
url: /2006/08/qu-no-hacer-al-disear-software.html
---

Recientemente he descubierto el [blog de mig21](http://yapw.blogspot.com/) y uno de los títulos de las entradas me llamó la atención: ["el auge y la caída de CORBA"](http://yapw.blogspot.com/2006/06/el-auge-y-la-cada-de-corba-y-lo-que.html). Cuando en quinto estudiamos [middleware](http://en.wikipedia.org/wiki/Middleware), esa capa utópica en la que sería posible hacerlo todo transparente al programador, nunca fallara, podría ser distribuida y de la que todos los gurús tenían algo que decir, algo me decía que algo tan bueno no podría ser verdad.  
  
A medida que descubres cómo funciona [RPC](http://en.wikipedia.org/wiki/Remote_procedure_call), con su sistema interno y, lo peor, el sistema de programación, te das cuenta que algo así es imposible que llegue a funcionar bien. Es tedioso montar un sistema simple con RPC, no entiendo como pudieron montar algo que funciona tan bien como [NFS](http://en.wikipedia.org/wiki/Network_File_System).  
  
Pero la cosa no queda ahí, porque alguien decidió que también podría hacerse middleware para sistemas orientados a objetos y se le ocurrió [CORBA](http://en.wikipedia.org/wiki/CORBA) que era aún mejor que RPC y todo lo conocido porque abarcaba absolutamente todo: todos los lenguajes, todas las posibilidades. Asombrado me quedé cuando vi que había empresas, como telefónica i+d, que lo usan. Cómo podría alguien usar algo tan sumamente enrevesado y complejo?  
  
Por eso no me sorprende nada ver como CORBA muere y mucho más viendo las razones de sentido común pero tan dificiles de llevar a la práctica que enumera [mig21 en el post](http://yapw.blogspot.com/2006/06/el-auge-y-la-cada-de-corba-y-lo-que.html) que paso a copiar aquí:  
  
"""  
1 Los consorcios de estandarización necesitan reglas sólidas para estandarizar las mejores prácticas  
2 Ningún estándar debería aprobarse sin una implementación de referencia  
3 Ningún estándar debería aprobarse sin haber sido usado para en algunos proyectos de complejidad realista  
4 El software libre/abierto tiene procesos de selección darwiniana y por ello se adapta mejor a las reglas anteriores  
5 Para crear un software de calidad, la habilidad para decir "no" es más importante que la de decir "si"  
"""  
  
Las más importantes para mi, la 2 y la 3 que son la misma y la 5. Las primeras porque cualquier que haya hecho algo en su vida sabe que los toros desde la barrera se ven bien y la última porque la perfección es imposible.  
  
Está claro, yo aún no he visto ninguna tecnología basada en algo fantástico como son los componentes o los WS que funcione. Sin embargo, cosas simples como AJAX están hasta en la sopa.