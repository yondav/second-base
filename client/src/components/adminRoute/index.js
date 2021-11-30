import React, { useEffect, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAdminContext from '../../hooks/useAdminContext';

const AdminRoute = () => {
  const { verifyToken, token } = useAdminContext();

  const verifiedToken = useCallback(async () => {
    const res = await verifyToken(token);

    return res;
  }, [verifyToken]);

  useEffect(() => {
    verifiedToken();
    return () => console.log('verified');
  }, [token]);

  return <>{token ? <Outlet /> : <Navigate to='/login' />}</>;
};

export default AdminRoute;
