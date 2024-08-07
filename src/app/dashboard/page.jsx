'use client';

import { useLaborContext } from '@/context/labor-context';
import Link from 'next/link';

function DashboardPage() {
  const { selectedMonth, selectedYear } = useLaborContext();
  return (
    <div className="flex flex-col justify-between w-full rounded-xl mt-6 h-48 backdrop-blur-md bg-white/50 border-slate-300 p-11">
      <div>
        <h1>Welcome to dashboard</h1>
        <p>Coming soon...</p>
      </div>
      <Link
        href={`/counter/${selectedYear}/${selectedMonth}`}
        className="text-blue-600"
      >
        Go to counter page
      </Link>
    </div>
  );
}
export default DashboardPage;
