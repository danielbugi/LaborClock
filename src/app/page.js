import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import Bg from '@/components/bg';
import Link from 'next/link';

export const metadata = {
  title: 'LaborClock - Time tracking made easy',
  type: 'website',
  name: 'LaborClock',
  url: 'https://labor-clock.vercel.app/',

  description:
    'LaborClock is a time tracking app that helps you keep track of your work hours.',
  keywords:
    'time tracking, productivity, work hours, time management, LaborClock',
};

export async function getSessionServer() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    console.error('Error getting server session:', error);
    return null;
  }
}

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center py-24">
      <Bg display="absolute" />

      <div className="flex flex-col items-center md:items-start gap-6 pr-0 md:pr-0">
        <h1 className="text-4xl sm:text-6xl text-center md:text-start font-bold mt-4">
          Your smart Labor
          <span className="text-blue-500">Clock</span>
        </h1>
        <p className="text-lg text-center md:text-start mt-2 px-4 md:px-0">
          Store and track your hours with ease and be smarter. <br /> Get
          started now!
        </p>
        <ul>
          <li className="flex items-center gap-2">
            <IoMdCheckboxOutline />
            <span>Easy to use</span>
          </li>
          <li className="flex items-center gap-2">
            <IoMdCheckboxOutline />
            <span>Track your hours</span>
          </li>
          <li className="flex items-center gap-2">
            <IoMdCheckboxOutline />
            <span>User-Friendly Interface</span>
          </li>
        </ul>
        <div className="flex gap-4">
          <Link href={'/login'}>
            <Button auto color="primary">
              Get Started
            </Button>
          </Link>
          <Button auto variant="flat">
            Learn More
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center justify-self-center md:justify-self-end mt-8 md:mt-0 rounded-3xl h-full w-auto bg-gradient-to-br from-blue-500 to-fuchsia-500">
        <Image
          src="/img/hangout.svg"
          alt="hero"
          width={400}
          height={400}
          className="h-5/6 w-11/12"
        />
      </div>
      {/* <div className="rounded-full h-full w-full bg-orange-400"></div> */}
    </div>
  );
}
