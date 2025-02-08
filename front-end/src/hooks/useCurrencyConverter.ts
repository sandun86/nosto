import { useState, useEffect } from "react";
import { CurrencyService } from "../services/currency";


export const useCurrencyConverter = () => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [baseCurrency, setBaseCurrency] = useState<string>("");
    const [quoteCurrency, setQuoteCurrency] = useState<string>("");
    const [amount, setAmount] = useState<number | string>("");
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const data = await CurrencyService.getCurrencies();
            setCurrencies(data);
        } catch (error) {
            console.error("Error fetching currencies:", error);
            setCurrencies([]);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    const convertCurrency = async () => {
        if (!baseCurrency || !quoteCurrency || !amount) {
            setErrorMessage("Please fill all the fields.");
            return;
        }

        try {
            const data = await CurrencyService.convertCurrency(baseCurrency, quoteCurrency, amount);
            setConvertedAmount(data);
            setErrorMessage(""); 
        } catch (error: unknown) {
            console.error("Error converting currency:", error.status);
            if(error.status === 400 || error.status === 403){
                setErrorMessage(error.message);
                return;
            }
            setConvertedAmount(null);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return {
        currencies,
        baseCurrency,
        setBaseCurrency,
        quoteCurrency,
        setQuoteCurrency,
        amount,
        setAmount,
        convertedAmount,
        convertCurrency,
        errorMessage
    };
};
