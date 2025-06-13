export type Language = 'sr' | 'en' | 'ru';

export interface PriceRoute {
  from: string;
  to: string;
  price: string;
  features: string[];
}

export interface CompanyInfo {
  pib: string;
  maticniBroj: string;
  status: string;
  email: string;
  location: string;
}