import { Column } from './ColumnModel';

export const EDUCATION_TEMPLATE: Column[] = [
  {
    header: 'Degree',
    field: 'degree',
    type: 'string',
  },
  {
    header: 'End Date',
    field: 'endDate',
    type: 'date',
  },
  {
    header: 'School',
    field: 'school',
    type: 'string',
  },
  {
    header: 'Type',
    field: 'type',
    type: 'dropdown',
  },
];
