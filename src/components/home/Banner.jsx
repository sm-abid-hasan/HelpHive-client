

import Link from "next/link";
import Image from "next/image";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
import Container from "@/components/common/Container";


export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-base-200">
      <div className="dot-pattern absolute inset-0 opacity-70" aria-hidden="true"></div>

      <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        
        <div>
          <h1 className="section-heading text-4xl sm:text-5xl lg:text-6xl">
            "Bridge the gap in your community. Lend a hand, build a bond."
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed opacity-80">
            Empowering local changemakers. Discover, join, and champion grassroots social service events—from neighborhood cleanups to tree plantations—right where you live.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className="btn btn-primary btn-lg">Find an event</Link>
            <Link href="/create-event" className="btn btn-outline btn-lg">Create an event</Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium opacity-80">
            <li>Free for everyone</li>
            <li>Built for local communities</li>
            <li>Join in one click</li>
          </ul>
        </div>

    
        <div className="relative flex justify-center items-start h-full">
          <div className="w-full max-w-xl h-auto rounded-2xl overflow-hidden shadow-2xl border border-base-300">
            <Image
              src="/HelpHive.png" 
              alt="CivicPulse Community Events Banner"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}