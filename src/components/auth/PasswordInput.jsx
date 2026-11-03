"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


export default function PasswordInput({ value, onChange, error, placeholder = "Enter your password" }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="current-password"
        className={`input w-full pr-11 ${error ? "input-error" : ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
