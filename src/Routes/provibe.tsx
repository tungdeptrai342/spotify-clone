import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../config/accessToken';

const PrivateRoute = ({ children }) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
