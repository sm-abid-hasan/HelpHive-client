"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import SafeImage from "@/components/common/SafeImage";
import SectionTitle from "@/components/common/SectionTitle";
import { useApi } from "@/hooks/useApi";
import { confirmAction } from "@/lib/alerts";
import { apiRequest } from "@/lib/api";
import { formatDate, isPastEvent } from "@/lib/format";
import { EventGridSkeleton } from "./EventSkeletons";

export default function JoinedEvents() {

  const { data: joins, setData: setJoins, loading, error, reload } = useApi("/api/joins/my", { auth: true });
  const [leavingId, setLeavingId] = useState("");

  const handleLeave = async (event) => {
    const confirmed = await confirmAction({
      title: "Leave this event?",
      text: `You will no longer be listed as a volunteer for "${event.title}".`,
      confirmText: "Yes, leave",
    });
    if (!confirmed) return;

    setLeavingId(event._id);
    try {
      await apiRequest(`/api/events/${event._id}/join`, { method: "DELETE", auth: true });
      setJoins((prev) => prev.filter((item) => item.event._id !== event._id));
      toast.success("You left the event.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLeavingId("");
    }
  };

  return (
    <Container className="py-12">
      <SectionTitle as="h1" title="Events you joined" subtitle="Your volunteer plans, sorted by event date." />

      {loading ? (
        <EventGridSkeleton count={3} />
      ) : error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button onClick={reload} className="btn btn-sm">Try again</button>
        </div>
      ) : joins.length === 0 ? (
        <EmptyState
          title="You have not joined any events yet"
          text="Browse upcoming events and join one that matters to you."
          actionHref="/events"
          actionLabel="Find events"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {joins.map(({ _id, event }) => {
            const ended = isPastEvent(event.eventDate);
            return (
              <article key={_id} className="card h-full overflow-hidden border border-base-300 bg-base-100 shadow-md">
                <figure className="relative aspect-[16/10] w-full">
                  <SafeImage src={event.thumbnail} alt={event.title} className="h-full w-full" />
                  <span className={`badge absolute left-3 top-3 font-semibold ${ended ? "badge-ghost" : "badge-secondary"}`}>
                    {ended ? "Ended" : event.eventType}
                  </span>
                </figure>
                <div className="card-body gap-3 p-5">
                  <h3 className="card-title line-clamp-1 text-xl">{event.title}</h3>
                  <ul className="space-y-1.5 text-sm opacity-80">
                    <li className="flex items-center gap-2">
                      <FaLocationDot className="shrink-0 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCalendarDays className="shrink-0 text-primary" /> {formatDate(event.eventDate)}
                    </li>
                  </ul>
                  <div className="card-actions mt-auto grid grid-cols-2 gap-2 pt-2">
                    <Link href={`/events/${event._id}`} className="btn btn-primary">View</Link>
                    <button onClick={() => handleLeave(event)} disabled={leavingId === event._id} className="btn btn-outline btn-error">
                      {leavingId === event._id ? <span className="loading loading-spinner loading-xs"></span> : "Leave"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Container>
  );
}
