#!/usr/bin/python3

import adafruit_dht
import json
import board

def c2f(celsius):
    return celsius * 1.8 + 32

dhtSensor = adafruit_dht.DHT22(board.D4)
temp_c = dhtSensor.temperature
temp_f = c2f(temp_c)
humidity = dhtSensor.humidity
j_val = { 'temp': round(temp_f, 2), 'humidity': humidity}
j = json.dumps(j_val)
print(j)

