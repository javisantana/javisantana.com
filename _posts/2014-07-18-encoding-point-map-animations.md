---
layout: blog3
published: true
---

# Encoding animated point map

During the latest world cup you probably saw some animated map with tweets around the world with
different colors depending on what team people were talking about. Yes, those that looks like a
fireworks. Those maps are done using torque, a technology we developed in CartoDB. This post is
about how to encode the data used to store the animation.

## a little bit of history

torque started some years ago for a project where we needed to show deforestation during some years.
You already know how a web map works, there are a bunch of tiles (usually png images), each one renders a
portion of the earth. In that case we couldn't use static images since the map should be controlled by the user. As a plus
we wanted to control the styling dinamically.

In that moment HTML5 canvas element was somthing new and not even used in maps but we went with
dynamic render. The problem was not actually render, it was generate the data in the server and transfer it. 


## torque data format

Torque format is pretty simple. Each tile is an array of points where each has two arrays, one for the time
slots the pixel is active and the other one with the value for that time slot.

```json
[
  {
    x__uint8: 8, // webmercator snapped to tile pixel
    y__uint8: 10,
    date__uint16: [0, 10, 45, 46] // steps * floor( (date - min_date)/(max_date - min_date) )
    vals__uint8: [1, 3, 5, 10],   // values for steps aggregated
  },
  ...
]
```

so lets say that we are showing tweets for a day interval, in that example for date 0 the number of
tweets at point 8, 10 would be 1, for date 10 would be 3 tweets and so on.

This format was proposed by [Andrew Hill](https://twitter.com/andrewxhill) and there is a [nice presentation about it](http://gijs.github.io/images/cartodb_datacubes.pdf). He got the idea
from datacubes and the nice thing about it is that you can generate a tile with a single SQL query.

The objective of this post is not explain in detail torque format (which is actually a on going task).

## encoding torque tile

One of the problems with torque tiles is the transfer size so encode it in a efficient way is
important to show the map as soon as possible. 

First step is to be as clever as possible not sending information that can not be visualized. Like
TopoJSON the coordinates and dates are quantified, the values are aggreagated and all is encoded as
integers in order to put things easier for the compressor. It's not easy to remove more information
without loosing visualization quality.

So the next thing is how to arrange and encode the data in the tile in order to archieve better
compression ratio.

So let's get 2 different datasets and let's try to re-arrange them. First one (tweets) is tweets from a world
cup match around the world (1.3M points), the second one (ships) is a dataset of ship positions during the
second world war (800k points). They are pretty different as we will see later.

The torque tile (0, 0, 0) size is:

    tweets: 854kb, 197kb, 76% gzip compressed ratio
    ships:  345kb, 72kb,  79% gzip compressed ratio

The compression ratio is pretty good (around 77%) but it can be improved

### delta encoding

I'm a big fan of PNG encoding, the way it prepares the data (filter step they call it in the spec)
to extract all the redundancy is pretty smart: simple, fast and very effective. Basically it
computes the difference between pixels before compression.

In torque format the dates array always grow (it's sorted) so it's encoded using delta the
compressionratio should improve:

    tweets: 854kb, 137kb, 84% (+7%)
    ships:  345kb, 79kb,  76%, (-3%)

oops, in tweets we improve 7% but in ships dataset we loose 3%

### arrange things

gzip compression works looking for similar strings so if we put similar things together we should
improve compression ratio. In torque tile we could switch from an array of objects to a single
object with different arrays, like:

```json
{
  x__uint8: [............],
  y__uint8: [............],
  vals__uint8: [............],
  dates__uint16 : [............],
}
```

the results for this are:

    tweets: 854kb, 119kb, 86% (+10%)
    ships:  345kb, 62kb,  82%, (+3%)

I tried some variations of this:
 - sorting pixels in different order
 - delta encoding pixels, dates and values

but the basically the archieved ratio is the same (+-0.5%), the standard deviation for the encoded
data and the data itself it's in the same magnitude so the encoder does not improve.

### arrange data by step

what happens if we reorder the data in a totally different way. Instead of storing the data by
coordinate, if the data is aggregated by time step, like:

```json
{
  0: {
    x__uint8: [............],
    y__uint8: [............],
    vals__uint8: [............],
  },
  1: {...}
}
```

the results: 

    tweets: 854kb, 329kb, 61% (-15%)
    ships:  345kb, 50kb,  85%, (+6%)

Some surprises here, for first dataset the compression if far worse but for the second one it's the
best. So looks like depending on the data a different codification archieve better compression
ratio.

In order to understand this I plot the torque tile using a 3D graph.

For the tweets tile this is how it looks like:

![tweets tile](/torque/tweets.png)

for ships:

![ships tile](/torque/ships.png)

It's clear that tweets dataset the positions more or less inmutable so encoding positions as keys
it's a good way to avoid duplicated data. For ships datasets the positions are not that fixed but
also the delta encoding in the coordinates works well because it's an animated path.

Although for tweets dataset this codification is worse it has some properties:

- this is the internal format used for rendering. It's not exactly the same, the renderer some
  typed arrays in order to not fill clients memory and be fast iterating when rendering

- I said before I'm a big fan of PNG. With this format some of the filtering techniques could be
  applied, specially if torque is storing [raster animated datasets](http://cartodb.github.io/torque/?no_ui#eyJjYXJ0b2NzcyI6IlxuTWFwIHtcbiAgLXRvcnF1ZS1kYXRhLWFnZ3JlZ2F0aW9uOiAnY3VtdWxhdGl2ZSc7XG4gIC10b3JxdWUtcmVzb2x1dGlvbjogNDtcbn1cbiNsYXllciB7XG4gIG1hcmtlci13aWR0aDogNDsgXG4gIG1hcmtlci1maWxsOiAjRkVFMzkxOyBcbiAgbWFya2VyLXR5cGU6ICdyZWN0YW5nbGUnO1xuICBbdmFsdWUgPiAyXSB7IG1hcmtlci1maWxsOiAjRkVDNDRGOyB9XG4gIFt2YWx1ZSA+IDhdIHsgbWFya2VyLWZpbGw6ICNGRTk5Mjk7IH1cbiAgW3ZhbHVlID4gMTZdIHsgbWFya2VyLWZpbGw6ICNFQzcwMTQ7IH1cbiAgW3ZhbHVlID4gMjRdIHsgbWFya2VyLWZpbGw6ICNDQzRDMDI7IH1cbiAgW3ZhbHVlID4gMzJdIHsgbWFya2VyLWZpbGw6ICM5OTM0MDQ7IH1cbiAgXG59XG4gICAgIiwib3B0aW9ucyI6eyJ1c2VyIjoiamF2aSIsInRhYmxlIjoiZmFybWVyIiwiY29sdW1uIjoiY2FydG9kYl9pZCIsImNvdW50YnkiOiJjb3VudChjYXJ0b2RiX2lkKSIsInJlc29sdXRpb24iOjQsInN0ZXBzIjo0NjMuNTA3MjYyMjYzNjMzOSwiYW5pbWF0aW9uRHVyYXRpb24iOjMwfX0=) and they are encoded using paeth

- Also interlacing from PNG makes sense here. The way it works is using subdivision, exactly the
  same technique is used in quadtree tiles
  

Just try [torque.js](http://github.com/cartodb/torque) :)