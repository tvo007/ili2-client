import React, { useEffect } from "react";
import googleIcon from "../assets/google-icon.svg";
import person from "../assets/person.svg";
import gear from "../assets/gear-svgrepo-com.svg";
import { useForm } from "react-hook-form";
import { SignInUserDTO } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetMeQuery,
  useSignInMutation,
} from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
// import { setCredentials } from "./../features/auth/authSlice";
import { redirect, useNavigate } from "react-router-dom";
import MiniLoader from "../components/MiniLoader";
import { apiSlice } from "../features/api/apiSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInUserDTO),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleDemoAccount = (e) => {
    e.preventDefault();
    setValue("email", `${import.meta.env.VITE_TEST_EMAIL}`);
    setValue("password", `${import.meta.env.VITE_TEST_PASSWORD}`);
  };

  const [signIn, { isLoading, isSuccess }] = useSignInMutation();

  // const { data: me } = useGetMeQuery("getMe");

  // const [login, { isLoading }] = useLoginMutation()
  const onSubmit = async (data) => {
    try {
      const login = await signIn({
        email: data.email,
        password: data.password,
      }).unwrap();

      // console.log(login);
      navigate("/");

      // reset({
      //   name: "",
      //   email: "",
      //   password: "",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(apiSlice.util.resetApiState());
  }, []);

  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginURL = import.meta.env.VITE_GOOGLE_REDIRECT;
    const newWindow = window.open(googleLoginURL, "_self");
  };

  return (
    <section className="relative bg-white h-screen">
      <div className="relative z-10 flex flex-wrap h-full">
        <div className="w-full md:w-1/2 p-8">
          {/* <div className="absolute left-0 bottom-10 max-w-md  z-[-50] w-full bg-green-50">
            <img
              src="https://res.cloudinary.com/ddj5orpun/image/upload/v1668994949/77z_2203_w009_n001_118z_p3_118_tzkrms.jpg"
              alt=""
            />
          </div> */}
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="md:max-w-lg mx-auto pt-16 md:pb-32">
                  <a className="mb-28 inline-block" href="#">
                    <span className="text-4xl font-semibold">ILIRA</span>
                  </a>
                  <h2 className="mb-32 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">
                    Sign in and start getting things done today.
                  </h2>
                  <h3 className="mb-9 text-xl font-bold font-heading leading-normal">
                    Why should you join us?
                  </h3>
                  <ul className="md:max-w-xs">
                    <li className="mb-5 flex flex-wrap">
                      <svg
                        className="mr-2"
                        width="25"
                        height="26"
                        viewBox="0 0 25 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z"
                          fill="#4F46E5"
                        ></path>
                      </svg>
                      <span className="flex-1 font-medium leading-relaxed">
                        The best you can do in no time at all, amazing feature
                        goes here
                      </span>
                    </li>
                    <li className="mb-5 flex flex-wrap">
                      <svg
                        className="mr-2"
                        width="25"
                        height="26"
                        viewBox="0 0 25 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z"
                          fill="#4F46E5"
                        ></path>
                      </svg>
                      <span className="flex-1 font-medium leading-relaxed">
                        24/7 Support of our dedicated, highly professional team
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="p-4 py-16 flex flex-col justify-center items-center bg-blueGray-50 h-full">
            <form
              className="md:max-w-lg w-full md:px-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="block mb-4">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">
                  Email Address *
                </p>
                <input
                  className="px-4 py-3.5 w-full text-black font-medium placeholder-gray-400 
            bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  id="signInInput1-1"
                  type="text"
                  placeholder="Enter email address"
                  {...register("email")}
                />
              </label>
              <label className="block mb-5">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">
                  Password *
                </p>
                <input
                  className="px-4 py-3.5 w-full text-black font-medium placeholder-gray-400 
            bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  id="signInInput1-2"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
              </label>
              <div className="flex flex-wrap justify-between -m-2 mb-4">
                <div className="w-auto p-2">
                  <div className="flex items-center">
                    <input
                      className="w-4 h-4"
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                    />
                    <label
                      className="ml-2 text-sm text-gray-900 font-medium"
                      htmlFor="default-checkbox"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="w-auto p-2">
                  <a
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                className="mb-9 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl 
                shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition 
                ease-in-out duration-200"
                type="submit"
              >
                {isLoading ? (
                  <span className="flex flex-row space-x-2 justify-center">
                    <MiniLoader isWhite />
                    <p>Signing you in...</p>
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
              <p className="mb-5 text-sm text-gray-500 font-medium text-center">
                Or continue with
              </p>
              <div className="flex flex-wrap justify-center -m-2">
                <div className="w-auto p-2">
                  <button
                    className="inline-flex items-center justify-center py-3 px-14 mb-6 w-full 
                  text-base text-coolGray-500 font-medium text-center leading-6 
                  bg-white border border-coolGray-100 hover:border-coolGray-200 
                  rounded-md shadow-sm"
                    onClick={redirectToGoogleSSO}
                  >
                    <img className="mr-2" src={googleIcon} alt="" />
                    <span>Google</span>
                  </button>
                </div>
                <div className="w-auto p-2">
                  <button
                    className="inline-flex items-center justify-center py-3 px-7 mb-6 w-full
                  text-base text-coolGray-500 font-medium text-center leading-6 
                  bg-white border border-coolGray-100 hover:border-coolGray-200 
                  rounded-md shadow-sm"
                    onClick={handleDemoAccount}
                  >
                    {/* <img className="mr-2 object-cover" src={""} alt="" /> */}
                    <span>Demo Account</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-center -m-2">
                <p className="mb-5 text-sm text-gray-500 font-medium text-center">
                  Dont have an account?{" "}
                  <a
                    className="ml-2 inline-block text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                    href="/signup"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

//attribution for img
//<a href="https://www.freepik.com/free-vector/flat-scrum-task-board-with-color-stick-paper-notes_26195122.htm#query=kanban%20board&position=0&from_view=keyword">Image by redgreystock</a> on Freepik
