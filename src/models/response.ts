export interface Response<T> {
  error: boolean;
  status: number;
  message: string;
  body?: T;
}

export interface Pagination<T> {
  count: number;
  previous: number;
  next: number;
  results: T[];
}

export interface PaginatedResponse<T> extends Response<Pagination<T>> {}
