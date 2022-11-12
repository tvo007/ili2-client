import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

const Private = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    return <Navigate to="/success" replace />;
  } else {
    return children;
  }
};

export default Private;
