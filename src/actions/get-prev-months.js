import dbConnect from '@/utils/db';
import Labor from '@/models/laborModel';
import { monthParser } from '@/utils/monthParser';

export const getDashboardData = async (userId) => {
  'use server';

  // console.log('Fetching dashboard data...', userId);

  await dbConnect();

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const getPreviousMonths = (month, year) => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      months.push({ month, year });
      month--;
      if (month === 0) {
        month = 12;
        year--;
      }
    }

    const parsedMonths = months.map(({ month, year }) => ({
      month: monthParser(month),
      year,
    }));

    return parsedMonths;
  };

  const previousMonths = getPreviousMonths(currentMonth, currentYear);

  try {
    const query = {
      $and: [
        { userId: userId },
        { $or: previousMonths.map(({ month, year }) => ({ month, year })) },
      ],
    };

    const labors = await Labor.find(query).lean();

    const monthlyDataArray = previousMonths.map(({ month, year }) => {
      const records = labors.filter(
        (item) => item.month === month && item.year === year
      );
      return {
        month,
        year,
        records,
      };
    });

    return monthlyDataArray;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
};
