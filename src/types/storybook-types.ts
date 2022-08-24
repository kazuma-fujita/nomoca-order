import { Clinic, Product, Staff } from 'API';
import { FetchResponse } from 'hooks/swr/use-fetch';

export type OrderFormStorybookProps = {
  products: FetchResponse<Product[]>;
  staff: FetchResponse<Staff[]>;
  clinic: FetchResponse<Clinic | null>;
};
