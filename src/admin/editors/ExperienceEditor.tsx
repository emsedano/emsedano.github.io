import React, { Fragment, useState } from 'react';

import { Control } from './Control';

export function ExperienceEditor(props) {
  const { value, columns, docSaver } = props;
  const [state, setState] = useState(value);
  const [dirty, setDirty] = useState(false);

  const updateValue = (column, nextValue) => {
    const nextState = { ...state, [column.field]: nextValue };
    const nextDirty = Object.entries(nextState).some(([k, v]) => value[k] !== v);
    setState({ ...state, [column.field]: nextValue });
    setDirty(nextDirty);
  };

  return (
    <div className="box">
      {columns.map((column, key) => {
        return (
          <Fragment key={key}>
            <Control column={column} value={state[column.field]} onChange={next => updateValue(column, next)} />
          </Fragment>
        );
      })}

      <button
        className="button is-info"
        disabled={!dirty}
        onClick={() => {
          const isSaved = docSaver(state);
          if (isSaved) setDirty(false);
        }}
      >
        Save
      </button>
    </div>
  );
}
