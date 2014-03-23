---
layout: blog3
published: true
---

## GPS app programming

I've been working with apps that use GPS since 8 years. I'm not an expert on that mather, I'm far to know all the stuff related to high precision GPS, post processing, RTK, how a GPS works internally and so on. In any case there are a bunch of tips from the app programmer point of view you may find useful.

First of all, if you are going to create an app that needs to measure things forget to use any kind of internal GPS. I don't recommend it since the error is really big even with clear sky view (no obstacles). Those GPS are very good in saving battery, adquiring singal pretty fast but that's all.

So the tips, most of them from the development of agroguia, a [GPS guidance system for farmers](http://agricgear.com) and [flatout, a timing app for race cars](http://flatout.es).

- Save all the data so you can reproduce it in a emulator with exactly the same timing. So save the timestamp GPS provides and, very recommended, the time the GPS gives you the information. I usually save the tick when the info was processed so the steps can be reproduced exactly in the same way they happened (this will save you hours of debugging)

- GPS position information is from the real world. And in the real world there is noise so forget about the good data you usually get from a JSON API. You need to know basic stuff about signal processing: filters, hysteresis, extrapolation, interpolation and so on. And please, please, use relative coordinates and time to interpolate. 

For example, it's pretty common to get 25 meters jumps and it's clear that a bike can't do 25 meters/s (in normal conditions) so if you are coding a strava like app, take that into account. Use domain information to fix those errors. You even can improve that more using [some statistics](http://en.wikipedia.org/wiki/Kalman_filter).

- Store you data properly: Use a standard format, SHP, GeoJSON, CSV, whatever but it should be easily readable by GIS apps, you don't want to create your own applications for that. I use [CartoDB](http://cartodb.com) to analize the data and before CartoDB I had my own tools (that's why I know how horrible is to do it on your own) and google earth. Don't forget to store speed and course from the GPS, you could calculate them from position and time but [gps devices uses doppler to calculate them](http://www.aprs.net/vm/gps_cs.htm) so it's an independent variable (which is pretty useful for extrapolation)

- Use the maximun precision you can but don't store more precision than the GPS devices give you. Normally with a ieee754 float is enough, for precisions below 20 centimeters you need to go with a double (I'm always talking about WGS84 lat/lng).

- Use the right projection. If you are going to measure things, use projections that don't include distorsion in the zones your app is going to be used. You need to remember those lessons (looked useless at that time eh?) about floating point errors and you may need to use derivates to know the maximum error ([read this](http://en.wikipedia.org/wiki/Great-circle_distance)). I use a variation of UTM where the center is in the first position I get from the GPS. 

- Be able to tag your tests. The good thing about programming GPS apps is that you can go out and see the sun from time to time but remember, once you get the data tag it to know exactly what you did in the field. It's pretty common to not be able to remember what happened. I use a gopro cam these days to record what I do, for example [in this case](http://javisantana.com/kotar/) I use it to link gps traces with real world events and measure errors.

- Manage all the GPS states. A GPS can lost the signal so give information to the user about that and **log it** somewhere so you can reproduce it.

- Try to use GPS with more than 1hz update rate. There are lot of cheap GPS units with 4hz which is a big step in terms of user experience.

- Dig into GPS documentation, they have some presets to work in different conditions (plane, pedestrian, static...) that change the behavior a lot. Learn about the information they [give you](http://www.gpsinformation.org/dale/nmea.htm). 

Hope you like it, if you want to know more in deep information ping me @javisantana