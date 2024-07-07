// Функция для вычисления end_time
export const calculateEndTime = (startTime: string, timeStamp: string) => {
  const endTime = parseInt(startTime) + parseInt(timeStamp);
  return endTime.toString().padStart(2, '0') + ':00'; // Форматирует время в виде "HH:00"
};
