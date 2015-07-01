# RASPI - Metering Unit

## Requirements

```json
{
  "python": ">=2.7"
}
```

## Set up your environment

### Install prerequisites

```bash
# cd into raspi
cd raspi

# optionally use a virtualenv
pip install --upgrade virtualenv
virtualenv .env
source .env/bin/activate

# python deps
pip install --upgrade -r requirements.txt
```

### Compile Sensor scripts

```bash
# cd into raspi/sensors
cd sensors

# compile scripts in raspi/sensors
make
```

## Usage

```bash
# run
python run.py

# run config server
python run.py --config

# run emu sensor script (for test usages)
python run.py --emu
```

## ~/.loggrrc example

```ini
[COMMON]
scripts_path = sensors/

[AUTH]
token = aGeMPZ94TH7lrHc2skUn3zv6RTXPhPjeUO7Ipw86GC6QjM9mDYfUs1xr4pKXKw0F
userid = 558855605a227a206cedcf55

[SENSORS]
temperature = temperature.out,Wohnzimmer,grad_celsius,-270,200,10
brightness = brightness.out,Wohnzimmer,lumen,0,210
humidity = humidity.out,Wohnzimmer,percent,0,100,10
pressure = pressure.py,Wohnzimmer,hectopascal,900,1100,10

[API]
url = http://loggr.stkn.org/api/
```
