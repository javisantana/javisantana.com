---
name: 'Usando filtrado de señal en videojuegos'
title: 'Usando filtrado de señal en videojuegos'
date: 2006-07-15T20:12:00.000+02:00
layout: post2
published: true
url: /2006/07/usando-filtrado-de-seal-en-videojuegos.html
---

Aviso: frikada  
De las cosas que más me gustan es poder aplicar lo que he aprendido a situaciones para las cuales no estaban aplicadas. Cuando estudias electricidad te enseñan lo que es una resistencia, lo que es un condensador, una bobina, los mezclan en ciucuitos de mil maneras y te muestran las ondas que se producen en cada uno de los elementos.  
  
Por otro lado, en los típicos tutoriales de programación gráfica, en aquellos que te enseñan como recoger desde tu programa las pulsaciones de teclado y aplicarlas a la rotación de un cubo. Para rotar un cubo fuciona bien, pero cuando te pones a aplicarlo al juego de naves que estás programando funciona no demasiado bien, hay discontinuidades y no se parece nada a como funciona en los videojuegos "de verdad".  
  
Y qué tiene que ver una cosa con otra? volviendo al tema de los circuitos, el caso habitual era intriducir en el cirucito una tensión en forma de salto para ver como se comportaba el circuito. En la siguiente figura se muestra el comportamiento para diferentes valores de los componentes (arriba la entrada, abajo la salida):  
  
[![](http://www.innovatia.com/Design_Center/DC_images/image741.gif)](http://www.innovatia.com/Design_Center/DC_images/image741.gif)  
  
([fuente figura](http://www.innovatia.com/Design_Center/Frequency_Response.htm))  
  
Este tipo de filtros se puede aplicar a la entrada de teclado o al movimiento de un objeto para hacerlo más suave.  
  
Por ejemplo, queremos que un objeto se desplace a una velocidad V, lo que se suele hacer es:  
obj->vel = V;  
obj->pos += obj->vel\*delta;  
  
Pero imaginemos que se quiere hacer que acelere suavemente: Se puede, usando un filtro de orden 1:  
  
obj->targetVel = V;  
obj->vel += (obj->targetVel - obj->vel)\*cte;  
obj->pos += obj->vel\*delta;  
  
De forma que si falta mucho para llegar a esa velocidad, lo hará más rápido que si falta poco para llegar. Este sería el caso "overdamped response" de la figura. La constante es un factor que indica la velocidad con la cual llegará a la velocidad deseada o en otras palabras, indica la frecuencia de corte del filtro.  
  
Pero la cosa no queda ahí, imaginemos una nave que va a cierta altura del suelo, pilla un obstáculo, se levanta y después cae lentamente y pega unos cuantos botes más antes de estabilizarse. En este caso podemos usar un filtro de orden 2 con la coordenada Z (la que indica la altura) de la nave. En musicdsp.org se pueden conseguir montones de filtros de orden 2, en este caso he [tomado el siguiente](http://www.musicdsp.org/archive.php?classid=3#29):  
  
float zfilter(float in)  
{  
static float buf0 = 0.0f;  
static float buf1 = 0.0f;  
const float fb = 2.0f;  
const float f = 0.1f;  
buf0 = buf0 + f \* (in - buf0 + fb \* (buf0 - buf1));  
buf1 = buf1 + f \* (buf0 - buf1);  
return buf1;  
}  
  
basta con hacer:  
  
obj->targetzpos = TerrainHeight(obj->pos) + 3.0; //va a una altura de 3 metros sobre el suelo  
obj->pos.z = zfilter(obj->targetzpos);  
  
Variando los parámetros del filtro se puede hacer que responda más rápido a las variaciones o que oscile más. Ojo porque para ciertos valores puede hacer que la salida sea inestable.  
  
  
Conclusión, es posible usar los filtros para filtrar una entrada de salto, como es presionar una teclar o hacer que los movimientos de un objeto sean más suaves y solo aplicando unas ecuaciones muy simples.