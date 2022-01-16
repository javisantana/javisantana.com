---
name: 'Usar git en proyectos que usan subversion'
title: 'Usar git en proyectos que usan subversion'
date: 2010-06-06T16:41:00.004+02:00
layout: post2
published: true
url: /2010/06/usar-git-en-proyectos-que-usan.html
tags: 
- programacion
- subversion
- git
---

Si has dado click en este enlace es que sabes que svn ya no mola, ahora lo que "lo peta" es git (o si eres un poco alternativo [mercurial](http://mercurial.selenic.com/)). Dejando a un lado lo de seguir las modas, seguramente conozcas más de un proyecto que trabaja con subversion y es difícil cambiar la tendencia, sobretodo por la barrera que supone pasar del modelo de funcionamiento de subversion a git.  
  
Este post no pretende ser una guía de comandos a ejecutar para usar acceder a un repositorio subversion, para eso ya hay [tropecientos manuales](http://git.or.cz/course/svn.html), voy tratar de explicar qué ventajas y problemas (alguna solución también) que he encontrado trabajando de esta forma y sobretodo pretende ser una pequeña guía para aquellos que están pensando usar git.  
  
Ventajas:  
  
\- Puedes hacer los commits intermedios que quieras. Para los somos "amigos del commit" es muy útil, porque puedes hacer commit aunque el código no esté funcionando. En subversion para evitar esto tenías que hacer una rama y trabajar en ella hasta que terminases. En este caso tienes todo el repositorio en local y símplemente esos commits se acumulan a tu repositorio local hasta que tú decidas enviarlos al servidor.  
  
\- Trabajo en ramas: en Git trabajar con ramas es mucho más ágil que en subversion, de modo que puedes trabjar en ramas locales de trabajo para ciertas tareas, pruebas.  
  
\- Rapidez: creas ramas, cambias de rama, haces commit, compruebas el log o diff de un fichero. Aún recuerdo cuando tortoise se me quedaba pillado esperando el log de un fichero... aunque las dos anteriores son interesantes, en subversion tenían solución, esta no la tiene por el modelo cliente servidor.  
  
\- Puedes usar otras utilidades de git: stash, cherry-pick, rebases, etc.  
  
Desventajas:  
  
\- No hay tortoise, particularmente uso [gitx](http://gitx.frim.nl/) y/o [gitg](http://trac.novowork.com/gitg/) que permiten sobretodo visualizar cómodamente diffs y la historia del repo. Edito: [Carlos](http://twitter.com/luceraproject) me comenta que sí existe un [tortoisegit](http://code.google.com/p/tortoisegit/), aunque no lo he probado.  
  
\- Los rebases del demonio. Cuando quieres actualizarte (lo que sería un svn update) debes hacer un git svn rebase. Esto, en pocas palabras, coge los commits que has hecho en local, los deshace, se baja las nuevas actualizaciones que haya en el servidor y aplica esos commits de nuevo. Personalmente odio el rebase (me recuerda a los peores momentos de [regreso al futuro](http://es.wikipedia.org/wiki/Back_to_the_Future)), así que una forma de trabajar sería crear una rama, actualizar la rama que apunte al servidor subversion (a trunk posiblemente) y después mezclar (en git, claro) la rama de trabajo.  
  
\- No puedes actualizar si tienes algo modificado en local. Con el subversion tradicional te hacía merge de lo que venía del repo con los cambios en local. Tienes dos opciones, o hacer commit o usar [stash](http://www.kernel.org/pub/software/scm/git/docs/git-stash.html) (almacena de forma temporal esos cambios, una especie de rama rápida)  
  
\- Tienes que aprender git además de subversion. A git cuesta acostumbrarse, pero luego es más versatil y rápido, es una cuestión de inversión.  
  
Siempre puedes empezar a probar, como siempre digo a mis pobres pupilos: "con un repositorio puedes cagarla todo lo que quieras, siempre puedes volver para atrás"