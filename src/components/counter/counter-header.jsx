'use client';

import { Select, SelectItem, Button } from '@nextui-org/react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

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
    <div className="w-full mt-6 mb-4">
      <Popover placement="bottom" showArrow>
        <PopoverTrigger>
          <Button className="w-full">Navigate to year/ month</Button>
        </PopoverTrigger>

        <PopoverContent className="w-[240px] sm:w-[40rem] p-2">
          <form
            onSubmit={handleRedirectOnSubmit}
            className="flex flex-col sm:flex-row w-full items-center gap-4"
          >
            <Select
              size="xm"
              placeholder="Select a month"
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
              placeholder="Select a year"
              className="max-w-xs"
              size="xm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {[...Array(10)].map((_, i) => {
                const year = 2022 + i;
                return <SelectItem key={year}>{year.toString()}</SelectItem>;
              })}
            </Select>

            <Button
              color="primary"
              variant="flat"
              size="sm"
              onClick={handleRedirectOnSubmit}
            >
              Go
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
export default CounterHeader;
