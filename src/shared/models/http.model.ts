export type HttpResponse<T = unknown, R = Error> = {
  statusCode: number;
  data?: T;
  error?: R;
};

export type HttpResponseList<T = unknown[], R = Error> = {
  statusCode: number;
  items?: T;
  count?: number;
  error?: R;
};
