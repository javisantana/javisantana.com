#!/bin/bash

mkdir build
for i in `find . -name *.md`; do 
  landslide -t base_theme $i -d `dirname $i`/presentation.html
  landslide -t base_theme $i -d `dirname $i`/presentation.pdf
done;
