---
name: 'Proyecto fin de carrera'
title: 'Proyecto fin de carrera'
date: 2005-10-08T19:26:00.000+02:00
layout: post2
published: true
url: /2005/10/proyecto-fin-de-carrera.html
---

Hace unos meses que ya tengo asignado un PFC, pero hasta estos días no me he puesto en serio con él. El proyecto trata sobre algo que ha estado ligado a mi vida desde que era pequeño, la agricultura. Mis dos abuelos y mi padre han sido agricultores toda su vida y he visto miles de veces sacar el tractor del la "cesoria", ir con el remolque a buscar kilos y kilos de cebada con el sol dandonos en la colleja, llevar los arados de vertedera, el cultivador, la sembradora de girasol, la tolva del mineral... y una larguísima lista de aparejos propios de la labranza. Todos ellos son máquinas, a mi modo de ver, muy rudimentarias y basadas en la experiencia más que en la ciencia, sin embargo hacen su labor. Nunca me había parado a pensar en si con la informática u otras tecnologías se podría mejorar eso, sin embargo al ver la propuesta de proyecto del que he elegido y con las explicaciones de mi tutor me quedé asombrado de la aplicación que tiene la tecnología a la agricultura.  
  
El proyecto trata sobre la creación de una herramienta de guiado para el agricultor en trabajos como abonar o echar fertilizante. Mediante un PocketPC, los datos aportados por un GPS y el software que yo debo crear el agricultor recibe información de la dirección que debe tomar así como del área de parcela ya tratada.  
  
Actualmente me encuentro en la segunda fase, me he documentado y acabo de pasar a la acción y, como no, me encuentro con los primeros problemas. El primero es la petada del GPS que me habían dejado, de un día para otro dejó de darme datos sin ton ni son y así sigue :(. No dejaría de ser un problema menor si no fuera porque el otro GPS que me han dejado no permite otra alimentación que no sea de 12 voltios (la alimentación del mechero de un turismo). Con el que se ha roto podía ir por la calle andando ya que se alimentaba con la batería del PocketPC, pero con este no y esto significaba que no podría hacer pruebas.  
  
Menos mal que he programado bien los interfaces y tengo in interface hacia la informaión del GPS, sin embargo nada me impide implementar ese interface con una clase que lea de otro dispositivo , como no, de un socorrido fichero. Manos a la obra, creo un "recorder", esto es, una clase que grabe en "disco" (en pocket PC decir disco es mucho decir) y la aplico a la clase reader del GPS. Posteriormente coloco el pocketPC y el GPS en mi "peugeot 205 mito diesel" (una joya de coche) y me voy a la plaza de mi pueblo a simular unas cuantas pasadas de tractor abonando. Tras hacer varias pasadas, marcar diferentes puntos en el fichero para tener referencias, ir más rápido, más despacio vuelvo a casa, saco los datos del pocketPC, los paso al emulador de PocketPC, cambio el interface GPS por el interface Fichero y voila, ya tengo una simulación fiel a la realidad.  
  
De esta manera podré probar toda la semana que estoy sin coche sin tener que moverme de casa.  
  
Por último dejo una imagen de la aplicación que he usado para guardar los datos.. :).  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/CEZoom0.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/CEZoom0.jpg)  
  
\* creo que el verdadero término es accesoria, referido a que es una puerta grande por la cual pueden entrar de todo, sin embargo toda la vida lo he llamado cesoria.