export type CheckoutInformation = {
  phone: number | string;
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  additionalInformation?: string;
};
