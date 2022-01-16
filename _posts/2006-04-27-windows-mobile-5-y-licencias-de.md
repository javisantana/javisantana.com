---
name: 'Windows Mobile 5 y licencias de aplicación'
title: 'Windows Mobile 5 y licencias de aplicación'
date: 2006-04-27T11:56:00.000+02:00
layout: post2
published: true
url: /2006/04/windows-mobile-5-y-licencias-de.html
---

La mayoría de aplicaciones que se basan en licencias utilizan algún sistema para fijar una licencia a un determinado dispositivo, de tal forma que esa licencia solo se puede usar para cierto dispositivo y no otros. Es lógico pensar que una de las opciones es usar el identificador único que la mayoría de máquinas tienen para fijar esta relación.  
  
Hace no demasiado me he comprado un PocketPC que trae windows mobile 5 y una de las cosas que me hn llamado la atención es que al ejecutar algunas aplicaciones el sistema operativo me avisaba de que no estaba firmada y podría dañar mi equipo. Ya estamos acostumbrados a ver estos mensajes cuando instalamos un driver en windowsxp que no está firmado por alguna autoridad y por tanto he estado pasando de él.  
  
En estos días estoy testeando la aplicación para asistencia al guiado para el agricultor en diferentes equipos y me han dejado un pocketpc con windows mobile 5 con un GPS con un refersco de 5Hz. Al arrancar la aplicación veo que la rutina que toma el identificador del dispositivo falla. Voy a internet y tras unos minutos encuentro lo [siguiente](http://blogs.msdn.com/windowsmobile/archive/2006/01/09/510997.aspx): resulta que por cuestiones de seguridad microsoft ha optado por deshabilitar las llamadas al sistema que permitían obtener el identificador del dispositivo salvo para códigos "trusted", esto es, de una fuente conocida. Para ser una fuente conocida tu aplicación debe tener un certificado que permite leer ese identificador y claro, para obtener esa certificación tienes que abonar la [correspondiente suma.](http://blogs.msdn.com/windowsmobile/archive/2005/11/03/488924.aspx)  
  
Menos mal que han habilitado una función para recoger el ID, GetDeviceUniqueID, y cuyas cabaceras y librerías vienen en el SDK de windows mobile 5, que por otro lado no te puedes bajar si no posees una copia legal de windows. Como son 170 y pico megas y yo vengo de una saga de aventureros usuarios de modem de 56k decidí que pasaba de bajarme toda esa purrela para usar una simple función. Recordé mi época en la que todo era maravilloso y todo lo quería hacer modular dividiendo las aplicaciones en tropecientas DLL's que, por cierto, casi nunca llegaban a ninguna parte, y me puse manos a la obra.... un poco de LoadLibrary, un poco de punteros a funciones y voila:  
  
  
typedef HRESULT (\*idfunc)(LPBYTE,DWORD,DWORD,LPBYTE,DWORD\*);  
inline BOOL GetDevideIDWindowsCE5(unsigned int \*id)  
{  
  
  
idfunc GetDeviceUniqueID;  
HINSTANCE h = LoadLibrary(\_T("coredll.dll"));  
if(h)  
{  
GetDeviceUniqueID=(idfunc)GetProcAddress(h, \_T("GetDeviceUniqueID"));  
if(GetDeviceUniqueID)  
{  
  
  
  
HRESULT hr = NOERROR;  
BYTE rgDeviceId\[DEVICE\_ID\_LENGTH\];  
DWORD cbDeviceId = sizeof(rgDeviceId);  
  
#ifndef GETDEVICEUNIQUEID\_V1  
#define GETDEVICEUNIQUEID\_V1 1  
#endif  
  
hr = GetDeviceUniqueID(reinterpret\_cast(APPLICATION\_DATA),  
APPLICATION\_DATA\_LENGTH,  
GETDEVICEUNIQUEID\_V1,  
rgDeviceId,  
&cbDeviceId);  
  
if(hr != NOERROR)  
  
{  
return FALSE;  
}  
BYTE\* p =(BYTE\*) rgDeviceId;  
unsigned int k = 0;  
for(int i=0; i< cbDeviceId; ++i)  
{  
k += \*p;  
}  
\*id = k;  
  
  
return TRUE;  
}  
  
return FALSE;  
  
}  
return FALSE;  
  
}