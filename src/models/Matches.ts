export interface MatchesData {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  date: Date;
  tickets: string;
  tournament: string;
  versus: string;
  home: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  field: Field;
  sport: Field;
}

export interface Field {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  img?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  icon?: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
