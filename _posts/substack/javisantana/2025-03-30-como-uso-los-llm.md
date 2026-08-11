---
title: "Como uso los LLM "
date: 2025-03-30
layout: post
source_url: "https://javisantana.substack.com/p/como-uso-los-llm"
substack: "javisantana"
substack_id: 160174776
description: "Edición Marzo 2025"
cover_image: "/blog_images/imported/77d5a04f-2672e6ab-9bbf-44fc-b453-b647c2e77c1f_3454x1748.png"
---

Lo que pueden hacer los LLMs es básicamente un sueño hecho realidad para mí. Soy un "builder", me gusta construir y me parece magia todo lo que está pasando, es como revivir la época cuando aprendí a programar. Peeero como siempre que llega algo nuevo, está lo que idealizamos y luego la vida real, cuando la tecnología toca suelo, hay que hacerla funcionar y adaptarla al caso real. Aquí voy a ir al caso práctico, para hablarte de cómo la IA va a cambiar el futuro futuro, puedes ir a LinkedIn y leer a todos los chamanes, que no dejan de ser los mismos middle managers que no saben ni por dónde les viene, que han encontrado la nueva vía de hacerse notar.

Voy a dejar por escrito cómo estoy usando estos sistemas a día de hoy, como digo, a nivel práctico, enfocado en la construcción de productos (seguramente haga algún update de vez en cuando), dejando a un lado las preguntas de todos los días que antes hacías a Google y ahora las hago a Grok (pago suscripción a Twitter y con ella tengo acceso a deepsearch que es bastante bueno). y ChatGPT. Esto ya lo saben hacer hasta los niños de 6 años, incluso dan cursos en las empresas de como usar ChatGPT, así que no voy a entrar en detalle.

Una nota sobre las herramientas; uso exclusivamente dos herramientas e intento hacerlas al nivel más básico posible. Con los años te das cuenta que profundizar en detalles te hace perder foco y el tiempo en cosas que aportan bastante poco, es mejor centrarte en la funcionalidad core y listo.

La primera es Cursor. Si no sabes que es, seguramente este post no sea para ti, si realmente estás interesado, buscarás que es y lo probarás.

La segunda es `llm`, una herramienta de línea de comandos que tiene lo justo y necesario para trabajar con LLMs a alto nivel, sin tener que usar el API de OpenAI y permite automatizar fácilmente. Algunos ejemplos básicos que cubren el 99% de lo que uso y explican la herramienta.

```
$ llm "this is my prompt"
$ llm -m gemini-2.0 "this is the prompt"
$ llm --system "you are an expert on this" "the prompt"
```

# **Usos prácticos**

"Vibe codeo" bastante, concretamente hay dos herramientas que he “programado” que uso en mi día a día para hacer mi trabajo:

1. 

El editor de texto que estoy usando para escribir esto es una aplicación, toda contenida en un "index.html" que me permite escribir y además usar LLMs para ayudarme con cosas como corregir el inglés, contarme si hay frases que a un nativo le suenen mal, reescribir el documento como si fuese "Pérez Reverte", hacerlo más corto, etc.

![Image](/blog_images/imported/141f2a83-2672e6ab-9bbf-44fc-b453-b647c2e77c1f_3454x1748.png)

Para ello uso Cursor, abro un nuevo proyecto, creo un index.html y le pido lo que quiero dejando claro que quiero una aplicación html/css/vanilla javascript.

1. 

La herramienta que uso a nivel de producto para entender el "journey" de los usuarios de Tinybird, desde que llegan a la web, cuando se registran y como usan el producto. Uso el mismo sistema que antes, Cursor + app básica escrita en html/javascript, integrando con las API de Tinybird y PostHog para recoger datos y mostrarlos de una forma lógica.

![](/blog_images/imported/113a11da-25a1298c-b0eb-43ff-8d74-da3b5ea052e7_2310x1552.png)

Son aplicaciones muy muy sencillas, muy ad-hoc a como me gusta hacer las cosas. Son un puto traje a hecho por ti con un implante cerebral del mejor sastre del mundo vs uno de Zara de 119.93€. Es absurdo que en unos meses las aplicaciones, no solo las escriba quien las necesita, sino que las aplicaciones no sean fijas y no cambien todo el rato (sí, ahora estoy haciendo de chaman)

A nivel de gestión de producto & marketing:

Dejando a un lado que en Tinybird ya no se hace una feature sin pensar como aplicar esto, de hecho acabamos de rehacer una parte del producto donde el foco está en mejorar el trabajo con LLMs. No tienes que convertir tu producto en un chat, pero usarlo para tareas que son un auténtico peñazo es un buen comienzo.

En Tinybird genero una newsletter cada dos semanas donde enviamos los artículos que el equipo ingeniería de Tinybird lee. Me gusta saber qué lee la gente del equipo y esto es una excusa perfecta. Además, mantiene a la gente que sigue Tinybird un poco más pegada a la empresa. El sistema es simple: hay un pequeño bot que lee un canal del Slack interno de la compañía y en base a un prompt genera el correo para enviar a la lista de correo.

Para que nadie se sienta estafado por leer algo generado automáticamente le he dado personalidad propia al bot. Esto es una parte del prompt:

```
 Get the comments people made for each link and generate a brief comment about it. It should be funny, like making fun of the people in the company, but in the possitive [positive] way. We love to troll each others [each other] in this company. You act as an editor, you should have your own voice and speak in first person. This was the last one@newsletter.md
- Try to guess the company position based on their comments
- Do not mention names just leave what you think is the position
also introduce you at the beggining [beginning], your name is lebrelbot you work at tinybird, an AI bot and don't care about what other people say about
```

