export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function convertMonthNumberToString(monthNumber) {
  // Ensure the month number is within valid range (1-12)
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error(
      'Invalid month number. Please provide a number between 1 and 12.'
    );
  }

  // Subtract 1 from the month number since array indices start at 0
  return months[monthNumber - 1];
}
