"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import PageLoader from "@/components/common/PageLoader";
import SectionTitle from "@/components/common/SectionTitle";
import { useApi } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { todayInputDate, toInputDate } from "@/lib/format";
import EventForm from "./EventForm";

export default function EditEvent({ id }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { data: event, loading, error } = useApi(`/api/events/${id}`);
  const [saving, setSaving] = useState(false);

  if (loading) return <PageLoader />;
  if (error || !event) {
    return <EmptyState title="Event not found" text={error} actionHref="/manage-events" actionLabel="Back to my events" />;
  }

  
  if (event.creatorEmail !== session?.user?.email) {
    return (
      <EmptyState
        title="You cannot edit this event"
        text="You can only update events that you created yourself."
        actionHref="/manage-events"
        actionLabel="Back to my events"
      />
    );
  }

  const handleUpdate = async (values) => {
    setSaving(true);
    try {
      await apiRequest(`/api/events/${id}`, { method: "PUT", auth: true, body: values });
      toast.success("Event updated successfully!");
      router.push("/manage-events");
    } catch (err) {
      toast.error(err.message);
      setSaving(false);
    }
  };

  const initialValues = {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnail: event.thumbnail,
    location: event.location,
    eventDate: toInputDate(event.eventDate),
  };

  return (
    <Container className="max-w-3xl py-12">
      <SectionTitle as="h1" title="Update event" subtitle="Change any detail and save. The date cannot be in the past." />
      <EventForm
        initialValues={initialValues}
        minDate={todayInputDate()}
        onSubmit={handleUpdate}
        submitLabel="Save changes"
        loading={saving}
      />
    </Container>
  );
}
