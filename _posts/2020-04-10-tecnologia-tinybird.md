---
layout: post2
published: true
name: Tecnología en Tinybird, parte 2
---

Hace unos meses escribí [un post](/2019/10/06/como-elegimos-la-tecnologia-tinybird.html) sobre las decisiones que tomamos en tinybird en tecnlogía, este la continuación (y espero ir actualizándolo cada 6 meses). Pero un par de notas antes de empezar.

Para mi producto y tecnología son exactamente la misma cosa. Mejor dicho, forman un conjunto que no tiene sentido separar en una primera fase. Para bien o para mal decisiones que se toman en un sitio afectan a otros en formas totalmente inesperadas. Mejor asumirlo desde el principio y tener en cuenta que no todas las decisiones técnicas son puramente técnicas. Solo el que hace tecnología por la tecnología puede hacerlo así.

En tecnología ya solo hacer que las cosas funcionen es complicado. Nosotros hemos elegido un stack de tecnologías "conservador" porque queremos que las cosas funcionen. No nos movemos por lo que hagan otras empresas, hacemos las cosas porque pensamos que es lo correcto para la nuestra.

De las cosas fundamentales nada ha cambiado especialmente, y esto es de lo mejor que podía pasar.

Seguimos usando solo dos lenguajes backend (python y C++) y javascript en el frontend. Buena decisión que tenemos que mantener. Para algunas cosas python no es lo mejor, C++ no es lo más rápido de desarrollar pero ningún lenguaje es perfecto.

Hemos añadido una pieza grande más al stack de desarrollo: ansible. Por alguna razón, viendo ansible, y habiendo visto chef, algo me dice que el mundo del aprovisionamiento está un pelín roto. Seguramente porque cada proveedor de cloud ha tirado por su lado y que docker nos ha llevado unos 15 años atrás. Pero ansible era sencillo, basado en python y sobretodo, tiene la mayoría de recetas que necesitamos (más en el siguiente punto)

Hemos complicado la arquitectura un poco. En realidad es bastante. Hemos tenido que atacar algunos proyectos en los que necesitabamos escalar bastante y eso requiere más piezas. Los sistemas distribuídos incrementan la complejidad órdenes de magnitud.

Así que ahora tenemos nginx para balancear, redis para la persistencia (con su sentinel), zookeeper para coodinación de replicación y varnish para balanceo y cache (que no usamos ahora mismo). Y clickhouse para almacenar datos, claro.

Pensarás, si usas nginx para qué varnish? bien, conocemos muy bien varnish y nos permite balancear exactamente como queremos (el balanceo de carga lo hacemos en base al análisis del SQL y de los datos en cada máquina para aprovechar localidad de datos y caché, esto daría para otro post). Usamos nginx casi exclusivamente por https, esa es la realidad.

La persistencia que hacemos es un poco diferente a lo habitual. Usamos redis para guardar los datos fundamentales de los usuarios en un formato lo más eficiente para consulta y trabajo desde aplicación (el formato en el que guardamos mapea al modelo de datos de consumición en python) en vez de usar un modelo relacional puro. En clickhouse guardamos todo el histórico de operaciones (un kafka pero a la inversa, para los milenials). Dicho de otro modo, si queremos hacer una consulta sobre lo que ha pasado o hacer analítica vamos a clickhouse. Si vamos a responder una petición de API sobre cuantos datasources tienes vamos a redis (la mayor parte de veces no tocas ni redis).

Ya sea en redis o clickhouse todo tiene esquema. Cuando modelas una aplicación tienes dos momentos de elegir el esquema: cuando guardas o cuando lees los datos. La segunda es como estudiar el día antes del exámen, es mejor ir haciendo el trabajo poco a poco.

