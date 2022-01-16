---
name: 'Intro 4kb finalizada'
title: 'Intro 4kb finalizada'
date: 2005-07-24T16:26:00.000+02:00
layout: post2
published: true
url: /2005/07/intro-4kb-finalizada.html
---

Por fin terminé la 4kb que "tenía" que presentar a la euskal party. Digo tenía porque era algo personal después de haber estado haciendo cosas con el synth e investigar un poco como meter todo en 4kb.  
  
Ayer tenía todo terminado salvo la timeline, esto es, la secuencia de imágenes que quería mostrar y en que orden. Empecé usando los típicos if's:  
  
if( Gtime < 40){ camara\_1(); }  
if( Gtime < 30) { camara\_2(); }  
  
sin embargo rápidamente me pasé de los 4kb, no sé porque, pero me pasaba. Con este problea y unos 4300 bytes en el .bat final decidí implementar un sistema que me permitira indicar la posición inicial de la cámara, el avance y la posición a donde miraba. Finalmente he usado el siguiente sistema:  
  
_  
struct CamKey  
{  
float time;  
short ini\[3\];  
short fin\[3\];  
char dir\[3\];  
}  
camkeys \[\]=  
{  
{0.0f ,{0,100,50},{200,200,100},{-40,0,30}},  
{5.3f ,{300,400,300},{300,-400,270},{40,0,0}},  
{10.6f ,{400,-400,150},{700,800,150},{40,50,10}},  
{16.48f,{-500,-500,100},{0,0,0},{20,0,0}},  
{17.9f ,{800,800,300},{0,0,0},{-40,0,0}},  
....  
};  
  
for(i=0;i {  
struct CamKey\* p = &camkeys\[i\];  
if(p->time < Gtime)  
{  
pos\[0\] = p->ini\[0\] + Gtime \* p->dir\[0\];  
pos\[1\] = p->ini\[1\] + Gtime \* p->dir\[1\];  
pos\[2\] = p->ini\[2\] + Gtime \* p->dir\[2\];  
dest\[0\] = p->fin\[0\];  
dest\[1\] = p->fin\[1\];  
dest\[2\] = p->fin\[2\];  
}  
}  
  
  
gluLookAt(pos\[0\],pos\[1\],pos\[2\],dest\[0\],dest\[1\],dest\[2\],0,0,1);_  
  
que seguramente no sea el mejor sistema, pero que ha resultado ser efectivo.  
Después de terminar el timeline (a ver si puedo subir la hoja de papel escaneada donde lo he diseñado) he retocado algunas cosas para intentar dejarlo un poco más vistoso y poco más.  
  
  
Ahora mismo estoy esperando el feedback del músico (Wonder) para ver si debo cambiar algo y hacer la versión final que debemos presentar antes de hoy a las 19:30 de la tarde.  
  
Estoy contento por haber terminado la 4kb, sólamente hay un punto que no estoy demasiado contento, y lo peor es que no me afecta a mi únicamente , si no a Wonder, ya que la música que va en la 4kb es una prueba que me envió y por falta de tiempo y sobretodo de previsión por mi parte, no ha podido hacer una canción del nivel que habitualmente suele hacer. Espero que me sepa disculpar y poder hacer una buena 4kb para la próxima party :).