---
layout: blog2
title: animaciones en javascript
---


# Animaciones en javascript

Ahora que javascript está tan de moda, es tan potente y nos permite hacer lo que código nativo nos permitía hacer en un 486 los desarrolladores estamos empezando a hacer cosas algo más interesantes que poner texto y enlaces como juegos o animaciones. Lo cierto es que a pesar de que javascript sea aún lento para hacer cosas con mucha carga matemática, tenemos a nuestra disposición tarjetas gráficas muy potentes y gracias a las mejoras que últimamente han incluído en los navegadores, podemos usarlas directamente (con WebGL) o indirectamente (CSS3, SVG, canvas)

El objetivo de este artículo no es explicar como renderizar rápido ni de como aprovechar la GPU si no de **como hacer una animación**.

## paso 1: setInterval

Lo primero que se nos ocurre es el típico [setInterval](https://developer.mozilla.org/en/DOM/window.setInterval). Seguro que conoces la función, pero básicamente lo que hace es llamar a una función que le especificas cada cierto tiempo. Por ejemplo, la animación sería tal que así:

    {% highlight javascript %}

        setInterval(function () {
            update()
            render();
        }, 20)

    {% endhighlight %}

Esto llamará a la función cada 20ms, esto es 50 frames por segundo (FPS). Para la mayoría de casos cumple perfectamente. Pero qué pasa si la función update tarda 30ms en terminar? Realmente no sé que es lo que hace el navegador, supongo que cada uno tendrá su política, pero cabe pensar que con el tiempo se empezarán a aculumar eventos de llamada a esa función ya que no es capaz de terminar en menos de 20ms.

Aunque el navegador fuese muy listo y gestionase eso perfectamente no podemos hacer la animación correctamente porque no sabemos el tiempo que ha pasado de un frame a otro.

## paso 2: setTimeout

Para evitar que se nos acumulen llamadas por que la función es lenta vamos a pedir renderizar un frame solo cuando hayamos terminado:

    {% highlight javascript %}

        var logic = function () {
            update()
            render();
            setTimeout(logic, 20);
        };
        setTimeout(logic, 0);

    {% endhighlight %}

Vale, ahora ya no se acumulan eventos y si la función update o render tarda más que esos 20ms no pasará nada, sólo actualizaré la animación cuando el frame anterior haya terminado. Mejor que antes pero aún estamos animando como unos tristes.


## paso3: controlando la animación

Imaginemos que estamos controlando una animación de una imagen moviendose por la pantalla. Queremos que en 1 segundo se mueva 500px:

    {% highlight javascript %}

        var img = new Image();
        img.src = 'image.png';
        img.style['position'] = 'absolute';
        var pos = 0;
        img.style['left'] = pos + 'px';

        var logic = function () {

            // update
            pos += 500*0.02;
            img.style['left'] = pos + 'px';

            // browser will render the img on style change
            //render();
            if(pos < 500) {
                setTimeout(logic, 20);
            }
        };
        setTimeout(logic, 0);

    {% endhighlight %}

En un segundo, a 50FPS habremos dibujado 50 frames con lo cual pos será 500 al pasar un segundo. No está mal, pero imaginemos que tenemos una máquina lenta, tan lenta que no es capaz de actualizar a 50FPS. En ese caso tendremos que la imagen llegará a la posición 500px, pero en más de un segundo. No estamos controlando el tiempo. 


Para ello podemos usar el tiempo transcurrido desde el último frame. Vamos, lo que se lleva aplicando en videojuegos simples toda la vida:

 {% highlight javascript %}

        var t0 = new Date().getTime();
        var logic = function () {
            var t1 = new Date().getTime();
            var dt = t1 - t0;
            t0 = t1;

            // update
            pos += 500*dt;
            img.style['left'] = pos + 'px';

            // browser will render the img on style change
            //render();
            if(pos < 500) {
                setTimeout(logic, 20);
            }
        };
        setTimeout(logic, 0);

    {% endhighlight %}

Ya está, ahora aunque la máquina sea lenta controlamos la animación correctamente

## paso 4: requestAnimationFrame

Ahora podemos controlar un poco mejor la animación gracias a [requestAnimationFrame](https://developer.mozilla.org/en/DOM/window.requestAnimationFrame). Para variar es una función que no es standard y cada navegador la implementa con el nombre que le da la real gana.

En resumen, esta función llama a la función que nostros queramos cuando el navegador vaya a renderizar. Eso es bueno, por que si nosotros llamamos 1000 veces por segundo a esta función como mucho llamará a la animación el máximo que pueda actualizar. Asumamos que esto es bueno, aunque si estás haciendo algo medio serio la actualización de la lógica puede ir parcialmente desacoplada del renderizado (luego veremos un ejemplo).

Así que la cosa quedaría tal que así:

    {% highlight javascript %}
        var logic = function () {
            var dt = //calculate dt
            uddate(dt);
            render()
            requestAnimationFrame(logic);
        }
        requestAnimationFrame(logic);
    {% endhighlight %}

Perfecto, además podemos llamar a requestAnimationFrame desde cualquier lado para que comience la animación.

Normalmente (la ley del copy & paste así lo dice) se define requestAnimationFrame tal que así:

    {% highlight javascript %}
        var requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(a){setTimeout(a,20);};
    {% endhighlight %}

aunque en mi opinión debería ser algo así:

    {% highlight javascript %}
        function createRequestAnimationFrame(fn) {
            var rendered = true;
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(a) {
                    if(rendered) {
                        rendered = false;
                        setTimeout(function() {
                            fn();
                            rendered = true;
                        }, 20);
                    }
                };
        }

        logic = function() {
            update();
            myAnimationRequestFrame();
        }
        myAnimationRequestFrame = createRequestAnimationFrame(logic);
        myAnimationRequestFrame();

        element.onclick = function() { 
            // logic
            myAnimationRequestFrame();
        }
    {% endhighlight %}

De este modo aunque llamemos 1000 veces a myAnimationRequestFrame sólo se llamará a la animación cuando toque

## paso 5: casos extremos

Qué pasa si el navegador es muy lento. Bueno, lo ideal es quitar la animación, pero claro, no sabemos a priori si la máquina es lenta (bueno, puedes comprobar si es Firefox). Para evitar que todo se vaya al traste quizá lo mejor sea limitar la animación para que no se vaya de madre.

    {% highlight javascript %}
        var logic = function () {
            var dt = //calculate dt
            dt = Math.min(0.05, dt);
            update(dt);
            render()
            requestAnimationFrame(logic);
        }
        requestAnimationFrame(logic);
    {% endhighlight %}

De esta forma si la animación es muy lenta la ralentizamos pero así estamos seguros de que la lógica no falla. También nos protege del caso en el que el usuario cambie de tab (requestAnimationFrame no asegura que se llame al callback si la pestaña donde se ejecuta el código no está activa), al volver a activarse el dt será muy grande y podría desestabilizar en caso de no controlar el dt. Imagino que habrá algún API para controlar si la pestaña es activa...

Imaginemos que la función update hace algo más complejo que sumar, por ejemplo una integración numérica. En ese caso si el dt es muy grande la integración se puede ir al traste, necesitamos dt suficientemente pequeños. Ese caso quedaría resuelto también.

Por ejemplo, queremos que en el ejemplo anterior la imagen vaya hasta 500 pero suavemente:
    {% highlight javascript %}
        var smooth = 0.1;
        var distance_to_target = 500 - pos;
        pos += distance_to_target*smooth*dt;
    {% endhighlight %}

Si dt es muy grande lo que pasará es que esa función empezará a oscilar haciendo un efecto muelle en vez de llegar suavemente o incluso oscilará hasta el infinito si dt es muy grande (a que os suena de de cuando érais jóvenes y estudiabais? si eres teleco/industrial y no te suena vuelve a la carrera).


## y último: haciendo las cosas realmente bien

Mejor que explicarlo aquí, id a este artículo del mítico Javier Arévalo y grabadlo en vuestra mente:

[Fixed time step loop](http://www.iguanademos.com/Jare/Articles.php?view=FixLoop)


### Comentarios y trolleos son bienvenidos

[@javisantana](https://twitter.com/javisantana)













