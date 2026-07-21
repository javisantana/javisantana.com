---
title: "Mis principios de ingeniería de datos"
date: 2023-12-25
layout: post
source_url: "https://javisantana.substack.com/p/mis-principios-de-ingenieria-de-datos"
substack: "javisantana"
substack_id: 140033695
---

A menudo pensamos que hay una sola forma buena de hacer las cosas. La realidad nos dice una y otra vez que no es tan importante el camino si no la experiencia que tengas en hacer las cosas de la forma que hayas elegido.

Puedes ir por tu propia vía, tirar por una existente, una mezcla, da igual, la parte interesante no es lo que te da seguir una filosofía, es lo que no te quita, que es el tiempo en estar pensando que tu opción no es la adecuada. Posiblemente no lo sea pero nunca lo sabrás si no profundizas. Y si, insistir en tu propia forma de hacer las cosas ayuda.

Hay gente que se dedica a ir probando cosas sin profundizar y terminan haciendo cosas[ sin saber muy bien porqué](https://javisantana.com/inspiration/2022-04-18-new-vs-improved.html). No se trata de cambiar nunca, se trata de explorar lo suficientemente lejos.

Mi carrera en los últimos años ha estado enfocada en al trabajo con datos, siempre en lo que me gusta llamar “alto rendimiento” y nunca había escrito los principios que sigo. Nunca está de más invertir un rato en explicárselos a uno mismo, por aquí los dejo.

**Los datos tienen que servir un propósito.** 

Cuando generas datos deben tener un fin, y solo se deben generar los datos que van a ser útiles para eso.

No me creo que almacenar datos por almacenarlos sirva para algo, empresas almacenando datos sin valor. Y si el propósito último es almacenarlos, deberían cumplirlo a la perfección, es decir, ocupar poco, no consumir mucho, ser seguros, y sobre todo, ser capaz de eliminarlos cuando ya no sirvan.

Por eso no me creo mucho el “datawarehouse”, la de millones de € que se van en procesar y almacenar datos que nunca se usan es impresionante.  Recuerda, la primera regla de cualquier ingeniero de datos es “el mejor dato es el que nunca se escribe, o mejor, nunca se genera”

Siempre que empiezo a diseñar un proyecto de datos lo hago por el mismo sitio: qué problema se quiere resolver, es decir, empezar por el final. Todos los proyectos que he visto donde se empieza por “pongamos tal tecnología”, “vamos a pensar en el modelo de datos y luego ya vamos viendo”, “hagamos un sistema genérico”, “guardamos en JSON y luego ya se verá” terminan mal y/o son carísimos.

Destilar,  condensar y explicar los datos es un arte, aunque la mayoría de veces se usa una herramienta de BI.

**Cualquier análisis sobre los datos debe ser rápido.**

Los humanos funcionamos con el oído, la vista y otros sistemas que son prácticamente instantaneos, así debería ser cualquier cosa en la que una máquina que es mucho más rápida que un humano.

Programé videojuegos y 3D durante una temporada, en un juego tienes que hacer todos los cálculos en 16ms que es lo que dura un frame de una animación para que parezca fluida. De hecho empecé a programar gracias al código fuente del Quake (fue publicado en el 1999) que, aunque accede a una cantidad de información bastante grande, mantenía la velocidad incluso en aquellas máquinas. El código del Quake debería estudiarse en la universidad y dejarnos de tanta “programacion orientada a objetos”

**El feedback debe ser instantáneo.** 

No solo se trata de que los datos sean rápidos, es que no debería pasar mucho tiempo desde que se generan hasta que se usan. 

Un examen se puede estudiar todos los días o el último, adivina qué técnica es la mejor para aprender (que no tiene nada que ver con aprobar un examen)

**Los datos sobre los datos son tan importante como los propios datos**

Cuando las cosas pasan deprisa, tienes que saber qué está pasando, anticiparte, detectar cuando hay un problema, entender o símplemente quedarme mirando una gráfica que se mueve durante minutos por el simple hecho rendir tributo a la cantidad de cosas que tienen que pasar, de forma orquestada, para ver ese numerito en la pantalla.

Sí, es esto lo llamamos metadatos, y al ser meta, todas las reglas anteriores aplican.
