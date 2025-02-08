import axios from "axios";
import { StatusCodes } from 'http-status-codes';
import { API_BASE_URL } from "../utils/variables";

export class CurrencyService {
  static async getCurrencies(): Promise<string[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/currency/currencies`);
      return response.status === StatusCodes.OK ? response.data.data : [];
    } catch (error: unknown) {
      console.error("Error fetching currencies:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.toJSON()); // Logs additional Axios error details
        throw { status: error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR, message: error.response?.data?.message || "An error occurred." };
      }

      throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: "Please try again later." };
    }
  }

  static async convertCurrency(base: string, quote: string, amount: number | string): Promise<number> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/currency/conversion?base_currency=${base}&quote_currency=${quote}&amount=${amount}`
      );
      console.log(response.status);
      return response.status === StatusCodes.OK ? response.data.data.convertedAmount : 0;
    } catch (error: unknown) {
      console.error("Error converting currency:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.toJSON()); // Logs additional Axios error details
        throw { status: error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR, message: error.response?.data?.message || "An error occurred." };
      }

      throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: "Please try again later." };
    }
  }
}

