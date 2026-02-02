import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentMethod from "../../src/components/organisms/PaymentMethod";
import type { payment_method } from "../../src/types/placeorder.type";

// ---------------- MOCK RADIO GROUP ----------------
let currentValue: string | undefined;
let onValueChangeFn: ((v: string) => void) | undefined;

jest.mock("../../src/components/ui/radio-group", () => ({
  RadioGroup: ({ value, onValueChange, children }: any) => {
    currentValue = value;
    onValueChangeFn = onValueChange;
    return <div>{children}</div>;
  },

  RadioGroupItem: ({ value, id }: any) => (
    <input
      type="radio"
      data-testid={id}
      checked={value === currentValue}
      onChange={() => onValueChangeFn?.(value)}
    />
  ),
}));

// ---------------- MOCK LABEL ----------------
jest.mock("../../src/components/ui/label", () => ({
  Label: ({ children, htmlFor }: any) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
}));

// -------------------------------------------------

describe("PaymentMethod Component", () => {
  const mockSetPaymentMethod = jest.fn();

  const renderComponent = (method: payment_method) =>
    render(
      <PaymentMethod
        payment_method={method}
        SetPayment_Method={mockSetPaymentMethod}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and all payment options", () => {
    renderComponent("CASH_ON_DELIVERY");

    expect(screen.getByText("Payment Method")).toBeInTheDocument();

    expect(screen.getByText("CREDIT_CARD")).toBeInTheDocument();
    expect(screen.getByText("DEBIT_CARD")).toBeInTheDocument();
    expect(screen.getByText("PAYPAL")).toBeInTheDocument();
    expect(screen.getByText("CASH_ON_DELIVERY")).toBeInTheDocument();
  });

  it("marks correct radio as selected based on prop", () => {
    renderComponent("PAYPAL");

    const paypalRadio = screen.getByTestId("PAYPAL") as HTMLInputElement;
    const cashRadio = screen.getByTestId("CASH_ON_DELIVERY") as HTMLInputElement;

    expect(paypalRadio.checked).toBe(true);
    expect(cashRadio.checked).toBe(false);
  });

  it("calls SetPayment_Method when user selects another option", () => {
    renderComponent("CASH_ON_DELIVERY");

    const creditRadio = screen.getByTestId("CREDIT_CARD");

    fireEvent.click(creditRadio);

    expect(mockSetPaymentMethod).toHaveBeenCalledTimes(1);
    expect(mockSetPaymentMethod).toHaveBeenCalledWith("CREDIT_CARD");
  });

  it("updates selection when different option is clicked", () => {
    renderComponent("DEBIT_CARD");

    const debitRadio = screen.getByTestId("DEBIT_CARD");
    const paypalRadio = screen.getByTestId("PAYPAL");

    expect(debitRadio).toBeChecked();

    fireEvent.click(paypalRadio);

    expect(mockSetPaymentMethod).toHaveBeenCalledWith("PAYPAL");
  });
});
