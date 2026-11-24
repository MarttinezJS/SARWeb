export interface Partner {
  id: number;
  imageUrl?: string | null;
  subscriptionDate?: string | null;
  expirationDate?: string | null;
  active?: boolean | null;
  amount?: string | null;
  about?: string | null;
  webSite?: string | null;
  companyName: string;
  nit: string;
  contact: string;
  contactNumber: string;
  email: string;
}

/** Campos del formulario público de registro (POST /partners). */
export interface PartnerRegisterFields {
  companyName: string;
  nit: string;
  contact: string;
  contactNumber: string;
  email: string;
}

/** Campos del formulario de administración (multipart). */
export interface PartnerFields extends PartnerRegisterFields {
  webSite: string;
  about: string;
  amount: string;
  active: boolean;
  image: File | null;
}

/**
 * Una empresa inactiva que nunca tuvo suscripción llegó desde el formulario
 * público; si ya tuvo fechas, es una suscripción cancelada o vencida.
 */
export const isPartnerRequest = (partner: Partner): boolean =>
  !partner.active && !partner.subscriptionDate;
