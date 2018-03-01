---
layout: post2
published: true
title: The Jira moment
---

## La historia de siempre

Empiezas a desarrollar tu producto y pasas por las siguientes fases:

1. No hace falta llevar control de nada, todo lo tengo en mi cabeza
1. Mi cabeza no sirve porque hay demasiado que retener y la gente no tiene acceso a mi mente así que
   empezamos un trello/excel.
1. Te das cuenta que trello y excel no son herramientas que se lleven bien con donde habitualmente
   está el código, en un repositorio, así que empiezas a usar un sistema de tickets (github issues
   por ejemplo). Si te estás planteando no tener el registro de tickets en el mismo sitio que donde
   se resuelven es que no sabes que hay empresas que hacen billions gracias a gente que no lo hace.
1. Todo está fino, el repositorio se empieza a llenar y ya no me da la cabeza para tener un "más o
   menos" empiezas a buscar una herramienta que permita separar el polvo y la paja. Usas milestones,
   luego tags, luego kanbans de grupos de tickets de milestones...
1. El sistema de tickets tiene mezcla de ideas de nuevas features, bugs de features que ya han
   cambiado, hay 30 milestones sin acabar, los primeros tickets que pusiste que los dejas porque te
   da pena, una pregunta de uno de ventas y 200 tickets con solo un título críptico que se rellenó
   en un momentito duranta una reunión, 14 etiquetas que cada uno usa según le da la gana.
1. Entonces llega ese momento, buscas qué herramienta te puede ayudar y ahí está [Jira](https://www.atlassian.com/software/jira) que es lo que todo el mundo te ha dicho que lo aguanta todo.
1. La herramienta no lo soluciona y enconces contratas puestos de gestión para gestionar el tema.

## El problema no es la herramienta

El problema es que piensas que tienes tiempo infinito. Si el tiempo es finito, qué sentido tiene
tener un sistema que solo crece?

Mi teoría es que cualquier herramienta que en una empresa permita generar contenido libremente y sin
una estructura definida va a ser un problema en algún momento. Ejemplos: mail, wikis, tickets,
documentos, slack...

En cualquier caso, este post de Joel on Software, [Software inventory](https://www.joelonsoftware.com/2012/07/09/software-inventory/) es básicamente lo que cualquier empresa debe recordar todos los días. No he visto nada hasta la fecha que sintetize mejor las reglas para tener un buen proceso de desarrollo de producto que ese post.

De hecho, como el tiempo es limitado hubo alguien que pensó en que alguien debería tener un rol para priorizar, llamado el product manager, que en mi opinión es fundamental, sobretodo para descartar más que para añadir (que suele ser lo habitual) y no solo en el momento de creación de tickets/features, si no durante el proceso de desarrollo de las mismas.

## La solución

No hay solución, sobretodo si vas a muerte y no tienes tiempo de hacer tareas de mantenimiento. A
quién le gusta revisar los tickets, ver si las features planteadas tienen sentido? Lo que NO es la
solución es buscar una herramienta que solucione un problema de base, está bien buscar una
herramienta que te ayude mapear tu proceso a lo digital, pero esa herramienta no va a solucionar un
problema que está en las personas, esas son las que debes entrenar.

Pero claro, para que una persona sepa discernir entre algo que tiene sentido registrar y algo que no
debe tener una visión más allá de la "siguiente tarea". Cuando transmitir los objetivos de forma
clara no se hace entonces se habla de que hay "problemas de comunicación", pero eso es para otro post.

Uno de mis sueños es algún crear un sistema de tickets/mail donde se tenga dinero y cada cosa que
pongas cueste dinero (se podrían implementar usando blockchain, lo mismo puedo levantar una
rondita), tampoco iba a solucionar el problema, pero por lo menos haría visible el problema para
todos.

En cualquier caso, si vas a pasar a Jira, por favor, integra el repositorio de código con él, no se te paso por la
cabeza el "duplico los tickets que necesite" o hago las referencias manualmente. E invierte tiempo
con el equipo, sea Jira o sea un fichero CSV.

