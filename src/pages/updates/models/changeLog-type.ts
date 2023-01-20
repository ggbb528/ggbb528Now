export interface ChangeLog {
  version: string;
  date: Date;
  catalogs: Catalog[];
}
export interface Catalog {
  title: string;
  items: string[];
}
