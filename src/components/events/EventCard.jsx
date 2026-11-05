import Link from "next/link";
import { FaCalendarDays, FaLocationDot, FaUsers } from "react-icons/fa6";
import SafeImage from "@/components/common/SafeImage";
import { formatDate } from "@/lib/format";


export default function EventCard({ event }) {
  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100 shadow-md transition hover:shadow-xl">
      <figure className="relative aspect-[16/10] w-full">
        <SafeImage src={event.thumbnail} alt={event.title} className="h-full w-full" />
        <span className="badge badge-secondary absolute left-3 top-3 font-semibold">{event.eventType}</span>
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
          <li className="flex items-center gap-2">
            <FaUsers className="shrink-0 text-primary" /> {event.participantsCount || 0} joined
          </li>
        </ul>

        <p className="line-clamp-2 min-h-10 text-sm opacity-70">{event.description}</p>

        <div className="card-actions mt-auto pt-2">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">
            View Event
          </Link>
        </div>
      </div>
    </article>
  );
}
