---
name: 'Mejoras en Makefight'
title: 'Mejoras en Makefight'
date: 2006-05-20T11:31:00.000+02:00
layout: post2
published: true
url: /2006/05/mejoras-en-makefight.html
---

Hace unos días envié la versión final de makefight, el juego que presentamos [devilishgames](http://www.devilishgames.com) y yo al concurso de videjuegos art futura 2005, para que la publicara la testeara y la publicara si procedía. En mis test había solucionado bastantes bugs (cuando programas algo en 2 meses aparecen muchos bugs), pero hasta que no se empieza a probar de verdad no se encuentran los más difíciles. Esta semana, para descansar de la memoria del proyecto, me he dedicado a ir solucionando las cosas que me han ido comentando, pero como soy incapaz de solo corregir bugs he añadido una funcionalidad que si funciona bien puede ser interesante.  
  
Leyendo acerca de [spore](http://www.gamespot.com/pc/strategy/spore/index.html) me enteré de que aunque no sea online, los jugadores si podrían bajarse las civilizaciones creadas por otras personas. La verdad es que es una muy buena idea y puede ser gracioso ver las criaturas creadas por otra persona. Como en makefight también se pueden construir vehículos y las limitaciones para su creación son la imaginación del usuario y un grid de 12x15x15 pensé que podría implementar un sistema parecido.  
  
Ya que no dispongo de un servidor donde tener alojado un script PHP o python que recoja, gestione y envíe los coches de los usuarios, pensé en usar uno de los muchos servicioes gratuítos que tenemos ahora. Pensé en flickr, podría subir los coches codificados en imágenes (un coche puede ocupar 2 kb como mucho), pero dudé si flickr modifica las imágenes que subes. Entonces recordé gmail. Gmail te da mucho espacio, acceso simple desde python gracias a [libgmail](http://libgmail.sourceforge.net/), todo lo que necesitaba.  
  
Manos a la obra, cogí [mi script para subir fotos a flickr  
](http://blep.blogspot.com/2006/02/tus-fotos-en-flickr.html)y lo modifiqué para que subiera los coches en forma de atachment a gmail y las etiquetara correctamente. También añadí funcionalidad para bajar los ficheros necesarios y todo funcionando. Lógicamente esta implementación tiene problemas: he tenido que usar un sistema de timestamp para que los coches con mismo nombre no se sobreescriban al bajarlos a disco y es posible que alguien con un sniffer o decodificando el código en python vea el password de la cuenta, entre y lo joda todo. Tampoco pretende ser perfecto.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/gmail_mf.png)](http://photos1.blogger.com/blogger/2315/213/1600/gmail_mf.png)  
  
De esta forma cada vez que arrancas makefight este automáticamente lanza un hilo que actuliza los coches mientras juegas. Estos coches son los que usará la máquina para darte cera. Aquí surge otro problema, si a una persona le da por hacer coches cojos :  
  
En este los pesos están descompensados (la parte delantera es de metal que pesa más y la parte trasera de plástico que pesa poco aunque es barato), se queda pinado y las ruedas no tocan el tatami  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/mf3.png)](http://photos1.blogger.com/blogger/2315/213/1600/mf3.png)  
  
Este coche lo único que puede hacer es esperar a que le den por todos lados, le giren, las ruedas toquen el suelo y empiece a andar. Esperemos que el sistema de control de la IA sepa controlar cuando las ruedas están al contrario XD.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/mf2.png)](http://photos1.blogger.com/blogger/2315/213/1600/mf2.png)  
  
Pequeño pero matón. La experiencia dice que con un coche pequeño es más difícil pillarte porque corren más, tienen más agarre y giran más rápido, pero cuando te dan te han jodido y además es muy difícil echar del tatami con un coche así.  
  
[![](http://photos1.blogger.com/blogger/2315/213/320/mf1.png)](http://photos1.blogger.com/blogger/2315/213/1600/mf1.png)  
  
Espero no dar ideas :)