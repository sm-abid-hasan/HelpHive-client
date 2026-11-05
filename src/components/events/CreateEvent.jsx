"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { apiRequest } from "@/lib/api";
import { tomorrowInputDate } from "@/lib/format";
import EventForm from "./EventForm";

export default function CreateEvent() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleCreate = async (values) => {
    setSaving(true);
    try {
      await apiRequest("/api/events", { method: "POST", auth: true, body: values });
      toast.success("Event created successfully!");
      router.push("/events");
    } catch (error) {
      toast.error(error.message);
      setSaving(false);
    }
  };

  return (
    <Container className="max-w-3xl py-12">
      <SectionTitle
        as="h1"
        title="Create a new event"
        
      />
      <EventForm minDate={tomorrowInputDate()} onSubmit={handleCreate} submitLabel="Create event" loading={saving} />
    </Container>
  );
}
