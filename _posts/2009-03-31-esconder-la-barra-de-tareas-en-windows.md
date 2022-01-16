---
name: 'Esconder la barra de tareas en Windows CE .NET'
title: 'Esconder la barra de tareas en Windows CE .NET'
date: 2009-03-31T22:03:00.002+02:00
layout: post2
published: true
url: /2009/03/esconder-la-barra-de-tareas-en-windows.html
tags: 
- programacion
- windows ce
---

En los dispositivos tipo PNA (PDA con GPS incorporado) que no tienen windows mobile es muy común poder hacer algún hack para poder acceder al sistema que hay por debajo. En ese windows ce se pueden ejecutar aplicaciones normalmente sin ningún tipo de limitación, aunque algunos limitan el acceso al GPS o bluetooth.  
  
Si quieres crear una aplicación a pantalla completa (para, por ejemplo, una applicación 3D) queda muy mal la minúscula barra de tareas de windows ce .net, lo ideal es quitarla, para ello el siguiente código:  
  
void HideTaskbar()  
{  
TCHAR\* window\_names\[\] = { \_T("menu\_worker"), \_T("HHTaskBar"), \_T("Shell\_TrayWnd"), \_T("Tray") };  
for(int i = 0; i < sizeof(window\_names)/sizeof(window\_names\[0\]); ++i)  
{  
HWND hwndCB = ::FindWindow( window\_names\[i\] , \_T("") );  
if(hwndCB)  
::ShowWindow( hwndCB, SW\_HIDE );  
}  
}  
  
  
Se basa en buscar la ventana de la barra de tareas y ocultarla, así de simple. Realmente es una tontería, pero me costó un rato dar con ello y así lo tengo localizado :). Hay 4 nombres porque me he encontrado diferentes nombres en diferentes tipos de PNA, así que así me aseguramo.  
  
NOTA: El formateo de código no es mi fuerte como podeis comprobar, alguna herramienta para blogger?