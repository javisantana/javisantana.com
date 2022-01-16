---
name: 'Creación de criaturas procedurales'
title: 'Creación de criaturas procedurales'
date: 2006-04-29T22:10:00.000+02:00
layout: post2
published: true
url: /2006/04/creacin-de-criaturas-procedurales.html
---

Hace unos días estuve viendo el [video](http://video.google.com/videoplay?docid=-775656482294094003&q=spore&pl=true) de spore. En él [Will Wright](http://en.wikipedia.org/wiki/Will_Wright) muestra algunos detalles técnicos del juego, así como una gran parte de su contenido jugable. Básicamente el juego trata de evolucionar con tus criaturas desde que eres un microorganismo hasta invadir otros planetas de galaxias lejanas. En el juego destaca la capacidad de creación de criaturas en base a partes del organismo que el juego te ofrece y a partir de ellas, proceduralmente, se generan las animaciones y demás. Es bastante impactante ver en el video como genera diferentes criaturas añadiendo patas a su columna vertebral, o picos y ojos a su cabeza (o cabezón). Además, como dice en el video, los escenarios están generados proceduralmente, esto es, no están previamente creados por un artista y almacenados en disco. El artista lo diseña y se guarda la información que permite generarlo posteriormente, no los datos ya generados. Esto permite un ahorro bestial de disco.  
  
Me llamó poderosamente la atención el hecho de que las animaciones se generaran al vuelo, supuse que habrá algún tipo de directrices que permitan generarlas, de otra forma es imposible, aunque con lo que he visto de video no soy capaz de concluir nada. Me puse a buscar información al respecto y he encontrado un link del 1994 sorprendente.  
  
[Karl sims](http://www.genarts.com/karl/) propone un algortimo genético en el cual a partir de unas funciones muy básicas (sumas, multiplicaciones...) y un grafo neuronal [genera criaturas](http://www.genarts.com/karl/evolved-virtual-creatures.html) en base a cubos usando una física "muy básica". Las crituras que crea tienen 3 propósitos, andar, salar y nadar. Lo que sorprende, sobretodo en las criaturas que nadan, es como la evolución hace que se parezcan a las criaturas que tenemos e la naturaleza. Si te interesa el tema no dejes de leer los dos papers: ["Evolving Virtual Creatures"](http://www.genarts.com/karl/papers/siggraph94.pdf) y ["Evolving 3D Morphology and Behavior by Competition"](http://www.genarts.com/karl/papers/alife94.pdf). Explica sin demasiados tecnicismos como están creadas las criaturas y las puedes ver en movimiento bajándote el video de [archive.org](http://www.archive.org/details/sims_evolved_virtual_creatures_1994)  
  
![](http://www.genarts.com/karl/crab-vs-arm200.jpg)