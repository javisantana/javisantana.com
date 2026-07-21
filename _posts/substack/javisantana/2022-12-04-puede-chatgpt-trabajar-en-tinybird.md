---
title: "Puede chatGPT trabajar en Tinybird?"
date: 2022-12-04
layout: post
source_url: "https://javisantana.substack.com/p/puede-chatgpt-trabajar-en-tinybird"
substack: "javisantana"
substack_id: 88611355
cover_image: "https://substackcdn.com/image/fetch/$s_!uDpk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F37bc7e92-37c8-4c8e-94b5-f2f214759087_1512x2264.png"
---

Hoy he estado jugando con chatGPT, si no sabes de que va, lee el anuncio de [OpenAI](https://openai.com/blog/chatgpt/). No había hecho mucho caso a GPT3 y mucho menos con todo el rollo generativo de imágenes que ha habido últimamente, que como juguete y movimiento cultura está bien, pero tal cual no veo mucho recorrido salvo como entretenimiento infantil y para ahorrarse unos euros en ilustradores si quieres hacer algo poco original. Ya veremos a donde nos lleva, la mayoría de cosas grandes empiezan como simples “juegos”.

Estoy bastante seguro que este post va a envejecer mal y muy rápido, pero me viene bien para reflexionar sobre el tema. Ahí vamos. 

Thanks for reading Javi Santana! Subscribe for free to receive new posts and support my work.

Al asunto, me registro en chatGPT y como soy un incredulo he empezado por preguntarle gilipolleces y me sorprende lo bien que responde. Pero bueno, son gilipolleces. Como no tenía mucho tiempo para andar con tonterías he pasado directamente a algo más serio: le he mandado responder el test técnico de data engineer para Tinybird ([por aquí](https://twitter.com/javisantana/status/1430823526177648641) tienes un poco de contexto del porqué de la prueba). He copiado y pegado el texto, nada más. No te digo como lo ha respondido, te lo enseño.

![To solve this problem, you would need to follow these steps:  Download the NYC "Yellow Taxi" Trips Data from the provided link. This data is available in the form of Parquet files, which are a column-oriented binary file format that is optimized for efficient data storage and processing.  Use a Parquet reader, such as Apache Spark or Apache Arrow, to read the data from the Parquet files and create a DataFrame or Table that represents the data in a tabular format.  Use the DataFrame or Table API to calculate the 0.9 percentile of the "distance" column in the data. This will give you the threshold value above which 0.9 percent of the trips in the data are located.  Use the DataFrame or Table API to filter the data to only include trips with a "distance" value greater than or equal to the calculated 0.9 percentile value. This will return all the trips over 0.9 percentile in distance traveled.  Store the resulting data in a new Parquet file or other format, and provide the code and instructions for reproducing your results in a readme file.  For example, using Apache Spark, the code to solve this problem might look something like this:  Copy code // Read the Parquet files into a DataFrame val df = spark.read.parquet("/path/to/data/*.parquet")  // Calculate the 0.9 percentile of the "distance" column val percentile = df.stat.approxQuantile("distance", Array(0.9), 0.1)(0)  // Filter the DataFrame to only include trips over 0.9 percentile in distance val result = df.filter($"distance" >= percentile)  // Save the resulting DataFrame as a Parquet file result.write.parquet("/path/to/result.parquet") This code reads the NYC "Yellow Taxi" Trips Data from](https://substackcdn.com/image/fetch/$s_!uDpk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F37bc7e92-37c8-4c8e-94b5-f2f214759087_1512x2264.png)

Luego le he preguntado si lo podría hacer sin spark y ha usado pyarrow, también lo ha portado a C++ y le he pedido hacer un servicio web para este código que ha clavado el muy cabrón.

Y ahora viene la parte dura: es mejor que el 90% de las respuestas de humanos que recibo. Si yo me dedicase a programar empezaría a preocuparme (oh! mierda)

Lógicamente las pruebas técnicas que hago son para que las personas pregunten por el contexto y por suerte, de momento, el chat no pregunta, se limita a seguir órdenes. En otras palabras, la prueba técnica es de encontrar las preguntas correctas. 

Tampoco chatGPT es capaz de crear sistemas complejos, solo plantear una solución a un problema tan cerrado como este, pero seamos sinceros, la gran mayoría de programadores hacen trabajo repetitivo por mucho que nos miremos a nosotros mismos como ”craftmanshipsers”. 

Si yo tuviese 20 años estaría mirando muy fuerte a lo que está pasando ahora mismo y estaría llamando a la puerta de OpenAI o similar suplicando cada semana que me contratasen (*), está claro que el cambio está a punto de despegar y es el momento donde se puede salir a pescar. Esto sí que creo que es un cambio de marcha y no los 15 años que llevamos perdidos en reimplementar en javascript todo lo que java ya había resuelto (esto se estudiará en los libros de historia, como movimiento cultural y en documentales como super construcciones).

Pero ojo, tampoco me las quiero dar de VC aquí, falta integrar estos sistemas en los flujos de trabajo de las personas y los sistemas, estamos cerca pero creo que no nos quemamos todavía. Sigo muy de cerca [aigrant](https://aigrant.org/) que creo que ha llegado en el momento adecuado, con el mensaje adecuado (los fundadores son inversores en Tinybird, gente con criterio, ya sabes)

Por cierto, voy a añadir a la prueba técnica que no se puede usar GPT (salvo que lo hayas desarrollador tú, claro)

(*) con 40 también

Thanks for reading Javi Santana! Subscribe for free to receive new posts and support my work.
