"use client";

import { useState } from "react";


export default function UserAvatar({ user, className = "h-10 w-10" }) {
  const [failed, setFailed] = useState(false);
  const letter = (user?.name || user?.email || "U").charAt(0).toUpperCase();

  if (user?.image && !failed) {
    return (

      <img
        src={user.image}
        alt={user.name || "Profile picture"}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center rounded-full bg-primary font-bold text-primary-content ${className}`}>
      {letter}
    </div>
  );
}
