---
name: 'undefined'
title: 'undefined'
date: 2005-04-04T01:32:00.000+02:00
layout: post2
published: true
url: /2005/04/es-tarde-s-y-maana-tengo-que.html
---

Es tarde, sí, y mañana tengo que levantarme pronto, pero creo que este post merece la pena. En el post anterior comentaba que estaba haciendo una aplicación para generación de contenidos procedurales. Llegado un punto de la aplicación me veo en el aprieto de tener que exportar e importar un montón de variables y, la verdad, es una pesadez. Esto me recordó que hace tiempo viendo la [web de chaos](http://www.xyzw.de/) - componente de farbrauch - y en concreto un artículo sobre, textualmente, ["Load&Save"](http://www.xyzw.de/c140.html) , había una forma interesante de serializar los structs/clases. La verdad que el método es cutre, mejor dicho, poco elegante, incluso leyendo un poco comenta que reserva de entrada 64mb - ahora la memoria es barata -. Aún así el método es efetivo y simple y deduzco por sus comentarios que lo usa en su demo editor [.werkkzeug1](http://www.theprodukkt.com/) - este editor merece un post aparte en mi opinión -.  
  
Con todo esto pensé en crear un serializer basado en esto lo más simple posible y aquí está:  
  
#define SERIALIZER(var,type,ser) do { if(ser.rw) { (var) = \*(type\*)(ser.mem); ((unsigned char\*)ser.mem)+= sizeof(type); } else { \*(type\*)(ser.mem) = var;((unsigned char\*)ser.mem)+= sizeof(type); } } while(0)  
struct serializer  
{  
  
serializer(bool \_rw):  
rw(\_rw)  
{  
// 6 megas está bien  
if(!rw) base = mem = new unsigned char \[ 6\*1024\*1024\];  
}  
bool rw;  
unsigned char \*base;  
unsigned char \*mem;  
  
void Save(const char\* file){ }  
void Load(const char\* file) {}  
  
void debug\_dump()  
{  
int len = mem - base;  
  
unsigned char \*p = base;  
while(len--)  
{  
printf("0x%x ",\*p++);  
if(!len%20) printf("\\n");  
}  
}  
  
};  
  
El código está codeado en poco tiempo y poco testeado. Tiene dos métodos para cargar y guardar en fichero que aún no están implementados y que de momento no he implementado. Tampoco sigo las típicas reglas de código elegante y bien diseñado pero estoy hasta las pelotas, me dedico a hacer cosas que funcionen, y en este caso parece que funciona, y para muestra, un botón:  
  
  
struct A  
{  
int a;  
int b;  
short c;  
char d;  
  
A(int seed)  
{  
a = seed++;  
b = seed++;  
c = seed++;  
d = seed++;  
}  
void Serialize(serializer& s)  
{  
  
SERIALIZER(a,int,s);  
SERIALIZER(b,int,s);  
SERIALIZER(c,short,s);  
SERIALIZER(d,char,s);  
}  
void print()  
{  
printf("%d %d %d %d\\n",a,b,c,d);  
}  
};  
struct B  
{  
A a;  
A b;  
B(int o)  
:a(o),b(o+1)  
{}  
void Serialize(serializer& s)  
{  
a.Serialize(s);  
b.Serialize(s);  
  
}  
void print()  
{  
a.print();  
b.print();  
}  
};  
int \_tmain(int argc, \_TCHAR\* argv\[\])  
{  
serializer s(false);  
B a(1);  
a.Serialize(s);  
s.debug\_dump();  
a.print();  
  
serializer s2(true);  
s2.base = s2.mem = s.base;  
printf("\\n");  
B b(0);  
b.print();  
printf("\\n");  
b.Serialize(s2);  
b.print();  
return 0;  
}  
  
  
da como salida por pantalla:  
  
C:\\temp\\serialize\\Debug>serialize.exe  
0x1 0x0 0x0 0x0 0x2 0x0 0x0 0x0 0x3 0x0 0x4 0x2 0x0 0x0 0x0 0x3 0x0 0x0 0x0 0x4  
0x0 0x5  
1 2 3 4  
2 3 4 5  
  
0 1 2 3  
1 2 3 4  
  
1 2 3 4  
2 3 4 5  
  
Como conclusión decir que a buen entendedor, pocos printf's bastan y que tengo que encontrar algún método para que el código quede bien y no me joda los identados