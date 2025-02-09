import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { HTTP_CODES, MESSAGES } from '../config/variables';

@injectable()
export class TokenController {

    async generateCSRFToken(req: Request, res: Response) {
        try {
            console.info(`Starting to generate csrf token`);
            res.status(HTTP_CODES.CREATED).json({ message: MESSAGES.CURRENCY_SUCCESSFULLY_CREATED, token: req.csrfToken() });
        } catch (error) {
            console.error(`Failed to generate csrf token ${JSON.stringify(error)}`);
            res.status(HTTP_CODES.SERVER_ERROR).json({ message: MESSAGES.TRY_AGAIN, token: null });
        }
    }
}