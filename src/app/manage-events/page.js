import PrivateRoute from "@/components/auth/PrivateRoute";
import ManageEvents from "@/components/events/ManageEvents";

export const metadata = { title: "Manage Events" };

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEvents />
    </PrivateRoute>
  );
}
