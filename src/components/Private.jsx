import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { selectCurrentUser, setCredentials } from "../features/auth/authSlice";

const Private = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const {
    data: me,
    isLoading,
    error,
    reset,
  } = useGetMeQuery("getMe", { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (me) {
      dispatch(
        setCredentials({
          id: me.id,
          name: me.username,
          email: me.email,
          avatar: me.avatar,
        })
      );
    }
  }, [me]);

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    // dispatch(apiSlice.util.invalidateTags(["getMe"]));
    return <Navigate to="/signin" replace />;
    // return <div>Not working</div>;
  }

  if (currentUser?.id) {
    return children;
  }
};

export default Private;
