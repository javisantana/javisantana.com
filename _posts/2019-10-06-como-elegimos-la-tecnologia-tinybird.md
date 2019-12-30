---
layout: micro_post
published: true
name: Cómo elegimos la tecnología en Tinybird
---

Creo mucho en que la mayoría de empresas de tecnología deberían empezar con un servidor de 30€ al mes, con un stack basado en PHP (o unos ficheros HTML y algo como firebase) y en el que el equipo técnico, trabajando mano a mano con negocio, vaya editando directamente en producción hasta tener market fit. Rompe absolutamente todas las buenas prácticas, pero es interesante recordar dos cosas:

1) Tarde o temprano tirarás el primer código (así que cuanto antes mejor)

2) Lo que importa es validar que el negocio tiene sentido no que eres el que mejor arquitectura tienes. Un buen técnico se define también por saber cuando NO invertir tiempo en algo.

Así que todo lo que diga en las siguientes líneas cógelo con pinzas porque ni yo sigo mis propios consejos.

### La tecnología acompaña a la empresa

La mayoría de las decisiones tecnológicas que hemos y estamos tomando vienen dadas por la experiencia en CARTO, sobretodo la última fase que viví que fue el cambio hacia B2B. Así que, dado que Tinybird es una herramienta también 100% B2B, de bajo nivel (plataforma) y orientada a trabajar con datos hay una serie de cosas que tuvimos en cuenta antes de arrancar(*):

- La integración es una parte del negocio (como una gran parte del negocio B2B) así que el producto se piensa desde el API
- Es posible que necesite correr onpremise.
- En cuanto al equipo, el tipo de perfil técnico no es el típico programador de framework, este producto necesita de gente que le guste el bajo nivel y saber como funcionen las cosas, así que de entrada nos olvidamos de seguir las (en la mayoría de veces absurdas) corrientes del desarrollo "moderno"
- No tenemos un equipo de 10 personas, así que tenemos que usar tecnología existente. 
- El equipo de ventas y marketing es posible que tenga que ser tirando al lado técnico (igual que soporte). Dicho de otro modo, tiene más sentido tener "tech evangelist" haciendo pruebas de concepto y escribiendo post técnicos que gente llamando a puerta fria.


### Algunas de las decisiones

Aquí algunas de las decisiones, sin un orden muy definido, la mayoría de ellas bastante dogmáticas.


**Nada de servicios externos**. El onpremise es algo que va contra el "sentido común" de un producto SaaS pero a veces ciertas empresas no quieren (o pueden) sacar datos de sus servidores. Y Tinybird es una herramienta que en muchos casos tiene que vivir cerca del origen de los datos. Piensa en tinybird como un nitro para tu base de datos actual, así que tiene que colocarse allí donde haya que acelerar. Esto nos da una ventaja competitiva con respecto a Big Query o Redshift (además de otras muchas que iré comentando en siguientes entregas)

