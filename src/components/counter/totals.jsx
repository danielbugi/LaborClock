import { formatNumbers } from '@/utils/numFormatter';
import { Divider } from '@nextui-org/react';

function Totals({ monthData }) {
  let totalHours = 0;
  let totalSalary = 0;

  monthData.forEach((data) => {
    totalHours += data.totalTime;
    totalSalary += data.totalSalary;
  });

  return (
    <div className="text-md sm:text-md w-fit mt-6 bg-slate-200/20 p-4 pr-20 sm:pr-60 rounded-xl border border-slate-300">
      <p className="font-bold">
        Total working days: <span>{monthData.length}</span>
      </p>
      <Divider className="my-4" />
      <p className="font-bold">
        Total hours: <span>{totalHours.toFixed(2)}</span>
      </p>
      <Divider className="my-4" />
      <p className="font-bold">
        Total salary: <span>{formatNumbers(totalSalary)}</span>
      </p>
    </div>
  );
}
export default Totals;
