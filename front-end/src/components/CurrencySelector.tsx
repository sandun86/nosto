import React from "react";
import { Form } from "react-bootstrap";

interface CurrencySelectProps {
  label: string;
  currencies: string[];
  value: string;
  onChange: (value: string) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  currencies,
  value,
  onChange,
}) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default CurrencySelect;
