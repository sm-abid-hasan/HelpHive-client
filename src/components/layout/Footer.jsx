import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  
  FaHandHoldingHeart,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import Container from "@/components/common/Container";

const socials = [
  { label: "X (Twitter)",  icon: FaXTwitter },
  { label: "Facebook",  icon: FaFacebookF },
  { label: "Instagram", icon: FaInstagram },
  { label: "LinkedIn",  icon: FaLinkedinIn },
  
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">
      {/* Call to action strip */}
      <div className="bg-primary text-primary-content">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="section-heading text-2xl md:text-3xl">See a need in your area? Start the change...</h2>
            <p className="mt-1 opacity-90">Create an event in two minutes and invite your neighbours.</p>
          </div>
          <Link href="/create-event" className="btn btn-secondary shrink-0">
            Create an event
          </Link>
        </Container>
      </div>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="section-heading flex items-center gap-2 text-2xl font-extrabold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-content">
              <FaHandHoldingHeart />
            </span>
            HelpHive
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-75">
            A community platform where neighbours organise, join and track social service events like clothes
            distribution, plantation drives and cleanups.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Explore</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
            <li><Link href="/events" className="hover:text-secondary">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:text-secondary">Create Event</Link></li>
            <li><Link href="/joined-events" className="hover:text-secondary">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-3"><FaLocationDot className="mt-0.5 shrink-0 text-secondary" /> House 12, Road 5, Dhaka, Bangladesh</li>
            <li className="flex items-center gap-3"><FaPhone className="shrink-0 text-secondary" /> +880 1234 567890</li>
            <li className="flex items-center gap-3"><FaEnvelope className="shrink-0 text-secondary" /> hello@helphive.org</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Follow us</h3>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-content/30 transition hover:border-secondary hover:bg-secondary hover:text-secondary-content"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-neutral-content/15">
        <Container className="py-5 text-center text-sm opacity-70">
          © {new Date().getFullYear()} HelpHive. Made with care for our communities.
        </Container>
      </div>
      <div>

        
      </div>
    </footer>
  );
}
