import { Request, Response } from "express";
import { CurrencyController } from '../controllers/currency.controller';
import { CurrencyService } from '../services/currency.service';
import { CurrenciesResponse } from "../types/currency.types";

import { HTTP_CODES } from '../config/variables';
import { getCache, setCache } from '../utils/cache';
import { CurrencyRepository } from '../repositories/currency.repository';

// Mock the dependencies
jest.mock('../repositories/currency.repository');
jest.mock('../utils/cache', () => {
    return {
        getCache: jest.fn(),
        getUserById: jest.fn(),
    };
});

describe("Currency Service", () => {
    let currencyRepository: jest.Mocked<CurrencyRepository>;
    let currencyService: CurrencyService;

    afterEach(() => {
        jest.clearAllMocks();
    });

    const req = {
        query: { base_currency: 'EUR', quote_currency: 'USD', amount: 1 },
    } as unknown as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;

    beforeEach(() => {
        currencyRepository = {
            fetchCurrencyRates: jest.fn(),
            fetchQuoteRate: jest.fn(),
        } as unknown as jest.Mocked<CurrencyRepository>;

        currencyService = new CurrencyService(currencyRepository);
    });

    describe("GetCurrencies", () => {
        it('should return cached currencies if available', async () => {
            const cachedData = JSON.stringify({ currencies: ['USD', 'EUR'], status_code: HTTP_CODES.OK, message: 'Cached data' });
            (getCache as jest.Mock).mockResolvedValue(cachedData);

            const result = await currencyService.getCurrencyRates();

            expect(result).toEqual({ status_code: HTTP_CODES.OK, data: ['USD', 'EUR'], message: 'Cached data' });
            expect(currencyRepository.fetchCurrencyRates).not.toHaveBeenCalled();
        });

        it('should return empty data if repository is given a error and no cache data', async () => {
            (getCache as jest.Mock) = jest.fn().mockResolvedValue(null);
            currencyRepository.fetchCurrencyRates.mockResolvedValue({ status_code: HTTP_CODES.OK, data: [], message: 'Fetched currencies' });

            const result = await currencyService.getCurrencyRates();

            expect(result).toEqual({ status_code: HTTP_CODES.OK, data: [], message: 'Fetched currencies' });
        });

        it('should fetch from API and set cache the result if no cache is available', async () => {
            (getCache as jest.Mock) = jest.fn().mockResolvedValue(null);
            (setCache as jest.Mock) = jest.fn().mockResolvedValue(true);

            currencyRepository.fetchCurrencyRates.mockResolvedValue({ status_code: HTTP_CODES.OK, data: [{ quote: 200, quote_currency: 'USD', 'base_currency': 'EUR', 'date': '2025-02-10' }], message: 'Fetched currencies' });

            const result = await currencyService.getCurrencyRates();

            expect(result).toEqual({ status_code: HTTP_CODES.OK, data: ['USD'], message: 'Fetched currencies' });
            expect(setCache).toHaveBeenCalledWith('currencies', expect.stringContaining('"currencies":["USD"]'), 3600);
        });
    });

    describe("GetExchangeRate", () => {
        it('should return cached exchange rate if available', async () => {
            const cachedData = JSON.stringify({ status_code: HTTP_CODES.OK, quote_rate: 1.2, message: 'Cached data' });
            (getCache as jest.Mock).mockResolvedValue(cachedData);

            const result = await currencyService.getExchangeRate('EUR', 'USD', 1);

            expect(result).toEqual({ status_code: HTTP_CODES.OK, converted_amount: 1.2, message: 'Cached data' });
            expect(currencyRepository.fetchQuoteRate).not.toHaveBeenCalled();
        });

        it('should return API response exchange rate if cache is no available', async () => {
            (getCache as jest.Mock).mockResolvedValue(null);
            (setCache as jest.Mock) = jest.fn().mockResolvedValue(true);
            currencyRepository.fetchQuoteRate.mockResolvedValue({ status_code: HTTP_CODES.OK, quote_rate: 2.2, message: 'Fetched rate' });
            const result = await currencyService.getExchangeRate('EUR', 'USD', 1);

            expect(result).toEqual({ status_code: HTTP_CODES.OK, converted_amount: 2.2, message: 'Fetched rate' });
        });
    });
});
