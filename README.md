# loggr.io

## Developing

Requirements

```json
{
  "node": ">=0.12",
  "python": ">=2.6"
}
```

First install required npm tools:

```bash
# Update npm
npm install -g npm

# Install yo
npm install -g grunt-cli bower yo generator-karma generator-angular

# Install loopback
npm install -g strongloop
```

### H5VZR

Install npm and bower deps:

```bash
# cd into h5vzr
cd h5vr

# npm deps
npm install

# bower deps
bower install

# loopback services
lb-ng ../api/server/server.js app/scripts/services/lb-services.js

```

Serve H5VR:

```bash
# serve
grunt serve
```

Help: [Yeoman Guide](https://github.com/yeoman/generator-angular#usage)

### API

MongoDB: [Installation Guide](http://docs.mongodb.org/manual/installation/)

Install npm deps:

```bash
# cd into api
cd api

# npm deps
npm install
```

Run API:

```bash
# start mongodb daemon (in separate window/tab)
mongod

# run
node .
```

Help: [Strongloop Guide](http://docs.strongloop.com/display/public/LB/LoopBack)

### raspi

Install python deps:

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

Compile sensor scripts:

```bash
# compile scripts in raspi/sensors
gcc -o sensor_name.out sensor_name.c -lwiringPi
```

Run raspi loggr:
```bash
# run
python run.py
```

### Docs

Install python deps:

```bash
# cd into project
cd loggri.io

# python deps
pip install --upgrade mkdocs
```

Help: [Mkdocs Guide](http://www.mkdocs.org/)
