import { HttpResponse, HttpResponseList } from '@/shared/models/http.model';

export const ok = <T = unknown>(data?: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const okList = <T = unknown[]>(
  items: T,
  count?: number
): HttpResponseList<T> => ({
  statusCode: 200,
  items,
  count: count || 0,
});

export const noContent = <T = unknown>(): HttpResponse<T> => ({
  statusCode: 204,
});

export const badRequest = <T = unknown>(
  message?: string
): HttpResponse<T, Error> => ({
  statusCode: 400,
  error: {
    name: 'Bad request',
    message: message || '',
  },
});

export const notFound = <T = unknown>(
  message?: string
): HttpResponse<T, Error> => ({
  statusCode: 404,
  error: {
    name: 'Not Found',
    message: message || '',
  },
});

export const serverError = <T = unknown>(
  message?: string
): HttpResponse<T, Error> => ({
  statusCode: 500,
  error: {
    name: 'Internal server error',
    message: message || '',
  },
});
