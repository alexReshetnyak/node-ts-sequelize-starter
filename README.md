# Node.js Express API with TypeScript 3

> Node.js Express API with TypeScript 3. Supports MongoDB or Sequelize

## Requirements

- node >= 10
- npm >= 6
- typescript >= 3.0

## Installation

## Running the API
### Development
To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:
```
npm run start

```
Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./src/index.ts -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

### Testing
To run integration tests: 
```bash
npm test
```

## Swagger
```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```
Swagger documentation will be available on route: 
```bash
http://localhost:3000/docs
```
![Alt Text](https://i.ibb.co/b6SdyQV/gif1.gif)


## PostgreSQL installation
  
  - sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

  - wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

  - sudo apt-get update

  - sudo apt-get install postgresql postgresql-contrib

  - sudo -u postgres psql

  - create user admin with password 'secret';

  - create database admin_db_name;

  - grant all privileges on database admin_db_name to admin;

  - \q

  - psql -h localhost admin_db_name admin


## Running PM2 & Node.js in Production Environments
 - https://getstream.io/blog/running-pm2-node-js-in-production-environments/
 - pm2 start app.js -i max