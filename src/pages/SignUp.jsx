import React from "react";
import { useForm } from "react-hook-form";
import { SignUpUserDTO } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // const redirectToGoogleSSO = async () => {
  //   let timer = null;
  //   const googleLoginURL = "http://localhost:5000/api/v1/auth/google/redirect";
  //   const newWindow = window.open(googleLoginURL, "_self");
  // };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpUserDTO),
    defaultValues: {
      name: import.meta.env.VITE_TEST_NAME,
      email: import.meta.env.VITE_TEST_EMAIL,
      password: import.meta.env.VITE_TEST_PASSWORD,
    },
  });

  const [signUp, { isLoading }] = useSignUpMutation();
  // const [login, { isLoading }] = useLoginMutation()
  const onSubmit = async (data) => {
    try {
      const accountCreate = await signUp({
        username: data.name,
        email: data.email,
        password: data.password,
      });

      // if (login) console.log(login);
      reset({
        name: "",
        email: "",
        password: "",
      });

      if (accountCreate) navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="py-24 md:pt-32 bg-gray-800 min-h-screen"
      style={{
        backgroundImage: `linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% )`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="relative max-w-xl mx-auto pt-14 pb-16 px-8 bg-white rounded-2xl">
          <div className="max-w-sm mx-auto flex flex-col ">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                Welcome to ILIRA
              </h3>
              <p className="text-lg text-coolGray-500 font-medium">
                Sign up for your account.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Name*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="name"
                  placeholder="Patryk"
                  {...register("name")}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Email*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="name"
                  placeholder="dev@shuffle.dev"
                  {...register("email")}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor=""
                >
                  Password*
                </label>
                <input
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="w-full md:w-1/2">
                  <label className="relative inline-flex items-center">
                    <input
                      className="form-checkbox appearance-none"
                      type="checkbox"
                    />
                    {/* <img
                className="absolute top-1/2 transform -translate-y-1/2 left-0"
                src="flex-ui-assets/elements/sign-up/checkbox-icon.svg"
                alt=""
              /> */}
                    <span className="ml-7 text-xs text-coolGray-800 font-medium">
                      Remember me
                    </span>
                  </label>
                </div>
                <div className="w-full md:w-auto mt-1">
                  <a
                    className="inline-block text-xs font-medium text-blue-500 hover:text-blue-600"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                className="inline-block py-3 px-7 mb-4 w-full text-base text-blue-50 font-medium text-center leading-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            {/* <div className="h-full flex flex-col justify-center">
              <button
                className="inline-flex items-center justify-center py-3 px-7 mb-6 w-full 
              text-base text-coolGray-500 font-medium text-center leading-6 
              bg-white border border-coolGray-100 hover:border-coolGray-200 
              rounded-md shadow-sm"
                onClick={redirectToGoogleSSO}
              >
                <img className="mr-2" src={googleIcon} alt="" />
                <span>Continue with Google</span>
              </button>
            </div> */}
            <div>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Already have an account?
                </span>
                <a
                  className="ml-2 inline-block text-xs font-medium text-blue-500 hover:text-blue-600 hover:underline"
                  href="/signin"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
