"use client";

import Link from "next/link";
import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import SectionTitle from "@/components/common/SectionTitle";
import EventCard from "@/components/events/EventCard";
import { EventGridSkeleton } from "@/components/events/EventSkeletons";
import { useApi } from "@/hooks/useApi";


export default function UpcomingEventsSection() {
  const { data: events, loading, error, reload } = useApi("/api/events?limit=6");

  return (
    <section className="bg-base-200 py-16 md:py-20">
      <Container>
        <SectionTitle title="Upcoming events"  />

        {loading ? (
          <EventGridSkeleton />
        ) : error ? (
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
            <button onClick={reload} className="btn btn-sm">Try again</button>
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            title="No upcoming events yet"
            text="Be the first one to create an event in your area."
            actionHref="/create-event"
            actionLabel="Create an event"
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/events" className="btn btn-primary">See all events</Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
