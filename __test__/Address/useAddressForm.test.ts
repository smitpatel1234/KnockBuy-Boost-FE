import { renderHook, act } from "@testing-library/react";
import { useAddressForm } from "../../src/hooks/useAddressForm";

// ---- MOCK locationData.json ----
jest.mock("../../src/data/locationData.json", () => ({
  countries: [
    {
      id: "IN",
      name: "India",
      states: [
        {
          id: "GJ",
          name: "Gujarat",
          cities: ["Ahmedabad", "Surat"],
        },
      ],
    },
    {
      id: "US",
      name: "USA",
      states: [
        {
          id: "CA",
          name: "California",
          cities: ["LA", "SF"],
        },
      ],
    },
  ],
}));

describe("useAddressForm", () => {
  it("initializes with empty values when no initialValues provided", () => {
    const onSubmit = jest.fn();

    const { result } = renderHook(() =>
      useAddressForm({ initialValues: undefined, onSubmit })
    );

    expect(result.current.formik.values.address_line1).toBeUndefined();
    expect(result.current.countries.length).toBe(2);
  });

  it("computes states based on selected country", () => {
    const onSubmit = jest.fn();

    const { result } = renderHook(() =>
      useAddressForm({
        initialValues: { country: "India" },
        onSubmit,
      })
    );

    expect(result.current.states).toEqual([
      { id: "GJ", name: "Gujarat" },
    ]);
  });

  it("computes cities based on selected country and state", () => {
    const onSubmit = jest.fn();

    const { result } = renderHook(() =>
      useAddressForm({
        initialValues: { country: "India", state: "Gujarat" },
        onSubmit,
      })
    );

    expect(result.current.cities).toEqual([
      { id: "Ahmedabad", name: "Ahmedabad" },
      { id: "Surat", name: "Surat" },
    ]);
  });

  it("calls onSubmit with full Address when address_id exists", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useAddressForm({
        initialValues: {
          address_id: "1",
          address_line1: "Street",
          country: "India",
          state: "Gujarat",
          city: "Ahmedabad",
          pincode: 123456,
        },
        onSubmit,
      })
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        address_id: "1",
        country: "India",
      })
    );
  });

  it("removes address_id when submitting new address", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useAddressForm({
        initialValues: {
          address_line1: "Street",
          country: "India",
          state: "Gujarat",
          city: "Ahmedabad",
          pincode: 123456,
        },
        onSubmit,
      })
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    const submittedValue = onSubmit.mock.calls[0][0];

    expect(submittedValue.address_id).toBeUndefined();
    expect(submittedValue.country).toBe("India");
  });

  it("handles submit errors safely", async () => {
  const onSubmit = jest.fn().mockRejectedValue(new Error("fail"));
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  const { result } = renderHook(() =>
    useAddressForm({
      initialValues: {
        address_line1: "Street",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        pincode: 123456,
      },
      onSubmit,
    })
  );

  await act(async () => {
    await result.current.formik.submitForm();
  });

  expect(onSubmit).toHaveBeenCalled();     // ensure submit ran
  expect(spy).toHaveBeenCalled();          // now error is caught
  spy.mockRestore();
});

});
