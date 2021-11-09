import React, { useEffect, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAdminContext from '../../hooks/useAdminContext';

const AdminRoute = () => {
  const { verifyToken } = useAdminContext();

  const token = () => localStorage.getItem('authToken');

  const verifiedToken = useCallback(async () => {
    const res = await verifyToken();
    console.log(res);

    return res;
  }, [verifyToken]);

  useEffect(() => {
    console.log(verifiedToken());
  }, []);

  return <>{token() ? <Outlet /> : <Navigate to='/login' />}</>;
};

export default AdminRoute;
