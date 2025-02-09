import dotenv from 'dotenv';
const envFound = dotenv.config();

export const SWOP_API_BASE_URL = process.env.SWOP_BASE_API_URL;
export const SWOP_API_KEY = process.env.SWOP_API_KEY;

export const MESSAGES = {
    SYSTEM_NOT_SUPPORT: 'Sorry.! The system only supports the EUR as the base currency for now.',
    CURRENCY_SUCCESSFULLY_FETCHED: 'Successfully fetched the currencies.',
    CURRENCY_SUCCESSFULLY_CONVERTED: 'Successfully converted the value.',
    CURRENCY_SUCCESSFULLY_CREATED: 'Successfully created.',
    TRY_AGAIN: 'Server error. please try again later.!'
}

export const HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
}