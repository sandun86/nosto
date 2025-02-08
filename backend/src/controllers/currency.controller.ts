import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { HTTP_CODES, MESSAGES } from '../config/variables';
import { CurrencyService } from '../services/currency.service';

@injectable()
export class CurrencyController {
    private currencyService: CurrencyService;

    constructor(@inject(CurrencyService) currencyService: CurrencyService) {
        this.currencyService = currencyService;
        this.convertCurrency = this.convertCurrency.bind(this);
        this.getCurrencies = this.getCurrencies.bind(this);
    }

    async getCurrencies(req: Request, res: Response) {
        try {
            console.info(`Starting to fetch the currencies`);
            const currencyRates = await this.currencyService.getCurrencyRates();
            console.info(`Fetched the currencies`); 

            res.status(currencyRates.status_code).json({ message: currencyRates.message, data: currencyRates.data });
        } catch (error) {
            console.error(`Failed to fetch the currencies ${JSON.stringify(error)}`);
            res.status(HTTP_CODES.SERVER_ERROR).json({ message: MESSAGES.TRY_AGAIN, data: [] });
        }
    }

    async convertCurrency(req: Request, res: Response) {
        try {
            const { base_currency, quote_currency, amount } = req.query;
            console.info(`Starting to convert the currency, base_currency:${base_currency}, quote_currency:${quote_currency}, amount:${amount}`);
            const convertedAmount = await this.currencyService.getExchangeRate(base_currency as string, quote_currency as string, parseFloat(amount as string));
            console.info(`Converted the currency`); 

            res.status(convertedAmount.status_code).json({ message: convertedAmount.message, data: { convertedAmount: convertedAmount.converted_amount } });
        } catch (error) {
            console.error(`Failed to convert the currency ${JSON.stringify(error)}`);
            res.status(HTTP_CODES.SERVER_ERROR).json({ message: MESSAGES.TRY_AGAIN, data: { convertedAmount: 0 } });
        }

    }
}