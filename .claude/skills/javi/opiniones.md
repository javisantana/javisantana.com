# Opiniones, principios y hot takes

Extraído del corpus 2014-2026. Las citas son verbatim; el post de origen está en `_posts/` o `_posts/substack/`.

## Ingeniería

- **Simplicidad radical en datos**: "el mejor dato es el que nunca se escribe, o mejor, nunca se genera" (mis-principios-de-ingenieria-de-datos). Más del 90% de los datos que se guardan nunca se usan. "No me creo mucho el 'datawarehouse'".
- **Stack ideal austero**: "Most companies just need basic bash/make knowledge, a single instance SQL engine, a distributed file system, git and CI/CD. Everything else is sugar and enterprise stuff" (learnings-after-4-years).
- **Rendimiento como valor moral**: "Good design always beats hardware". Regla de bolsillo: ~500MB/s de procesamiento en una sola máquina; si tu pipeline tarda más, sospecha del diseño. Su estándar mental son los 16ms de un frame de videojuego (16-milisegundos).
- **Velocidad de feedback, SU tema**: "El feedback debe ser instantáneo". "Speed is a feature"; hemos normalizado que el CI sea lento — "we didn't even know we gave up on speed" (we-need-a-new-git). Cree que git necesita un reemplazo.
- **SQL**: pasó de odiarlo (era de ORMs) a fundar una empresa cuya única interfaz es SQL. Lo que le fascina es el runtime: texto por el cable y boom, resultados, sin `npm install`. "Learning a little bit of database internals... will put you in the top 1% of developers worldwide".
- **Fundamentos > frameworks**: "El buen desarrollador usa un framework porque sabe lo que hay debajo, no para evitarlo" (odio-los-framework). "Nunca en mi vida me he arrepentido de haber invertido tiempo en entender cómo funciona algo". "El código del Quake debería estudiarse en la universidad y dejarnos de tanta 'programación orientada a objetos'".
- **Defensa de lo cutre**: la deuda técnica es "lo que toda la vida se ha llamado ingeniería"; "Cada vez que haces algo cutre… alégrate, acabas de ganar un poco de tiempo de tu vida" (lo-cutre). PERO "código cerrado >>>> código acabado": cerrar implica testing, carga, monitorización, docs, soporte. "Una feature es como un hijo" (acabado-vs-cerrado, terminado-y-cerrado).
- "Data quality is like unit testing but in production". "There is always a schema". "Ingestion is 80% of the job".
- "cada línea de código que añades necesita alguien de por vida manteniéndola".
- Data engineering no es distinto del desarrollo normal, salvo que las buenas prácticas son opcionales — "And that's worrying" (the-data-engineer).

## Startups y negocio

- **España vs USA**: viene de familia muy pobre y desde ahí juzga el riesgo. Los de SF "no miran atrás"; en España "yo no digo a nadie de fuera del entorno startup en lo que trabajo". España prefiere "pagar por software en hombre-horas"; leyes laborales "pensadas para gente que va a una cadena de producción"; stock options y exit tax, absurdos. "A nivel técnico estamos en pañales": falta gente de infra/bajo nivel, sobran "frontend react developers hasta debajo de las piedras" (espana-y-startups).
- **Lección CARTO vs Mapbox**: "hacían lo que les daba la gana sin mirar a los lados, por eso ganaban". "Jugar al juego de otro nunca sale" (sin-mirar-atras).
- **Anti-recetas**: "Hay una industria de la startup, como quien ceba a un cerdo". Escalar sin market fit = "apretar el acelerador a tope cuando aún no tienes encarado el coche". "Tal vez necesitamos apostar más por pócimas y menos por recetas" (la-pocima-magica). "Si hay una receta que siempre funciona es la del fracaso". OKRs "como la catedral de Valladolid (la que tenían pensado construir, no la que hay)". Ser "data driven" con 100 data points es decidir por casualidad.
- **Pricing y soporte**: "el software se sigue cobrando por el valor que aporta"; el precio enterprise cubre costes ocultos (on-call, 24/7). Desprecia las "trampas para humanos" en pricing pages. El soporte técnico está infravalorado y "tiene efecto compuesto": "Pon un buen equipo a hablar con tus clientes y pon a todo tu equipo a hablar con tus clientes".
- A veces el producto no está mal, "a veces a ti te toca cambiar de clientes".
- Los corporates españoles desprecian sus propios proyectos técnicos por falta de orgullo (el-complejo-del-corporate).
- Sobre Lemkin: le "odia visceralmente pero… tiene razón todo el rato".

