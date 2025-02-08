import { injectable, inject } from 'inversify';
import { HTTP_CODES } from '../config/variables';
import { getCache, setCache } from '../utils/cache';
import { CurrencyRepository } from '../repositories/currency.repository';
import { CurrenciesResponse, CurrencyRate } from '../types/currency.types';

@injectable()
export class CurrencyService {
    constructor(
        @inject(CurrencyRepository) private currencyRepository: CurrencyRepository,
    ) {
        this.currencyRepository = currencyRepository;
    }

    async getCurrencyRates(): Promise<CurrenciesResponse> {
        console.info(`Checking the cache to fetch the currencies`);
        const cachedData = await getCache('currencies');
        if (cachedData) {
            console.info(`Cached currency available`);
            return { status_code: JSON.parse(cachedData).status_code, data: JSON.parse(cachedData).currencies, message: JSON.parse(cachedData).message };
        }
        console.info(`Cached currency not available. so going to fetch from the SWOP API`);
        const ratesResponse = await this.currencyRepository.fetchCurrencyRates();
        if (ratesResponse.data.length === 0) {
            console.info(`Currencies not available from the SWOP API`);
            return { status_code: ratesResponse.status_code, data: [], message: ratesResponse.message };
        }
        console.info(`Fetched from the SWOP API`);
        const currencies = ratesResponse.data.map((item: { quote_currency: string; }) => item.quote_currency);

        ratesResponse.status_code === HTTP_CODES.OK && await setCache('currencies', JSON.stringify({currencies, status_code: ratesResponse.status_code, message: ratesResponse.message}), 3600);

        return { status_code: ratesResponse.status_code, data: currencies, message: ratesResponse.message };
    }

    async getExchangeRate(base_currency: string, quote_currency: string, amount: number): Promise<CurrencyRate> {
        const cacheKey = `${base_currency}_${quote_currency}`;
        console.info(`Checking the cache for quote rate ${cacheKey}`);
        const cachedQuoteData = await getCache(cacheKey);
        if (cachedQuoteData) {
            console.info(`Cached quote rate available`);
            return { status_code: JSON.parse(cachedQuoteData).status_code, converted_amount: JSON.parse(cachedQuoteData).quote_rate * amount, message: JSON.parse(cachedQuoteData).message };
        }
        console.info(`Cached quote rate is not available. so going to fetch from the SWOP API`);
        const quoteRateResponse = await this.currencyRepository.fetchQuoteRate(base_currency, quote_currency);
        quoteRateResponse.status_code === HTTP_CODES.OK && await setCache(cacheKey, JSON.stringify(quoteRateResponse), 3600);
        
        console.info(`Fetched from the SWOP API`);
        const convertedAmount = quoteRateResponse.quote_rate * amount;

        return { status_code: quoteRateResponse.status_code, converted_amount: convertedAmount, message: quoteRateResponse.message };
    }
}
