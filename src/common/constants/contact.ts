/** WhatsApp de la emisora (con indicativo, sin + ni espacios): +57 300 601 5245. */
export const WHATSAPP_NUMBER = "573006015245";
export const WHATSAPP_DISPLAY = "+57 300 601 5245";

const PRAYER_MESSAGE = "Hola, quiero compartir una petición de oración: ";

/** Abre WhatsApp con el mensaje de petición de oración listo para escribir. */
export const PRAYER_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PRAYER_MESSAGE)}`;
