---
layout: post2
published: true
name: La respuesta al concurso del Lego de la TGR23
title: La respuesta al concurso del Lego de la TGR23
---


En esta [TRG](https://www.trgcon.com/) en Tinybird hicimos un concurso en el que tenías que adivinar el tiempo de una query SQL sencilla sobre 1 billón de registros. Si acertabas ganarías un LEGO que seguramente sea más difícil de montar que aprender SQL. El objetivo era no sólamente hacer un concurso estúpido para recoger "leads", hacer algo que retase a la gente y a su vez sirviese para explicar qué hace nuestra empresa tenía más sentido. Además, si no sabes mucho de datos, te permite aprender.

Antes de escribir nada: es imposible saber el tiempo de ejecución de una query en un sistema donde desconoces todos los componentes. Bueno, aunque los conozcas, es en la práctica imposible. Así que era un juego de un mucho de estimación y otro mucho de suerte

El enunciado era tal que así:

“””
Responde con el tiempo que crees que tarda Tinybird en ejecutar esta query SQL 

```sql
SELECT 
    toDate(timestamp) AS date, 
    avg(speed) AS avg_speed
FROM rocket_telemetry 
GROUP BY date
``````


La tabla se le añaden 1000 registros por segundo y en el momento del comienzo de la TRG23 tenía 1 billón americano de registros.


HINT: es más rápido de lo que crees.
“””


Como ves, sin conocer datos tan básicos como cual es el sistema que corre, como almacena los datos, el esquema de la tabla etc etc es absolutamente imposible. Aún así, vamos a hacer un análisis de como se podría estimar sin ponernos muy técnicos, en términos simples.

Empecemos por los básicos: el tiempo de una query tan sencilla depende del tiempo que tardemos en leer los datos. Esto es así para la gran mayoría de queries que son ejecutadas en nuestras queridas bases de datos.

Así que en el caso que nos atañe tenemos dos columnas, vamos a asumir que son de 4 bytes cada una (un campo Date y otro Float), a la hora de ejecutar la query había unos 1.1b de registros, tenemos un total de ~8.2Gb (=1000000000 * 4 * 2). Mi portátil, macbook pro M1, es capaz de leer aproximadamente unos 3.8gb/s de memoria cuando todos los registros están perfectamente colocados, no tengo ni pajolera de lo que tardará un servidor de google -donde estaba alojada mi cuenta de tinybird- pero entiendo que es algo similar, así que la query debería tardar algo más de 2 segundos.

No tan rápido, en realidad nosotros somos más listos que eso, en la tabla había un timestamp, y en enunciado dice que son unos 1000 registros por segundo. Debería haber usado un timestamp de 64 bits, pero no lo hice (mal), pero en este caso, sabemos que hay 1000 valores seguidos iguales si los vamos colocando en la base de datos según nos los envían.

Y si en vez almacenar el valor, almacenamos la diferencia con el valor anterior? Pues vamos a tener 1 uno, seguido de 999 ceros. No sé a ti, pero a mi me da que eso se puede guardar de una forma eficiente. Alguien ya se dio cuenta hace años he inventó algo llamado RLE compression, que permite reducir la cantidad de información cuando se repiten mucho los valores. En este caso, usé un algoritmo algo más moderno, LZ4. La historia de LZ4 es bastante increíble, os recomiendo este podcast.

Echando cuentas, si guardamos 1 uno y 999 ceros, repetido 60 segundos * 60 minutos * 24 horas son básicamente 1kb que es tamaño que ocupa 1000 valores y otro más para decirle las veces que lo tiene que repetir. En la base de datos que usamos, Clickhouse, ocupa unos 22mb. Lógicamente hay ineficiencias porque el sistema de almacenamiento no está pensado para este caso de uso, ni LZ4 funciona exactamente como he dicho. Aún así, de 4gb a 22Mb podemos decir que hemos hecho un buen trabajo.

Entonces ahora tenemos dos columnas, una de ellas, timestamp, que ocupa 21mb y otra, speed que ocupa 4gb. Dirás, por qué no se comprime esa columna? Pues porque usé un rand() que por definición apenas comprime. La realidad es que usando ZSTD, otro algoritmo de compresión, se queda en aproximadamente 3.8gb. Es importante saber donde es fuerte cada algoritmos de compresión, no tienes que saber los detalles, pero sí tener intuición. 

Para terminar, echando cuentas, la query debería tardan aproximadamente 1 segundo, y efectivamente, así era. De las 224 personas que participaron, menos de un 5% dieron una respuesta entre 0.5 y 1.5 segundos, menos de 10% si muevo el rango de 500ms a 3s.

Pero aquí no termina todo, a nada que sepas SQL podrás intuir que para ejecutar esa query no necesitas leer todos los datos todas las veces que ejecutes la query, puedes ir agregando a medida que vienen los datos. SI estás pensando ahora mismo en “pongo un scheduler que se ejecute cada minuto” o “uso spark whatever” o “snowflake blabla” siento decirte que la tecnología ha avanzado en estas últimas 3 décadas y ahora las cosas se pueden en tiempo real. Bueno, procesar 1000 registros cada segundo se puedía hacer hace unos 30 años en cualquier PC, va a hacer 30 años de la release de DOOM, amigos (para los milenials, DOOM era nuestro Fortnite)

Así que si agregas según vienen los datos, necesitas almacenar unos 12 días (aprox 100M de eventos al día son generados a 1000 ev/s) con lo cual necesitas una tabla de 12 filas con 3 columnas: fecha, suma total, count. Eso son unos 144 bytes si usas 4 bytes por cada tipo de dato.

Con ese dato puedes intuir que la query está por debajo de 1 milisegundo casi con total seguridad, lo que se tarde en parsear la SQL y poco más. Si tu sistema tarda en parsear la query y coger 120bytes (~8kb en Clickhouse) más de 1ms, me jode ser yo el que te lo diga, pero hay algo que hay que repensar.

Solo 8 personas respondieron 1ms o menos. De hecho la query total costaba unos 0.8ms, ganó Claudia que puso 0.99 :) 

Si has llegado hasta aquí es porque el tema te interesa. Hice un curso de unas 3 horas explicando en detalle todo esto, lo puedes ver por aquí.

Gracias por pasar por el stand de Tinybird, fue un placer hablar con vosotros.
