import { Router } from "express";
import { container } from '../inversify.config';
import currencyValidator from '../validators/currency.validator';
import { CurrencyController } from '../controllers/currency.controller';

const router = Router();
const currencyController = container.get<CurrencyController>(CurrencyController);

/**
 * @swagger
 * /currency/currencies:
 *   get:
 *     summary: List of currencies
 *     responses:
 *       200:
 *         description: Currencies listed successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

router.get("/currencies", currencyController.getCurrencies);


/**
 * @swagger
 * /currency/conversion:
 *   get:
 *     summary: Convert currency
 *     description: Converts an amount from one currency to another using exchange rates.
 *     parameters:
 *       - in: query
 *         name: base_currency
 *         schema:
 *           type: string
 *         required: true
 *         description: Base currency (e.g., EUR)
 *         example: EUR
 *       - in: query
 *         name: quote_currency
 *         schema:
 *           type: string
 *         required: true
 *         description: Quote currency (e.g., USD)
 *         example: USD
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         required: true
 *         description: Amount to convert
 *         example: 200
 *     responses:
 *       200:
 *         description: Currency converted successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

router.get("/conversion", currencyValidator.validateConvertCurrencyRequest, currencyController.convertCurrency);


export default router;
