---
layout: post
published: false
---


Hacer crecer un equipo técnico parece fácil a priori, hay unos 200 millones de blogpost sobre el tema y en general los desarrolladores tenemos tendencia a ser optimistas, en esto también. Estoy seguro que comparado con hacer crecer un equipo de ventas o de marketing es coser y cantar 

Sin embargo, a pesar de haber leído esos blogposts, libros y demás, hay algunas cosas que hemos aprendido en CARTO que puede que te sean útiles si piensas hacer crecer un equipo de 4 adolescentes a un equipo que funciona como un tiro.

Un equipo es algo así como una persona, pasa por la fase de crío, pasa a ser un adolescente, despuésa tener pareja e hijos, posiblemente pase por una etapa de madurez, jubilación y muera. En CARTO se podría decir que acabamos de tener hijos.

Aquí os dejo cada una de las fases por las que hemos ido pasando, con algunos consejos en forma de retales.

## Cuando sois 4 fulanos dándole a la tecla sin control (recien nacido)

Aprender inglés cuando eres un niño es coser y cantar, cuando tienes 40 es un infierno, ya no estás para gilipolleces y tienes un montón de cosas que la sociedad te dice que tienes que hacer. Así que más vale que lo fundamental quede claro cuando sois 4, con 40 personas en un equipo no va a ser tan fácil. Estas son las cosas que yo haría si empezase desde cero:

- Establece los patrones básicos, aunque te parezca matar moscas a cañonazos: control de versiones, testing, integración continua, deploy automático, trabajo en ramas. El [test de Joel](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/) es un buen punto de partida (aunque es un poco killer). En serio, montar esto y acostumbrarse es 1 semana.

