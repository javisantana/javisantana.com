---
layout: post2 
published: true
name: "Data Lake, parte III: El catálogo"
---


Además de poder [importar datos de forma sencilla](/micro/2019-06-14-data-lake-fuentes.html) hay otro tema fundamental que es saber qué datos has importado.

No me refiero solo a saber "el día 25 importamos estos datos" si no a saber de qué van esos datos:

- Qué: datos de ventas
- Cúando: creado el 7 de septiembre del 2018
- Cómo: carga masiva de vaya usted a saber
- Fuente: Oracle
- Nombre Campos: A, B, C, D
- Descriptión técnica de los campos: ...
- Descriptión de negocio de los campos: ...
- Relaciones de los campos con otras fuentes de datos: ...
- Historial de cargas

Obviamente son todos los que están pero no están todos los que son. De hecho hay un tema peliagudo que es el control de los cambios, pero eso lo vamos a dejar para la parte IV.

Pero esto no es todo. Aunque tengamos catalogados con absoluta perfección no solo tenemos los datos que entran, si no los que salen.

No tiene sentido tener un data lake sin poder explorar esos datos. Y lo habitual no es consultar los datos de entrada si no más bien datos derivados que muy posiblemente vengan de un JOIN (JOIN de SQL para los que vengan de usar Mongo) con otras 3 ó 4 fuentes de datos (alguna posiblemente externa). De hecho es casi más importante este catálogo como el de los datos de entrada. Pero de eso hablaré en la parte VII.







