import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="vorld-container py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {user ? (
        <div className="glass-card p-6 rounded-lg">
          <img
            src={user.user_metadata?.avatar_url}
            className="w-20 h-20 rounded-full mb-4"
            alt="avatar"
          />
          <p><strong>Username:</strong> {user.user_metadata.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
