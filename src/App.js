import React from 'react';
import { provideState, injectState } from 'freactal';

const stateTemplate = provideState({
  initialState: () => ({ version: '2', text: '' }),
  effects: {
    upgrade: () => state => ({ ...state, version: state.text }),
    setText: (effects, text) => state => ({ ...state, text }),
  },
});

export default stateTemplate(injectState(({
  state: {
    version,
    text,
  },
  effects: {
    upgrade,
    setText,
  },
}) => (
  <div>
    <h1>React Webpack {version} starter</h1>
    <button onClick={upgrade}>Upgrade</button>
    <input value={text} onChange={e => setText(e.target.value)} />
  </div>
)));
