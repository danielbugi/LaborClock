'use client';

import { useEffect } from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';

import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

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

  // console.log('selectedMonth', selectedMonth);

  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const yearRange = 10; // Number of years to display in the Select

  useEffect(() => {
    // Set the default year to the current year when the component mounts
    setSelectedYear(currentYear.toString());
  }, [currentYear, setSelectedYear]);

  const handleRedirectOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const targetPath = `/counter/${selectedYear}/${selectedMonth}`;
    if (targetPath !== router.asPath) {
      router.push(targetPath);
    }
  };

  const goToNextMonth = () => {
    setLoading(true);
    let nextMonth = parseInt(selectedMonth) + 1;
    let nextYear = parseInt(selectedYear);

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }

    setSelectedMonth(nextMonth.toString());
    setSelectedYear(nextYear.toString());

    const targetPath = `/counter/${nextYear}/${nextMonth}`;
    if (targetPath !== router.asPath) {
      router.push(targetPath);
    }
  };

  const goToPreviousMonth = () => {
    setLoading(true);
    let previousMonth = parseInt(selectedMonth) - 1;
    let previousYear = parseInt(selectedYear);

    if (previousMonth < 1) {
      previousMonth = 12;
      previousYear -= 1;
    }

    setSelectedMonth(previousMonth.toString());
    setSelectedYear(previousYear.toString());

    const targetPath = `/counter/${previousYear}/${previousMonth}`;
    if (targetPath !== router.asPath) {
      router.push(targetPath);
    }
  };

  return (
    <div className="w-full mt-6 mb-4">
      <Popover placement="bottom" showArrow>
        <div className="flex gap-2">
          <Button onClick={() => goToPreviousMonth()}>
            <IoIosArrowBack />
          </Button>
          <PopoverTrigger>
            <Button className="w-full">Navigate to year/ month</Button>
          </PopoverTrigger>
          <Button onClick={() => goToNextMonth()}>
            <IoIosArrowForward />
          </Button>
        </div>
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
                <SelectItem key={month} value={(index + 1).toString()}>
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
              {[...Array(yearRange)].map((_, i) => {
                const yearOption = currentYear - Math.floor(yearRange / 2) + i;
                return (
                  <SelectItem key={yearOption} value={yearOption.toString()}>
                    {yearOption.toString()}
                  </SelectItem>
                );
              })}
            </Select>

            <Button color="primary" variant="flat" size="sm" type="submit">
              Go
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CounterHeader;
