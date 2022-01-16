---
name: 'Más pruebas: envmap + fresnel + proctex'
title: 'Más pruebas: envmap + fresnel + proctex'
date: 2006-06-29T11:38:00.000+02:00
layout: post2
published: true
url: /2006/06/ms-pruebas-envmap-fresnel-proctex.html
---

En estos días de relax no he tocado demasiado este mini-motor/mini-banco-de-pruebas, pero esta mañana que no tengo demasiado que hacer he incluído un shader de envmap con fresnel para ver qué tal quedaba. Si alguien no tiene claro qué es, no es difícil, el envmap se basa en usar la normal de la malla para buscar en una textura el texel adecuado. Lógicamente la normal se mapea a 2D para poder tener los UV de toda la vida. En cuanto a fresnel es, a grandes rasgos, la atenuación de la luz reflejada (o refractada) al incidir sobre un objeto. Se ve muy bien como afecta en [este tutorial de blender](http://mediawiki.blender.org/index.php/Manual.es/PartIII/Reflections_and_Transparencies) (las imágenes de abajo). Aunque si eres teleco (JAJA), con tus conocimientos de transmisión de ondas EM por FO puedes entretenerte mirando [una solución algo más formal](http://physics.nad.ru/Physics/English/rays_txt.htm). La aproximación que uso es una que [encontré en este foro](http://www.aqsis.org/xoops/modules/newbb/viewtopic.php?topic_id=1316) un poco retocada.  
  
Envmap sin fresnel:  
  

![](http://static.flickr.com/48/177603733_eefbdd59fe.jpg)

  
  
Envmap con fresnel:  
  

![](http://static.flickr.com/66/177603734_d55cb19504.jpg)

  
  
  
La textura que hace las veces de entorno es una textura procedural que simula un piso de azulejos que he hecho con otros propósitos:  
  
La primera aproximación:  
  

![](http://static.flickr.com/64/177598928_328f63eb3b.jpg)

  
  
Un poco de color:  
  

![](http://static.flickr.com/49/177598929_4e6d24e344.jpg)

  
  
  
Un poco de perlin de fondo para dar "realismo":  
  

![](http://static.flickr.com/52/177598930_963e57ecd5.jpg)

  
  
En la textura guardo el mapa de alturas en el canal alpha para luego hacer bumpmap o generar el normal map en un futuro.  
  
  
El código que genera la textura es el siguiente:  

  
GEN\_BEGIN(Test6)  
PIXEL()  
{  
float step = 1.666f;  
float width = 0.2;  
float mult = 10;  
float xx = mult\*float(s)/256.0;  
float yy = mult\*float(t)/256.0;  
float n ;  
float n3 = TilePerlinNoise2D(xx,yy,6,mult,1.1);  
float n2;  
float lim = 0.1;  
  
n = mod(step,xx);  
  
float width2 = 1.0-width + width/2.0;  
n = smoothstep(1.0-width,width2,n) - smoothstep(width2,1.0f,n);  
  
n2 = mod(step,yy);  
n2 = smoothstep(1.0-width,width2,n2) - smoothstep(width2,1.0,n2);  
float f = clamp(0,1,n+n2); //smoothstep(0.9,1,0.5\*n+0.5\*n2);  
//n3 = 0;  
float bump = f;  
f = 0.7\*f + 0.3\*fabs(n3);//\*(1-f);  
  
  
int e = int((xx+width/2.0)/step) + int((yy+width/2.0)/step);  
//e = 2;  
switch(e%3)  
{  
case 0:  
c = RGBA(98,174,115);break;  
case 1:  
c = RGBA(252,249,141);break;  
case 2:  
c = RGBA(255,255,255);break;  
}  
  
c = (1.0-f)\*c;  
c\[3\] = bump\*255;  
  
  
  
}  
  
GEN\_END(Test6)  
  

  
  
  
y las macros que generan la clase que después será instanciada por el manager de texturas:  
  
#define GEN\_BEGIN(name) class Texture##name: public GenTexture { public: ~Texture##name(){if(DEBUG\_TEX) this->Write(#name##".tga"); } Texture##name(int \_x,int \_y):GenTexture(\_x,\_y){ format = T\_RGBA;  
  
  
#define INIT() Setup(); } void Setup(){  
  
#define PIXEL() /\*Gen();\*/} RGBA& PixelFunc(int s,int t) { static RGBA c; float x = -1.0 + 2.0\*(float)s/(float)TextureData::x; float y = -1.0 + 2.0\*(float)t/(float)TextureData::y; /\*polares\*/ Vector2f v(x,y); float r = vectorDist(v); float phi= atan2((float)y,(float)x);  
  
#define GEN\_END(name) return c;} Palete paleta;};