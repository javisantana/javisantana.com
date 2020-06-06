---
layout: micro_post
published: true
title: "Data Lake, parte V: autorización"
---

Tienes todos los datos de tu empresa en un solo sitio. Nadie en su sano juicio permitiría acceder a todos los usuarios a todos los datos. Esto obviamente no aplica tanto a una pequeña empresa, aquí con dar acceso de solo lectura a una réplica de la base de datos de producción [1] para que la herramienta de BI de turno pueda coger datos es más que suficiente. Eso sí, no llames a esto "democratizar el acceso a datos", el término sería "anarquizar el acceso a datos"

Porque hoy hay 30 personas en tu organización pero mañana hay 120 y luego 119... me sigues no? Esta es una razón para dejar que ciertas personas vean solo ciertos datos, pero hay otras, por ejemplo simplificar la vida de la gente. 

De ahí que tengas que tener un control de acceso (autentificación). Esto es tan viejo cómo que la cueva Alibaba ya tenían un password

Pero ahora podemos hacer algo mejor que tener una sola puerta para la cueva, podemos tener sistemas
de autorización robustos:

- Tenemos sistemas de directorio donde tenemos registradas y agrupadas a las personas que forman parte de la organización
- Deberíamos poder decir quién accede a qué con granularidad de fila/documento. Y esto a nivel de grupos y/o personas. Esto está resuelto por absolutamente todas las bases de datos decentes hace años. Y si el acceso es temporal, pues durante un tiempo. Y si el acceso tiene que ser a datos tokenizados, que así sea.
- En la organización no solo hay personas, hay otra cosa llamada "software" que acceden al sistema, es decir, aplicaciones que usan estos datos (de hecho debería ser lo habitual). Estos bots/applicaciones deberían también estar registradas y gestionados. Hay cosas como oauth que podrían resultar muy útil aquí (mira como por ejemplo [google da acceso a los diferentes datos de un usuario](https://developers.google.com/identity/protocols/googlescopes))

En este último punto es donde se suele pinchar si la empresa tiene cierto recorrido: es complicado entender que hay actores no humanos, que, de hecho, son los más importantes, porque como dice  [Vicki Boykis](https://twitter.com/vboykis), los humanos estamos para [dar significado a los datos](http://veekaybee.github.io/senior-dev-day-talk/#/16), para procesarlos ya lo hacen mejor las máquinas.


[1] Evita como puedas dar acceso a la base de datos de producción, por mucha prisa que tengas.






