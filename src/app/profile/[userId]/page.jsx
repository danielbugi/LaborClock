'use client';

import { useLaborContext } from '@/context/labor-context';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function ProfilePage() {
  const { cachedSession } = useLaborContext();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    perHour: '',
  });

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/${cachedSession.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok) {
        // console.log(data);
        setUserInfo(data.data);
        setLoading(false);
      } else {
        console.log('An error occurred', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cachedSession !== null) {
      fetchUserInfo();
    }
  }, [cachedSession]);

  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-bold text-center mt-6">User Profile</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="flex flex-col gap-6 text-start  p-10 rounded-xl border backdrop-blur-md bg-white/50 border-slate-300">
            <h2 className="text-xl font-bold">User Information</h2>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>First Name:</strong> {userInfo.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userInfo.lastName}
            </p>
            <p>
              <strong>Hour Rate:</strong> {userInfo.perHour}
            </p>
            <div className="flex flex-col gap-4">
              <Button color="primary">Edit Profile</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