En las primeras iteraciones le dije que fuese un poco "pasivo-agresivo" y tuve que quitarlo porque los LLMs son especialmente buenos dando donde duele.

Para estas automatizaciones uso llm, por ejemplo, el comando para generar la lista de correo es:

```
uv run llm  -m gemini-2.0-flash --system "$(cat prompt) today is $(date)" "$(cat 2025-03-28/chat) `curl -s https://www.tinybird.co/blog-posts/rss.xml`"
```

Le paso el prompt que comentaba antes, la fecha para que sepa donde estamos, el chat según viene de Slack (sin formatear, para qué perder el tiempo) y el RSS con los posts del blog Tinybird (que incluye al final de la lista). Te puedes suscribir [aquí](https://faster.tinybird.co/schema-evolution) si tienes curiosidad. [Este](https://gist.github.com/javisantana/55550118e3030476ffd762c13f1246fa) es la última edición.

Al hilo de lo anterior, pensé: puede un LLM emular el estilo de escritura de una persona leyendo lo que escribe en los canales públicos de Slack. Hice un pequeño test de usar mi estilo de escritura (pero como si fuese americano nativo) y meter el bot en un canal de slack a que respondiese cuando alguien le pregunte. Era bastante cabroncete por ser honestos y tuve que pararlo. Los hijos y los LLM reflejan los peores actos de cada uno.

Como anecdota, cuando le pedí que hiciera un perfil de la persona se me olvidó "de escritura" y me sacó un perfil de todas las personas del equipo. No sé si es efecto horóscopo (escribe lo que quieres escuchar) pero es muy bueno calando a la gente.

Me parece un tema bastante interesante, de hecho hay más gente haciendo esto [para simular audiencias](https://every.to/podcast/100-ai-personas-said-you-d-click-this).

También lo uso para generar informes del comportamiento de los usuarios de Tinybird a nivel de producto, es decir, qué hace un usuario, donde se atasca, qué hace bien. En Tinybird guardamos todos los eventos (nuestro producto sirve para guardar datos, así que parece obvio) de lo que hacen los usuarios. Es una tabla muy con `user_id, timestamp, event_data`. En vez de usar una herramienta a medida, símplemente cojo los eventos y hago pipe al llm. Es algo más complejo que esto porque elimino bastante información para reducir los tokens que necesito enviar al LLM (aunque gemini tiene un contexto muy aceptable) y eliminar detalles de errores y otras cosas que no sean puro metadato.

```
curl https://api.tinybird.com/v0/pipes/user_events?user_id=lebrel | llm -m gemini-2.0-flash --system "You are an expert in analyzing user behavior on Tinybird, a web platform to work with analytical data. The first thing you'll recieve [receive] is a JSON with all the events from an user using Tinybird (a web platform to work with analytical data), generate a summary of what the user did.
    You should include the following sections with a title for each one:
        1) relevant dates
        2) a timeline of events per day/week/month
        3) what errors the user hit
"
```

El prompt es mucho más extenso, pero te haces una idea. Y si no, preguntame y te lo paso completo.

# **Otros temas**

Sin un orden particular.

- 

Optimización de SQL y tablas, [ejemplo](https://gist.github.com/javisantana/56a8262dcd65e2b511e5cc3cd6705b07)
- 

Generar títulos y draft de posts sobre clusters de temas de los que quiero escribir:

  1. 

Busco una lista de correo de la que me guste el estilo. Copio la lista completa en un fichero (sí, todo el contenido junto)
  2. 

Voy a Grok research y le pregunto que en base a Reddit y otros sites me genere 50 títulos con, por ejemplo, "top problems and use casesdata engineers when dealing with real time data". Copio la lista en otro fichero.
  3. 

Pongo cursor en modo agente (que va haciendo cosas por ti de forma semi desatendida) y le digo: "generate a blogpost for each title following the style of this mailing list. Add examples on how to do it with Tinybird". Además le paso el prompt super curado que tenemos para Tinybird (tú ya tienes el prompt para tu producto, verdad?) Hice un test de pasarle a mis compañeros el post para que me lo revisaran (como si lo hubiese escrito yo) y solo una persona se percató de que era 100% automático. Un ejemplo de lo que genera, ["how to build a recommendation engine"](https://gist.github.com/javisantana/52cb019c7e77ff676d1941a7a37ccacb)

- 

Uso bastante lo de generar visualizaciones ad-hoc para cosas, por ejemplo, para hacer debugging de ciertas cosas. Un [ejemplo con una traza GPS](https://x.com/javisantana/status/1877953983001620629).
- 

En general, cualquier cosa que me llega, abro un terminal, copio el contenido en un fichero y tiro un `cat file | llm --system "whatever I want to do"`
- 

Hago bastante el "critica esto que he escrito de forma dura, se un poco pasivo agresivo manteniendo el humor, esto me ayuda mucho a mejorar". Te advierto que es duro leer las críticas y si tienes la piel fina, no lo hagas. Ningún humano que no tenga problema social va a ser tan sincero. Aún no he probado a pasarle una foto y decirle lo mismo, pero si no ha pasado, va a pasar.

Estoy en una fase ahora donde estoy empezando a automatizar de forma desatendida, por ejemplo para hacer matching de problemas reportados en Slack con tickets en gitlab, pero aún no he profundizado casi nada, así que lo dejo para la siguiente edición.
