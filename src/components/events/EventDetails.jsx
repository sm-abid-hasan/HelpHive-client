"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCalendarDays, FaLocationDot, FaTag, FaUsers } from "react-icons/fa6";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import SafeImage from "@/components/common/SafeImage";
import UserAvatar from "@/components/common/UserAvatar";
import { useApi } from "@/hooks/useApi";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate, isPastEvent } from "@/lib/format";

export default function EventDetails({ id }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { data: event, setData: setEvent, loading, error } = useApi(`/api/events/${id}`);

  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);


  useEffect(() => {
    if (!session) {
      setJoined(false);
      return;
    }
    apiRequest(`/api/events/${id}/joined`, { auth: true })
      .then((result) => setJoined(result.joined))
      .catch(() => {});
  }, [session, id]);

  const handleJoin = async () => {

    if (!session) {
      toast.error("Please log in to join this event.");
      router.push(`/login?redirect=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }

    setJoining(true);
    try {
      await apiRequest(`/api/events/${id}/join`, { method: "POST", auth: true });
      setJoined(true);
      setEvent((prev) => ({ ...prev, participantsCount: (prev.participantsCount || 0) + 1 }));
      toast.success("You joined this event. See you there!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-12">
        <div className="skeleton aspect-[16/7] w-full"></div>
        <div className="mt-6 space-y-3">
          <div className="skeleton h-9 w-2/3"></div>
          <div className="skeleton h-5 w-1/3"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </Container>
    );
  }

  if (error || !event) {
    return <EmptyState title="Event not found" text={error} actionHref="/events" actionLabel="See upcoming events" />;
  }

  const ended = isPastEvent(event.eventDate);

  let buttonLabel = "Join event";
  if (ended) buttonLabel = "This event has ended";
  else if (joined) buttonLabel = "You have joined";

  return (
    <Container className="py-12">
      <div className="overflow-hidden rounded-box border border-base-300 shadow-md">
        <SafeImage src={event.thumbnail} alt={event.title} className="aspect-[16/7] w-full" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <span className="badge badge-secondary font-semibold">{event.eventType}</span>
          <h1 className="section-heading mt-3 text-3xl md:text-4xl">{event.title}</h1>

          <h2 className="mt-8 text-xl font-bold">About this event</h2>
          <p className="mt-3 max-w-prose whitespace-pre-line leading-relaxed opacity-85">{event.description}</p>
        </div>

        <aside className="h-fit space-y-5 rounded-box border border-base-300 bg-base-200/60 p-6">
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaCalendarDays className="mt-0.5 shrink-0 text-primary" />
              <span><strong className="block">Date</strong>{formatDate(event.eventDate)}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaLocationDot className="mt-0.5 shrink-0 text-primary" />
              <span><strong className="block">Location</strong>{event.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaTag className="mt-0.5 shrink-0 text-primary" />
              <span><strong className="block">Type</strong>{event.eventType}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaUsers className="mt-0.5 shrink-0 text-primary" />
              <span><strong className="block">Volunteers</strong>{event.participantsCount || 0} joined</span>
            </li>
          </ul>

          <div className="flex items-center gap-3 border-t border-base-300 pt-4">
            <UserAvatar user={{ name: event.creatorName, image: event.creatorPhoto, email: event.creatorEmail }} className="h-10 w-10" />
            <div className="text-sm">
              <p className="opacity-70">Organised by</p>
              <p className="font-semibold">{event.creatorName || "A community member"}</p>
            </div>
          </div>

          <button onClick={handleJoin} disabled={joining || joined || ended} className="btn btn-primary w-full">
            {joining ? <span className="loading loading-spinner loading-sm"></span> : buttonLabel}
          </button>

          {joined && (
            <Link href="/joined-events" className="block text-center text-sm font-semibold text-primary hover:underline">
              View my joined events
            </Link>
          )}
        </aside>
      </div>
    </Container>
  );
}
