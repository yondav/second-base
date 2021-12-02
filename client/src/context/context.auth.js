import React, { createContext, useReducer } from 'react';

export const AdminContext = createContext();

const initialState = {
  admin: false,
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'NOT_ADMIN':
      return { admin: false };
    case 'ADMIN':
      return { admin: true };
    default:
      return state;
  }
};

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}
