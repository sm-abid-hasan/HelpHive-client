



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/common/Container";
import FormField from "@/components/common/FormField";
import SectionTitle from "@/components/common/SectionTitle";
import UserAvatar from "@/components/common/UserAvatar";
import { authClient } from "@/lib/auth-client";
import { validateProfile } from "@/lib/validators";

export default function ProfileView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user || {}; 


  const [values, setValues] = useState({ 
    name: user.name || "", 
    photoURL: user.image || "https://example.com/default.png" 
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (user.name) {
      setValues((prev) => ({
        ...prev,
        name: user.name || "",
        photoURL: user.image || "https://example.com/default.png"
      }));
    }
  }, [user.name, user.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validateProfile(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      toast.error(Object.values(foundErrors)[0]);
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: values.name.trim() });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update your profile.");
      return;
    }
    toast.success("Profile updated successfully!");
    router.refresh();
  };

  return (
    <Container className="max-w-3xl py-12">
      <SectionTitle as="h1" title="My profile" subtitle="Change your profile name." />

      <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-md sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <UserAvatar key={user.image} user={user} className="h-20 w-20 text-3xl" />
          <div>
            <p className="text-xl font-bold">{user.name}</p>
            <p className="opacity-70">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <FormField label="Name" error={errors.name}>
            <input name="name" value={values.name} onChange={handleChange} className={`input w-full ${errors.name ? "input-error" : ""}`} />
          </FormField>

          <FormField label="Email (cannot be changed)">
            <input value={user.email} disabled className="input w-full" />
          </FormField>

          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save profile"}
          </button>
        </form>
      </div>
    </Container>
  );
}