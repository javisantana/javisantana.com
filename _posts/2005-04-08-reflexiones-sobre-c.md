---
name: 'Reflexiones sobre C++'
title: 'Reflexiones sobre C++'
date: 2005-04-08T20:44:00.000+02:00
layout: post2
published: true
url: /2005/04/reflexiones-sobre-c.html
---

Siempre me había gustado, entusiasmado diría yo, C++, su notación (probablemente porque venía de C), el que esté orientado a objetos, las excepciones, los templates, la herencia, las funciones virtuales... y mucho más después de leerme (effective c++, more effective c++ y modern c+ design). No es que me haya dejado de gustar, pero quizás es que haya abierto los ojos, me explico, el otro día en clase de Sistemas de tiempo real, estabamos dando una introducción a ADA95. En un primer momento se parecía a VHDL (un lenguaje de descripción HW) en su notación, aunque según avanzó la exposión del profesor me di cuenta de que tenía mucho más puntos en común, y lo mejor, orientados al software. ADA 95 tiene implementada concurrencia builtin, sistemas para la gestión de las contiendas, tareas, además de disponer de características propias de los lenguajes orientados a objetos, tanto las "standard" (herencia, etc), como las de facto (paquetes, operadores de rango, tipos algo más completos). La característica que más me gustó es la implementación de task, puedes tener una tarea con su código y tener ejecutando varias concurrentemente sin tener que preocuparte por threads o fork's y lo mejor, un sistema para la sincronización muy agradable y eficaz. Quizás ADA95 por ser un lenguaje orientado al tiempo real y por tener una notación muy distinta a C puede que no sea el preferido de muchos (me incluyo) pero me parece un lenguaje bastante potente y muy apropiado para las máquinas que vienen con varios cores. En conclusión, C++ quizás se haya quedado un poco desfasado con respecto a lenguajes como C#, java, python que implementan herramientas mucho más agradecidas y manejables para el programador, aunque para mi sigue siendo el lenguaje más potente :)  
  
En otro orden de cosas, esta mañana me sobraron un par de horas que pude invertir en perder el tiempo en internet. Entre mis búsquedas encontré algunas cosas interesantes:  
  
\- Texturas procedurales: visitando [http://www.sorgonet.com/modules.php?name=News&file=article&sid=103](http://www.sorgonet.com/modules.php?name=News&file=article&sid=103) encontré un enlace a una página que ya conocía, pero de la cual desconocía el artículo siguiente: ["texturas procedurales"](http://pgrafica.webideas4all.com/texturas_procedurales.html)  
Es posible que no sepas de qué van las texturas procedurales, seguro que google te puede ayudar más que yo pero en resumen son texturas generadas mediante artefactos matemáticos. Quizás algún día ponga mi código de mi generador de texturas. Para ver algún ejemplo de texturas procedurales lo mejor es visitar páginas como [esta](http://www.theproduct.de)  
  
GLSL: si no estás muy familiarizado te preguntarás qué es esa puñeta, pues se trata d eun lenguaje que soportan ciertas tarjetas gráficas para poder realizar operaciones a medida en los render con OpenGL. Buscando un tutorial he encontrado el de [lighthouse3d](http://www.lighthouse3d.com/opengl/glsl/index.php), (revisad la página porque tiene detallados tutoriales de opengl), que además de ser bastante buena calidad y comprensible, utiliza un [Shader Designer](http://www.typhoonlabs.com/), un programa creado por la empresa de un cyberamigo y del cual he visto su evolución. Me alegra ver como el trabajo duro tiene sus frutos.  
  
saludos  
[](http://pgrafica.webideas4all.com/)