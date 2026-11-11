/** Reglas de validación compartidas por el registro público y el panel. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const required = "Campo obligatorio";

export const partnerRules = {
  companyName: {
    required,
    validate: (value: unknown) => String(value).trim().length >= 2 || "Escribe el nombre de la empresa",
  },
  nit: {
    required,
    pattern: { value: /^\d{5,10}$/, message: "Entre 5 y 10 números" },
  },
  contact: {
    required,
    validate: (value: unknown) => String(value).trim().length >= 3 || "Escribe el nombre completo",
  },
  contactNumber: {
    required,
    pattern: { value: /^\d{7,10}$/, message: "Entre 7 y 10 números" },
  },
  email: {
    required,
    pattern: { value: EMAIL_PATTERN, message: "Correo no válido" },
  },
};
