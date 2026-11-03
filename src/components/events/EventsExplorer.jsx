"use client";

import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import SectionTitle from "@/components/common/SectionTitle";
import { useApi } from "@/hooks/useApi";
import { EVENT_TYPES } from "@/lib/constants";
import EventCard from "./EventCard";
import { EventGridSkeleton } from "./EventSkeletons";


export default function EventsExplorer() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const params = new URLSearchParams();
  if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
  if (type) params.set("type", type);
  const query = params.toString();

  const { data: events, loading, error, reload } = useApi(`/api/events${query ? `?${query}` : ""}`);

  return (
    <Container className="py-12">
      <SectionTitle
        as="h1"
        title="Upcoming events"
        subtitle="Find a service event near you and join in. Events that have already happened are not shown."
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_220px]">
        <label className="input w-full">
          <FaMagnifyingGlass className="opacity-60" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or location"
            aria-label="Search events"
          />
        </label>

        <select value={type} onChange={(e) => setType(e.target.value)} className="select w-full" aria-label="Filter by event type">
          <option value="">All event types</option>
          {EVENT_TYPES.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <EventGridSkeleton />
      ) : error ? (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button onClick={reload} className="btn btn-sm">Try again</button>
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="No upcoming events found"
          text="Try a different search, or be the first to create an event."
          actionHref="/create-event"
          actionLabel="Create an event"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </Container>
  );
}
