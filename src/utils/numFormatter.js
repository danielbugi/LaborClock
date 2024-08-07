export const formatNumbers = (num) => {
  const formatted = num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatted;
};
