'use client';

import { Select, SelectItem, Button } from '@nextui-org/react';

import { useLaborContext } from '@/context/labor-context';
import { useRouter } from 'next/navigation';

import { months } from '@/utils/months';

function CounterHeader() {
  const {
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    setLoading,
  } = useLaborContext();

  const router = useRouter();

  const handleRedirectOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const targetPath = `/counter/${selectedYear}/${selectedMonth}`;
    if (targetPath !== router.asPath) {
      router.push(targetPath);
    }
    return;
  };

  return (
    <div className="container flex flex-col gap-4 rounded-xl mt-6 mb-4 backdrop-blur-md bg-sky-100/50 p-4 border border-slate-300">
      <h1 className="text-xl font-bold text-start">Navigate to year/ month</h1>
      <form
        onSubmit={handleRedirectOnSubmit}
        className="flex items-center gap-4"
      >
        <Select
          size="sm"
          label="Select a month"
          className="max-w-xs"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, index) => (
            <SelectItem key={month} value={index + 1}>
              {month}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Select a year"
          className="max-w-xs"
          size="sm"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {[...Array(10)].map((_, i) => {
            const year = 2022 + i;
            return <SelectItem key={year}>{year.toString()}</SelectItem>;
          })}
        </Select>

        <Button color="primary" variant="flat" onClick={handleRedirectOnSubmit}>
          Go
        </Button>
      </form>
    </div>
  );
}
export default CounterHeader;
