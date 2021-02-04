import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {applyMiddleware, createStore, StoreEnhancer, compose} from 'redux';

import RootReducer from '../store/RootReducer';
import {RootState, RootAction} from 'typesafe-actions';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import createSagaMiddleware from 'redux-saga';
import mainSaga from '../sagas/Sagas';

const composeVersion: (
  middleware: StoreEnhancer,
) => StoreEnhancer<RootState> = compose;

let middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const enhancers = composeVersion(applyMiddleware(...middlewares));

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: ['offlineData', 'search'],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore<RootState & PersistPartial, RootAction, {}, {}>(
  persistedReducer,
  enhancers,
);
sagaMiddleware.run(mainSaga);

// @ts-ignore missmatched types for redux-persist
const Persistor = persistStore(store);

export default function withRedux<P extends object>(
  Component: React.ComponentType<P>,
) {
  function EnhancedComponent(props: React.Attributes) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <Component {...(props as P)} />
        </PersistGate>
      </Provider>
    );
  }

  return EnhancedComponent;
}