La razón de hacer esto así en vez de usar una sola base de datos con todo es: rendimiento y sobretodo poder usar nuestro producto para construir nuestro producto. Toda la analítica que sacamos del propio uso de la plataforma la hacemos con la propia plataforma (de hecho [exponemos al usuario](https://docs.tinybird.co/api-reference/service-datasources.html) parte de esas tablas internas). Podrás pensar que dedicar tiempo al rendimiento es absurdo en una empresa que está validando su modelo, pero tenemos algunos SLA que nos exigen estar por debajo de tiempos de respuesta y aquí necesitas ser rápido y predecible.

Hemos además dividido algunas partes de la aplicación en varios procesos. Fundamentalmente es una decisión para que los despliegues en alta disponibilidad sean más sencillos pero en desarrollo todo sigue siendo un solo proceso maravilloso. Este arranca threads y otros procesos, pero no tienes que gestionar comunicación ni procesos ni todo el cristo de docker-compose punto yamol. En desarrollo no necesitas ni nginx, ni varnish ni flatuas.

Gitlab es una autentica joya. Seguimos usándolo para absolutamente toda la automatización y rara vez nos ha dejado tirados. Además no dependes necesariamente de ellos porque tienes sus "runners" que permiten ejecutar todo en local así que puedes seguir desplegando aunque esté caído. El balance es muy bueno entre el servicio y la autonomía. Es un lujo depender de una sola herramienta para todo el desarrollo. Cada día me gusta más la estrategia que tienen como producto.

Por otro lado durante estos meses hemos encontrado esos problemas que te hacen ver que estás en producción y que cuando están arreglados hacen de un producto un buen producto. El típico fuego que no sabes de donde viene, no entiendes y termina siendo un bug que metiste por algo inesperado.

El numero de bugs registrados ha crecido a más de 100. Hay una categoría especialmente importante que es la de "PAIN". Hay veces en las que hay pequeñas cosas, que por pequeñas parecen poco importantes, pero que son los que por aculumación terminan por hacer de un producto algo mediocre. Intentamos atacar esos primero, pero lo cierto es que, como siempre, tenemos mucho más trabajo del que podemos atacar.

Durante estos meses también hemos estado desarrollando proyectos. Muchas veces para salir del paso se desarrollan pequeñas herramientas que terminan siendo clave en el producto. No hay nada mejor que lo que desarrollas del fruto de la pura necesidad.

El código por otro lado empieza a tener partes complejas. No solo porque intrinsicamente lo sean, que también, si no porque al ir añadiendo funcionalidad o resolviendo casos extremos generas complejidad. El mayor error de los equipos de desarrollo es no asumir que hay cosas complejas. En vez de asumirlo y tratar de documentarlo, explicarlo y hacer que la gente invierta tiempo en entenderlo, tratan de refactorizar para simplificar sin tener en cuenta que ni lo conocen, ni pueden eliminar la complejidad intrínseca ni que van a añadir otra complejidad diferente.

Hay cosas que son muy importantes que no hemos tenido tiempo de atacar, por ejemplo, casi no hemos contribuído a clickhouse (la base de datos que usamos por debajo), apenas unos commits sueltos.

En resumen, a pesar de intentar mantener todo lo más sencillo posible, hay complejidad que no puedes evitar. Aún somos capaces de gestionar todo entre 3 personas (2 backend + 1 frontend) con consultoría de por medio.

La semana que viene entra la primera persona que contratamos al equipo de desarrollo. Aquí viene el siguiente reto, sobretodo porque es 100% remoto por razones más que obvias (estamos en medio de la cuarentena, por si lees esto en un futuro) y es la primera persona que entra sin haber estado desde el día 0.



## Bola Extra

El equipo de Tinybird llevamos ya unos años haciendo aplicaciones de alto rendimiento. El chat de Tuenti, una portada de Google ([el making of](/2013/06/27/como-aguantamos-una-portada-de-google.html) ), el [mapa de la portada del WSJ](https://carto.com/blog/the-wall-street-journals-2012-election-map-done-with/) cuando Obama ganó sus segundas elecciones, gestionado un cluster de cientos de máquinas sirviendo en tiempo real y un largo etcétera.

Durante estos años hemos ido aprendiendo, la mayor parte de veces a base de prueba y error, investigar como funciona el software y hardware y como interactuar con ellos. Nunca habíamos recopilado toda esa información, símplemente era conocimiento que estaba repartido en notas, presentaciones y obviamente nuestras cabezas.

Así que hemos decido crear "principios de analítica en tiempo real para grandes cantidades de datos" un curso que explica, siguiendo nuestros principios de entender como funcionan las cosas, como hacer analítica en tiempo real con grandes cantidades de datos explicado desde las bases.

El curso estaba pensando para hacerlo en persona (de hecho era el onboarding de nuestro primer empleado) pero dadas las circunstancias lo vamos a hacer, resumido, online. Es un curso de fundamentos, no está relacionado con ninguna tecnología concreta. Si explicas las bases con lógica y de manera sencilla, aplicarlo a tu día a día, da igual que uses una base de datos u otra, es trivial.

Lee toda la información y **apuntate gratis -hagamos la cuarentena un poco más llevadera- por aquí: [Principles of real time analytics on large datasets](https://www.tinybird.co/courses/principles-of-real-time-analytics)**
