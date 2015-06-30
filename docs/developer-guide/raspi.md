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
