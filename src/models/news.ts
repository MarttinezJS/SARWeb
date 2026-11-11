export interface News {
  id: number;
  title: string;
  sourceName: string;
  link?: string | null;
  sourceLink?: string | null;
  sourceIcon?: string | null;
  articleId?: string | null;
  /** Solo las noticias de redacción traen el cuerpo completo. */
  text?: string | null;
  abstract?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  createdDate?: string | null;
  featured?: boolean | null;
}

export interface NewsFields {
  title: string;
  abstract: string;
  text: string;
  image: File | null;
}

/** Las noticias escritas en la emisora llegan con esta fuente. */
export const EDITORIAL_SOURCE = "Por Redacción";

export const isEditorial = (news: News): boolean =>
  news.sourceName === EDITORIAL_SOURCE || Boolean(news.text);
