# API - Backend

## Requirements

```json
{
  "node": ">=4.2",
  "mongodb": ">=2.6"
}
```

## Set up your environment

### Install prerequisites

```bash
# Update npm if you haven't already
npm install -g npm

# Install loopback (optional: only needed for deploying, remote-control, acl and scaffolding)
npm install -g strongloop

# Alternatively install the yeoman generator for scaffolding only
npm install -g generator-loopback
```

Install MongoDB: [Offical Guide](http://docs.mongodb.org/manual/installation/)

### Install npm deps

```bash
# cd into api
cd api

# npm deps
npm install

# angular api services (requires strongloop)
lb-ng server/server.js ../loggr-h5vzr/app/scripts/services/lb-services.js
```


## Usage

```bash
# if not already running start the mongo daemon
mongod

# run
node .
```

Further Help: [Strongloop Guide](http://docs.strongloop.com/display/public/LB/LoopBack)
