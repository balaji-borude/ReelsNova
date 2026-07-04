import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../shared/Logo";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Login as LoginApi } from "../../Services/Operations/AuthApi";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // onChange handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // form Submission handler
  const navigate = useNavigate();
  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await LoginApi({ formData });
      // console.log(first)
      if (data?.success) {
        navigate("/feed");
      }
    } catch (error) {
      console.log("Login failed in component:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <main className="w-full flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Logo size="lg" />
              </div>
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Welcome Back
              </h1>
              <p className="text-neutral-400 mt-2">
                Sign in to continue to ReelsNova
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={SubmitHandler}>
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-neutral-300 text-sm">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-neutral-300 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    name="password"
                    onChange={onChangeHandler}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-end">
                {/* <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-rose-500 focus:ring-rose-500"
                  />
                   <span className="text-sm text-neutral-400">Remember me</span> 
                </label> */}
                <Link
                  to="#"
                  className="text-sm text-rose-500 hover:text-rose-400"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-md font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-neutral-900 text-neutral-500">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="flex items-center justify-center gap-2 border border-neutral-700 hover:bg-neutral-800 text-white bg-transparent py-3 rounded-md transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>

                <button className="flex items-center justify-center gap-2 border border-neutral-700 hover:bg-neutral-800 text-white bg-transparent py-3 rounded-md transition">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.84V18.667H9.876V14.896H12.84V12.47c0-3.096 1.89-4.788 4.788-4.788 1.386 0 2.596 0.196 2.975 0.28v3.47h-2c-1.966 0-2.345 0.94-2.345 2.345v2h4l-0.567 4H17V24h5c0.731 0 1.325-0.593 1.325-1.325V1.325C24 0.593 23.407 0 22.675 0z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-neutral-400 text-sm mt-8">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-rose-500 hover:text-rose-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
