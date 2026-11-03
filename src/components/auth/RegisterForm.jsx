

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/common/FormField";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/format";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));


  const [isMounted, setIsMounted] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const password = values.password;
  const hasLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!hasLength || !hasUppercase || !hasLowercase) {
      newErrors.password = "Password must meet all security requirements.";
    }

    const finalPhotoURL = values.photoURL.trim();
    if (finalPhotoURL && !/^https?:\/\/.+/.test(finalPhotoURL)) {
      newErrors.photoURL = "Please enter a valid photo URL (http or https).";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      image: finalPhotoURL || undefined,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created successfully! Welcome to HelpHive.");
    router.push(redirectTo);
    router.refresh();
  };


  if (!isMounted) {
    return null;
  }

  return (
    <section className="mx-auto flex min-h-[75vh] w-full max-w-md items-center px-4 py-12">
      <div className="w-full rounded-box border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
        <h1 className="section-heading text-3xl">Create your account</h1>
  

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <FormField label="Name" error={errors.name}>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              className={`input w-full ${errors.name ? "input-error" : ""}`}
            />
          </FormField>

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

          <FormField label="Photo URL (Optional)" error={errors.photoURL}>
            <input
              type="url"
              name="photoURL"
              value={values.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/my-photo.jpg"
              className={`input w-full ${errors.photoURL ? "input-error" : ""}`}
            />
          </FormField>

          <FormField label="Password" error={errors.password}>
            <PasswordInput
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="At least 6 characters, uppercase & lowercase"
            />

            {/* Live Password Condition Checklist */}
            <div className="mt-2.5 space-y-1.5 text-xs">
              <p className={`flex items-center gap-2 transition-colors ${hasLength ? "text-success font-medium" : "opacity-60"}`}>
                <span>{hasLength ? "✅" : "⚪"}</span> At least 6 characters
              </p>
              <p className={`flex items-center gap-2 transition-colors ${hasUppercase ? "text-success font-medium" : "opacity-60"}`}>
                <span>{hasUppercase ? "✅" : "⚪"}</span> At least one uppercase letter (A-Z)
              </p>
              <p className={`flex items-center gap-2 transition-colors ${hasLowercase ? "text-success font-medium" : "opacity-60"}`}>
                <span>{hasLowercase ? "✅" : "⚪"}</span> At least one lowercase letter (a-z)
              </p>
            </div>
          </FormField>

          <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2">
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href={`/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}