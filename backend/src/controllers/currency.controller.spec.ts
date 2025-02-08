import { Request, Response } from "express";
import { CurrencyController } from '../controllers/currency.controller';
import { CurrencyService } from '../services/currency.service';
import { CurrenciesResponse, CurrencyRate } from "../types/currency.types";

// Mock the dependencies
jest.mock('../services/currency.service');
jest.mock('../repositories/currency.repository');

describe("Currency Controller", () => {
    let currencyService: jest.Mocked<CurrencyService>;
    let currencyController: CurrencyController;

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
        currencyService = {
            getCurrencyRates: jest.fn(),
            getExchangeRate: jest.fn(),
        } as unknown as jest.Mocked<CurrencyService>;

        currencyController = new CurrencyController(currencyService);
    });

    describe("GetCurrencies", () => {
        it("should return 200 when currencies are fetched successfully", async () => {
            //Mock the currency service function response which gets the currencies functionality
            (currencyService.getCurrencyRates as jest.Mock) = jest.fn()
                .mockResolvedValue({ status_code: 200, data: ['EUR', 'USD'], message: 'User is created successfully.' } as CurrenciesResponse);

            // Action
            await currencyController.getCurrencies(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("should return 500 when server error", async () => {

            (currencyService.getCurrencyRates as jest.Mock) = jest.fn()
                .mockRejectedValue({ message: "system error" });

            // Action
            await currencyController.getCurrencies(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });


    describe("ConvertCurrency", () => {
        it("should return 200 when currency converted successfully", async () => {
            //Mock the currency service function response which gets the convert the currency
            (currencyService.getExchangeRate as jest.Mock) = jest.fn()
                .mockResolvedValue({ status_code: 200, converted_amount: 20.25, message: 'Successfully converted the value.' } as CurrencyRate);

            // Action
            await currencyController.convertCurrency(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("should return 500 when server error", async () => {
            (currencyService.getExchangeRate as jest.Mock) = jest.fn()
                .mockRejectedValue({ message: "system error" });

            // Action
            await currencyController.convertCurrency(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});
