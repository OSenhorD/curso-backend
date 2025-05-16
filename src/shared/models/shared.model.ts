export type Params = { [key: string]: string | number | boolean };

export type Result<T = null> =
  | {
      data: T;
      count?: number;
      error?: string;
    }
  | {
      data: null;
      count?: number;
      error: string;
    };

export type Search = {
  page: number;
  pageSize: number;
  search?: string;
};
