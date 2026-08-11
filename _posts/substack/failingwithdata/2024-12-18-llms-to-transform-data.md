---
title: "LLMs to transform data"
date: 2024-12-18
layout: post
source_url: "https://failingwithdata.substack.com/p/llms-to-transform-data"
substack: "failingwithdata"
substack_id: 153255588
cover_image: "/blog_images/imported/de5e8be3-5c3abb0a-cc50-4295-81a4-88fb82d0d45e_2348x516.png"
---

![](/blog_images/imported/29d060cb-5c3abb0a-cc50-4295-81a4-88fb82d0d45e_2348x516.png)

I transform data every day and I usually do 2 kinds of transformations, changing the data format so I can use it in a tool (CSV to parquet) or the shape, like running an aggregation so I can understand it. I’m using LLMs more and more for this because it saves me a lot of time (and it’s cool)

I see two approaches for using LLMs to transform data: 

1. 

Asking to transform the data and output it

```
`cat file | llm —system “transform the data into <format>”`
```

1. 

`Asking to generate code to transform the data `

```
`cat file | llm —system “generate a python code to transform this data into <format> ” > trasform.py && python trasform.py file > transformed`
```

If you don’t know what the llm command is, please, go to check the fantastic [llm cli tool](https://github.com/simonw/llm) from .

The second one has many benefits:

- 

The code will run way faster, LLMs are still slow compared to regular CPUs
- 

The transformation can be audited and fixed

Let’s test it. I have a file with NMEA records from a GPS. NMEA according to Wikipedia “is a combined electrical and data specification for communication between [marine electronics](https://en.wikipedia.org/wiki/Marine_electronics) such as [echo sounder](https://en.wikipedia.org/wiki/Echo_sounder), [sonars](https://en.wikipedia.org/wiki/Sonar), [anemometer](https://en.wikipedia.org/wiki/Anemometer), [gyrocompass](https://en.wikipedia.org/wiki/Gyrocompass), [autopilot](https://en.wikipedia.org/wiki/Self-steering_gear), [GPS receivers](https://en.wikipedia.org/wiki/GPS_receiver) and many other types of instruments”. I NMEA was invested today would have been NDJSON but at that time machines were sending data through a 9600 bauds per second comm line so they needed to optimize. Parsing is also super easy (probably they couldn’t afford to spend a lot of code for the parsing) but let’s get back to the transformation thing.

I have some data I got from my car’s GPS (which still sends the info using NMEA these days) in a file, I grep GPRMC sentences (the ones that have the coordinates) and pipe into the llm command (using gemini-2.0 code execution). This would be the command (I shortened it for clarity)

```
` ✗ head -n 40 cheste_fixed.nmea | grep RMC | llm  -m gemini-2.0-flash-exp -o code_execution 1 --system "write and EXECUTE a program to parse that data and generate ndjson with lat, lon, time and speed attributes. No explanations, just write and execute"
```python
import json
import re
from datetime import datetime, timedelta

data = """
$GPRMC,172633.00,A,3929.0184,N,00037.8573,W,80.7,54.1,160923,,*22
$GPRMC,172634.00,A,3929.0331,N,00037.8280,W,84.0,55.5,160923,,*24
$GPRMC,172635.00,A,3929.0495,N,00037.7985,W,93.5,54.8,160923,,*22
...
"""

def parse_nmea(line):
    match = re.match(r'\$GPRMC,([\d.]+),A,([\d.]+),([NS]),([\d.]+),([EW]),([\d.]+),([\d.]+),(\d+),,', line)
    if match:
      time_str, lat_str, lat_dir, lon_str, lon_dir, speed_str, _, date_str = match.groups()

      time_obj = datetime.strptime(date_str+ time_str.split(".")[0], "%d%m%y%H%M%S")

      lat = float(lat_str[:2]) + float(lat_str[2:]) / 60.0
      if lat_dir == 'S':
          lat = -lat
      lon = float(lon_str[:3]) + float(lon_str[3:]) / 60.0
      if lon_dir == 'W':
         lon = -lon

      speed = float(speed_str) * 1.852

      return {
          "lat": lat,
          "lon": lon,
          "time": time_obj.isoformat(),
          "speed": speed
      }
    return None

parsed_data = []
for line in data.strip().splitlines():
  parsed_line = parse_nmea(line)
  if parsed_line:
    parsed_data.append(parsed_line)

for item in parsed_data:
  print(json.dumps(item))
```
```
{"lat": 39.48364, "lon": -0.630955, "time": "2023-09-16T17:26:33", "speed": 149.4564}
{"lat": 39.483885, "lon": -0.6304666666666667, "time": "2023-09-16T17:26:34", "speed": 155.568}
{"lat": 39.48415833333333, "lon": -0.629975, "time": "2023-09-16T17:26:35", "speed": 173.162}
{"lat": 39.48441833333333, "lon": -0.6294983333333334, "time": "2023-09-16T17:26:36", "speed": 177.9772}
{"lat": 39.48466666666667, "lon": -0.6290183333333333, "time": "2023-09-16T17:26:37", "speed": 177.9772}
{"lat": 39.48491666666666, "lon": -0.628515, "time": "2023-09-16T17:26:38", "speed": 179.27360000000002}

`
```

It sounds like it did the right transformation (indeed, checking the data, it’s accurate). Just in case you are checking the data carefully, `speed` attribute feels like too high but it’s a car in a race track, so it’s expected.

But how could we make sure it’s doing it right? I’d not trust the transformed data right away but I can use what we have been using in software development for years: tests. So let’s ask the LLM to generate not just the transform, but also the test with the backwards transformation:

```
`$ head -n 10  ~/Downloads/lap_timer/cheste_fixed.nmea | grep RMC | llm  -m gemini-2.0-flash-exp -o code_execution 1 --system "write and EXECUTE a program to parse that data and generate ndjson with lat, lon, time and speed attributes. Also write the code that transforms the output back to original format and check the transformation back. No explanations, just write and execute"

```python
import json
import pynmea2
from datetime import datetime, timedelta

nmea_data = """$GPRMC,172633.00,A,3929.0184,N,00037.8573,W,80.7,54.1,160923,,*22
$GPRMC,172634.00,A,3929.0331,N,00037.8280,W,84.0,55.5,160923,,*24
$GPRMC,172635.00,A,3929.0495,N,00037.7985,W,93.5,54.8,160923,,*22
$GPRMC,172636.00,A,3929.0651,N,00037.7699,W,96.1,54.8,160923,,*28
$GPRMC,172637.00,A,3929.0800,N,00037.7411,W,96.1,55.5,160923,,*2D"""

def parse_nmea_to_ndjson(nmea_str):
  ndjson_output = []
  for line in nmea_str.strip().splitlines():
    try:
      msg = pynmea2.parse(line)
      if isinstance(msg, pynmea2.RMC):
          time_obj = datetime.combine(msg.datestamp, msg.timestamp)
          ndjson_output.append(json.dumps({
              "lat": msg.latitude,
              "lon": msg.longitude,
              "time": time_obj.isoformat(),
              "speed": msg.spd_over_grnd
          }))
    except pynmea2.ParseError:
      print(f"Could not parse: {line}")
      continue
  return "\n".join(ndjson_output)

def transform_ndjson_to_nmea(ndjson_str):
    nmea_output = []
    for line in ndjson_str.strip().splitlines():
        try:
            data = json.loads(line)
            time_obj = datetime.fromisoformat(data['time'])
            nmea_time = time_obj.strftime("%H%M%S.%f")[:-3]
            nmea_date = time_obj.strftime("%d%m%y")

            lat_deg = int(abs(data['lat']))
            lat_min = (abs(data['lat']) - lat_deg) * 60
            lat_dir = "N" if data['lat'] >= 0 else "S"

            lon_deg = int(abs(data['lon']))
            lon_min = (abs(data['lon']) - lon_deg) * 60
            lon_dir = "E" if data['lon'] >= 0 else "W"
            
            nmea_speed = data['speed']
            
            nmea_str = f"$GPRMC,{nmea_time},A,{lat_deg}{lat_min:.4f},{lat_dir},{lon_deg}{lon_min:.4f},{lon_dir},{nmea_speed:.1f},{nmea_speed:.1f},{nmea_date},,"
            
            checksum = 0
            for char in nmea_str[1:]:
                checksum ^= ord(char)
            nmea_str += f"*{hex(checksum)[2:].upper()}"
            nmea_output.append(nmea_str)
            
        except json.JSONDecodeError:
            print(f"Could not decode json: {line}")
            continue
    return "\n".join(nmea_output)

ndjson_data = parse_nmea_to_ndjson(nmea_data)
print("NDJSON output:")
print(ndjson_data)

nmea_transformed = transform_ndjson_to_nmea(ndjson_data)
print("\nTransformed back to NMEA:")
print(nmea_transformed)

print("\nOriginal NMEA:")
print(nmea_data)

def check_transformation(original, transformed):
    original_lines = original.strip().splitlines()
    transformed_lines = transformed.strip().splitlines()

    if len(original_lines) != len(transformed_lines):
        print("Number of lines do not match.")
        return False
    
    for orig_line, trans_line in zip(original_lines, transformed_lines):
        try:
            orig_msg = pynmea2.parse(orig_line)
            trans_msg = pynmea2.parse(trans_line)
            if not isinstance(orig_msg, pynmea2.RMC) or not isinstance(trans_msg, pynmea2.RMC):
                print("Message type is incorrect.")
                return False

            if not (abs(orig_msg.latitude - trans_msg.latitude) < 0.00001 and
                   abs(orig_msg.longitude - trans_msg.longitude) < 0.00001 and
                   abs(orig_msg.spd_over_grnd - trans_msg.spd_over_grnd) < 0.0001 and
                   orig_msg.timestamp == trans_msg.timestamp and
                   orig_msg.datestamp == trans_msg.datestamp
                   ):
                print(f"Original: {orig_msg}")
                print(f"Transformed:{trans_msg}")
                return False
        except pynmea2.ParseError:
            print(f"Could not parse: {orig_line} or {trans_line}")
            return False
    print("Transformation check passed!")
    return True

check_transformation(nmea_data, nmea_transformed)
```
```
ExecuteCode failed: MODULE_NOT_FOUND.
msg_err: Traceback (most recent call last):
  File "<string>", line 3, in <module>
ModuleNotFoundError: No module named 'pynmea2'
````
```

It fails to run because of the pynmea2 dependency but if you run it locally it manages to do it. So running that self-test gives me *some* confidence about the transformation function and I’d trust it to be in a pull request.

BTW, using the first approach also work, at least for gemini 2.0 it manages to transform NMEA to JSON, but it takes way more time than generating the script (as expected)
