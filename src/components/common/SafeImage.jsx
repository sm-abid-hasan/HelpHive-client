"use client";

import { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa6";


export default function SafeImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-linear-to-br from-primary/30 to-secondary/40 text-primary ${className}`}
      >
        <FaHandHoldingHeart className="text-4xl" />
      </div>
    );
  }

  return (

    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
