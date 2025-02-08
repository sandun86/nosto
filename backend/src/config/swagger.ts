import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

const envFound = dotenv.config();
const APP_PORT = process.env.APP_PORT;

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Currency Converter App - APIs',
      version: '1.0.0',
      description: 'API documentation currency converter',
    },
    servers: [
      {
        url: `http://localhost:${APP_PORT}/api/v1/`
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerOptions;
