import LastMonths from '@/components/profile/last-months';
import ShowProfile from '@/components/profile/show-profile';

async function ProfilePage({ params }) {
  const userId = params.userId;

  const cardClass =
    'w-full p-4 rounded-xl border backdrop-blur-md bg-gray-200/50 border-slate-300';

  return (
    <div className="flex flex-col gap-6 mx-auto">
      <h1 className="text-4xl font-bold text-start mt-6">User Profile</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ShowProfile userId={userId} cardClass={cardClass} />
        <div className={`${cardClass} PasswordChange w-full`}>
          <h4 className="text-sm">Password Change</h4>
          <div>
            <p>Here you will be able to change your password</p>
          </div>
        </div>
      </div>
      <LastMonths userId={userId} cardClass={cardClass} />
    </div>
  );
}

export default ProfilePage;
