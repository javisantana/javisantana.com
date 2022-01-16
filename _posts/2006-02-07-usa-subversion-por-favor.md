---
name: 'Usa subversion por favor'
title: 'Usa subversion por favor'
date: 2006-02-07T16:23:00.000+01:00
layout: post2
published: true
url: /2006/02/usa-subversion-por-favor.html
---

Cuando llevas ya algún tiempo manejando código te das cuenta del caos que puede llegar a ser el no tener un control muy métodico del mismo e incluso teniendolo pueden surgir problemas que hagan que un trabajo de días se vaya a la mierda o que gastes horas en saber "como pichas va esto". En mi caso me ha pasado muchísimas veces que tengo versiones de clases diferentes en cada PC y cada una de ellas con avances que la otra no tiene y que finalmente se pierden o me toca reprogramar.  
  
No me había planteado el usar un sistema para gestionar mi código hasta que un día [colson](http://www.edevi.com) me comentó que él usaba subversion para mantener el código de su juego (the cursed wheel). Las ventajas que ofrecía eran muchísimas:  
  
\- unicidad de código: Solo hay una versión del código y esa está en el reprositorio, con esto evitas problemas de diferentes versiones en diferentes lugares, incluso dentro de la misma máquina. Por ejemplo, imaginemos que tenemos una librería para dibujar mallas que usamos en varios proyectos, sin usar un sistema gestor de código los cambios que hagamos, por ejemplo, en las cabeceras tendremos que copiarlo al resto de versiones. Personalmente me gusta tener una copia de cada clase dentro de la carpeta de proyecto y con subversion soluciono el problema de forma muy simple.  
  
\- salvavidas (I) : Estás tranquilamente programando una aplicación, haces unos cambios, compilas y pruebas con tan mala suerte que aparece un bug que antes no había. No problem, con subversion puedes ver los cambios de cada uno de los ficheros, comparas la versión actual con la última y así sabrás donde has podido meter la gamba. Este use es \_extremandamente\_ útil.  
  
\- salvavidas (y II): Estás tranquilamente programando con win2000 y vc++6.0 y se va la luz de tu casa. Te acuerdas de la madre de iberdrola y a continuación reinicias. Vuelves a arrancar vc++6.0 y te encuentras con que algunos .cpp están corruptos... GRRR... eso era antes, ahora rescatas última versión de ls archivos corruptos y a correr. Lo que sería ya rozar la perfección es tener el servidor en una máquina diferente por si las moscas, pero en caso contrario hacer backups es una tarea muy simple y que puede salvar muchas vidas. Luego pondré un pequeño script.  
  
\- más que código: subversion permite mantener versiones de cualquier fichero, ya sea texto o binario con lo cual todos los datos que maneje el programa podrán estar bajo un control de versión. En mi caso tengo bajo control los ficheros de proyecto de VC++, los ficheros de blender que uso para alguna que otra cosa, el propio código, la memoria del proyecto, etc.  
  
\- orden: aunque seas muy metódico a la hora de llevar un orden es muy posible que algo se descoloque o no vaya como debe, subversión te obliga, mejor dicho, te encauza para que tengas todo ordenao y perfectamente disponible sin realmente demasiado esfuerzo.  
  
Dicho esto, procedo a dar los pasos para instalar y configurar un repositorio:  
  
\- bajarse [subversion](http://subversion.tigris.org/) e instalarlo  
\- bajarse [tortoiseSVN](http://tortoisesvn.tigris.org/) e instalarlo  
\- crear un directorio para el repositorio, p.ej c:\\repos  
\- arrancar el server de subversion: svnserve -d -r c:\\repos (aconsejable arrancarlo al inicio o tener un .bat)  
\- dentro de c:\\repos crear una carpeta para cada código, p.ej c:\\repos\\proyecto1- pinchar en el segundo boton en esa carpeta: TortoiseSVN->create repository here (con esto le dices que ahí habrá un repositorio)  
\- importar los datos que contendrá ese repositorio, código, binarios, etc: Ir a la carpeta de proyecto1 originaria (donde tienes el código) y con el segundo botón TortoiseSVN->import... en la siguiente pantalla indicar la ruta del repositorio svn://localhost/proyecto1. Se importa todo y.... zasca, habrá problemas con el usuario. Ningún problema, dentro de c:\\repos\\proyecto1\\conf hay dos archivos. Con passwd añades los siguiente:  
"""  
\[users\]  
javi = mipass  
"""  
y en svnserve.conf pones:  
"""  
\[general\]  
password-db = passwd  
auth-access = write  
"""  
  
Ahora ya se puede entrar con el usuario y password que se han especificado en el fichero passwd.  
  
\- Ahora ya se puede "bajar" ese código a cualquier carpeta: p.ej en c:\\proyectos\_nuevos\\proy1 pinchando en el segundo botón en SVNcheckout podrás bajar todo el código de cualquier repositorio.  
\- Cuando se modifique el código y quieres subir los cambios basta con pinchas en el segundo botón sobre c:\\proyectos\_nuevos\\proy1 y pinchas en SVN commit.  
  
  
Puede parecer un engorro al comienzo, pero es muy cómodo, útil y que sirve para cualquier cosa, por ejemplo para todos los ficheros se suelen tener de clase que siempre terminan perdidos, para la memoria del PFC, para el código de tus scripts de administración, etc, etc.  
  
Por último un .bat que uso para hacer backups de todo mi proyecto fin de carrera que puede servir como ejemplo:  
  
"""  
svnadmin dump c:\\repos\\pfc\_memoria --incremental > bak/pfc\_memoria\_bak  
svnadmin dump c:\\repos\\pfc\_main --incremental > bak/pfc\_main\_bak  
svnadmin dump c:\\repos\\pfc\_tools --incremental > bak/pfc\_tools\_bak  
"""