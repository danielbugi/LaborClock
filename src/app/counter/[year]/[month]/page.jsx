'use client';

import CounterData from '@/components/counter/counter-data';
import CounterForm from '@/components/counter/counter-form';
import CounterHeader from '@/components/counter/counter-header';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLaborContext } from '@/context/labor-context';
import Totals from '@/components/counter/totals';
import { convertMonthNumberToString, months } from '@/utils/months';
import { useUserContext } from '@/context/user-context';

function MonthPage() {
  const [monthData, setMonthData] = useState(null);
  const { loading, setLoading } = useLaborContext();

  const { year, month } = useParams();

  const { userInfo: session } = useUserContext();

  const monthName = convertMonthNumberToString(month);

  async function getMonthData(userId) {
    try {
      const res = await fetch(
        `/api/labor-day?month=${monthName}&year=${year}&userId=${userId}`
      );

      if (res.ok) {
        const data = await res.json();
        // console.log('data', data);
        return data.data;
      } else {
        console.error('Failed to fetch month data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching month data:', error);
      return [];
    }
  }

  useEffect(() => {
    setLoading(true);

    if (!session || !month || !year) return;

    getMonthData(session.id).then((data) => {
      setMonthData(data);
      setLoading(false);
    });
  }, [year, month, session, setLoading]);

  if (!session) {
    return (
      <div className="container backdrop-blur-md bg-white/50 border-slate-300 mt-6 p-4 rounded-xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-3 min-h-[100vh] mx-auto mb-10">
      <CounterHeader year={year} />

      {!monthData || loading ? (
        <div className="container backdrop-blur-md bg-white/50 border-slate-300 mt-6 p-4 rounded-xl">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <CounterData
            monthData={monthData}
            year={year}
            month={monthName}
            session={session}
          />
          <Totals monthData={monthData} />
        </>
      )}

      <CounterForm userInfo={session} />
    </div>
  );
}
export default MonthPage;
