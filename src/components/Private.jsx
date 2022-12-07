import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { selectCurrentUser, setCredentials } from "../features/auth/authSlice";
import SignIn from "../pages/SignIn";

const Private = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (error) {
      navigate("/signin");
    }
  }, [error]);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    // dispatch(apiSlice.util.invalidateTags(["getMe"]));
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <div className="text-center">
          <p>Looks like you are not logged in.</p>
          <p>Redirecting you to the signin page.</p>
        </div>
      </div>
    );
    // return <div>Not working</div>;
  }

  if (currentUser?.id) {
    return children;
  }
};

export default Private;
