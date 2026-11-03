import PrivateRoute from "@/components/auth/PrivateRoute";
import ProfileView from "@/components/auth/ProfileView";

export const metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileView />
    </PrivateRoute>
  );
}
