export interface Response<T> {
  error: boolean;
  status: number;
  message: string;
  body?: T;
}

export interface Pagination<T> {
  count: number;
  previous?: number | null;
  next?: number | null;
  results: T[];
}

export type PaginatedResponse<T> = Response<Pagination<T>>;
