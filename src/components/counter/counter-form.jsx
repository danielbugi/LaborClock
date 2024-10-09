'use client';

import { CiCirclePlus } from 'react-icons/ci';

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Checkbox,
  Textarea,
} from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useLaborContext } from '@/context/labor-context';

function CounterForm() {
  const { selectedMonth, selectedYear, setLoading } = useLaborContext();
  const [laborData, setLaborData] = useState({
    day: '',
    userId: '',
    perHour: '',
    from: '',
    to: '',
    note: '',
  });
  const [isHoliday, setIsHoliday] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setLaborData((prev) => ({
      ...prev,
      userId: session.data?.user?.id,
      perHour: session.data?.user?.perHour,
    }));
  }, [session.data]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setError(false);
        setMessage(null);
      }, 5000);
    }
  }, [message, error]);

  const handleInputs = (e) => {
    setLaborData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const sendNewData = async (newData) => {
    try {
      const res = await fetch('/api/labor-day', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Labor day added successfully');
        setLaborData({
          day: '',
          from: '',
          to: '',
          note: '',
        });
        setIsHoliday(false);
        if (router.asPath) {
          router.replace(router.asPath); // Or use window.location.reload()
        } else {
          window.location.reload();
        }
        setLoading(false);
      } else {
        console.error('Failed to add labor day:', result.message);
        setError(true);
        setLoading(false);
        setMessage('Failed to add labor day');
      }
    } catch (error) {
      console.error('Error adding labor day:', error);
      setMessage('Error adding labor day');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setMessage(null);

    e.preventDefault();
    const newLaborData = {
      ...laborData,
      month: selectedMonth,
      year: selectedYear,
      isHoliday,
    };

    console.log(newLaborData);

    if (!laborData.day || !laborData.from || !laborData.to) {
      setError(true);
      setMessage('Please fill all the fields');
      return;
    }

    setLoading(true);

    await sendNewData(newLaborData);
  };

  return (
    <Popover placement="right-end">
      <PopoverTrigger>
        <Button
          auto
          color="primary"
          className="fixed bottom-5 right-5 sn:bottom-32 sm:right-32 w-20 h-20 rounded-full"
        >
          <CiCirclePlus className="text-white text-7xl cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="backdrop-blur-md bg-white/30">
        <form className="flex flex-col gap-4 p-4 " onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Enter the day"
            type="number"
            id="day"
            value={laborData.day}
            onChange={(e) => handleInputs(e)}
          />
          <Input
            isRequired
            label="From: "
            type="time"
            id="from"
            value={laborData.from}
            onChange={(e) => handleInputs(e)}
          />
          <Input
            isRequired
            label="To: "
            type="time"
            id="to"
            value={laborData.to}
            onChange={(e) => handleInputs(e)}
          />
          <Checkbox isSelected={isHoliday} onValueChange={setIsHoliday}>
            Is it a holiday?
          </Checkbox>
          <Textarea
            label="Note: "
            labelPlacement="outside"
            className="max-w-xs"
            id="note"
            value={laborData.note}
            onChange={(e) => handleInputs(e)}
          />
          {message && (
            <p className={error ? 'text-red-500' : 'text-green-500'}>
              {message}
            </p>
          )}

          <Button auto color="primary" type="submit">
            Add
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
export default CounterForm;
