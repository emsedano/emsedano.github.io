import { BaseSyntheticEvent } from 'react';

export interface BaseInputProps {
  value: any;
  onChange(val: any): void;
  className?: string;
}

export const onChangeFactory = onChange => (e: BaseSyntheticEvent) => onChange(e.target.value);
