---
name: 'Jugando con fractales'
title: 'Jugando con fractales'
date: 2007-11-22T22:39:00.000+01:00
layout: post2
published: true
url: /2007/11/jugando-con-fractales.html
---

Hacía tiempo que tenía ganas de probar a renderizar un fractal y leyendo ayer en la wikipedia acerca de [Mandelbrot](http://en.wikipedia.org/wiki/Mandelbrot_set) vi que el código era muy simple. Después de todo es calcular si una función diverge tras una serie de iteraciones por cada pixel.  
  
He hecho un pequeño código en python para hacer pruebecillas, la verdad que con muy poco código se obtienen imágenes bastante bonitas, de hecho estoy pensando en imprimir alguna y ponerla de poster. Se generan imágenes de este pelo:  
  
[![](http://4.bp.blogspot.com/_XzuP3e63Ok8/R0X66nyK0tI/AAAAAAAAAMA/R3ncHOTqSN8/s320/coloring2.png)](http://4.bp.blogspot.com/_XzuP3e63Ok8/R0X66nyK0tI/AAAAAAAAAMA/R3ncHOTqSN8/s1600-h/coloring2.png)  
  
  
  
El código, necesita PIL y python 2.4 y he dejado algunas funciones para generar animaciones (con un par de hilos para -intentar- aprovechar mi dual core) y 3 ó 4 test de resultados chulos. El código generado HTML a partir del .py usando, como no, vim, la putada es que blogger te mete saltos de linea y hay que quitar los tags br, con un simple replace basta.  
  
  
import Image;  
from threading import Thread;  
SIZEX = 1024;  
SIZEY = int(SIZEX\*2.0/3.0);  
NFRAMES = 50;  
ZOOMSTEP = 1.0;  
  
**def** get\_color(xx,yy):  
  x = x0 = xx;  
  y = y0 = yy;  
  colour = 0;  
  iteration = 0  
  maxiteration = 600  
  
  **while** ( x\*x + y\*y < 4  **and**  iteration < maxiteration ):  
    tx = x\*x - y\*y + x0;  
    ty = 2\*x\*y + y0;  
    x = tx;  
    y = ty;  
    iteration = iteration + 1;  
    
  
  colour = float(iteration)/maxiteration;  
   
  **return** colour;  
  
**class** Palete:  
    **def** \_\_init\_\_(self):  
        self.\_colors = \[\]  
        **pass**;  
    **def** addColor(self,color, t):  
        self.\_colors.append((color,t));  
    **def** getColor(self,t):  
        #search for color  
        i = 0;  
        **while**(self.\_colors\[i\]\[1\] < t):  
            i+=1;  
        **if**(i == 0):  
            **return** self.\_colors\[0\]\[0\];  
        **else**:  
            t0 = self.\_colors\[i-1\]\[1\];  
            t1 = self.\_colors\[i\]\[1\]  
            dist = t1-t0;  
            d = (t-t0)/dist;  
            c0 = self.\_colors\[i-1\]\[0\];  
            c1 = self.\_colors\[i\]\[0\];  
            #print d  
            color = (c0\[0\] + d\*(c1\[0\] - c0\[0\]),  
                     c0\[1\] + d\*(c1\[1\] - c0\[1\]),  
                     c0\[2\] + d\*(c1\[2\] - c0\[2\]));  
            **return** color;  
  
              
  
**def** get\_img\_fractal(zoom, px,py, palete):  
    im = Image.new("RGB", (SIZEX,SIZEY))  
    **for** x **in** range(SIZEX):  
     **for** y **in** range(SIZEY):  
        t = get\_color(px + zoom\*(-2.0 + 3.0\*(float(x)/SIZEX)) ,py + zoom\*(-1.0 + 2.0\*(float(y)/SIZEY)));  
        color = palete.getColor(t);          
        im.putpixel((x,y),(255\*color\[0\],255\*color\[1\],255\*color\[2\]));  
    **return** im;  
      
  
**class** Fractal(Thread):  
   **def** \_\_init\_\_ (self,fractals):  
      Thread.\_\_init\_\_(self)  
      self.\_fractals = fractals;  
   **def** run(self):  
       p = Palete();  
       p.addColor((1.0,1.0,1.0),0.0);  
       p.addColor((1.0,0.0,0.0),0.5);  
       p.addColor((1.0,1.0,1.0),1.0);  
       **for** x **in** self.\_fractals:  
           **print** "generating %.3d.png" % x\[3\];  
           get\_img\_fractal(x\[0\],x\[1\],x\[2\],p).save("%.3d.png" % x\[3\]);  
  
  
      
  
**def** animation():  
  
    zoom = 1.0;  
    it = 0;  
    fractals = \[\];  
    **for** n **in** range(NFRAMES):    
        fractals.append((zoom,-0.77028065155993652446, -0.11144667326007166574,n));  
        zoom = zoom/2.0;  
        it+=1;  
  
    #launch two threadç  
    f1 = Fractal(fractals\[:len(fractals)/2\]);  
    f2 = Fractal(fractals\[len(fractals)/2:-1\]);  
  
    f1.start();      
    f2.start();  
  
**def** testColoring():  
    p = Palete();  
    p.addColor((1.0,1.0,1.0),0.0);  
    p.addColor((1.0,0.0,0.0),0.5);  
    p.addColor((1.0,1.0,1.0),1.0);  
    get\_img\_fractal(0.4,-0.77028065155993652446, -0.11144667326007166574,p).save("coloring.png");  
  
**def** testColoring2():  
    p = Palete();  
    p.addColor((0.0,0.0,0.0),0.0);  
    p.addColor((145.0/255.0,165.0/255.0,192.0/255.0),0.5);  
    p.addColor((1.0,1.0,1.0),1.0);  
  
    get\_img\_fractal(0.0001,-0.77028065155993652446, -0.11144667326007166574,p).save("coloring2.png");  
  
**def** testColoring3():  
    p = Palete();  
    p.addColor((1.0,1.0,1.0),0.0);  
    p.addColor((145.0/255.0,165.0/255.0,192.0/255.0),0.5);  
    p.addColor((0.0,125.0/255.0,244.0/255.0),1.0);  
  
    get\_img\_fractal(0.0001,-0.77028065155993652446, -0.11144667326007166574,p).save("coloring3.png");  
  
**def** testColoring4():  
    p = Palete();  
    p.addColor((0.0,0.0,0.0),0.0);  
    p.addColor((145.0/255.0,165.0/255.0,192.0/255.0),0.5);  
    p.addColor((1.0,1.0,1.0),1.0);  
  
    get\_img\_fractal(0.00001,-0.26605838294940658357,-0.65123057178473777796,p).save("coloring4.png");  
  
#testColoring2();  
#testColoring3();  
testColoring4();  
#animation();