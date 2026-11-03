"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import SafeImage from "@/components/common/SafeImage";
import SectionTitle from "@/components/common/SectionTitle";
import { useApi } from "@/hooks/useApi";
import { confirmAction } from "@/lib/alerts";
import { apiRequest } from "@/lib/api";
import { formatDate, isPastEvent } from "@/lib/format";
import { TableSkeleton } from "./EventSkeletons";

export default function ManageEvents() {
  const { data: events, setData: setEvents, loading, error, reload } = useApi("/api/events/my", { auth: true });
  const [deletingId, setDeletingId] = useState("");

  const handleDelete = async (event) => {
    const confirmed = await confirmAction({
      title: "Delete this event?",
      text: `"${event.title}" and its joined volunteers will be removed. This cannot be undone.`,
      confirmText: "Yes, delete it",
    });
    if (!confirmed) return;

    setDeletingId(event._id);
    try {
      await apiRequest(`/api/events/${event._id}`, { method: "DELETE", auth: true });
      setEvents((prev) => prev.filter((item) => item._id !== event._id));
      toast.success("Event deleted successfully.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <Container className="py-12">
      <SectionTitle as="h1" title="Manage your events" subtitle="Update or delete the events you have created." />

      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button onClick={reload} className="btn btn-sm">Try again</button>
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="You have not created any events yet"
          text="Create your first event and invite people to join."
          actionHref="/create-event"
          actionLabel="Create an event"
        />
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-md">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Type</th>
                <th>Joined</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div className="flex min-w-60 items-center gap-3">
                      <SafeImage src={event.thumbnail} alt={event.title} className="h-14 w-20 shrink-0 rounded-lg" />
                      <div>
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm opacity-70">{event.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDate(event.eventDate)}
                    {isPastEvent(event.eventDate) && <span className="badge badge-ghost badge-sm ml-2">Ended</span>}
                  </td>
                  <td><span className="badge badge-secondary">{event.eventType}</span></td>
                  <td>{event.participantsCount || 0}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link href={`/manage-events/${event._id}/edit`} className="btn btn-sm btn-primary">
                        <FaPenToSquare /> Update
                      </Link>
                      <button onClick={() => handleDelete(event)} disabled={deletingId === event._id} className="btn btn-sm btn-error">
                        {deletingId === event._id ? <span className="loading loading-spinner loading-xs"></span> : <FaTrash />} Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
