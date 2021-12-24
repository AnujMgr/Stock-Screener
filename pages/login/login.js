import React, { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ToastContainer, toast } from "react-toast";
import { useAuth } from "../../lib/contexts/AuthContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Field, Formik } from "formik";
import PasswordField from "../../Form/PasswordField";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});

const Login = () => {
  const [state, dispatch] = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   setTheme("light");
  // }, []);

  async function onSubmitHandler(data) {
    /* validation handler */
    // const isValid = validationHandler(stateFormData);

    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const loginApi = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log("Caught Error");
      console.error("Error:", error);
    });
    let result = await loginApi.json();

    if (result.user && result.accessToken) {
      Cookies.set("token", result.accessToken);
      dispatch({
        type: "setAuthDetails",
        payload: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });

      return router.push("/");
    } else {
      if (result.error) emailOrPasswordWrong(result.error);
    }
  }

  const CustomInputComponent = ({ field, form, ...props }) => {
    return (
      <input
        className="bg-gray-800 flex-grow text-white dark:bg-gray-800 p-1 h-10 rounded outline-none w-full text-md px-3"
        {...field}
        {...props}
      />
    );
  };

  const emailOrPasswordWrong = (text) => toast.error(text);

  return (
    <>
      <section className="xl:container mx-auto">
        <div className="max-w-4xl mx-auto my-8 bg-white dark:bg-gray-900 shadow-sm rounded-md overflow-hidden">
          <div className="p-3 ">
            <div className="text-center mt-10">
              <h1 className="text-center text-5xl font-normal text-gray-500 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-gray-600 mb-10">
                Sign in to your Account
              </p>
            </div>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Schema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  onSubmitHandler(values);
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {({ errors, handleSubmit, touched, isSubmitting }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="max-w-sm mx-auto mt-3">
                      <label htmlFor="email" className="select-none">
                        Email
                      </label>
                      <Field
                        id="email"
                        type="email"
                        name="email"
                        component={CustomInputComponent}
                        placeholder="Email"
                      />

                      {touched.email && errors.email && (
                        <span className="error text-red-700 text-sm">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="max-w-sm mx-auto mt-3">
                      <label htmlFor="password" className="select-none">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        placeholder="Password"
                        component={PasswordField}
                      />
                      {touched.password && errors.password && (
                        <span className="error text-red-700 text-sm">
                          {errors.password}
                        </span>
                      )}
                    </div>

                    <div className="text-center mb-8 max-w-sm mx-auto">
                      <div className="mt-5">
                        <button
                          type="submit"
                          className={` text-white px-6 py-2 rounded-md shadow-lg transition duration-500 ease-in-out w-full ${
                            isSubmitting
                              ? "bg-gray-600 cursor-not-allowed"
                              : "bg-blue-800 hover:bg-blue-600"
                          }`}
                          disabled={isSubmitting}
                        >
                          Login
                        </button>
                      </div>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={(e) =>
                            onSubmitHandler({
                              email: "anujmgr777@gmail.com",
                              password: "password",
                            })
                          }
                          className={` text-white px-6 py-2 rounded-md shadow-lg transition duration-500 ease-in-out w-full ${
                            isSubmitting
                              ? "bg-green-900 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-800"
                          }`}
                          disabled={isSubmitting}
                        >
                          Demo Login
                        </button>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-center">
                          <span className="pr-2 text-gray-500">
                            Don&apos;t Have Account?
                          </span>
                          <h1
                            className="hover:text-indigo-900 text-blue-800 font-bold transition duration-500 ease-in-out"
                            title="Signup Now"
                          >
                            <Link href={"/register"} as={"/register"}>
                              Sign Up
                            </Link>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>

            {/* <div className="max-w-sm mx-auto mt-3">
              <label htmlFor="password" className="select-none">
                Password
              </label>
              <div className="flex items-center rounded-md overflow-hidden">
                <input
                  className="bg-gray-800 text-white px-4 dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-md"
                  type="password"
                  placeholder="Password"
                  aria-label="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
        <ToastContainer delay={7000} position="bottom-right" />
      </section>
    </>
  );
};

export default Login;
