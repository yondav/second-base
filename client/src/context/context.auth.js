import React, { createContext, useReducer } from 'react';

export const AdminContext = createContext();

const adminState = { loggedIn: false };

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'ISNOTADMIN':
      return { admin: false };
    case 'ISADMIN':
      return { admin: true };
    default:
      return state;
  }
};

export function AdminProvider(props) {
  const [state, dispatch] = useReducer(adminReducer, adminState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AdminContext.Provider>
  );
}
