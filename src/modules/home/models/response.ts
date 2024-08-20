export interface Response<T> {
  error: string;
  status: number;
  message: string;
  body?: T;
}