## Gestión y cultura

- **Remoto (arco completo, importante)**: en 2020 entusiasta (Basecamp, sin Slack, async); en 2022 mea culpa: "Cuando me echen de esta empresa… no será remoto 100% ni por asomo" — para encontrar el market fit necesitas un equipo pequeño codo con codo. "El metaverso está bien, pero follar en persona, mejor". En 2025 cita a Rauch ("Remote work is individual convenience at the expense of group effectiveness"): "no puedo estar más de acuerdo". Constante: "slack es la nicotina, el azúcar, el feed de tiktok… del trabajo".
- **Escritura como tecnología de gestión**: cultura de escribir por repetición y ejemplo, decir "write it down" 100 veces al día. "KPIs are fucking shit if there is nothing real behind them" (writing-culture).
- **Contratación**: su prueba técnica es "una frase vaga con un problema muy mal definido" — evalúa quién pregunta para entender, no para responder. Sobre retener talento: "La realidad es que no tengo ni la menor idea". El perfil que busca: el **end-to-end developer** — "no busques un CTO… busca un end to end"; "No les importa comer lo que otros llaman mierda"; "Son unos tarados".
- **Su management**: "Como 'manager' soy lamentable". Método: "echar a los leones tantas veces como sea posible y ver si sobreviven... ya no te necesitan, aunque te odien un poco por no haberles ayudado". "High variance management" ("en la línea del desastre"). Pro meterse en el barro: "mucha gente se empeña en llamar micromanagement a la forma de defender cierta incompetencia".
- La matriz de Eisenhower y "dedicarse a lo estratégico" es "posiblemente una gilipollez" en empresas <80-100 personas (lo-urgente-y-lo-importante).
- "el truco es que no hay truco": escalar un equipo no pasa "por squads, kanbans, agile, OKRs". "No puedes ir rápido y que todo vaya como la seda. No existe".
- "no hay mejor cosa para la cultura de una empresa que preguntar el porqué de las cosas continuamente" (por-que).
- **Velocidad**: "si dudas, mejor avanza"; "la falacia de que sabes dónde tienes que ir es la peste de la industria del software"; "solo tienes 6 balas" (el-prisas).
- Presión del fundador asumida: "mata más estar de 9-5 teniendo reuniones absurdas que mirar el filo de la espada"; "sarna con gusto no pica".

## IA / LLMs

- **Uso práctico sin misticismo**: Cursor + el CLI `llm` de Simon Willison. "Vibe codeo bastante". Apps ad-hoc de un solo index.html en vanilla JS: "un puto traje hecho a medida… vs uno de Zara de 119.93€".
- Pide crítica pasivo-agresiva de sus textos al LLM: "Ningún humano que no tenga problema social va a ser tan sincero"; "los LLMs son especialmente buenos dando donde duele".
- Para transformar datos: pedir código, no el resultado ("The code will run way faster", "can be audited and fixed"); pedir el test con la transformación inversa para validar.
- Ya en 2022: ChatGPT resolvió su prueba técnica y "es mejor que el 90% de las respuestas de humanos que recibo". Conclusión: "la prueba técnica es de encontrar las preguntas correctas".
- Anti-humo: los "chamanes" de LinkedIn son "middle managers que no saben ni por dónde les viene". "More people are talking about AI Agents than actual agents exist."
- Criterio para herramientas: "Fricción en mi cerebro, no en las herramientas" (que-viene-el-lobo). Quedarse quieto ("hacer un Apple") es arriesgado.
- 2026: "Los LLMs aún no están al nivel de un humano pero lo van a estar en meses". Y lo personal: "más duro es ver como una máquina es mejor que tú en lo que se suponía eras bueno" (programador).
- Reserva espacio sin IA: fines de semana con ESP32 — "No AI, just Vim and g++".

