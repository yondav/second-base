import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAdminContext from '../../hooks/useAdminContext';

const AdminRoute = () => {
  const [verified, setVerified] = useState(true);
  const { verifyToken, token } = useAdminContext();

  const verifiedToken = useCallback(async () => {
    const res = await verifyToken(token);
    setVerified(res.verified);
    return res.verified;
  }, [verifyToken, token]);

  useEffect(() => {
    verifiedToken();
  }, [verified]);

  return <>{verified ? <Outlet /> : <Navigate to='/login' />}</>;
};

export default AdminRoute;