- La elección de la tecnología base puede parecer importante, en mi opinión no lo es. Podría parecer que escoger el último framework o la última tecnología va a ayudarte en el hiring, pero:
    - Si alguien va a un proyecto por la tecnología y no por el proyecto tienes que pararte a pensar si de verdad quieres gente tan junior. Amigo, estás poniendo el cimiento del chiringuito, más te vale poner unas buena base.
    - En el futuro la tecnología importa básicamente nada, esto es, lo que marca la diferencia es lo que haces con ella. Repito, la tecnología que uses ahora no significa absolutamente nada. En la due diligence técnica que hizo el [CTO de accel](https://blog.acolyer.org/) antes de la ronda B de CARTO no preguntó ni una sola vez por el lenguaje de programación ni frameworks (lo que preguntó lo dejo para otro post)
    - No confundamos tecnología base con la tecnología que es clave para el negocio. Salvo excepciones el lenguaje de programación o el framework no lo es. Eso no quiere decir que no tengas que controlar bien el lenguaje y los frameworks/herramientas que uses.
    - Vas a tener oportunidades de cambiar todo unas cuantas veces, así que no te preocupes.

- Aprende a trabajar con proyectos de otros. Haz que sea una práctica habitual el usarlos,
  valorarlos y entenderlos. Comerciales u open source. 

- En equipos de este tipo el KPI suele ser la velocidad. La velocidad en los equipos de desarrollo es la peor métrica posible. Chaval, un equipo de 4, apenas empezando a desarrollar el producto, es rápido como el mismísimo diablo aunque pienses que eres lento (y cuando crezcas lo entenderás).
  La mala hierba crece muy rápido en la tierra bien abonada. Así que preocúpate de hacer que las cosas que haces son las correctas y haz que todo el mundo sea MUY consciente de ello.
  Tu gente debe ser **crítica al extremo**, nada de chiquilladas de "esto mola, lo metemos en un fin de semana". De otra forma estarás cavando tu tumba a ritmo de agile.
  
- Es tan fácil añadir una gilipollez inútil a un producto que si no entrenas a tu gente para tener
  alergia vas a pasarlas muy putas. Esto parece que es cosa de Product managers (sí, esto te suena a consultora y tú no los necesitas, tranquilo majete en tu sillón) pero, tío, tienes gente que es capaz de entender conceptos complejísimos, enseñarles a parar y pensar no es tan difícil. Lectura obligada aquí el  post del amigo txarly sobre ["como lanzar un proyecto sin una línea de código"](http://www.txarly.com/post/100678426714/c%C3%B3mo-lanc%C3%A9-un-proyecto-rentable-sin-escribir-ni)

- La gestión de frustración es crítica: hay bugs, las cosas se caen en producción, hay días que hay que tirarlo todo, nunca se puede hacer todo lo que uno quiere así que:
    - Aprender a priorizar, todo el mundo debe saber qué es su prioridad máxima. Y si no sabe debe preguntarlo.
    - Nunca hay tiempo para hacer las cosas bien. El tiempo es como el dinero, no te regalan, tienes que salir a por ello y lucharlo. Un comercial no va a llegar y te va a decir "Acabo de decir
      que no a este deal para que hagas este refactor que tenías tantas ganas de hacer".

En esta etapa el ser un pequeño dictador es posible que sea la mejor opción. Si juntas a 4
desarrolladores en una habitación se van a poner a discutir sobre espacios versus tabs (no importa lo senior que sean, hay gente que no se da cuenta que usar tabuladores es de otro siglo). Alguien que tome las directrices, buenas o malas es mejor siempre tener una directriz a no tenerla. Y más te vale tener directrices en todos los temas importantes.

Una de esas directrices es la gestión de proyectos. Usa kanban, waterfall, agile o lo que te salga de las narices, pero usa una cosa clara y que todo el mundo sepa cómo lo haces. 

Si eres ese pequeño dictador, [machaca todo el rato con las cosas importantes](http://javisantana.com/2013/07/12/a-cortar-cojones-se-aprende-cortando-cojones.html) (entre otras cosas porque así te ayuda a aclarar las cosas importantes) hasta que la gente lo tenga interiorizado. Ese es el germen de la cultura que se diluirá poco a poco cuando vayas creciendo pero que servirá como base.

Recuerda, ahora es cuando casi todo cuesta casi nada, hazlo aunque parezca una gilipollez que no necesitas.


## Cuando ya sois un equipo de fútbol con suplentes

Las cosas van como un tiro, sois los putos amos y decides hacer crecer el equipo unas 10-15 personas. Todo es felicidad, estás en la adolescencia, qué esperas?

Cosas que van a pasar:
- La gente se empieza a frustrar porque no saben absolutamente todo lo que está pasando
- Empieza a haber más especialización
- Problemas de comunicación empiezan a salir
- "Qué lento que vamos", "tenemos que ir más rápido"

Además la empresa ha crecido un poco, hay ya alguien vendiendo, parece que hay una persona escribiendo blogposts y el fundador ahora ya firma como CEO y no como "developer and coffee addict" en twitter. CARTO es un poco especial, fuimos galardonados con el premio de “la empresa más disfuncional en ventas que nunca habían visto”

- Si te van a meter gallina, antes de anunciar empieza a contratar gente técnica. Lo creáis o no hay gente que se mueve casi solo por dinero. Aún no estás en la fase de querer ese tipo de gente, te faltan otros 30 ó 40 empleados aún.

- Aquí necesitas ya un documento y fase de onboarding, cada persona nueva tiene que aprender, así que invierte en que sepan dónde poner los pies los primeros días.

- Enseña a tu equipo técnico a tener un par de bemoles. Fundamental para tratar con gente que su trabajo es convencer a otros. Importante también para saber tragarse su orgullo.

- El management: un día alguien llega y dice, "oye, a lo mejor deberíamos ir pensando en tener
  alguien que gestione un poco". Entonces coges al mejor desarrollador o al que parece que siempre tiene más iniciativa y lo pones a gestionar:
     - La gestión no es mala pero es un trabajo muy diferente que necesita unos skills muy
       diferentes.
     - En un equipo técnico debe ser alguien que la gente respete. Si no le van a reventar vivo.
     - Los programadores tendemos a pensar que el management es una pérdida de tiempo. Saber qué hacer, cuando y mantener el foco vale más que 3000 líneas al día.


- Si has hecho crecer la empresa alrededor del producto (del software vaya) prepárate porque en general la gente de ventas, marketing y demás no tienen los procesos tan claros. Y si los tienen van a ser muy diferentes a los tuyos, así que más vale aclararlos porque vas a necesitar ir bien engranaditos. La diferencia entre [acabado vs cerrado](http://javisantana.com/2014/02/11/acabado-vs-cerrado.html) muchas veces es toda esa gente. Ellos no van a querer usar los issues the github así que haz que tengan un proceso, fuera o dentro, que encaje con el tuyo.

- Sabes lo que es cool y hace que un desarrollador esté contento: sentir que te ganas cada céntimo que te pagan haciendo cosas que sean útiles. Sea node o java. Las gilipolleces de la mesa de ping-pong, offsites y demás están bien pero si no hay una base profesional donde se sientan cómodos son adornos. 

- Gestión de la frustración. Sí, de nuevo:

    - Sensación de ir despacio es brutal, piensas que eres una tortuga. No lo eres pero ahora todo necesita más trabajo, aprende a lidiar con ello.

    - La gente se empieza a sentir sola: empieza a forzar 1 to 1. En mi caso no me gustan los 1 to 1, me gusta mucho más pillar por banda al fulano en cuestión y hablar lo que tenga en ese momento en la cabeza. Esto último es cómodo pero un error garrafal, tienes que mantener un flujo continuo donde hablas no solo del día a día si no de lo que va a venir y de lo que piensas. Esto pasa a ser crítico con más de 20 personas.

    - No hay tiempo para hacer las cosas bien. Nunca hay tiempo para eso, el tiempo se gana, así que "pick your battles" y luchalos a muerte. Todo no puede estar perfecto, mejor que sea así, *embrace* [lo cutre](http://javisantana.com/2014/03/02/lo-cutre.html) para lo que tenga que ser cutre.

- Evita cualquier cosa en la que no haya un control sobre la creación. Por ejemplo, la típica de
  "hacemos un wiki". Los wikis son la peste si 1) no hay un índice claro o 2) no hay alguien
  gestionandolos. Miles de google docs, miles de ficheros en dropbox, etc, etc, sabes de lo que
  hablo.

- Un tema peliagudo, el firing (del hiring ya hay mucho escrito). Hay 3 clases de fires 1) la
  persona que no da palo, 2) la que no encaja 3) cuando no hay dinero o algo acaba. La 1 es muy raro a no ser que hayas contratado a lo bruto (como por ejemplo cuando te dan unos millones), pero tú eres listo, no vas a contratar a 10 personas en un mes. La 3 es cuando las cosas van mal, la 2 es la jodida: contratas a alguien listo, capaz, pero no sabes el porqué no funciona como debería. 
  Todos nos las damos mucho de majetes y liberales con la mobilidad laboral, pero el despido sigue siendo de las cosas más desgradables y no deseadas, así que hazla cuanto antes y sé sincero. En esta etapa ya vas a tener (o habrás tenido) algún despido.

