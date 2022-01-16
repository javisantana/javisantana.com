---
name: 'Código del día (o del mes :P)'
title: 'Código del día (o del mes :P)'
date: 2005-05-19T14:41:00.000+02:00
layout: post2
published: true
url: /2005/05/cdigo-del-da-o-del-mes-p.html
---

Hace unos días estaba pendiente de los resultados de los [scene awards](http://awards.scene.org/) con las epseranza que Arise (stravaganza) y Paradise (RGBA) ganaran en sus respectivas catergorías (mejor demo y mejor 64k). Para ser algo más parcial decidí bajarme las  
producciones candidatas a la cetegoría 64k (las demos para cuando me ponga una ADSL de tropecientos megas) y entre ellas me gustó especialmente Prophecy de conspiracy que finalmente resultó la ganadora.  
En concreto me gustó un efecto, que no sé como describir, quizas como efeto "película vieja", que aparece en la parte en la que comienza a verse la ciudad después de ver las praderas verdes y las margaritas. Como buen documentador que soy (copiar deliveradamente es plagiar, copiar deliveradamente haciendo referencia es documentar), decidí hace algo similar para la intro 4k que estoy preparando. Supuse que lo que hacía era generar una serie de texturas con ruido no coherente y en la fase de post-render de la escena superponer la serie con un quad de toda  
la pantalla con un blend.  
El primer paso, codear las herramientas para generar texturas y subirlas  
a la gráfica:

```
  
#define TAMX 128  
#define TAMY 256

float Gtime =0;

unsigned char img\[TAMX\*TAMY\*4\];  
int i,j;  
int k=8;  
int TEX\_post\[8\];

typedef void(\*gen\_f)();  
unsigned char \*col;

int TEX\_upload(int x,int y,unsigned char\* data)  
{  
  int id;  
  glGenTextures(1, &id);  
  glBindTexture(GL\_TEXTURE\_2D, id);  
  gluBuild2DMipmaps(GL\_TEXTURE\_2D,4,x,y,GL\_RGBA,GL\_UNSIGNED\_BYTE,data);  
  return id;  
}

int GenTex(gen\_f fn)  
{  
   for(i = 0; i< TAMX; ++i)  
   {  
    for(j = 0; j< TAMY; ++j)  
    {  
        col = &(img\[(j\*TAMX+i)\*4\]);  
        fn();  
    }  
   }  
   return TEX\_upload(TAMX,TAMY,img);

}  



```

El segundo paso, generar las texturas:  

```


void TEX\_Rand(void)  
{

        col\[0\] =  0;  
      col\[1\] = 0;  
      col\[2\] = 0;  
      col\[3\] = InterPol(20.0f,60.0f,(float)rand()/0xFFFF);  
//interpolacion linea, cosenoidal o lo que desee  
}

void INTRO\_Init()  
{  
.....  
 while(k--)  
{  
     TEX\_post\[k\] = GenTex(TEX\_Rand);  
}  
....  
}  



```

En este paso lo que hago es generar 8 texturas de color negro pero con  
un canal alpha entre 20 y 60 (prácticamente transparentes), aunque según  
se modifiquen estos valores se consiguen diferentes resutados.

El tercer y último paso, dibujarlo:

```


//el código del quad... última tenología XD  
void quad()  
{  
  glBegin(GL\_QUADS);  
          glTexCoord2f(0,0);  
          glVertex3f(-1.0f/2.0f,-1.0f/2.0f,0);  
          glTexCoord2f(0,1);  
          glVertex3f(-1.f/2,1.f/2,0);  
          glTexCoord2f(1,1);  
          glVertex3f(1.f/2,1.f/2,0);  
          glTexCoord2f(1,0);  
          glVertex3f(1.f/2,-1.f/2,0);  
       glEnd();  
}  
//con este parámetro se cosigue tener puntos más o menos gordos, o con  
diferentes pixelados, según se quiera ver  
float Granularidad  = 4.0f;  
\_\_inline void PostRender()  
{  
          glLoadIdentity();  
          glTranslatef(0.0f,0.0f,-0.5f);

            glMatrixMode(GL\_TEXTURE);  
          glScalef(Granularidad,Granularidad,Granularidad);

            glEnable(GL\_BLEND);  
          glDisable(GL\_DEPTH\_TEST);  
          glBindTexture(GL\_TEXTURE\_2D,TEX\_post\[k++%0x07\]);  
          quad();  
          glLoadIdentity();  
          glMatrixMode(GL\_MODELVIEW);  
}  
void INTRO\_RenderFrame(float delta)  
{  
  RenderALL();  
  PostRender();  
}


```

Y se obtiene un resultado la mar de chulo y muy configurable variando  
los parámetros de alpha de las texturas y de granularidad. Como no, lo  
mejor para estos casos es una imagen del antes y del después :)

  
  
![](http://www.tel.uva.es/%7Ejsanfer/blog/4k_1_sin.PNG)  
![](http://www.tel.uva.es/%7Ejsanfer/blog/4k_1_con.PNG)