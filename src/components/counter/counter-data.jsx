'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';

import ActionButtons from './action-buttons';
import React from 'react';

function CounterData({ monthData, year, month, session }) {
  // console.log('monthData', monthData);

  return (
    <div className="w-full flex flex-col gap-4 mt-6 py-4 px-0 sm:p-4 rounded-xl border backdrop-blur-md bg-white/50 border-slate-300">
      <h1 className="text-md sm:text-lg font-bold text-start  pl-2 sm:pl-0">
        Working days for - {year} \ {month}
      </h1>

      {monthData.length === 0 ? (
        <div className="flex justify-start bg-transparent rounded-xl mb-6">
          <p className="text-gray-100 text-lg">
            No working days for that month...
          </p>
        </div>
      ) : (
        <>
          <div className=" pt-4 pb-12 px-0 sm:px-2 rounded-lg ">
            <ul className="flex w-full justify-between py-2 px-2 sm:px-12 mr-24 rounded-lg uppercase font-bold text-xs sm:text-[12px] ">
              <li>date</li>
              <li>Entry</li>
              <li>Exit</li>
              <li>Hours</li>
              <li>Salary</li>
              <li></li>
            </ul>
            <Accordion variant="splitted">
              {monthData.map((day) => (
                <AccordionItem
                  key={day._id}
                  aria-label="Accordion 1"
                  title={
                    <div className="flex w-full justify-between  text-xs sm:text-[14px]">
                      <p className="flex-1  text-start">{day.day}</p>
                      <p className="flex-1 text-start">{day.from}</p>
                      <p className="flex-1 text-start">{day.to}</p>
                      <p className="flex-1 text-center sm:text-start">
                        {day.totalTime.toFixed(2)}
                      </p>
                      <p className="flex-1 font-bold text-center sm:text-start">
                        {day.totalSalary.toFixed(2)}
                      </p>
                    </div>
                  }
                >
                  <ActionButtons postData={day} session={session} />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </>
      )}
    </div>
  );
}
export default CounterData;
