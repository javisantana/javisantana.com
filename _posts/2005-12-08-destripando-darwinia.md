---
name: 'Destripando Darwinia'
title: 'Destripando Darwinia'
date: 2005-12-08T12:22:00.000+01:00
layout: post2
published: true
url: /2005/12/destripando-darwinia.html
---

Llevo una temporada viendo bastantes juegos con estética diferente a la tónica general, esto es, polígonos con texturas realistas, más o menos luces, etc. No sería raro si hablamos de juegos de la escena indie, pero sí que lo es viendo como algunos de estos juegos se cuelan en el escenario que ve el gran público.  
  
[![](http://www.asahi-net.or.jp/%7Ecs8k-cyu/windows/gr_1s.gif)](http://www.asahi-net.or.jp/%7Ecs8k-cyu/windows/gr_1s.gif)Para empezar con este tipo de juegos sería una ofensa al buen gusto no hacerlo con [ABA Games](http://www.asahi-net.or.jp/%7Ecs8k-cyu/). Sus juegos son una mezcla de polígonos semitransparentes lanzados a toda leche por la pantalla a ritmo de música techno que recuerdan a los antiguos juegos de naves. Lo que realmente a mi me parece más interensate de su aspecto gráfico es que absolutamente todo está creado con quads o triangulos, desde las balas, hasta las naves enemigas pasando por el propio jugador. Mirando el datos del juego se puede ver que raramente usa alguna textura más que la de las fuentes. Recomiendo, [de nuevo](http://blep.blogspot.com/2005/10/juegos-sin-grafos-aba-games.html), bajarse sus juegos aunque solo sea por ver algo diferente.  
  
[![](http://www.1up.com/media?id=2469736)](http://www.1up.com/media?id=2469736)Otro ejemplo es [geometric wars](http://www.1up.com/do/previewPage?cId=3145642&did=1), un juego para xbox360 que lo único que tiene son partículas y geometrías simples, aunque me atrevería a decir que además usa algo de post procesado, el típico render a textura y pasada con blending aditivo. merece la pena ver los [screenshots](http://www.1up.com/do/media?cId=3145633). En [tigsource](http://www.tigsource.com/forums/viewtopic.php?id=243) publicaron hace unos días cosas sobre el juego y parece que les gustó porque [ayer publicaron un link a una entrevista](http://www.tigsource.com/home/?p=255).  
  
El que se lleva la palma en cuanto a estética diferente es [Darwinia](http://www.darwinia.co.uk/). Ya lo conocía de hace tiempo gracias a tigsource, pero últimamente lo he vuelto a jugar con más detalle al surgir la noticia de que se iba a [vender a través de steam](http://forums.introversion.co.uk/darwinia/viewtopic.php?t=2738). Como todo programador que se precie me fijé en cómo podría estar creada esa estética. Aparentemente parece una estética simple, no muy compleja de crear, pero si te paras un poco a pensar no es tan simple. Realmente técnicamente sí lo es ( no usa shaderso técnicas avanzadas de render), pero la originalidad y el uso de técnicas con más años que la tos para crear algo tan vistoso merecen un análisis más detallado.  
  
Sin pensarlo demasiado fui al directorio de instalación de la demo y vi lo que había, un main.dat y un sound.dat. Como una gran parte de los juegos que empaquetan sus datos, lo hacen con un formato más o menos conocido. En este caso bastó con cambiarle la extensión a .rar y abrirlo con winrar :). Lo primero que salta a la vista es que todos los ficheros, tanto de imagen como de datos del tipo geometría o scripts están en plano y se pueden ver con un editor de texto o de imágenes.  
  
Lo que más destaca del juego, por lo menos en la pantalla de la demo, es el cielo, el agua y el terreno.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/nubes.0.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/nubes.jpg)El cielo es algo que me tiene algo intrigado, tiene varias capas, la primera es una rejilla de color azul y después tiene otras capas que, \*creo\*, son una serie de quads con transparencia y superpuestas con blend aditivo, generadas a partir de la textura clouds.bmp. Luego alrededor de cada una de las "nubes" tiene una especie de halo, que supongo que será la textura antes citada puesta en un quad enorme, de ahí el filtrado que tiene. Sospeché del archivo cloudyglow.bmp, pero lo he cambiado y no he notado diferencia aparente en el cielo, con lo cual me quedo con mi primera idea. Claro está, esas capas se van moviendo lentamente, dando un aspecto que personalmente me gusta mucho.  
La textura clouds.bmp a la que me refiero es la siguiente:  
  
[![](http://photos1.blogger.com/blogger/2315/213/200/clouds.png)](http://photos1.blogger.com/blogger/2315/213/1600/clouds.png)  
  
[![](http://photos1.blogger.com/blogger/2315/213/200/agua.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/agua.jpg)El agua, tanto el movimiento, como el aspecto gráfico, depende de la proximidad a un islote. En cuanto al movimiento, las olas se acentúan a medida que te alejas del islote llegando a ser casi nulas en la orilla, donde prácticamente no se nota que se mueva el nivel del agua. Parece que el movimiento es una especie de perlin noise, aunque tranquilamente puede estar precalculado, no encuentro ninguna textura ni nada que me indique que está guardado en alguna parte. El aspecto gráfico tiene como base una textura (water\_default.bmp) que tranquilamente se podría haber [generado proceduralmente](http://pgrafica.webideas4all.com/compos.html). En una capa superior está la malla de quads con transparencia y en la que el color varía de negro a blanco a medida que se acerca a un continente. La variación de color se hace usando la textura waves\_containmentfield.bmp (en la carpeta terrain), supongo que será una técnica similar a la usada para el [cell-shading](http://nehe.gamedev.net/data/lessons/lesson.asp?lesson=37). Tengo de decir que al comienzo pensé que esa textura era usada para colorear el terreno también, usando la misma técnica pero con el resultado del producto escalar de la normal de la cara con el vector de la luz, pero la he descartado por dos razones, nunca se ve una cara blanca y es una estupidez hacerlo dándote opengl todo hecho :). Por descontado que las olas también están bajo la influencia de la iluminación, flat claro está.  
  
[![](http://photos1.blogger.com/blogger/2315/213/200/terreno.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/terreno.jpg)El terreno cuando lo vi por primera vez pensé que sería un simple terreno, cuadradote, con iluminación flat y después, con una segunda pasada, un render de las aristas, sin embargo cuando lo miras detenidamente te das cuenta de que algunas líneas son más gordas. Mirando las texturas se ve como en realidad las líneas están en la textura triangleoutline.bmp, de ahí que algunas líneas sean más gordas y tal. Del terreno poco más hay que decir, lo único que tiene sobreado flat y que mola mucho . Lo curioso del terreno es que da la impresión de que está generado, como más adeltante comentaré, porque mirando el archivo map\_mine.txt hay partes en las que indica un campo seed y otros datos que apuntan a que es generado de esta forma. Supongo que estará generado con un editor que exportará los datos a fichero (espero). En el mismo archivo se ve como también indica las luces, las posiciones de los "buildings" y alguna cosa más. Si pruebas a cambiar los seed's y algunos parámetros vas cambiando la forma de los islotes, aunque claro, algunas cosas quedan en el mar, etc.  
  
[![](http://photos1.blogger.com/blogger/2315/213/200/bichos.jpg)](http://photos1.blogger.com/blogger/2315/213/1600/bichos.png)Los bichos son algo curioso, aparecen pixelados y desde lejos parece que son 2D con billboard, pero si te acercas se ven que están modelados en 3D con iluminación y demás. Realmente no sé como habrá hecho ese efecto, tal vez renderizándolos a texturas y después dibujándolos mucho más grandes (con el filtro de textura adecuado), de forma que se pixelan. Umh, mirándolo con más detenimiento parece que usa ese sistema, pero dibujándo la textura de por encima del modelo poligonal.  
  
De los efectos de partículas tampoco hay mucho que comentar porque son simples quads con outline, pero la verdad es que son vistosos para lo simples que son.  
  
  
Se podría decir mucho más acerca del juego y es seguro que en alguna de las cosas que he comentado me he confundido. La conclusión de este análisis es que aunque el juego tenga un aspecto simplote, detrás hay un trabajo que seguro ha llevado muchas horas de pruebas y modificaciones. Todo esto, claro está, unido al trabajo de la propia lógica del juego que tiene detalles como la creación mediante 'gestures' las tropas, etc y otras perlas que es mejor no perderse, aunque sea jugando 5 minutos a la demo.  
  
Para terminar el [diario de desarrollo de darwinia](http://www.darwinia.co.uk/extras/development.html). Viendo las primeras fases de desarrollo no creo que nadie hubiera dado una peseta por él, no porque no tuviera calidad, si no porque ya hay un montón de juegos planteados tal y como aparecen en las primeras imágenes. Por cierto, en la página 2 dice:  
_  
The landscape you see in these screenshots is entirely procedurally generated and coloured, and the code that drives that generator is still in the final game today  
_  
  
También hay cosas curiosas como la siguiente:  
_  
Chris had a flash of inspiration about how to generate trees using simple fractal algorithms, and was more than willing to invest serious time investigating this issue rather than dealing with the underlying gameplay problems  
_  
  
Otro tema que me llama la atención es la cantidad de veces que cambiaron de idea en el planteamiento del juego, lo cual se refleja muy bien en la siguiente frase:  
_  
t's interesting to note that a lot of the story of the final game came out of seemingly random decisions made around this time.  
_  
  
Para terminar el último comentario del programador, que dice bastante de lo que cuesta hacer las cosas bien:  
_  
In total Darwinia was in development for just over 1000 days, making it one of the longest projects any of us have ever worked on  
_.