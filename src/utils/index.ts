//Compute vote percentage
export const calcPercentage = (total: number, quantity: number): number => {
  const percentage = (quantity / total) * 100;
  if (Number.isInteger(percentage)) {
    return percentage;
  }
  return Number.parseFloat(percentage.toFixed(1));
};
