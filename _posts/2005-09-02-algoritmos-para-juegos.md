---
name: 'Algoritmos para juegos'
title: 'Algoritmos para juegos'
date: 2005-09-02T23:50:00.000+02:00
layout: post2
published: true
url: /2005/09/algoritmos-para-juegos.html
---

En el juego que estoy preparando para art futura me encuentro con algunos problemas, unos derivados de la propia dinámica del juego y otros en los que me meto yo solito, sin ayuda ni nada ¿eh?.  
  
El primero de mis problemas es el de la cámara. El juego es de lucha, no es la lucha convencional, pero es lucha, y como lucha necesita de almenos un par de entidades dándose cera. Hay momentos en los que las entidades se separan en el escenario y lógicamente la cámara no puede perder de vista a ninguna de ellas. Como me decían un gran porcentaje de profesores durante mi etapa académica todo está inventado, y tratando de ser un buen alumno he pensado en que juego de los que he jugado en mi larga vida de friki juegalo-todo. Dándole vueltas he recordado el tekken, algún mortal kombat, uno que tenía "espada" en su nombre que salió por aquellos maravillosos años de PSX (sí, la "uno")... pero qué mejor ejemplo que una obra maestra de la jugabilidad como el mario 64?. Hay momentos en los que mario se enfrenta a bichos enormes en unos rings improvisados, en la lava, en el suelo o en lo alto de una montaña. Ni corto ni perezoso he arrancado mi emulador, mi rom del mario 64 (tengo que decir que tengo la N64 y el juego original, no incurro en ningún delito ni falta, nisiquiera moral XD) y me he ido a una de las primeras pantallas donde te das bien de cera con una gran bola explosiva, me he dado caña con él y lo he grabado todo en video para anañizar los movimientos de la cámara en función de la posición de los dos, mario y la pelota gorda.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/shot.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/shot.jpg)  
El algoritmo es bastante simple, busca el punto medio entre las dos entidades y aleja o acerca la cámara una cantidad proporcinal a la distancia, siempre y cuando los dos elementos estén en pantalla, jústamente lo que había pensado. Un buen planteamiento de la cámara sería mirar el frustrum, esto es, el espacio de visión de la ésta y calcular la distancia justa para que las entidades estuvieran en pantalla, pero haciendo algunas pruebas, basta con poner una constante a ojo y funciona muy bien :)  
El código, simple y claro XD:  
p1 = vec3(self.\_target1Pos.getPos()) ;  
p2 = vec3(self.\_target2Pos.getPos());  
diff = p2-p1;  
dir = (self.\_pos.getPos() - vec3(self.\_target) ).normalize()  
self.\_target = p1+ 0.5\*diff;  
sep = 4 + 2\*diff.length();  
self.\_target = p1 +0.5\*(p2-p1);  
pos = self.\_target + dir\*sep;  
  
El segundo "fregao" en el que me he metido ha sido en el de la repeticion de las mejores jugadas. Para ello puse un [post en stratos](http://www.stratos-ad.com/forums/index.php?act=ST&f=8&t=5164&st=0) para ver cómo se las ingeniaba la gente para guardar replays. Mi idea era la de guardar los valores de las pulsaciones de teclado, idea que pensando un poco es ciertamente descabellada, pero que después de implementarlo no ha funcionado tan mal en mi PC, posiblemente a causa de la regularidad del tiempo de frame. Hasta el mismo Jare ha respondido aportando una información cuanto menos interesante.  
  
Hasta aquí la pollada del día, a seguir codeando.