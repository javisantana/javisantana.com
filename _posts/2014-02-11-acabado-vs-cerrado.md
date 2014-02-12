---
layout: blog3
published: true
---

## Acabado vs Cerrado

No recuerdo cuando ni donde le escuché al mítico [Javier Arévalo](twitter.com/thejare) algo así como:

	código cerrado >>>> codigo acabado
    
Cuando tienes un producto y vas a meter una nueva feature hay una distancia abismal enter tenerla acabada y en producción (cerrada). Vamos ser claros, lo de "say NO" es muy bonito cuando escribes libros pero la realidad es que el software requiere cosas nuevas de vez en cuando (de hecho muy de vez en cuando)

Digamos que tenemos una feature **acabada**, todo funcionando en desarrollo y podemos usarla sin problemas en un entorno "controlado" (staging o como lo llames). Pero eso es la punta del iceberg del trabajo. Una feature es como un hijo, no vale con "poner la semillita en mamá", hay que llevarla por el camino correcto y dejarla ir cuando toque.

Estas son algunas de las cosas en las que deberíamos pensar (que no hacemos porque entraríamos en depresión):

- Testing. Cada vez que haces release, no siendo que lo hayas roto. Y muchas veces no sirve solo el testing manual.
- Tests de carga, por que en desarrollo todo va fino pero cuando llegas a producción y tienes 100 conexiónes esperando a coger datos de redis no es tan divertido.
- Coste de desarrollo a posteriori. Tener código no es gratis, por muy modular y bien ordenado que esté, tener nuevo código implica tener una caja más en el almacén, está ahí, no se toca, pero cuando hay que mudarse te jode vivo.
- Monitorización. Ya sabes en los mundos de yupi hacemos TDD y con un 100% de coverage vamos a la cama tranquilos, pero la realidad es que las cosas fallan, así que más vale que estés al tanto cuando pasas a produccion.
- Documentación. Tanto de API, tutoriales, material de preventa.
- Compatibilidad. Si es algo que modificas, debes pensar si eres compatible hacia atrás. Si no lo eres todos los problemas se multiplican por 2 porque tienes una nueva feature y la anterior, que hace lo mismo, vas a tener que mantenerla, deprecarla y matarla (y algunos usuarios estarán contentísimos contigo)
- Plan de migración. Al hilo de la anterior, si hay ya otra feature debes tener claro como volver
- Soporte. La feature va a generar soporte, 100% asegurado
- Marketing y ventas. Qué menos que unos posts en el blog, un mensaje en tu lista de correo, unos tweets, una llamadita a tus mejores clientes para que se hagan upgrade, otra llamadita a esos que te la pidieron.
- Muerte. Hay features que símplemente mueren, eliminarlas bien es una tarea case imposible, siempre queda algo. Y cuando matas muchas, sobretodo al comienzo del producto, queda mucho que puede que te machaque el resto de desarrollo. Fulmínala cuanto antes, las cosas no van a mejorar (te vas a llevar a unos cuantos usuarios por delante, pero lo entenderán)


