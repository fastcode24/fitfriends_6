export const handleNext = (currentIndex: number, totalItems: number, step: number): number => {
  return (currentIndex + step) < totalItems ? currentIndex + step : currentIndex;
};

export const handlePrevious = (currentIndex: number, step: number): number => {
  return currentIndex - step >= 0 ? currentIndex - step : currentIndex;
};
