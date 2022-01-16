---
name: 'visión de Android desde el punto de vista de desarrollador'
title: 'visión de Android desde el punto de vista de desarrollador'
date: 2007-11-13T19:48:00.000+01:00
layout: post2
published: true
url: /2007/11/visin-de-android-desde-el-punto-de.html
tags: 
- C++
- OpengGL
- C
- Android
- java
---

Después de ver el SDk de Android puedo decir, desde mi punto de vista de desarrollador para móvil (o casi :P) es lo siguiente:  
  
\- google no se ha mojado nada: todo cerrado, ni código fuente de la VM, ni especificación del formato del bytecode ni API para C++. Ya solo esto es muy triste. Creo que hace unas horas era lo más preguntado en el [grupo de android](http://groups.google.com/group/android-developers/topics). Ahora está la fiebre de "Android programmer wanted!!". [Por suerte ya ha gente haciendo hacks para correr aplicaciones compiladas en C](http://groups.google.com/group/android-developers/browse_thread/thread/dffafba924e3a2e6/2fef5502dde9321e#2fef5502dde9321e).  
  
\- todo basado en java: entiendo que hayan tomado este lenguaje porque un mono puede hacerse 5 midlets en media hora, pero tratándose de google me resulta extraño. Seguramente por no hacer cambiar a los desarrolladores para móvil de lenguaje y herramientas. Sinceramente, esperaba C++ con bindings para python.  
  
\- Si funciona puede estar muy bien pero si no funciona se quedará en la misma mierda que J2ME pero encima no soportado por todos los fabricantes. Lo dicho, si tiene éxito lo bueno es que probablemente no caigan en los mismo errores que ya se han comentido con el tema de la fragmentación.  
  
\- No hay ningún móvil soportado... el emulador es muy bonito, pero ya sabemos que son como la noche y el día  
  
\- Por otro lado hay cosas buenas, muy al estilo google, como las diferentes librerías que incorpora, entre ellas OpenGLES (¿quien dijo que OpenGL estaba muerto?), Me alegra ver que han tirado por esta especificación, tengo ya ganas de ver lo que se puede hacer en dispositivos potentes como espero que sean los que corran Android.  
  
PD: sí, la realidad es que java no me gusta nada, me parece un lenguaje que no tiene todo lo bueno de C++ ni todo lo bueno de lenguajes más modernos como python e incluso C#.