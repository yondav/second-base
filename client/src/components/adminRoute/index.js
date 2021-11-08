import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAdminContext from '../../hooks/useAdminContext';

const AdminRoute = () => {
  const token = () => localStorage.getItem('authToken');
  return <>{token() ? <Outlet /> : <Navigate to='/login' />}</>;
};

export default AdminRoute;
