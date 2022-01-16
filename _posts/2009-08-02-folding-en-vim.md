---
name: 'folding en vim'
title: 'folding en vim'
date: 2009-08-02T20:10:00.003+02:00
layout: post2
published: true
url: /2009/08/folding-en-vim.html
tags: 
- programación
- vim
---

Hasta ahora no había usado el **folding de vim** porque me parecía un verdadero peñazo el crear los folds para el código en C/C++, sin embargo existe un modo de hacerlo tan simple que no puedo dejar de usarlo:  
  
:set foldmethod=syntax  
  
de esta forma se colapsa todo. Para abrir y cerrar tan fácil como:  
  
\- zO con 'O' de "open". Es mayúscula para que se abran los folds internos, si usas zo se abre el fold de primer nivel.  
\- zc con 'c' de close.  
  
Hay miles de tutoriales de folding, pero creo que he puesto la forma más simple que se puede.