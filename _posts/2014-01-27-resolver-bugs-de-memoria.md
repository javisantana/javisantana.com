---
layout: blog3
published: false
---

## Resolver bugs de memoria

Si eres desarrollador de sofware o estás cerca de ellos te sonará lo de "no puedo reproducir este problema" o el famoso "funciona en mi máquina". Normalmente cuando vas a resolved un bug el flujo es el siguiente:

1) alquien lo reporta, normalmente con una descripción pobre y mal especificado
2) lo reproduces
3) lo fixeas
4) el que lo reportó o un QA prueba que efectivamente eso está cerrado

Dejando a un lado el tema del report de bugs, que muy poca gente sabe hacer bien (incluídos desarrolladores), hay muchas ocasiones donde el paso 2 es imposible o difícil: las condiciones de partida suelen ser diferentes, el entorno, etc. Cuando esto pasa te pasas horas tratando de ponerte en el pellejo del que lo encontró dando a menudo palos de ciego a ver si suena la flauta.

En estas últimas dos semanas por desgracia he tenido que solucionar bastantes bugs (culpa mía todos y cada uno de ellos) y uno de ellos surgió justo antes de tener que ir a coger el tren. Era más o menos urgente así y no podía utilizar el portátil para reproducirlo y arreglarlo, así que intenté resolverlo de memoria.

Tracear el programa sin tener claro como reproducir el problema viene a ser como hacer una raiz cuadrada de memoria. Lo mejor no es que ejercitas la memoria si no que mientras vas analizando cada caso concreto y como podría afectar a tu código encuentras posibles fallos, mejoras y WTF que hiciste cuando lo programaste.

Llevo haciendolo cosa de dos semanas y es especialmente interesante sobretodo cuando tratas de reproducir bugs en código ajeno. 

Y es que al final la cabeza va mucho más rápido que la vista y los dedos buscando entre el código usando el editor. Antes de ponerse a mirar como un loco el código analiza 5 minutos sin tocar el ordenador qué puede estar pasando.

