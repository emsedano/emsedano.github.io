import React, { useState, Fragment } from 'react';
import { BaseInputProps } from './InputProps';
import { MarkdownContent } from '../../shared/components/markdown-content/markdown-content';
import './MarkdownInput.scss';

export function MarkdownInput(props: BaseInputProps) {
  const { value, onChange } = props;
  const [state, setstate] = useState({ __shadow: value, value, dirty: false });

  function updateValue(value: any) {
    let nextState: { [key: string]: any } = { value };
    if (!state.dirty) nextState.dirty = true;
    else if (state.__shadow === value) nextState.dirty = false;
    console.log(nextState);
    setstate({ ...state, ...nextState });
    onChange(value);
  }

  return (
    <Fragment>
      <div className="column is-full box">
        <div className="columns">
          <div className="column">
            <textarea
              value={state.value}
              onChange={e => updateValue(e.target.value)}
              placeholder="E-mail Address"
            ></textarea>
          </div>
          <div className="column">
            <MarkdownContent content={state.value} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
