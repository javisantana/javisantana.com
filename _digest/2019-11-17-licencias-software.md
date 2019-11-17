---
layout: micro_post
published: true
name: Licencias de software
---

##  Licencias de software

Hace unos meses me escribe de una empresa para echarles un cable para entender si Clickhouse tenía sentido en su plataforma. Para los que no me hayáis escuchado hablar de Clickhouse (y es raro) es una base de datos analítica, no muy conocida, que tiene la mejor tecnología de datos que he visto en años, desarrollada por Yandex, el Google ruso (y este dato es importante para el devenir del post)

Los rusos son gente hecha de otra pasta a nivel de desarrollo. Mi impresión es que son así de bestias por su formación matemática heredada de la cultura que se forjó en la unión soviética (*) (a la fuerza, pero no entraremos en el cómo). Y este párrafo es pura percepción personal probablemente influída porque últimamente hablo con algunos rusos muy listos, pero seguramente sean tan buenos como los españoles :)

Si echas un ojo al software que usamos todos los días hay algo ruso de por medio. Usas postgres? algunos índices están hechos por rusos, nginx? Creado por un ruso, usas Google? El algoritmo de indexación lo creo un tal Sergey Brin... Coge cualquier gran proyecto open source, mira las contribuciones y siempre hay rusos. Compáralo con las españolas (teniendo en cuenta que Rusia tiene 3x población)

Bueno, esta empresa de la que no diré el nombre, pero con un equipo técnico de los más interesantes del panorama startup español, baraja resolver el problema con Clickhouse (entre otros) con un criterio exclusivamente técnico: buscan arreglar el problema con la mejor solución. Pero a la semana del primer correo me escriben de nuevo diciéndome que algunos de sus clientes les habían comentado que usar Clickhouse es un "no" por ser ruso (también hablaban de software chino) y por tanto su proyecto tendría que ir por otro camino con la consecuente consternación del equipo.

No soy abogado y seguro que tienen razones legales o de cualquier otro tipo buenísimas para hacer eso, pero también sé que esos clientes deberían buscar asesoría técnica inmediatamente.

Lo habitual es que cuando tienes una empresa de VC detrás estén muy preocupados por un "exit". Una de las cosas que podría joder un "exit" es la propiedad intelectual del código, imaginate que has usado código de vaya usted a saber quien y cuando vendes tu empresa reclamen su parte, por eso una de las cosas fundamentales que miran es si tu código usa librerias con licencias virales (cómo GPL) o restrictivas. O incluso uses código sin licencia de un menda de GitHub (ahora entenderás el porqué mucha gente pide en tantos repos poner la licencia). [Aquí hay una lista de cosas que un VC suele mirar en una due diligence](https://twitter.com/javisantana/status/1136912731599253504)

Pero no veo que "liability" podría causar un software, código abierto, con licencia Apache 2 por mucho que detrás esté Yandex. Detrás de todo gran producto open source hay una gran empresa. De hecho el modelo mongo o elastic es mucho más peligroso ya que son empresas con grandes cantidades de dinero VC que viven exclusivamente de ese software (al contrario que Yandex), y ya sabéis, cuando empiezan a apretar las ganas de ganar dinero el VC ya no es tan divertido y a veces se estira demasiado la cuerda (que se lo digan a meetup.com)

Pero cabría la posibilidad de que estos rusos metieran, ordenados por su gobierno, unos caballos de Troya en su código. Podría, pero la historia reciente nos dice que es más fácil que llegue por un módulo npm o un ataque dirigido (que se lo digan a Everis) y que no hace falta que sean rusos. Podría ser un "huawei" pero no, el código está disponible y no hay un control global, no hablamos de un despliegue para analizar datos en la NSA.

Aún me pregunto qué puede pasar por la cabeza de esa gente. A mí me daría mucho más miedo pensar que mi startup tenga los passwords en 1password después de la ronda de $200M a que parte de su stack sea un software open source, escrito por unos rusos brillantes fuera de la politica de la gran empresa donde fue creado (si no es imposible que hubiesen construido algo de tanta calidad). O quizá me preocuparía más que tengan que ir a por una solución cloud, de peor calidad (**) por la cual quizá tengan que doblegar en unos años (que se lo digan a los bancos con HP, IBM u Oracle)

Me desmotiva mucho cuando el dinero puede a la razón. Tal vez en este caso estas empresas tengan poderosas razones pero solo se me ocurre algo tan oscuro que pueda entrometerse en estos temas: la política, empresas del gobierno y por relación la "opinión pública". Como en cualquier tema últimamente, puede mucho más la información superficial posiblemente hidratada con algún que otro bulo, que la capacidad para buscar fuentes de información veraces y con criterio. Si alguien dice que el software ruso es malo, lo será.

Por mi parte seguiré usando software ruso, chino (mirad la lista de contribuciones a tensorflow) o español, si hay una cosa que nos pone a todos al mismo nivel es el software, no importa si es alemán, español o ruso, escrito por un hombre o una mujer, un alto o un bajo, lo instalas porque te funciona y resuelve un problema.

### Bonus track

Estos días estoy escuchando el [podcast de inteligencia artificial de Lex Fridman](https://lexfridman.com/ai/), el amigo no es el más dicharachero, pero las conversaciones son interesantes. Concretamente me ha encantando [la primera media hora de conversación sobre lenguajes de programación con Jeremy Howard, fundador de fast.ai](https://www.youtube.com/watch?v=J6XcP4JOHmk&list=PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4)

(*) echa un ojo a la lista de (matemáticos rusos)[https://es.m.wikipedia.org/wiki/Categor%C3%ADa:Matem%C3%A1ticos_de_Rusia] Especial mención a la cantidad de mujeres en la lista.

(**) Clickhouse está fácilmente 3-4 años por delante de cualquier tecnología cloud hasta que llegue lo nuevo de Google, [Procella](https://tech.marksblogg.com/youtube-database-procella.html).


