---
name: 'beauty XML con VIM'
title: 'beauty XML con VIM'
date: 2008-08-04T19:03:00.002+02:00
layout: post2
published: true
url: /2008/08/beauty-xml-con-vim.html
tags: 
- programacion
- vim
---

Estamos trabajando con unos servicios REST que devuelven la respuesta en xml (en realidad atom) y es un verdadero coñazo leer las respuestas que retorna el servidor ya que el XML no está ni formateado, nisiquiera tiene saltos de linea, en resumen todo apelotonado.  
  
Para ello he optado por crear un pequeño script para vim que no es perfecto pero soluciona la papeleta de forma eficiente:  
  
map <F6> :%s/>\\s\*</>\\r</g<CR>ggVG=  
  
EN resumen, busca ocurrencias de ...>(espacios)<... y mete un \\r entre ellas. Luego selecciona todo el texto (gg va al comienzo, V pasa a modo "selección lineas" y G lleva el cursor al final seleccionando todo), para al final reformatear con el bestialmente-util comando "=" de vim  
  
Ahora para ver la respuesta del servidor basta con hacer:  
  
wget http://server/v1/resources/ -qO- | vim - y pulsar F6 a continuación