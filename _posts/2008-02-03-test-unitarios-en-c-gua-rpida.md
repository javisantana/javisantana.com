---
name: 'Test unitarios en C++: guía rápida'
title: 'Test unitarios en C++: guía rápida'
date: 2008-02-03T20:58:00.000+01:00
layout: post2
published: true
url: /2008/02/test-unitarios-en-c-gua-rpida.html
tags: 
- C++
- unit test
- programacion
- cppunitlite
---

Propongo un contexto real: estamos programando bajo una plataforma asquerosa difícil de trata, pongamos una PDA. Tenemos un módulo, por ejemplo una clase que carga un fichero de configuración, que queremos probar y no queremos crear un programa específico para PDA que use la clase, cargue un fichero que hemos tenido que copiar y luego muestre resultados. Es mucho más cómodo hacerlo haciendo un "make" desde la línea de comandos.  
  
Hay diferentes frameworks para hacer test unitarios en C++, cada uno con sus ventajas, se puede ver un análisis (bastante pragmático) en [games from whitin](http://www.gamesfromwithin.com/articles/0412/000061.html). Yo he escogido [cppunitlite](http://www.gamesfromwithin.com/articles/0512/000103.html), por las siguientes razones:  
  
\- tiene todo lo que necesito: fixtures, asserts  
\- no tiene dependencias, se compila con un solo make y a funcionar  
\- apenas son 10 ficheros  
  
Una vez bajado para arrancar a funcionar solo es necesario tener instalado un compilador. Para windows me gusta usar [Mingw](http://www.mingw.org/) ya que además trae make. Además conviene tener instaladas las [herramientas de línea de comandos de linux para windows](http://unxutils.sourceforge.net/) (si no las tienes intaladas ya mereces un castigo).  
  
Bueno, vamos a crear el primer test unitario (formateo patrocinado por el conversor a HTML de vim):  
//  
#define GLOBAL\_CONFIGURATION "configuration.txt"  
#define DEBUG\_INFO  
#include "lib/TestHarness.h"  
#include "../../src/configuration.h"  
  
  
**class** ConfigurationFixtureSetup : **public** TestSetup  
{  
**public**:  
    **void** setup()  
    {  
        entries.push\_back(conf\_entry("LOG\_PROY\_DATA",0));  
        entries.push\_back(conf\_entry("GGA",1));  
        entries.push\_back(conf\_entry("GGL",1));  
        entries.push\_back(conf\_entry("RMC",1));  
        entries.push\_back(conf\_entry("RMZ",1));  
        entries.push\_back(conf\_entry("VTG",0));  
        entries.push\_back(conf\_entry("GSA",1));  
        entries.push\_back(conf\_entry("LOG\_REAL\_DATA",0));  
        entries.push\_back(conf\_entry("SMOOTH\_DIR",0));  
        entries.push\_back(conf\_entry("RATE",10));  
        entries.push\_back(conf\_entry("THRESHOLD\_VEL",0));  
        entries.push\_back(conf\_entry("SHOW\_CALC\_DIR",0));  
        entries.push\_back(conf\_entry("SHOW\_VELOCITY",0));  
        entries.push\_back(conf\_entry("SHOW\_SAT\_INFO",1));  
  
    }  
  
    **void** teardown()  
    {  
        entries.resize(0);  
    }  
  
      
**protected**:  
    Configuration fixture;  
    **struct** conf\_entry  
    {  
        conf\_entry(**const** **char** \*n, **int** v):  
        varName(n),  
        value(v)  
        {}  
        **const** **char**\* varName;  
        **int** value;  
    };  
    std::vector<conf\_entry> entries;  
};  
  
  
  
/\*\*  
\*/  
TESTWITHSETUP (ConfigurationFixture,Test\_ReadConf)  
{  
  
    **for**(**int** i = 0; i <  entries.size(); ++i)  
    {  
        **int** value;  
        CHECK(Configuration::GlobalConfiguration()->getValue(entries\[i\].varName, value));  
        printf("%s-> %d\\n",entries\[i\].varName, value);  
        CHECK( value == entries\[i\].value);  
          
    }  
  
}  
  
  
En resumen lo que hace es cargar un fichero de configuración y testear que todos los valores cargados son los esperados.  
  
Es un test muy simple y se puede lanzar desde la línea de comandos después (o antes) de la compilación sin necesidad de meterlo en la PDA, que es un coñazo terrible.  
  
  
  
Si de verdad quieres saber un detalle como hacer test unitarios en C++ recomiendo que leas [Pruebas unitarias con C++](http://www.lawebdejm.com/prog/cpp/cppunit.html), extenso y completo artículo de como hacer test en C++ con CPP unit escrito pon JM, un compañero de Unkasoft.