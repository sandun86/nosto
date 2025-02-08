import app from "./app";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('no .env file found');
}

const APP_PORT = process.env.APP_PORT;
const REDIS_PORT = process.env.REDIS_PORT;

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
  console.log(`Redis is running on :${REDIS_PORT}`);
  console.log(`Swagger docs available at http://localhost:${APP_PORT}/api-docs`);
});
