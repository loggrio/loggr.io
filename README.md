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

```

### API

Install npm deps:

```bash
# cd into api
cd api

# npm deps
npm install
```

### raspi

Install python deps:

```bash
# cd into raspi
cd raspi

# optionally in a virtualenv
pip install --upgrade virtualenv
virtualenv .env
source .env/bin/activate

# python deps
pip install --upgrade requests
```
