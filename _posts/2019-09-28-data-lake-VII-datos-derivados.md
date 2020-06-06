---
layout: micro_post
published: true
title: "Data lake VII: datos derivados"
---


No olvidemos que el objetivo final del data lake es poner a disposición de quien necesite la información de la forma que necesitan consumirla. Es decir, todo lo que he escrito anteiormente no deja de ser grasa, lo importante es poner a disposición la información

Y esto tiene muchos planos, por un lado el que información se necesita, normalmente derivada de la intersección de varias fuentes de datos, y otra el como: a veces se necesita información en tiempo real, otra un sistema analítico para poder hacer descubrimiento, otro se analítica y a veces simplemente se necesita poder exportar a un formato específico (por ejemplo, Excel)

Es decir, tiene que tener la capacidad de transformar y mezclar datos si no que además tiene que soportar cargas de consumo de diverso índole.

Por poner un ejemplo, querríamos disponer de información para servir la analítica de una parte de nuestro negocio en tiempo real (con requerimientos de baja latencia y mucha velocidad) y a su vez tener esos mismos datos disponibles para que un data scientist haga queries muy pesadas para entender y modelar el dataset.

Y claro, que un tipo de carga no afecte a la otra. Y que además este actualizada en tiempo real con nuestro sistema productivo.

Así que, de una y otra forma estamos pidiendo que el data lake sea capaz de ser tan bueno como postgres en carga transaccional, tan bueno como spark para hacer análisis en batch, tan rápido como hbase y siendo capaces de tener capacidades de analítica en tiempo real como kx o Clickhouse.

Y obviamente esto es imposible de tener al mismo tiempo, de ahí que tengamos que replicar los datos.

En general, los casos de uso que debería ser capaz de sustentar son:

1. Capacidad analítica: es decir, permitir usar BI, herramientas internas, excel o similar para
   entender los datos

1. Capacidad analítica++, es decir, permitir casos de uso más avanzados que permitan a gente con más
   conocimiento técnico usar sus herramientas (jupyter/python, R)

1. Alimentar sistemas transaccionales. Es decir, una parte del negocio necesita datos de otra parte?
   el sistema debería ser capaz de poner en su base de datos (mysql por ejemplo) esos datos

1. Exponer los datos como API. Este es el caso ideal en vez del anterior porque permite a cualquier
   sistema beber de los datos, independientemente de su naturaleza.

1. Enviarlos a sistemas variados, S3, FTP, herramientas SaaS...

Y aquí puedes imaginar todo lo que se te ocurra.

