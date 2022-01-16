---
name: 'Serializando en C++: implementación quick and dirty'
title: 'Serializando en C++: implementación quick and dirty'
date: 2008-03-29T21:56:00.003+01:00
layout: post2
published: true
url: /2008/03/serializando-en-c-implementacin-quick.html
tags: 
- programacion
---

Si hay una cosa que me molesta es tener que repetir código o funcionalidad. Cuando estás programando te das cuenta que a veces hay partes de funcionalidad que hacen más o menos lo mismo.  
  
Hay veces que tienes que implementar algo y cuando lo haces por gusto pues puedes pararte a implementar un mega sistema de serialización que te mueres, pero cuando tienes que hacer algo que sabes que no va a salir de ahí nunca te da igual la orientación a objetos. Esta es una lucha que siempre he tenido con mucha gente, el sobrediseño, el sobre\*, es decir, la tendencia a tener que aplicar los patronos existentes, la necesidad de usar una metología o un paradigma concreto, pero eso es otra historia.  
  
Necesitaba guardar y cargar datos y no me apetecía andar modificando el loader cada vez que modificase el writer... así que (formato patrocinado por vim):  
  
  
#include  
<stdio.h>  
  
**class** A  
{  
          
    **public**:  
        **int** a;  
        **int** b;  
        **float** c;  
  
        **typedef** **unsigned** **int** (\*serialize\_t)(**void**\*, **unsigned** **int**, **unsigned** **int**, **FILE**\* f);  
          
        **void** Save(**FILE**\* f)  
        {  
                Serialize(f, (serialize\_t)fwrite);                
        }  
        **void** Load(**FILE**\* f)  
        {  
                Serialize(f, fread);              
        }  
  
        **virtual** **void** Serialize(**FILE**\* f, serialize\_t ser)  
        {  
#define SER(x) ser(&(x), **sizeof**(x), 1, f)  
            SER(a);  
            SER(b);  
            SER(c);  
        }  
  
};  
  
  
**int** main()  
{  
    **const** **char**\* fn = "test.bin";  
    **FILE**\* f = fopen(fn, "wb");  
    A a;  
    a.a = 11;  
    a.b = 22;  
    a.c = 33.33f;  
    a.Save(f);  
    fclose(f);  
  
    A c;  
    f = fopen(fn, "rb");  
    c.Load(f);  
    printf("a: %d, b %d, c %f\\n", c.a, c.b,c.c);  
    fclose(f);  
  
    **return** 0;  
}  
  
  
guarro, poco elegante, rompe todos los paradigmas, pero rápido, funcional y efectivo :D