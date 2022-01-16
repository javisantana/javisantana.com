---
name: 'Consejos para crear tu propio formato de fichero'
title: 'Consejos para crear tu propio formato de fichero'
date: 2007-12-03T21:03:00.000+01:00
layout: post2
published: true
url: /2007/12/consejos-para-crear-tu-propio-formato.html
tags: 
- formatos de fichero
- programación
---

Cuando programas una aplicación, por pequeña que sea, siempre tienes la necesidad de almacenar ciertos datos que permanecerán durante las sucesivas ejecuciones. Lamentablemente los requisitos y diseños de las aplicaciones cambian y normalmente se ven reflejados en el modelo de datos que tenemos, con el consecuente cambio en la forma de almacenar los datos.  
  
Esto se eleva a la máxima potencia cuando además esos datos son de usuario y se añaden varios problemas más:  
  
\- el primero y más importante es que para el usuario sus datos son importantes y no puede perderlos.  
\- el segundo es que los datos ya no están tranquilamente resguardados en un sitio calentito, van a salir a la calle, VAN A SER MANIPULADOS POR EL USUARIO, serán comprimidos, copiadas, borrados y transferidos.  
  
Hay una serie de puntos que pueden salvarnos de muchos problemas, no son desde luego axiomas, pero a mi me han salvado de más de un problema, aquí van:  
  
\- Elige un formato: texto o binario, por un lado el texto nos permite hacer debug rápidamente, hacer cambios a mano, tiene la pega que es más complejo de leer ya que requiere un parseo. Por el contrario el binario para debug es un infierno pero permite una lectura más rápida y además evita que los usuarios sepan más de lo que quieres. Esta pequeña guía es para formatos binarios  
  
\- Usa un magic al comienzo del fichero: esto es, unos bytes prefijados por los cuales sepas nada más leer los primers bytes que de verdad es tu fichero. Esto es condición necesaria, pero no suficiente, aunque te quitará de problemas. Un detalle más, el MAGIC si puede ser ascii mejor, de esta forma cuando abrimos el fichero con un editor de texto veremos nuestro magic ahí, lo primerito y sabremos si es un hijo nuestro o no. Probadlo con un PNG, ZIP o similar, todos tienen un magic ascii.  
  
\- Usa un número de versión. De esta forma cuando tus datos vayan cambiando tus loader sabrán que hacer con ese fichero en función del número de versión. Además, conviene que tengas dos números de versión, uno que indique que cambia tu formato y otro que diga que el fichero ha cambiado pero que el formato sigue siendo el mismo. En este punto hay un tema bastante interesante: qué hacemos con ficheros que son de versiones anteriores a la actual? tenemos varias opciones, personalmente he usado dos, por un lado tener algo así:  
  

> loader = loaderFactory.getLoader(fileVersion);  
> loader.load(file);

  
o por otro:  

>   
> if(fileVersion != currentFileVersion) {  
> migrateFile(fileVersion, currentVersion);  
> }  
> loader.load(file);  

  
  
Sinceramente no sabría decir cual de las dos es mejor, en agroguía uso la primera y no me cuesta mucho mantenerla.  
  
\- guarda siempre más datos de los que necesites. Salvo que el dispositivo esté muy limitado normalmente dará igual tener un fichero de 500kb que de 600kb y te puede ayudar una burrada. Para qué puede servir esos datos extra? pues por ejemplo para almacenar datos de debug, acciones del usuario, datos internos que es posible que dentro de 4 días te puedan servir. Personalmente a mi los datos de más que guarda la aplicación me han servido para poner la cara roja a más de uno y me ha evitado problemas.  
  
\- No te cierres puertas, deja el formato abierto al futuro (pero tampoco demasiado), esto es, organizalo por secciones de forma que dejes secciones para uso futuro, te ahorrás tiempo haciendo conversores y loaders, aunque será un poco más complejo crear el loader la primera vez.  
  
\- Utiliza serializer si puedes, en pocas palabras, intenta que el código que guarda y salva ser el mismo siempre, así no habrá problemas de incoherencias entre lo que guardas y lo que cargas. No es fácil hacer un sistema así, sobretodo cuando hay objetos de por medio, el [código público del unreal](http://unreal.epicgames.com/Downloads.htm) tiene un ejemplo a lo bestia. La idea sería más o menos así:  
  

class serializer {  
 public:  
  bool isReading;  
  bool serialize(int &i) {  
   if(isReading)  
    i = readIntFromFile();  
   else  
    writeIntToFile(i);  
 }  
  
};  
  
class MyClass {  
 int data;  
 void serialize(Serializer s) { s.serialize(data); }  
}

  
No es lo más óptimo, pero te soluciona la vida :). También se puede implementar al modo cutre con una macro de c++. [Otra forma de verlo en la web de chaos^fr](http://www.xyzw.de/c140.html).  
  
\- Puede que tus datos ocupen mucho, intenta que cuando lo guardes sean lo más fácilmente comprimibles, un codificador de deltas no es prácticamente nada en código y puede resultar en un ahorro de espacio considerable una vez se ha comprimido el fichero, para por ejemplo enviar por correo.  
  
Seguro que hay mucho más, pero estos son para mi los más importantes. A mi me habría venido muy bien a la hora de no perder el tiempo cuando he tenido que modificar el fichero de save.