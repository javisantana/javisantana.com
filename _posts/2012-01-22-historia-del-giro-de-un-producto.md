---
name: 'Historia del giro de un producto software'
title: 'Historia del giro de un producto software'
date: 2012-01-22T21:54:00.000+01:00
layout: post2
published: true
url: /2012/01/historia-del-giro-de-un-producto.html
---

Para los que no lo conozcan: agroguía es un pequeño producto de [guiado GPS](http://agroguia.es/) que desarrollo y vendo hace 6 años que trata de facilitar la vida a los agricultores guiandoles por las parcelas.  
  
Hace cosa de un **par de años** yo ya sabía que algún día el hardware donde funcionaba agroguía terminaría desapareciendo. Iphone y android ya estaban ahí y microsoft no podía seguir con una plataforma paupérrima como es windows mobile, así que era de esperar un cambio a otro SO y por tanto todo el desarrollo de agroguía se iría al cielo del software.  
  
El pasado **abril-mayo** nos encontramos con que el único fabricante de hardware windows mobile compatible con agroguía (en verdad al revés) **daba por finalizada la fabricación** y por tanto agroguía tenía los días contados. Como somos muy lean, decidimos comprar todo el stock de PDAS compatibles que encontrasemos para sacar el máximo partido al producto.  
  
En **octubre** vendimos la última unidad en stock y por tanto agroguía se había terminado para siempre. Mi idea era esa, ver como moría en paz, 7 años de producto son muchos años y terminas cansado y desmotivado. **Pero aquello era como dejar morir un hijo sin hacer nada**. Entonces decidí, en un arrebato totalmente LEAN, cambiar agroguía de plataforma y portarlo a android.  
  
La decisión de android estaba muy clara, tanto técnicamente como a nivel de costes. Así que decidí bajarme el SDK y NDK de android con tanta suerte que hace 7 años tomé dos decisiones técnicas que han resultado ser oro:  
  
\- separé muy claramente la parte que dependía del SO de lo que sí. Por aquel entonces el código del quake era mi referencia y así lo hacían ellos. Además me propuse separar bien todo (años más tarde me enteré que aquello se llamaba Modelo-Vista-Controlador)  
  
\- Usé OpenGLES. Por aquel entonces nadie daba un duro por OpenGL, pero la idea de tener gráficos 3D en un dispositivo móvil era cuanto menos atractiva. Así que usé una implementación por software de OpenGLES. Quién me iba a decir a mi que años más tarde se convertiría en el standard "real" de móvil para hacer 3D?  
  
(ahora recuerdo lo de unir los puntos hacia atrás que decía Jobs en su famoso discurso)  
  
**Estas dos decisiones me han permitido reusar TAL CUAL todo el código de la primera versión que no dependía del SO. La mayoría de los ficheros de código siguen sin tocar desde hace 6 años.**  
  
Calculé que el porting me llevaría 1 mes, incluído el testing en real, que en una aplicación que no puedes actualizar es bastante importante. Yo sabía en verdad que hasta el 2012 no lo tendría.  
De mientras la cola de personas esperando la versión empezó a crecer, es increíble lo comprensiva que es la gente incluso cuando les explicas cosas que les importan un pepino. Pero bueno, siempre hemos sido bastante transparentes con los problemas y siempre ha funcionado bien.  
  
A primeros de **diciembre** tenía ya una versión "estable", ya sabía "casi seguro" que era posible, tocaba buscar el hardware y todo lo asociado, que funcionase bien, que tuviésemos proveedores en los que pudiésemos confiar, echar cuentas de lo que costaría etc. Esas cosas que hay que hacer, pero que no se ven. Hay que tener en cuenta factores como el peso de la tablet para que aguante en un soporte pegado al parabrisas de un tractor... :)  
  
En **Enero** ya teníamos el hardware elegido y pude empezar a probar en la plataforma final, después de un par de semanas de pruebas de funcionamiento correcto, de estrés y demás la versión 1.0 estaba terminada. Tiempo para preparar el manual del producto (que por cierto ha pasado de 20 páginas a 8)  
  
**Ayer** pusimos las dos primeras unidades de agroguía a los primeros agricultores :D  
  
  
Destacaría de estos 3 meses:  
  
\- He tomado bastantes decisiones, por ejemplo he decidido eliminar funcionalidad, simplificar algunas cosas y cambiar el modo de otras que la experiencia nos ha dicho que no funcionaba tan bien.  
  
\- He tenido que ser muy estricto al trabajar porque el tiempo apremiaba y siendo sincero prefería hacer cosas nuevas que la plataforma permitía, que eran mucho más cool que reimplementar el sistema anterior. Conocer como funciona el negocio ha sido vital para no irme por las ramas.  
  
\- He sacrificado calidad en algunas partes para tener el producto rodando cuanto antes. No es perfecto, no pasa nada, poco a poco mejoraré esas partes. Creo que a esto le llaman minimun viable product.  
  
\- Carlos Sainz decía que ganar el primer campeonato mundial de rallies fue fácil, que lo difícil fue mantenerse. Aquí me ha ocurrido algo parecido. Cuando desarrollé la primera versión no había miedo, hacías las cosas con dos cojones, a lo bruto. Ahora todo da mucho miedo, sabes que tienes que mantener la calidad de tu producto y eso hace ser mucho más conservador. Esto es posiblemente lo que más acojonado me ha tenido estos meses (y me tiene). Aún así he metido cosas de esas cool que posiblemente al agricultor le importen un pimiento.  
  
\- Ha sido (y es) un reto. Esto hace que recobres un poco la motivación perdida y te abre a nuevas ideas. Android en si es una basura (IMHO) pero la plataforma permite mucho más que windows mobile.  
  
\- Algo un poco más friki, he empezado a usar git-flow y es muy recomendable para este tipo de productos.  
  
A seguir se ha dicho.