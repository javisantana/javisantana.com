---
layout: micro_post
published: true
name: "Data lake (y VIII): Conclusiones"
---

## Data lake (y VIII): Conclusiones

Si has llegado hasta aquí y has leído todos los capítulos verás que el Data Lake es el sueño de cualquier empresa media grande. Un sitio centralizado donde se puede consumir de forma uniforme toda la información del sistema.

Bien, es tan soñado que es una utopía si tu empresa no ha arrancado así desde cero (y si tiene cierto éxito, creeme, empezará a haber ramificaciones de los datos por aquello de la agilidad)

Así que si estás planteandote el data lake, data warehouse o sistema centralizado, piensa muy mucho si lo que realmente quieres es que las diferentes áreas de negocio expongan sus datos de una forma lógica.

Cada día más se habla de los microservicios, de dividir las empresas en diferentes áreas para darles agilidad (esto no es nuevo, ya lo decía Ricardo Semler en [Maverick](https://www.amazon.com/Maverick-Success-Behind-Unusual-Workplace/dp/0446670553)), de productizar esas áreas, pero la realidad es que poco se aplica cuando se habla de los datos, donde la centralización es el santo grial, especialmente en empresas donde la estrategia de datos ha sido mover CSV de FTP en FTP y donde básicamente se invierten cientos de millones en mega estructuras que nunca llegan a funcionar porque, ni son ágiles, ni son rápidas, ni son útiles porque se pensó más en la fiscalización que en la disponibilidad de la información y porque hay empresas que saben vender muy bien el dorado cuando el problema que no resuelven es el de las personas.

Hay muchas más estrategías además de centralizar:

- Exponer los sistemas como API (muy en la línea de amazon)
- Entender los sistemas como productos. Acaso cuando usas Google Analytics piensas en centralizar
  sus datos también? en realidad piensas como consumirlos (que normalmente es a través de su
  interfaz) o con un sistema lateral como Big Query.
- Al hilo de lo anterior, es facilísimo disponibilizar los datos de una parte del negocio usando
  herramientas que tengan una forma fácil de conectar a tus sistemas y tenga un sistema básico de
  autorización, auditoría y disponibilización de los datos. [Tinybird](https://tinybird.co), el producto que desarrollo es uno de estos sistemas, pero hay muchos otros, por ejemplo [Databricks](https://databricks.com), [Amazon Glue](https://aws.amazon.com/es/glue/)

Recuerda, tener centralizada la información es el camino, pero el objetivo es hacer que la
información esté disponible y a eso se puede llegar por muchos caminos. 

Y por último, empieza por la cultura y no por la tecnología, si tus empleados no saben nada de datos
(formatos, como se almacenan, distribuyen, consumen...) y no hay unas guías clarísimas que pasen de
generación en generación (eso es la cultura, no?) cualquier iniciativa será en vano y terminarán
usando la tecnología que se lo ponga más fácil (en este caso en la nube)

