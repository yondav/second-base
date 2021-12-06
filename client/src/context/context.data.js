import React, { createContext, useReducer } from 'react';

import dataReducer from './context.data.reducer';

const initialState = {
  loading: true,
  data: { studio: {}, user: {}, gear: {}, artists: {} },
};

export const DataContext = createContext(initialState);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
