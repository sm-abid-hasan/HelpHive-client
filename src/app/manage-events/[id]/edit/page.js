import PrivateRoute from "@/components/auth/PrivateRoute";
import EditEvent from "@/components/events/EditEvent";

export const metadata = { title: "Update Event" };

export default async function EditEventPage({ params }) {
  const { id } = await params;
  return (
    <PrivateRoute>
      <EditEvent id={id} />
    </PrivateRoute>
  );
}
