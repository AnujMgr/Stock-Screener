import React, { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import PasswordField from "../../Form/PasswordField";
import { toast, ToastContainer } from "react-toast";
import { useRouter } from "next/router";

const Register = () => {
  //For Form
  const router = useRouter();

  const Schema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Invalid Email !!")
      .required("This field is required"),
    phoneNumber: Yup.string()
      .matches(/^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/, {
        message: "Invalid Phone number",
        excludeEmptyString: false,
      })
      .required("This field is required"),
    password: Yup.string()
      .min(8, "Your password must contain atleast 8 letters!")
      .required("This field is required"),

    confirmPassword: Yup.string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password's didn't match"
        ),
      })
      .required("This field is required"),
  });

  const CustomInputComponent = ({ field, form, ...props }) => {
    return (
      <input
        className="bg-gray-800 flex-grow text-white dark:bg-gray-800 p-1 h-10 rounded-md outline-none w-full text-md px-3"
        {...field}
        {...props}
      />
    );
  };

  async function onSubmitHandler(data) {
    const signUpApi = await fetch(`/api/register`, {
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
    let result = await signUpApi.json();

    if (result.success) {
      router.push("/login");
    } else {
      if (result.error) toastError(result.message);
    }
  }

  const toastError = (text) => toast.error(text);

  return (
    <>
      <section className="xl:container mx-auto">
        <div className="max-w-4xl mx-auto shadow-sm my-8 rounded-md overflow-hidden">
          <div className="p-3 bg-white dark:bg-gray-900">
            <div className="text-center mt-10">
              <h1 className="text-center text-5xl font-normal text-gray-500 dark:text-white">
                Sign Up
              </h1>
              <p className="mt-2 text-gray-600 mb-10">
                Sign in to your Account
              </p>
            </div>

            <Formik
              initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
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
                        Name
                      </label>
                      <Field
                        name="name"
                        component={CustomInputComponent}
                        placeholder="Your Name"
                      />

                      {touched.name && errors.name && (
                        <span className="error" style={{ color: "red" }}>
                          {errors.name}{" "}
                        </span>
                      )}
                      {/* {errors.name} */}
                    </div>
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
                          {errors.email}{" "}
                        </span>
                      )}
                    </div>
                    <div className="max-w-sm mx-auto mt-3">
                      <label htmlFor="phoneNumber" className="select-none">
                        Mobile Number
                      </label>
                      <Field
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        component={CustomInputComponent}
                        placeholder="Mobile Number"
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <span className="error text-red-700 text-sm">
                          {errors.phoneNumber}{" "}
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
                          {errors.password}{" "}
                        </span>
                      )}
                    </div>

                    <div className="max-w-sm mx-auto mt-3">
                      <label htmlFor="confirmPassword" className="select-none">
                        Confirm Password
                      </label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Password"
                        component={PasswordField}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <span className="error text-red-700 text-sm">
                          {errors.confirmPassword}{" "}
                        </span>
                      )}
                    </div>

                    <div className="text-center mb-8 max-w-sm mx-auto">
                      <div className="mt-5">
                        <button
                          type="submit"
                          className={` text-white px-6 py-2 rounded-md shadow-lg transition duration-500 ease-in-out w-full ${
                            isSubmitting
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-800 hover:bg-blue-600"
                          }`}
                          disabled={isSubmitting}
                        >
                          Sign Up{" "}
                        </button>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-center">
                          <span className="pr-2 text-gray-500">
                            Already Have Account?
                          </span>
                          <h1
                            className="hover:text-indigo-900 text-blue-800 font-bold transition duration-500 ease-in-out"
                            title="Signup Now"
                          >
                            <Link href={"/login"} as={"/login"}>
                              Login
                            </Link>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
        <ToastContainer delay={7000} position="bottom-right" />
      </section>
    </>
  );
};

export default Register;
