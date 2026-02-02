import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddressForm from "../../src/components/molecules/AddressForm";
import { useAddressForm } from "../../src/hooks/useAddressForm";

jest.mock("../../src/hooks/useAddressForm");

// ---------------- MOCK UI COMPONENTS ----------------
jest.mock("../../src/components/atoms/Input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("../../src/components/atoms/Label", () => ({
  Label: ({ children }: any) => <label>{children}</label>,
}));

jest.mock("../../src/components/atoms/Button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("../../src/components/atoms/Select", () => ({
  Select: ({ children, value, onValueChange, disabled }: any) => (
    <select
      disabled={disabled}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: any) => <>{children}</>,
  SelectValue: ({ placeholder }: any) => (
    <option value="">{placeholder}</option>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => (
    <option value={value}>{children}</option>
  ),
}));
// ----------------------------------------------------

describe("AddressForm Component", () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();

  const mockFormik = {
    values: {
      address_line1: "",
      address_line2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    errors: {},
    touched: {},
    handleChange: jest.fn(),
    setFieldValue: jest.fn().mockResolvedValue(undefined), // IMPORTANT
    submitForm: jest.fn(),
  };

  const mockCountries = [{ id: 1, name: "India" }];
  const mockStates = [{ id: 1, name: "Gujarat" }];
  const mockCities = [{ id: 1, name: "Ahmedabad" }];

  beforeEach(() => {
    (useAddressForm as jest.Mock).mockReturnValue({
      formik: mockFormik,
      countries: mockCountries,
      states: mockStates,
      cities: mockCities,
    });

    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    expect(screen.getByText("Address Line 1")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Pincode")).toBeInTheDocument();
    expect(screen.getByText("Save Address")).toBeInTheDocument();
  });

  it("submits form using formik.submitForm", () => {
    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.click(screen.getByText("Save Address"));

    expect(mockFormik.submitForm).toHaveBeenCalled();
  });

  it("calls onCancel when Cancel button clicked", () => {
    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockCancel).toHaveBeenCalled();
  });

  it("updates country and resets state and city", async () => {
    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    const selects = screen.getAllByRole("combobox");
    const countrySelect = selects[0];

    fireEvent.change(countrySelect, { target: { value: "India" } });

    await waitFor(() => {
      expect(mockFormik.setFieldValue).toHaveBeenCalledWith("country", "India");
      expect(mockFormik.setFieldValue).toHaveBeenCalledWith("state", "");
      expect(mockFormik.setFieldValue).toHaveBeenCalledWith("city", "");
    });
  });

  it("updates state and resets city", async () => {
    mockFormik.values.country = "India";

    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    const selects = screen.getAllByRole("combobox");
    const stateSelect = selects[1];

    fireEvent.change(stateSelect, { target: { value: "Gujarat" } });

    await waitFor(() => {
      expect(mockFormik.setFieldValue).toHaveBeenCalledWith("state", "Gujarat");
      expect(mockFormik.setFieldValue).toHaveBeenCalledWith("city", "");
    });
  });

  it("updates city", async () => {
    mockFormik.values.state = "Gujarat";

    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    const selects = screen.getAllByRole("combobox");
    const citySelect = selects[2];

    fireEvent.change(citySelect, { target: { value: "Ahmedabad" } });

    await waitFor(() => {
      expect(mockFormik.setFieldValue).toHaveBeenCalledWith(
        "city",
        "Ahmedabad"
      );
    });
  });

  it("shows error message when validation fails", () => {
    mockFormik.errors = { address_line1: "Required" };
    mockFormik.touched = { address_line1: true };

    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    expect(screen.getByText("Required")).toBeInTheDocument();
  });
    it("shows error message when validation fails", () => {
    mockFormik.errors = { pincode: "Required" };
    mockFormik.touched = { pincode: true };

    render(
      <AddressForm
        initialValues={undefined}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
