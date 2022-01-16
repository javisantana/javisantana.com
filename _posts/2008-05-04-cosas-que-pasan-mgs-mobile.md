---
name: 'cosas que pasan: MGS mobile'
title: 'cosas que pasan: MGS mobile'
date: 2008-05-04T20:36:00.005+02:00
layout: post2
published: true
url: /2008/05/cosas-que-pasan-mgs-mobile.html
tags: 
- mobile
- programacion
- 3D
---

Me bajo metal gear acid mobile, la versión 3D para probarla en mi móvil y así saber si los shots que había visto hace ya meses eran verdad y el juego prometía tanto, lo paso al móvil y después de defraudarme miserablemente (por ahora, no me gustan los juegos por turnos) me dispongo a decompilarlo para ver un poco qué hacían.  
  
ejecuto:  
"""  
C:\\temp\\metal\_gear\_acid\_mobile\_3d\_n70\\src>java -cp jode.jar;C:\\WTK22\\lib\\cldcapi10.jar;C:\\WTK22\\lib\\midpapi20.jar;C:\\SonyEricsson\\JavaME\_SDK\_CLDC\\PC\_Emulation\\WTK2\\lib\\mobile3d.jar;C:\\WTK22\\lib\\mmapi.jar jode.decompiler.Main --dest src meta l\_gear\_acid\_mobile\_3d\_n70.jar  
"""  
  
y cual es mi sorpresa que no está ofuscado!. Ahí está, el código del juego completito, salvo métodos que están, parece ofuscados, todo el resto de cosas se pueden ver perfectamente. Ahi está, todo el código de 3D, su A\* (ver AStarSearchpor ejemplo), la animación a la antigua usanza (quake2 style pero sin interpolar) de Snake (ver JSR184\_LoadSnake).  
  
Soy fan de decompilar juegos para móvil, es divertidísimo intentar saber qué están haciendo sin ver ni una sola variable (normalmente todo se llama 'a') o ver los formatos de fichero que usan o como cargan las imágenes. Por ahora lo que más he visto ha sido lo de empaquetar recursos y "xorear" parte de los datos, "swapear" el comienzo y fin del fichero (ves cosas como "GNP" de la cabecera de los png)... aunque luego tienes casos como gameloft del cual aún no he conseguido ver como lo hacen, es demasiado difícil de descifrar para un rato.  
  
Si algo bueno tiene java (de lo poco) es que se puede decompilar y mirar dentro.