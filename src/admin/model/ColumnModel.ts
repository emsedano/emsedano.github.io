export interface Option {
  value: string;
  label?: string;
}
export interface Column {
  header: string;
  field?: string;
  options?: Option[];
  type: 'string' | 'date' | 'markdown' | 'text' | 'dropdown' | 'list' | 'object';
  children?: Column[];
}
