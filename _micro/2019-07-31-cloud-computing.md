---
layout: micro_post
published: true
name: "Cloud computing"
---

## Cloud computing

Hace ya unos años se empezó a hablar de cloud computing. 

Para los nativos digitales poder tener máquinas bajo demanda es lo lógico. Para empresas donde los desarrolladores tenían que decir 6 meses antes que máquinas iban a necesitar para poder pedirlas, instalarlas y demás era la panacea.

De hecho, una de las cosas que más te choca cuando empiezas a trabajar con el corporate como proveedor de software es que te piden que les digas el aprovisionamiento necesario para X usuarios. Que dicho de paso, no tienes ni idea porque piensas que tu software escala añadiendo máquinas y bueno, porque saber medir y ajustar la carga requiere de un control absoluto de la mayoría del software que usas y/o tener experiencia con algo que te aplaste (yo aprendí por fuerza bruta gracias a [Google](/2013/06/27/como-aguantamos-una-portada-de-google.html) y el [WSJ](https://carto.com/blog/the-wall-street-journals-2012-election-map-done-with/))

Sin embargo la nube se vendió como un sitio maravilloso dónde tú no tenías que preocuparte de nada, tu software escalaba solo. Típico overselling que cualquier mid manager se podía tragar. Con lo fácil que hubiese sido dejarlo en "tu infrastructura bajo demanda, en menos de 1 minuto". Hoy muchas empresas desarrollan como si tuvieran esa capacidad y están "limitadas" por un datacenter con poca capacidad de cambio.

La realidad del asunto es que empresas como Amazon, Google pueden desarrollar software distribuido resiliente que puede correr en hardware barato que muere cada dos por tres. Y pueden desarrollarlo porque tienen gente muy buena en "bajo nivel", que sabe como hacer software distribuído. Pero la mayoría de desarrolladores al uso nos quedamos en lo que nos da el framework (4 ó 5 niveles por encima de entender lo que significa una split de red), todos veníamos de tener hardware muy bueno (y caro).

La derivada de eso es que tu software sigue pensado para correr en cosas que no falle pero usando servicios AWS que si están pensados para correr en cloud. El paradigma de hacer software par a la nube se basa no en seguir un paradigma (que como digo, es muy complicado y caro) si no en usar unos servicios que proveen (a precio de oro). Así que es normal que todos los proveedores apuesten por microservicios, kubernetes y sistemas complejos donde necesitas apalancarte en su tecnología. Esto no es necesariamente malo, pero no todo el mundo lo necesita (y puede admitir esa complejidad).

La jodido de esto es que no hace mucho hablábamos del grid, dónde el sistema operativo se encargaba de gestionar la complejidad por ti. De hecho la unión Europea se gastó una millonada en proyectos de investigación, subvenciones que lógicamente trincaron los de siempre.

Así que en vez de trabajar en software que sea capaz de paralelizar trabajamos en integraciones con servicios. Lo triste es que lo más parecido a este paradigma son las famosas aws lambda/google run.

Necesitamos otro Torvalds

