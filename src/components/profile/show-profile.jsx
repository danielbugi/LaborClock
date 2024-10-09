import { getProfileInfo } from '@/actions/profile-info';
import { updateProfileInfo } from '@/actions/profile-info';
import ProfileForm from './profile-form';

async function ShowProfile({ userId, cardClass }) {
  const { user: userInfo } = await getProfileInfo(userId);

  async function handleUpdateProfile(formData) {
    'use server';
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const perHour = formData.get('perHour');

    const result = await updateProfileInfo(userId, {
      firstName,
      lastName,
      perHour,
    });

    if (result.status !== 'success') {
      throw new Error(result.message);
    }
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className={`flex flex-col gap-6 text-start p-10 ${cardClass}`}>
        <h4 className="text-sm">User Info</h4>
        <div className="flex flex-col gap-8">
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <ProfileForm initialData={userInfo} onSubmit={handleUpdateProfile} />
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
