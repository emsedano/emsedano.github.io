import { Column } from './ColumnModel';

export const EXPERIENCE_TEMPLATE: Column[] = [
  {
    header: 'Company',
    field: 'company',
    type: 'string',
  },
  {
    header: 'Start Date',
    field: 'startDate',
    type: 'date',
  },
  {
    header: 'End Date',
    field: 'endDate',
    type: 'date',
  },
  {
    header: 'Position',
    field: 'position',
    type: 'string',
  },
  {
    header: 'Pride',
    field: 'pride',
    type: 'markdown',
  },
];
