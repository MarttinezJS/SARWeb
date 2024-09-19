import { Environment } from "../../config/environment";

export const getClodinaryUrl = (imageUrl: string): string =>
  `https://res.cloudinary.com/${Environment.VITE_CLOUD_NAME}/image/upload/v1724733305/${imageUrl}`;
