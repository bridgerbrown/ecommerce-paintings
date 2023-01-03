import React, {useState} from "react"
import { useRouter } from "next/router";
import { useAuth } from "../components/context/AuthUserContext";
import { FormProvider, useForm } from "react-hook-form";

const Login = () => {
  const methods = useForm({ mode: "onBlur" });
  const { logIn } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      router.push("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <h2 className="">Log In</h2>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="">
              <label htmlFor="" className="">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className=""
            />
            {errors.email && <p className="">{errors.email.message}</p>}
          </div>
          <div className="">
            <div className="">
              <label htmlFor="" className="">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className=""
            />
            {errors.password && <p className="">{errors.password.message}</p>}
          </div>
          <div className="">
            <div className="">
              <label htmlFor="" className="">
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password",
              })}
              className=""
            />
            {errors.password_confirm && (
              <p className="">{errors.password_confirm.message}</p>
            )}
          </div>
          <div className="">
            <button
              type="submit"
              className=""
            >
              <p className="">submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;

