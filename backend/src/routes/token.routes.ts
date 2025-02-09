import { Router } from "express";
import { container } from '../inversify.config';
import { TokenController } from "../controllers/token.controller";

const router = Router();
const tokenController = container.get<TokenController>(TokenController);

/**
 * @swagger
 * /token/csrf-token:
 *   get:
 *     summary: Generates a token
 *     responses:
 *       201:
 *         description: Generates a csrf token successfully
 *       500:
 *         description: Server error
 */

router.get("/csrf-token", tokenController.generateCSRFToken);


export default router;
