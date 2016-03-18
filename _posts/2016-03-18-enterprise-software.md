---
layout: post
published: true
---

Eres un pinpin y te pones a desarrollar software (no necesariamente en este orden), la cosa parece
que mola, que no hay que doblar mucho el lomo y es fácil hacer dinero. Te gusta un sector, echas
un ojo al software que trata de solucionar la vida de la gente y, como buen ignorante que eres, las
primeras frases que salen de tu boca son "JAJAJAJA parece software de los 90", "esto lo han hecho 4 becarios", "no tienen ni idea, son unos aficionados", "esto lo hacemos nosotros mejor con la punta del pijo". Nota importante: yo he sido el primero en estar en esa situación, así empecé [agroguía](http://agroguia.es), de hecho debes estar ahí en algún momento, tienes que ser un veinteañero.

Así que manos a la obra, creas tu proyecto en node.js, TDD, deployment automático, últimas técnicas
de desarrollo, el recopón y toda la corporación bendita, después de 2 meses tu software está más o
menos listo, ahora solo hay que captar usuarios para tu proyecto B2C.

Pasa 1 año, aprendes que no tenías ni puta idea pero vas malvendiendo, malcaptando
clientes/usuarios, te sacan en los periódicos (dándote la falsa sensación de que lo estás haciendo
bien) y ganas algún premio de esos que montan por que sobra presupuesto en algún departamente de
alguna empresa.

Un día alguien se te acerca, un tío que tiene una empresa cargada de millones, que sabe lo que se
hace, joder, que es el puto amo, ve tu software y te plantea: "yo te pagaría XXXX€ por esto si tuviese estas pequeñas
modificaciones". Ese XXXX es 100X de lo que estás cobrando al mes a tus usuarios del SASS. Llamas a
tus socios, lo celebras y sin saberlo estás dentro del mundo llamado "enterprise", pero aún no lo
sabes.

Te comes toda la mierda que el cliente quiere meter en tu producto, llegan otros clientes como ese y
rápidamente te das cuenta (bueno, seguramente te lleve meses) que puedes cobrar 100X por lo mismo con mucho menos esfuerzo si empiezas a vender a empresas. Ahora sí, ya sabes que estás en el mundo enterprise, pero aún no sabes cuanta vaselina vas a tener que comprar.

Y aquí es cuando empieza la cosa a ponerse seria, empiezas a hablar con empresas gordas gordas, que
tienen gallina de verdad y les dices que tu software es la requetepolla. Entonces pasas por
diferentes encorbatados y llegas al momento en el que de verdad están interesados. Te mandan la
lista de requisitos, la abres pensando que eres el puto amo y entonces es cuando abres el tarro de
vaselina.

Y es que además de añadir frases como "big data", "enterprise ready" y otras perlas que no dicen
absolutamente nada pero que **debes** tener para que los que manejan la gallina sepan posicionarte
(sí, eres programador y sabes que todo eso es bullshit, pero no pasa nada, es solo un trámite) debes
tener una lista de requisitos en tu software de los que no teías ni idea. Te dejo algunos de ellos.

- Requisitos: te pedirán una lista de cosas que tu software debe soportar. Verás que sospechosamente
  algunas de esas listas se parecen demasiado a lo que soporte tu competidor (que curiosamente ya no
  son tan aficionados como parecían hace 2 años). Obviamente no tendrás ni una linea de
  documenación, porque quién necesita documentación, somos un SASS moderno que cambia todos los
  días!

- Onpremise: Una empresa que tenga dos dedos de frente no va a poner sus datos en tu infrastructura,
  así que vas a tener que montar todo el chiringuito dentro de su red. Así que olvida los servicios
  que te da amazon, tu elastic cloud provider y demás, aquí estás solo. Solo y en el infierno, vas a
  tener que instalar tu software en redhat con paquetes de hace 7 años (cuando no existía node.js).
  Aquí te ríes bastante.

- Requisitos técnicos y escalado: Van a querer saber qué máquinas hay que instalar y como escalar
  para una demanda concreta. Porque esta gente es seria, va a hacer dinero con tu software, no está
  levantando el dedo para ver de donde corre el aire, quieren saber lo que se van a gastar para
  saber la rentabilidad.

- Alta disponibilidad, disaster recovery, backups, SLAs: Eso, quieren que funcione, que funcione siempre y
  que responda bien a los fallos. En tu SASS te importa poco si se cae 10 minutos porque eres guay,
  tus clientes son guays y eh! no pasa nada, somos una startup. Tampoco hay que volverse loco, los
  aviones llevan volando años y siguen fallando técnicamente y estrellándose.

- Updates, mantenimiento: quieren updates con bugfixes, deben de ser fáciles de hacer y la fiesta no
  debe parar, esto es, no vale tirar el servicio, montar el nuevo software y levantar. Este punto es
  más divertido cuando llevas un tiempo y alguien con la primera versión (que era una mierda) quiere
  actualizarse. Tienes que tener, además, una política de versiones, de tiempo de vida, etc. Esto
  hace que tengas que dedicar muchísimo tiempo a hacer que todo encaje y que versiones antiguas
  funcionen. Ese tiempo no lo dedicas a hacer que tu software no parezca de los 90 (guiño guiño)

- Soporte: quieren tener un teléfono al que llamar cuando entren en pánico. No, no quieren mail,
  quieren poder hablar con alguien que les solucione la papeleta. Tendrás que contratar a gente a
  turnos para esto, los márgenes ya no parecen tan altos eh?

- Seguridad: pasarán auditorías de seguridad, no servirán de nada porque solo encontrarán fallos de
  seguridad genéricos, los importantes vendrán después, cuando estés en producción. Protip: si no
  quieres gastarte una pasta habilita un programa de bug bounty. Invertirás bastante tiempo en
  seguridad y tendrás que recortar de otras cosas (adivina, los 90 están más cerca)

- Otros requisitos: cada cliente es de un padre y una madre, algunos no dejarán ejecutar cosas como
  root, otros no tendrás salida a internet, no podrás monitorizar ciertas cosas... preparate a meter
  miles de opciones y soportar casos absurdos. 


En resumen, la aplicación de node que parecía simple y ágil ahora tiene una serie de limitaciones,
añadidos de clientes, vaya, se ha hecho mayor y ahora miras a esas empresillas que empiezan
con una sonrisa (pero por si acaso no dejas de mirarlas), con más pasta en el bolsillo y con suerte
habrás dejado de ir a la oficina en bicicleta e irás en un coche como dios manda. Es posible que
seas también seas menos feliz, pero no sabrás si es la edad o tu software enterprise.

![como debe ser](/blog_images/porsche.jpg)
