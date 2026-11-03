


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import FormField from "@/components/common/FormField";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/format";
import { validateLogin } from "@/lib/validators";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foundErrors = validateLogin(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      toast.error(Object.values(foundErrors)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: values.email.trim(),
      password: values.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Please check your email and password.");
      return;
    }

    toast.success("Welcome back! You are logged in.");
    router.push(redirectTo);
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
    if (error) toast.error(error.message || "Google login failed. Please try again.");
  };

  return (
    <section className="mx-auto flex min-h-[75vh] w-full max-w-md items-center px-4 py-12">
      <div className="w-full rounded-box border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
        <h1 className="section-heading text-3xl">Welcome back</h1>
        <p className="mt-2 opacity-75">Log in to create, join and manage community events.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <FormField label="Email" error={errors.email}>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className={`input w-full ${errors.email ? "input-error" : ""}`}
            />
          </FormField>

          <FormField label="Password" error={errors.password}>
            <PasswordInput value={values.password} onChange={handleChange} error={errors.password} />
          </FormField>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </button>
        </form>

        <div className="divider my-6">or</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          <FcGoogle className="text-lg" /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm">
          New to HelpHive?{" "}
          <Link href={`/register${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}