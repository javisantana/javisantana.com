---
layout: micro_post
published: true
name: "Data Lake, parte II: las fuentes"
---

Nadie crea una empresa con base tecnológica (*) y dice "empecemos pensando en el data lake". Bueno, salvo que tu empresa sea de data lakes.

Si fuese así lo primero que crearísmos sería un equipo de data services que nos diera servicio para que los desarrolladores (y otras partes de la empresa, claro) pudieran almacenar los datos ahí.

Te imaginas tener un servicio donde un comercial conecte salesforce, una ingeniera cree "as a service" una base de datos para el core de la aplicación que sustenta el negocio y que todo estuviera en el mismo sitio y se puediera relacionar. 

No hay que imaginarse mucho, AWS y Google llevan metiendo, poco a poco, todo su arsenal para que tus datos vivan allí y los consumas con sus, relativamente caros, servicios. De qué si no iba Amazon a darte S3 a un precio "tirado"?

Volvamos a la realidad.

El negocio crece, los datos crecen, el equipo crece, escalar tecnología es muy complicado, así que divides los equipos y eso hace que haya una o varias fuentes más de datos.

Llega nuestro amigo el data lake y dice: chavalada, sabéis esos datos que tenéis? pues me los tenéis que pasar o dejar recoger.

Esto en una empresa "nativa digital" es complicado, imagina en un corporate donde hay cientos de fuentes de datos, de departamentos diferentes. "a mi Oracle tú no entras que me lo tiras", "estos datos son confindeciales", "si borro un registro por imperativo legal (GPRD), como lo borras tú, amigo Data Lake"

Y aquí radica el principal y mayor problema de un data lake a nivel de organización. Así que toca hacer cosas como estas :

0. Dejar de llamar al data lake "Data Lake" y empezar a llamarlo "servicios de datos"
1. Hacer fácil que los equipos metan sus datos
2. Hacer que los equipos sientan los datos como suyos aún dentro de un sitio común
3. Hacer que los nuevos equipos/proyectos nazcan con los datos ya dentro del data lake 












(*) La base de todas las empresas es la gente que pasa por ellas, la tecnología facilita.

