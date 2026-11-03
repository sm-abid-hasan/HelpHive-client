import PrivateRoute from "@/components/auth/PrivateRoute";
import JoinedEvents from "@/components/events/JoinedEvents";

export const metadata = { title: "Joined Events" };

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEvents />
    </PrivateRoute>
  );
}
