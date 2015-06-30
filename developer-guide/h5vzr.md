# H5VZR - Frontend

## Requirements

```json
{
  "node": ">=0.12"
}
```

## Set up your environment

### Install prerequisites

```bash
# Update npm
npm install -g npm

# Install yo
npm install -g grunt-cli bower yo generator-karma generator-angular
```

### Install npm and bower deps

```bash
# cd into h5vzr
cd h5vzr

# npm deps
npm install

# bower deps
bower install

# loopback services (requires api prerequisites)
lb-ng ../api/server/server.js app/scripts/services/lb-services.js
```

## Usage

```bash
# serve
grunt serve

# build
grunt build

# test
npm test
```

Further Help: [Yeoman Guide](https://github.com/yeoman/generator-angular#usage)
