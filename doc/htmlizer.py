#!/usr/bin/python

import sys

if __name__ == '__main__':
  for x in open(sys.argv[1]):
    if "<!--" in x and "<div" in x:
      print x.replace("<!--", "").replace("-->", "")
    else:
      print x,

