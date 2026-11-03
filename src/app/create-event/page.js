import PrivateRoute from "@/components/auth/PrivateRoute";
import CreateEvent from "@/components/events/CreateEvent";

export const metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEvent />
    </PrivateRoute>
  );
}
