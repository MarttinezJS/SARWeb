export interface Partner {
  id: string;
  imageUrl: string;
  active: boolean;
  amount: number;
  subscriptionDate: Date;
  expirationDate: Date;
  companyName: string;
  contact: string;
  nit: string;
  email: string;
  contactNumber: string;
}

export interface RegisterPartnerFields {
  companyName: string;
  contact: string;
  nit: string;
  email: string;
  contactNumber: string;
  webSite: string;
}
