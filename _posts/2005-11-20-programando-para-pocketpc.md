---
name: 'Programando para PocketPC'
title: 'Programando para PocketPC'
date: 2005-11-20T20:52:00.000+01:00
layout: post2
published: true
url: /2005/11/programando-para-pocketpc.html
---

En el PFC tengo que programar una aplicación para pocketPC. Nunca me había planteado hacer nada para sistemas móviles, ya sea teléfonos o PDA's, entre otras cosas porque no pintaba muy bien el panorama con J2ME a la cabeza. Cuando mi tutor, Jaime Gómez, puso encima de la mesa un proyecto para pocketPC no lo pensé dos veces (no sabía donde me metía) y me lancé. Bueno, en realidad me gustó porque el proyecto trataba sobre cosas que he visto desde pequeño y tengo curiosidad por saber si todo lo que he aprendido puede servir para este campo, la agricultura.  
  
Lo primero que hice fue buscar las herramientas de desarrollo, esto es, un compilador para ARM. Da la casualidad que MS tiene un conjunto de compilador+IDE muy parecido a VC++6.0 que a priori parecía interesante. Digo a priori porque he estado parado 2 días a cuenta de un bug al usar optimización Od cuando compilas en release. Además de este, se unen otros problemas, como las petadas estúpidas del IDE, los fallos de conexión entre el compilador y el emulador y la PDA, los BUGS de generador de código de MFC, etc. Ahora mismo lo valoro con un 7, aunque si no fuera por esos problemas lo podría poner un 10.  
  
Por otro lado, en el PFC tengo que renderizar datos sobre el estado del trabajo del agricultor, unos 200 rectágulos como mucho. Lo primer que me propuse es evitar el tener que usar el método de pillar un puntero a la memoria de video y comenzar a programar algortimos de relleno de polígonos, estaba seguro de que habría librerías más que suficientes como para andar pensando en esas tonterías, lo cual es lógico dada la facilidad de portar código de PC a PPC. Pues resulta que las librerías que hay, aparte de GDI, son todas muy simples, orientadas a sprite, y de no demasiada calidad. Viendo el panorama opté por GDI que tiene funciones para rellenar polígonos y supuse que no tendría problema. Está claro que suponiendo no soy el mejor porque entre problemas de leaks por mi parte y otros por parte del compilador era inviable usar GDI, al cabo de 30 minutos de ejecución el PPC me decía "no more" y cascaba.  
  
Menos mal que recordé a FFelagund, creador de [typhoonlabs](http://www.typhoonlabs.com), que cierto día me comentó que estaba usando OpenglES, una implementación de Opengl para dispositivos móviles. En realidad ya me había acordado antes, pero supuse (otra vez) que un PPC sin aceleración por HW podría ser una tortuga, ya había programado cosas simples con OpenGL en mi viejo PC sin aceleradora y era un infierno. Después de comentarselo me dijo que probara, que el había renderizado escenas con 8000 polis y que el problema real era manejar texturas. Me bajé la implementación de Vicent de sourceforge, compilé unos de los tutos de FFelagund que tiene en la página, y ¡voila!, funcionó muchísimo mejor que lo que en mis tiempos más optimistas hubiera creído.  
  
  
Tardé 10 minutos en portar mi código gracias a que yo había hecho un interfaz clavado al que aporta opengl y lo probé. Ahora mismo la aplicación lleva una hora y media funcionando y no ha dado ningún síntoma de desfallecimiento. Una verdadera gozada, tengo que probar más a fondo OpenglES.  
  
Lo que realmente me mola es que podré hacer la típica visión de navgeador GPS, esto es, cenital y luego la 3D, que para los que no hayais visto un navegador en funcioanmiento, es una cámara desde atrás del vehículo. Y lo mejor, todo ello cambiando únicamente la posición de la cámara y e vector view, esto es, 2 simples parámetros. Dejando volar la imaginación, creo que puedo modelar un tractorcillo en 3D con unos cuantos polis y tener una visión mucho más real, incluso podría modelar los diferentes aperos !! o la altitud del terreno con los datos de altitud que me proporciona el GPS.  
  
PD. vaya éxito ha tenido mi foto del post anterior XD