import React from 'react';
import { Column } from '../model/ColumnModel';
import { MarkdownInput } from './MarkdownInput';
import { BaseInputProps, onChangeFactory } from './InputProps';
import moment from 'moment';

export interface ControlModel extends BaseInputProps {
  column: Column;
}

export function Control(props: ControlModel) {
  const { column, value, onChange, className = 'field' } = props;
  const onChangeHandler = onChangeFactory(onChange);
  let input;
  switch (column.type) {
    case 'markdown':
      input = <MarkdownInput value={value} onChange={onChange} className="input" />;
      break;
    case 'date':
      let dateValue = value;
      const toDate = d => moment(d).format('yyyy-MM-DD');
      if (typeof value === 'string') {
        dateValue = toDate(value);
      } else if (typeof value === 'object') {
        dateValue = toDate(value.toDate());
      } else {
        dateValue = '';
      }
      input = <input type="date" value={dateValue} onChange={onChangeHandler} className="input" />;
      break;
    case 'dropdown':
      input = (
        <select value={value} onChange={onChangeHandler} className="input">
          <option value="">None</option>
          {column.options?.map(option => {
            <option value={option.value}>{option.label ?? option.value}</option>;
          })}
        </select>
      );
      break;
    default:
      input = <input className="input" type="text" value={value} onChange={onChangeHandler} />;
  }

  return (
    <div className={className}>
      <label className="label">{column.header}</label>
      <div className="control">{input}</div>
    </div>
  );
}
