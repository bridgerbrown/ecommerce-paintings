import React, {useState} from "react"
import { useRouter } from "next/router";
import { useAuth } from "../components/context/AuthUserContext";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar"
import Image from "next/image";

const Login = () => {
  const methods = useForm({ mode: "onBlur" });
  const { logIn } = useAuth()
  const router = useRouter()
  const [invalid, setInvalid] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      router.push("/profile");
      setInvalid("")
    } catch (error) {
      setInvalid("Invalid login")
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Image
        src="/bbg.jpg"
        width={3000}
        height={2297}
        className="formImg"
      />
      <div className="form-page">
            <div className="form-container log-in">
              <h4 className="form-title">Log In</h4>
              <FormProvider {...methods}>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="form">
                  <div className="">
                    <div className="form-item">
                      <label htmlFor="" className="form-label">
                        Email
                      </label>
                    </div>

                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="form-input"
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                  </div>
                  <div className="">
                    <div className="form-item">
                      <label htmlFor="" className="form-label">
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      {...register("password", { required: "Password is required" })}
                      className="form-input"
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                  </div>
                  <div className="form-item submit-line">
                    <button
                      type="submit"
                      className="form-submit"
                    >
                      <p className="">Submit</p>
                    </button>
                    <p className="error invalid">{invalid}</p>
                  </div>
                </form>
              </FormProvider>
              <Link href="/signup">
                <p className="form-redirect-text">Don't have an account? Click here to sign up!</p>
              </Link>
            </div>
        </div>
    </div>
  );
};

export default Login;

