export type HttpResponse<T = unknown, R = Error> = {
  statusCode: number;
  data?: T;
  count?: number;
  error?: R;
};
