export type Params = { [key: string]: string | number | boolean };

export type Result<T = null> = {
  data: T | null;
  count?: number;
  error?: string;
};

export type Search = {
  page: number;
  pageSize: number;
  search?: string;
};
