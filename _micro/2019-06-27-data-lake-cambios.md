---
layout: micro_post
published: true
name: Data lake, los cambios
---

## Data lake parte IV, los cambios
El modelo de datos cambia sí o sí, básicamente porque modelan la vida real y la vida real cambia. Mucho.

### Queremos que las cosas no cambien

Todas las bases de datos series tienen mecanismos para cambiar la forma de los datos. Es muy simple
añadir una columna, cambiar el tipo o el nombre. Hay algunas incluso que el cambio es la constante
como las orientadas a documento.

Dado que van a cambiar queremos:

- Mantener todas las versiones de los datos
- Tener registro de todos esos cambios
- Poder consultar esos datos como si no hubiese cambios

Esto es más o menos trivial a nivel de gestión, lo complicado es saber cuando los datos han
cambiado. Parece fácil, pero no lo es, a menudo los desarrolladores cambiamos el modelo de datos, el
interfaz del API sin tener en cuenta todos los sistemas afectados.

### Los tipos de cambios

Hay dos cambios fundamentales (bueno, seguramente más, pero estos son los peores) que se pueden producir en los datos:

- Un cambio del esquema, es decir, hay una nueva columna o una vieja desaparece. Una columna ahora puede
  tener valores vacíos.
- No hay cambios de esquema pero la semántica del dato es diferente. Un atributo pasa de millas a
  kilómetros.

En ambos casos debe haber una diferencia clara.

### El interfaz común

La clave del asunto es no afectar a los sistemas que dependen de estos datos (si es posible). Si por
ejemplo, se añade una nueva columna o atributo, es fácil hacer que los sistemas que beben
información sean compatibles.

Si pasamos de millas a kilómetros es fácil que la mayoría de sistemas se vuelan locos. Tenemos dos
opciones, o cambiar todos los sistemas que dependen de mis datos o expongo mis datos a través de un
API en el que pueda multiplicar por 0.62 los datos en millas y por 1.0 los de kilómetros.





