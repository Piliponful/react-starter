import React from 'react';
import { provideState, injectState } from 'freactal';

export const stateTemplate = provideState({
  initialState: () => ({ version: '2', text: '' }),
  effects: {
    upgrade: () => state => ({ ...state, version: state.text }),
    setText: (effects, text) => state => ({ ...state, text }),
  },
});

export const App = ({
  state,
  effects
}) => (
  <div>
    <h1>React Webpack {state.version} starter</h1>
    <button onClick={effects.upgrade}>Upgrade</button>
    <input value={state.text} onChange={e => effects.setText(e.target.value)} />
  </div>
);

export default stateTemplate(injectState(App));