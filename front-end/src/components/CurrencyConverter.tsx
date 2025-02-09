import React from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Alert,
  Card,
} from "react-bootstrap";
import CurrencySelect from "./CurrencySelector";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { STRING } from "../utils/variables";

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
    errorMessage,
  } = useCurrencyConverter();

  return (
    <Container className="mt-6 center">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {STRING.CURRENCY_TITLE}
              </Card.Title>
              <Form>
                <CurrencySelect
                  label={STRING.BASE_CURRENCY_LABEL}
                  currencies={currencies}
                  value={baseCurrency}
                  onChange={setBaseCurrency}
                />

                <CurrencySelect
                  label={STRING.BASE_QUOTE_LABEL}
                  currencies={currencies}
                  value={quoteCurrency}
                  onChange={setQuoteCurrency}
                />

                <Form.Group className="mt-3">
                  <Form.Label>{STRING.AMOUNT_LABEL}</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder={STRING.AMOUNT_PLACEHOLDER}
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
                  {STRING.CONVERTOR_BUTTON_NAME}
                </Button>

                {errorMessage ? (
                  <Alert variant="danger" className="mt-3">
                    {errorMessage}
                  </Alert>
                ) : convertedAmount !== null ? (
                  <Alert variant="success" className="mt-3">
                    {STRING.CONVERT_AMOUNT}
                    <strong>
                      {convertedAmount} {quoteCurrency}
                    </strong>
                  </Alert>
                ) : (
                  <Alert variant="warning" className="mt-3">
                    {STRING.WARNING_DETAILS_MSG}
                  </Alert>
                )}

                <Alert variant="warning" className="mt-4">
                  <strong>{STRING.SUPPORT_CURRENCY_MSG}</strong>
                </Alert>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CurrencyConverter;
