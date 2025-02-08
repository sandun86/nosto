### Nosto Assignment (Nodejs v18.17.0, Npm v9.6.7, redis-cli 5.0.7, Docker version 20.10.12)
----------

Install steps
    
    1. Clone the code base
    2. Make a copy of sample.env file as a .env (`cp sample.env .env`)
    3. Make sure all the variables are created in .env
    4. Run `docker-compose up --build` (service will be run on given port which in .env, example: http://localhost:3004)
    5. Use the Swagger API documentation to check the APIs and calls as well (http://localhost:3004/api-docs)

----------  
[Swagger API Documentation](http://localhost:3004/api-docs) : (http://localhost:3004/api-docs)
### NPM scripts

- `npm run build` - build application
- `npm start`     - run application
- `npm run test`  - run Jest test 
- `npm run test src/controllers/currency.controller.spec.ts` - run test for single file

----------

### redis commands

- `systemctl start redis` - start redis server
- `systemctl stop redis`  - stop redis server
- `redis-cli FLUSHALL`    - flush cache 

----------
