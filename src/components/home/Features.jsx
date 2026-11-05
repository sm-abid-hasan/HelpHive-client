/* import {
  FaCalendarDays,
  FaHandHoldingHeart,
  FaMapLocationDot,
  FaPenToSquare,
  FaPlus,
  FaShieldHalved,
} from "react-icons/fa6";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const features = [
  { icon: FaPlus, title: "Create events in minutes", text: "Add a title, place, date and photo. Your event goes live for the whole community." },
  { icon: FaMapLocationDot, title: "Find help near you", text: "Browse upcoming events by title, location or type, from cleanups to blood donation." },
  { icon: FaHandHoldingHeart, title: "Join with one click", text: "Open any event, press Join and you are on the volunteer list right away." },
  { icon: FaCalendarDays, title: "Track what you joined", text: "Your joined events are collected on one page, sorted by date, so you never miss one." },
  { icon: FaPenToSquare, title: "Manage your own events", text: "Update the details or delete an event whenever plans change. Only you can edit your events." },
  { icon: FaShieldHalved, title: "Safe and secure", text: "Protected sign-in and secure tokens keep your account and your events safe." },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionTitle
          title="Everything you need to organise good work"
          subtitle="Simple tools for people who would rather spend their time helping than managing spreadsheets."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="h-full rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                <Icon />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
 */


import {
  FaCalendarDays,
  FaHandHoldingHeart,
  FaMapLocationDot,
  FaPenToSquare,
  FaPlus,
  FaShieldHalved,
} from "react-icons/fa6";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const features = [
  { icon: FaPlus, title: "Create events in minutes", text: "Add a title, place, date and photo. Your event goes live for the whole community." },
  { icon: FaMapLocationDot, title: "Find help near you", text: "Browse upcoming events by title, location or type, from cleanups to blood donation." },
  { icon: FaHandHoldingHeart, title: "Join with one click", text: "Open any event, press Join and you are on the volunteer list right away." },
  { icon: FaCalendarDays, title: "Track what you joined", text: "Your joined events are collected on one page, sorted by date, so you never miss one." },
  { icon: FaPenToSquare, title: "Manage your own events", text: "Update the details or delete an event whenever plans change. Only you can edit your events." },
  { icon: FaShieldHalved, title: "Safe and secure", text: "Protected sign-in and secure tokens keep your account and your events safe." },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionTitle
          title="Everything you need to organise good work"
          subtitle="Simple tools for people who would rather spend their time helping than managing spreadsheets."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="h-full rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                <Icon />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{text}</p>
            </div>
            
          ))}
          <div>

          </div>
          <div></div>
        </div>
      </Container>
    </section>
  );
}
