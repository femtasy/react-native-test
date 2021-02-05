import React from 'react';
import {render as rtlRender} from '@testing-library/react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {identity} from 'lodash';

const emptyReducer = identity;

export const renderWithStore = (
  ui: JSX.Element,
  {state, store = createStore(emptyReducer, state), ...renderOptions}: any = {},
) => {
  function Wrapper({children}: {children: JSX.Element}) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
};