No usamos ni un solo servicio externo, todo funciona en un portátil sin conexión a internet. De hecho una cosa que te permite no depender de servicios de amazon/google/azure es que puedes montar tu producto sobre hardware de verdad. Otro ejemplo de esto es Algolia que decidió usar servidores "de verdad" [y aquí explica muy bien las razones](https://www.algolia.com/doc/guides/scaling/servers-clusters/). De hecho el poder hacer esto añade una capa de seguridad (nosotros separamos los datos de los clientes de forma física) también muy bien acogida por el corporate. Y obviamente todo mucho más barato que en la nube.

Tenemos que empezar a perder el miedo a explicar que debajo de nuestros servicios hay servidores y recursos finitos cuando los servicios son basados en recursos.

**Lo más sencillo posible**: relacionado con el anterior, nada de kubernetes nada de miles de servicios. No significa que en la parte SaaS no podamos usarlos, pero evitándolos siempre que se pueda. La aplicación tiene el código para el aprovisionamiento, deployment, tareas como backups y mantenimiento y toda la parte de frontend.

Obviamente solo un repo (salvo una extensión que haremos open source), no creo que tenga sentido tener más de un repo salvo que casos muy específicos, al final tener diferentes repos, aunque suena muy bien, se convierte en un problema de gestión añadido y de integridad de tu sistema.

Todo concentrado en gitlab: repo, tickets, CI, testing. La documentación es el mismo repo. También tenemos el CRM y el blog en gitlab.

**Número de dependencias mínimo**, es preferible invertir 2 días de trabajo y saber lo que está pasando a usar la dependencia que encuentras en github. Solo usamos dependencias que o bien conocemos o bien hay poco riesgo de que sean un problema por no conocerlas. Se pide perdón cuando haces un commit con una dependencia nueva.

Ahora mismo la aplicación se instala con `pip install tinybird.whl` y se ejecuta con un `tinybird_server`. No necesita balanceador, es un solo proceso corriendo en la máquina, punto. Obviamente tenemos un balanceador para tener alta disponibilidad, pero no sería necesario.

Tampoco usamos base de datos al uso, el volumen de usuarios que esperamos no es algo, así que usamos un sistema basado 100% en memoria y almacenamos los datos o bien en disco o en redis (si hay HA). Para la parte analítica guardamos todos los eventos que se producen en la aplicación (obviamente en clickhouse para analizarlo con nuestro propio producto) De esta forma cumplimos con todos las requisitos de trazabilidad que suele requerir el corporate.

Y obviamente esto incluye dejar fuera a los frameworks y toolkits. Usamos las partes que nos interesan de tornado (un framework web muy sencillo) y React. Es cierto que el onboarding técnico se hace difícil encontrar gente, pero es que somos nosotros los que hacemos el framework, nuestro target son precisamente perfiles que les guste saber lo que hay por debajo del framework.

Por otro lado, en mi opinión los equipos de tecnología no escalan bien, este producto está pensado para tener un nucleo de personas muy pequeño (como, en realidad, casi todas las empresas, aunque no lo sepan) y tener los complementos orbitando (tanto en equipo como en tecnología)

**La velocidad es clave**, así que usamos C++ para las partes críticas (por ejemplo, la construcción de árbol de dependencias SQL o el parsing de CSV) y python para la capa de gestión y partes no tan críticas. Me asombra como la mayoría de las empresas pasan la velocidad por alto pero fijaos en trello, figma o [notion](https://twitter.com/NotionHQ/status/1166112243479539712?s=20)

Al hilo de lo anterior y de que teníamos que partir de tecnología existente para acelerar el producto, **usamos Clickhouse** (una maravilla de la ingeniería). Como ya tenemos una edad para tirarse a la piscina sin mirar si tiene agua, antes de usarla me pegué 1 año estudiando como funcionaba, [haciendo pruebas de concepto](https://twitter.com/javisantana/status/867062357926739973), [probando si era viable contribuir al código](https://github.com/ClickHouse/ClickHouse/pull/1908), [hablando con los desarrolladores](https://twitter.com/javisantana/status/1106116138117795840) y echandoles un cable con el diseño de la parte geospacial. Además, antes de arrancar monté unas charlas y asistí a otras tantas relacionadas con datos para ver como estaba el sector.

**El testing**: el máximo end to end posible y usando doctest para partes unitarias. Muchas veces la aproximación es prototipo con test mínimos, prueba y luego desarrollo de tests. Por otro lado invertimos más tiempo de testing en lo que consideramos que tiene más valor.


**Insistimos mucho en metricar** y tener las partes críticas bien medidas. Cuesta poco y así probamos nuestra propia plataforma.

Luego hay otros temas como por ejemplo, no tenemos sistema de usuarios interno, siendo realistas, te ahorras un dolor tremendo en la gestión de usuarios y cualquier empresa va a quererlo integrado con su sistema de autenticación. Quieres además estar integrado con su sistema para eliminar barreras a que más usuarios usen la plataforma.

En general intentamos entender bien lo que usamos, que además sea lo más robusto/probado posible, simplificar todo lo que se puede (teniendo en cuenta que un sistema de datos de por si es complejo) y mantener la burocracia en mínimos pero no tan mínimos que no permita escalar el equipo.

(*) el primer commit es de Febrero de 2018