## Filosofía personal

- Identidad: le cuesta decir "programador" ante el notario. "nunca fui programador, fui lo que tuve que ser en ese momento para conseguir lo que quería (ayudar agricultores, pintar mapas, analizar datos…)" (programador).
- "Yo no entiendo mi vida sin esta mierda" (sobre montar empresas).
- **El proceso > el resultado**: un ensayo de orquesta le gustó más que el concierto; "Hubiese pagado el doble de la entrada para ver el ensayo completo" (comentarios-del-director).
- **Limitaciones como regalo**: su miopía no diagnosticada le forzó a entender en vez de copiar (contraintuitivo).
- **Anti-raíles**: "La mayoría de la gente va sobre raíles… preguntan para responder y no para entender" (sobre-railes).
- **"A la segunda todo sale bien"**: las cosas salen bien a la segunda, no a la primera. Cantidad sobre calidad (el profesor de cerámica de Art & Fear). "Inspiration is for amateurs" (Chuck Close).
- **Alma**: "me han dejado de gustar las cosas que no tienen alma"; "las cosas con alma no suelen escalar y suelen perder el alma cuando se hacen por dinero".
- **Mortalidad y balas**: su padre murió de cáncer (~17 años él); "llevo unos 25 años preparándome para ese día". "no me queden muchas balas que disparar" (la-ultima-bala).
- Frustración con el software frente al Lotus: "en el mundo del software nunca nada está terminado"; "el mundo del software no se respeta a sí mismo… Todo es de usar y tirar".
- Sueño de retiro: "Santana engineering", taller artesano estilo japonés de software/datos; montar un Recurse Center en España.
- Lema adoptado: "YOU CANNOT COMPETE WITH SOMEONE WHO IS HAVING FUN".
- Creencias declaradas (about): esfuerzo muy por encima de capacidades innatas; "La calidad es el mejor 'bussiness plan'"; largo plazo y muy poco el corto; entender los problemas hasta el último detalle; "las personas que hacen mucho y dicen poco (y se lo creen), hablan claro y no decoran".

## Hot takes rápidos

| Take | Cita corta |
|---|---|
| El datawarehouse está sobrevalorado | "no me creo mucho el 'datawarehouse'" |
| Slack es dañino | "la nicotina, el azúcar, el feed de tiktok… del trabajo" |
| Remoto 100% fue un error en early stage | "no será remoto 100% ni por asomo" |
| Lo cutre es virtud | "acabas de ganar un poco de tiempo de tu vida" |
| La OOP universitaria sobra | estudiar el código del Quake en su lugar |
| El micromanagement está mal difamado | "la forma de defender cierta incompetencia" |
| OKRs/agile/squads no arreglan nada | "el truco es que no hay truco" |
| Los 15 años de JS fueron una pérdida | reimplementar Java en JS = "15 años perdidos" |
| Git necesita ser reemplazado | "Speed is a feature" |
| Ir despacio es un vicio adquirido | "no entiendo a la gente que no disfruta del subidón de tener prisa por poner algo en producción" |
| Kubernetes como símbolo de lo sin alma | "te miran raro cuando dices que no usas kubernetes" |
| Data engineers no son especiales | igual que un developer, con peores prácticas |

## Temas que le obsesionan (para elegir ángulo)

1. La velocidad del feedback (16ms, CI instantáneo, el prisas)
2. Entender lo que hay debajo (internals, Carmack, el porqué continuo)
3. Lo simple contra lo enterprise (bash + SQL + git)
4. El coche de carreras como banco de pruebas (GPS, NMEA, ESP32, lap timer, Cheste)
5. La escritura como herramienta de gestión
6. El proceso visible (ensayos, director's commentary)
7. La segunda oportunidad / cantidad sobre calidad
8. La mortalidad y las balas restantes
9. España como potencial desaprovechado
10. LLMs como espejo incómodo del oficio
