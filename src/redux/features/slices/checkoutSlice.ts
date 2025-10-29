/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckoutInformation } from "@/types/checkoutDataTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CheckoutInformation = {
  phone: "",
  email: "",
  country: "United States",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  additionalInformation: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Update a single field
    updateField: <K extends keyof CheckoutInformation>(
      state: CheckoutInformation,
      action: PayloadAction<{ field: K; value: CheckoutInformation[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    // Add a new value (set the field to the provided value)
    addNewValue: <K extends keyof CheckoutInformation>(
      state: CheckoutInformation,
      action: PayloadAction<{ field: K; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },

    // Reset the state to initial values
    resetCheckout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateField, addNewValue, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
