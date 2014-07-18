#encoding: utf8
import sys
import json
import math
import copy
import os
from collections import defaultdict

JSON_SEP = (',', ':')
src_torque_tile = json.loads(open(sys.argv[1]).read())

def save_frame_to_image(f, i):
    from PIL import Image
    img = Image.new("RGBA", (256, 256), (0,0,0,0))
    pixels = img.getdata()
    for p in xrange(len(f['x__uint8'])):
        x = f['x__uint8'][p]
        y = f['y__uint8'][p]
        v = f['vals__uint8'][p]
        #pixels[4*(x * 256 + y)] = v
        pixels.putpixel((x, 255 - y), (255*v, 0, 0, 255))
    #img.putdata(newData)
    img.save("frames/%04d.png" % i , "PNG")

def plot_3d_graph(frames):
    from mpl_toolkits.mplot3d import Axes3D
    import matplotlib.pyplot as plt
    fig = plt.figure(figsize=(12, 12))
    ax = fig.add_subplot(111, projection='3d')
    nframes = float(len(frames.keys()))
    for i, x in enumerate(frames):
            f = frames[x]
            m = float(max(f['vals__uint8']))
            ax.scatter(f['x__uint8'], f['y__uint8'], [i]*len(f['x__uint8']), marker='.', color=[(0.5, 0, 0, 0.1 + 0.1*xx/m) for xx in f['vals__uint8']])
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('time')
    plt.savefig('test.png')
    #plt.show()


def avg(x):
    return sum(x)/len(x)

    
def std(a):
    m = avg(a)
    return math.sqrt(avg(map(lambda i: i*i, (x - m for x in a))))

def tile_stats(tile):
    return {
        'x__uint8': std([x['x__uint8'] for x in tile]),
        'y__uint8': std([x['y__uint8'] for x in tile])
    }

print tile_stats(src_torque_tile)
original_size = os.stat(sys.argv[1]).st_size

def write_json_file(name, data):
    fname = name + '.json'
    open(name + ".json", 'w').write(json.dumps(data, separators=JSON_SEP))
    os.popen('gzip  -c %s> %s.gz' % (fname, fname))
    compressed_size = os.stat(fname + '.gz').st_size
    json_size = os.stat(fname).st_size
    print "%40s    %d -> %d -> %d   (%f, %f)" % (name, original_size/1024, json_size/1024, compressed_size/1024, 100.0*(1.0 - float(compressed_size)/json_size), 100.0*(1.0 - float(compressed_size)/original_size))

def encode_list_delta(a):
    "return the list delta encoded"
    prev = a[0]
    delta = [prev]
    for i in xrange(1, len(a)):
        delta.append(a[i] - prev)
        prev = a[i]
    return delta

write_json_file("no_encoding", src_torque_tile)
# version with delta in data
# encode dates as delta
def encode_date_delta(px):
    return {
        'x__uint8': px['x__uint8'],
        'y__uint8': px['y__uint8'],
        'vals__uint8': encode_list_delta(px['vals__uint8']),
        'dates__uint16': encode_list_delta(px['dates__uint16'])
    }

write_json_file('torque_date_delta', [encode_date_delta(x) for x in src_torque_tile])

# put similar values together
# x__uint8:[ .......]
# y__uint8:[ .......]
# dates__uint16:[[...] .......]
# vals__uint16:[[...] .......]
grouped_torque_tile = {
    'x__uint8': [],
    'y__uint8': [],
    'vals__uint8': [],
    'dates__uint16': []
}

transform = defaultdict(lambda: lambda x: x)
transform['dates__uint16'] = encode_list_delta
#transform['vals__uint8'] = encode_list_delta
for x in src_torque_tile:
    for k, v in x.items():
        grouped_torque_tile[k].append(transform[k](v))

write_json_file('torque_date_delta_grouped', grouped_torque_tile)

# same but encoding deltas in x/y
grouped_torque_tile['x__uint8'] = encode_list_delta(grouped_torque_tile['x__uint8'])
grouped_torque_tile['y__uint8'] = encode_list_delta(grouped_torque_tile['y__uint8'])
write_json_file('torque_date_delta_grouped_delta_xy.json', grouped_torque_tile)

# sort by distance to (0, 0) and encode positions as delta
torque_tile = copy.deepcopy(src_torque_tile)

topleft = (256, 256)
for x in torque_tile:
    if topleft[0] > x['x__uint8'] and topleft[1] > x['y__uint8']:
        topleft = (x['x__uint8'], x['y__uint8'])


def manhatan_dist(x, y):
    return abs(x - topleft[0]) + abs(y - topleft[1])

def sort_by_distance(a, b):
    x0 = a['x__uint8']
    x1 = b['x__uint8']
    y0 = a['y__uint8']
    y1 = b['y__uint8']
    return manhatan_dist(x0, y0) - manhatan_dist(x1, y1)


torque_tile.sort(sort_by_distance)
grouped_torque_tile_xy_sort = {
    'x__uint8': [],
    'y__uint8': [],
    'vals__uint8': [],
    'dates__uint16': []
}

for x in torque_tile:
    for k, v in x.items():
        grouped_torque_tile_xy_sort[k].append(transform[k](v))
grouped_torque_tile_xy_sort['x__uint8'] = encode_list_delta(grouped_torque_tile['x__uint8'])
grouped_torque_tile_xy_sort['y__uint8'] = encode_list_delta(grouped_torque_tile['y__uint8'])
write_json_file('torque_date_delta_grouped_delta_sort_xy', grouped_torque_tile_xy_sort)


## grouping by time slot
torque_tile = copy.deepcopy(src_torque_tile)
time_slots = defaultdict(lambda: defaultdict(list))
for x in torque_tile:
    for i, t in enumerate(x['dates__uint16']):
        slot = time_slots[t]
        slot['x__uint8'].append(x['x__uint8'])
        slot['y__uint8'].append(x['y__uint8'])
        slot['vals__uint8'].append(x['vals__uint8'][i])

#for i, s in enumerate(time_slots):
    #save_frame_to_image(time_slots[s], i)

#plot_3d_graph(time_slots)

for s in time_slots:
    time_slots[s]['x__uint8'] = encode_list_delta(time_slots[s]['x__uint8'])
    time_slots[s]['y__uint8'] = encode_list_delta(time_slots[s]['y__uint8'])
    #time_slots[s]['vals__uint8'] = encode_list_delta(time_slots[s]['vals__uint8'])
write_json_file('torque_date_group_time_slot', time_slots)













