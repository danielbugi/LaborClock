const calculateTotals = (from, to, isHoliday, perHour) => {
  const [fromHours, fromMinutes] = from.split(':').map(Number);
  const [toHours, toMinutes] = to.split(':').map(Number);

  const totalTime = Math.abs(
    fromHours - toHours + (fromMinutes - toMinutes) / 60
  );

  const totalSalary = isHoliday
    ? Math.abs(totalTime * perHour * 1.5)
    : Math.abs(totalTime * perHour);

  return { totalTime, totalSalary };
};

export default calculateTotals;
