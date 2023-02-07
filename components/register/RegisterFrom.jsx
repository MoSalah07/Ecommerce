import Links from "../icons/Links";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const createUser = async (email, password) => {
  const { data } = await axios.post("/api/auth/signin", {
    email,
    password,
  });

  if (!data) {
    throw new Error(data.message);
  }

  return data;
};

export default function RegisterForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { email, password, confirmPassword } = data;
  const [error, setError] = useState("");
  const router = useRouter();
  const getValues = (e) => setData({ ...data, [e.target.id]: e.target.value });

  const handlerSubmit = async (e) => {
    // e.preventDefault();

    if (confirmPassword !== password) {
      setError("Password not Match");
      return;
    }

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6 ||
      !confirmPassword ||
      confirmPassword.trim().length < 6 ||
      confirmPassword !== password
    ) {
      setError("Error Wrongs");
      return;
    }

    try {
      const data = await createUser(email, password);
      setError(data.message);
    } catch (err) {
      setError(err.message);
    }
    console.log(error);
  };

  if (error === "OK")
    return setTimeout(() => {
      router.push("/login");
    }, 500);

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              width={50}
              height={50}
              priority
              // layout=""
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handlerSubmit)}
            className="mt-8 space-y-6"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // required
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/i,
                      message: "Please Enter Valid Email",
                    },
                  })}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={getValues}
                  //   value={email}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  //   required
                  {...register("password", {
                    required: "Please Enter Password",
                    minLength: {
                      value: 6,
                      message: "Password Is More Than 5 Chars",
                    },
                  })}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={getValues}
                  //   value={password}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-current-password"
                  //   required
                  {...register("confirmPassword", {
                    required: "Please Enter Password",
                    minLength: {
                      value: 6,
                      message: "Password Is More Than 5 Chars",
                    },
                  })}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm-Password"
                  onChange={getValues}
                  //   value={confirmPassword}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
            <Links
              href="/login"
              style="font-medium text-indigo-600 hover:text-indigo-500 mt-[-80px] text-center w-full inline-block"
            >
              Login ?
            </Links>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
