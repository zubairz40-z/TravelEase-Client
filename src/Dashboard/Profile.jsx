import { useAuth } from "../Providers/AuthProvider";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      <div className="space-y-2">
        <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
