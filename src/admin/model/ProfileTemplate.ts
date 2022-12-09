import { Column } from './ColumnModel';

export const PROFILE_TEMPLATE: Column[] = [
  { header: 'Name', field: 'name', type: 'string' },
  { header: 'About', field: 'about', type: 'markdown' },
  { header: 'Career', field: 'career', type: 'string' },
  { header: 'Tech Stack', field: 'techStack', type: 'markdown' },
  { header: 'Soft Skills', field: 'softSkills', type: 'markdown' },
  {
    header: 'Contact',
    type: 'object',
    children: [
      { header: 'Email', field: 'email', type: 'string' },
      { header: 'Phone', field: 'phone', type: 'string' },
    ],
  },
  {
    header: 'Social',
    type: 'object',
    children: [
      { header: 'Facebook', field: 'facebook', type: 'string' },
      { header: 'Github', field: 'github', type: 'string' },
      { header: 'Instagram', field: 'instagram', type: 'string' },
      { header: 'LinkedIn', field: 'linkedin', type: 'string' },
      { header: 'Twitter', field: 'twitter', type: 'string' },
    ],
  },
];
