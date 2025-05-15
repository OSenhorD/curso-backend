export type Params = { [key: string]: string | number | boolean };

export type Search = {
  page: number;
  pageSize: number;
  search?: string;
  params?: Params;
};
