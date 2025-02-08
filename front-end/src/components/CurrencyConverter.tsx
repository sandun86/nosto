import React from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import CurrencySelect from "./CurrencySelector";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

const CurrencyConverter: React.FC = () => {
  const {
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
  } = useCurrencyConverter();

  return (
    <Container className="mt-6 center">
      <h2 className="text-center">Currency Converter</h2>
      <Row className="justify-content-center">
        <Col md={4}>
          <Form>
            <CurrencySelect
              label="Base Currency"
              currencies={currencies}
              value={baseCurrency}
              onChange={setBaseCurrency}
            />

            <CurrencySelect
              label="Quote Currency"
              currencies={currencies}
              value={quoteCurrency}
              onChange={setQuoteCurrency}
            />

            <Form.Group className="mt-3">
              <Form.Label>Amount</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Button
              className="mt-3 w-100"
              variant="primary"
              onClick={convertCurrency}
            >
              Convert
            </Button>

            {errorMessage ? (
              <Alert variant="danger" className="mt-3">
                {errorMessage}
              </Alert>
            ) : convertedAmount !== null ? (
              <Alert variant="success" className="mt-3">
                Converted Amount: <strong>{convertedAmount} {quoteCurrency}</strong>
              </Alert>
            ) : (
              <Alert variant="warning" className="mt-3">
                Please enter valid conversion details.
              </Alert>
            )}

              <Alert variant="warning" className="mt-4">
                <strong>(Note: Only support the Base Currency: EUR at this moment.)</strong>
              </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CurrencyConverter;
