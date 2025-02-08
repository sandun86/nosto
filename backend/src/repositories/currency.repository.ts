import axios from 'axios';
import { injectable } from 'inversify';
import { CurrencyRateResponse, QuoteRateResponse } from '../types/currency.types';
import { HTTP_CODES, MESSAGES, SWOP_API_BASE_URL, SWOP_API_KEY } from '../config/variables';

@injectable()
export class CurrencyRepository {
    private readonly SWOP_API_BASE_URL = SWOP_API_BASE_URL;
    private readonly SWOP_API_KEY = SWOP_API_KEY;

    async fetchCurrencyRates(): Promise<CurrencyRateResponse> {
        try {
            console.info('Fetching currencies from SWOP API');
            const response = await axios.get(`${this.SWOP_API_BASE_URL}/rest/rates`, {
                headers: { Authorization: `ApiKey ${this.SWOP_API_KEY}` }
            });
            if (response.status !== HTTP_CODES.OK) {
                console.error(`Error fetching currency rates: ${JSON.stringify(response)}`);
                return { status_code: response.status, data: [], message: MESSAGES.SYSTEM_NOT_SUPPORT };
            }
            console.info('Fetched currencies from SWOP API');
            return { status_code: response.status, data: response.data, message: MESSAGES.CURRENCY_SUCCESSFULLY_FETCHED };
        } catch (error) {
            console.error(`Error fetching currencies: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                    return { status_code: error.response.status, data: [], message: MESSAGES.SYSTEM_NOT_SUPPORT };
                }
            }
            return { status_code: HTTP_CODES.SERVER_ERROR, data: [], message: MESSAGES.TRY_AGAIN };
        }
    }

    async fetchQuoteRate(base_currency: string, quote_currency: string): Promise<QuoteRateResponse> {
        try {
            console.info(`Fetching currency quote rate from SWOP API ${base_currency}/${quote_currency}`);
            const response = await axios.get(`${this.SWOP_API_BASE_URL}/rest/rates/${base_currency}/${quote_currency}`, {
                headers: { Authorization: `ApiKey ${this.SWOP_API_KEY}` }
            });
            if (response.status !== HTTP_CODES.OK) {
                console.error(`Error fetching currency quote rate: ${JSON.stringify(response)}`);
                return { status_code: response.status, quote_rate: 0, message: MESSAGES.SYSTEM_NOT_SUPPORT };
            }
            console.info('Fetched currency quote rate from SWOP API');
            return { status_code: response.status, quote_rate: parseFloat(response.data.quote) || 0, message: MESSAGES.CURRENCY_SUCCESSFULLY_CONVERTED };
        } catch (error) {
            console.error(`Error fetching quote rate: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                    return { status_code: error.response.status, quote_rate: 0, message: MESSAGES.SYSTEM_NOT_SUPPORT };
                }
            }
            return { status_code: HTTP_CODES.SERVER_ERROR, quote_rate: 0, message: MESSAGES.TRY_AGAIN };
        }
    }
}
