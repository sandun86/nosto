export interface QuoteRateResponse {
    quote_rate: number;
    status_code: number;
    message: string;
}

export interface ExchangeRate {
    base_currency: string;
    quote_currency: string;
    quote: number;
    date: string;
}

type ExchangeRatesResponse = ExchangeRate[];

export interface CurrencyRateResponse {
    status_code: number;
    data: ExchangeRatesResponse;
    message: string;
}

export interface CurrenciesResponse {
    status_code: number;
    data: string[];
    message: string;
}

export interface CurrencyRate {
    status_code: number;
    converted_amount: number;
    message: string;
}