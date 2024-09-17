export interface Response<T> {
  error: boolean;
  status: number;
  message: string;
  body?: T;
}
