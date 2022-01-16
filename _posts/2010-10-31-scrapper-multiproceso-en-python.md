---
name: 'scrapper multiproceso en python'
title: 'scrapper multiproceso en python'
date: 2010-10-31T22:11:00.008+01:00
layout: post2
published: true
url: /2010/10/scrapper-multiproceso-en-python.html
tags: 
- python
---

Nota inicial: Si no te gusta python puede que este post te haga cambiar de opinión :)

  

Una de las [mejoras de Python 2.6](http://docs.python.org/dev/whatsnew/2.6.html#pep-371-the-multiprocessing-package) (en estos momentos vamos por la 2.7, que será la [última de la rama 2.x](http://docs.python.org/dev/whatsnew/2.7.html#the-future-for-python-2-x)) es el módulo multiprocessing. En pocas palabras viene a ser un módulo para trabajar con procesos de la misma forma que se hace con threads, de hecho en un subconjunto de la funcionalidad puedes cambiar threads por procesos cambiando un solo import.

  

Sin embargo el módulo multiprocessing añade cosas muy interesantes como la posibilidad de trabajar con pool de procesos. Veamos un ejemplo.

  

Imaginemos que tenemos que bajar una serie de ficheros pdf para posteriormente extraer información de ellos. Una primera aproximación sería esta:

  
  
```
  
import urllib  
import urllib2  
  
reg\_nos = \[16738, 17288, 18162, 18776, 18868, 19116, 19223, 19505\];  
pdf\_url = 'http://www.mapa.es/agricultura/pags/fitos/registro/sustancias/pdf/%s.pdf'  
  
def fetch\_url(url, params={}):   
    return urllib2.urlopen(url).read()   
  
def save\_url\_as\_file(url, filename):  
    open(filename,'wb').write(fetch\_url(url))  
      
def download\_pdf(reg\_no):  
    f = '%d.pdf' % reg\_no  
    save\_url\_as\_file(pdf\_url % reg\_no, f)  
    print "\\t- %s downloaded" % f  
  
\# tests  
def single(regs):  
    for u in regs:  
        download\_pdf(u)  
  
single(reg\_nos)  

```  
(puedes verlo mejor con sintáxis coloreada en [github](http://gist.github.com/657222))  
  
Para 4 míseros ficheros no merece la pena hacer más, pero imaginemos que queremos bajarnos miles y que además lo tenemos que hacer periódicamente, el tiempo en bajarse todos esos ficheros es alto. Lo primero que se nos ocurre es usar concurrencia: lanzando una serie de hilos/procesos que vayan bajando los ficheros aceleraría sensiblemente el proceso (de hecho así lo hacen los navegadores cuando se bajan los ficheros que referencia el HTML).  
  
En python esto traducido a código ocupa mucho menos que explicarlo:  
  
```
  
def download\_multi(regs, nprocesses=4):  
    pool = Pool(processes=nprocesses)   
    pool.map\_async(download\_pdf, regs).get()  

```  
  
Usando multiprocessing.Pool python se encarga de lanzar los procesos y preparar una cola para enviarle a la función que especificamos en el primer parámetro.  
  
Este es un uso de [multiprocessing](http://docs.python.org/dev/library/multiprocessing.html#module-multiprocessing), pero tiene otros muchos muy interesantes.  
  
Podéis ver todo el [código en github](http://gist.github.com/657219) y ejecutar el pequeño benchmark:  
```
  
q6:smll javi$ python fetch.py   
        - 16738.pdf downloaded  
        - 17288.pdf downloaded  
        - 18162.pdf downloaded  
        - 18776.pdf downloaded  
        - 18868.pdf downloaded  
        - 19116.pdf downloaded  
        - 19223.pdf downloaded  
        - 19505.pdf downloaded  
2.30190205574  
        - 18776.pdf downloaded  
        - 17288.pdf downloaded  
        - 18162.pdf downloaded  
        - 16738.pdf downloaded  
        - 19116.pdf downloaded  
        - 18868.pdf downloaded  
        - 19505.pdf downloaded  
        - 19223.pdf downloaded  
0.807252883911  

```  
Un incremento un poco menor de 4X, el número de procesos que lanzo en el pool.  
  
Últimamente uso este módulo para muchísimas tareas ya que el uso es prácticamente directo si la aplicación está bien modularizada y permite aprovechar la potencia de las máquinas actuales (en mi caso un dual core).  
  
Bonus Track - threads  
  
Con threads también es posible hacerlo, pero lamentablemente el módulo threading no tiene la funcionalidad Pool, así que debemos emularla.  
  
Antes de pasar a la implementeación está bien decir que desde hace cosa de dos años hasta ahora se ha criticado mucho el modelo multithread de python debido a que existe una cosa llamada GIL (Global Interpreter Lock) que hace que solo pueda estar ejecutándose un hilo al mismo tiempo en el intérprete python. A pesar de ser hilos nativos hay un lock que evita que dos hilos se puedan ejecutar al mismo tiempo. Si quieres saber un poco más sobre el GIL hay una [presentación](http://www.dabeaz.com/python/GIL.pdf) excelente de maestro Dave Beazley.  
  
Es para llevarse las manos a la cabeza, pero esto no quiere decir que el desarrollo con hilos en python esté "prohibido", símplemente hay que saber para qué se puede o no usar. En este caso el uso de threads, a pesar del Lock es muy interesante, ya que al ser tareas fundamentalmente de Entrada/Salida no hay problemas de bloqueo entre hilos (la explicación más en detalle en la presentación que he citado antes).  
  
Sin más, usando Queue (otro módulo python mágico), una cola FIFO sincronizada la tarea es más o menos simple:  
  
```
  
def threaded(regs, nthreads=4):  
    # ripped from http://www.dabeaz.com/generators/Generators.pdf  
    def consumer(q):   
        while True:  
            item = q.get()   
            if not item: break   
            download\_pdf(item)  
  
    in\_q = Queue.Queue()   
      
    # start threads  
    ths = \[threading.Thread(target=consumer,args=(in\_q,))   
                for th in xrange(nthreads)\]  
    for x in ths: x.start()  
  
    # put files to download  
    for i in regs:  
        in\_q.put(i)  
  
    # put end guards  
    for th in xrange(nthreads): in\_q.put(None)  
  
    # wait to finish  
    for x in ths: x.join()  

```