## Cuando eres más de los que puedes contar (etapa de maduritos)

Este cambio pasa cuando eres más de 20, una sola persona no puede gestionar todo el equipo técnico (ni a nivel de gestión de proyectos ni al técnico) así que la cosa se complica: hay que hacer equipos y poner “jefes”. Lo camuflarás con títulos gilipollescos tipo “whatever lead”, “blabla manager” pero cuando alguien decide el sueldo de otro se acabaron las tonterías.

Ahora es el momento de contratar a los que vienen por dinero (y por el proyecto, claro), gente que sabe lo que hace, que no se anda con pijadas, que tienen hijos que mantener, que si eres gilipollas te lo plantan en la cara sin que te des cuenta. Esa gente es la que te hace crecer.

Aquí tendrás que elegir entre, generalmente, dos tipos de estructura: vertical u horizontal, esto
es, por área (frontend, backend) o por unidad de trabajo o producto. Spotify tiene unos
[videos](https://labs.spotify.com/2014/03/27/spotify-engineering-culture-part-1/) bastante famosos. Yo me descojono cuando los veo porque es como las películas, las partes aburridas de las vidas de los protagonistas nunca salen, son una mentira, igual que esos videos, pero para hacerte una idea vale.

En este punto los problemas técnicos principales son básicamente no técnicos:
- Hacer crecer a la gente como managers y hacer entender al resto cómo funciona
- Comunicación entre equipos y entre tu equipo y el resto de la empresa
- Que todo el mundo (a nivel personal y como equipo) esté enfocado y en la misma dirección

Los problemas técnicos principales son:

- Como ya no hay un control férreo de como se hacen las cosas cada uno empieza a aplicar su criterio, que está muy bien, pero sin seguir ninguna norma. Te encuentras a gente haciendo programación funcional, otros refactorizando partes que no conocen, usando librerías que no pondrías en producción aunque trabajases con nodejs.
- El rol del CTO pasa a ser mucho más influencer que activo. Ya no programas (o casi), la gente deja de confiar en ti para poner cosas en producción y los nuevos piensan que no has programado en tu vida (por eso tienes que sentarte un día con ellos y hacerles una performance para poner las cosas en su sitio)
- Es imposible que tomes todas las decisiones técnicas y también es imposible que se te vayan a ocurrir todas las buenas ideas. Tienes que hacer tres cosas fundamentales para que la gente crezca como líder técnico:
 - Darles espacio para tomar sus decisiones y que la caguen, exactamente igual que lo harías tú pero esta vez es su responsabilidad y lo importante, su derecho.
 - Darles tiempo. No me refiero a que esperes, me refiero no presionar tanto con las tareas que no les permita parar, analizar y buscar otras soluciones.
- Si tu producto ha crecido, y lo habrá hecho a golpe de remo comercial, habrá que hacer cambios grandes de arquitectura. Nunca es buen momento pero tienes que hacerlo, así que métete y tira millas. Ojo, con cabeza, a estas alturas tienes ya datos para tomar decisiones, así que haz pruebas de concepto y mide si tiene sentido.

La gente que se va es como los accidentes de tráfico: nunca te pasa a ti. Hasta que te pasa. Así que igual que te pones el cinturón de seguridad, compras coches seguros (esto es, no italianos) tienes que prepararte para cuando alguien se vaya. La estrategia perfecta sería tener 1 persona extra por equipo pero nunca funciona, más tienes, más haces y más tienes que mantener, así que mantén siempre a la gente con la que te gustaría trabajar cerca. Hay muchas formas de hacer esto, pero estas ya para otro post.

El punto crítico aquí es tener el músculo de la práctica bien fuerte, de esta forma las cosas, aunque parezca un caos, siempre irán razonablemente bien (teniendo en cuenta la velocidad de estas cosas). Ese músculo se empieza a trabajar cuando eres 3 pericos metidos en una habitación con mesas de ikea.

Seguro que me dejo en el tintero 200 mil cosas, lo único que puedo decir es: si estás pasando por un proceso así, ánimo. 
