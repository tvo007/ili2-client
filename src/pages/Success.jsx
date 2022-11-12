import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { selectCurrentUser, setCredentials } from "../features/auth/authSlice";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: me,
    isLoading,
    error,
  } = useGetMeQuery("getMe", { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (me) {
      const setCurrentUser = dispatch(
        setCredentials({
          id: me.id,
          name: me.username,
          email: me.email,
          avatar: me.avatar,
        })
      );

      if (setCurrentUser) {
        navigate("/projects");
      }
    }
  }, [me]);

  if (error) {
    return <Navigate to="/signin" replace />;
  } else {
    return <div>{me && <p>Success!</p>}</div>;
  }
};

export default Success;
