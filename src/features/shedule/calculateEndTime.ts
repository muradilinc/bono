// Функция для вычисления end_time
export const calculateEndTime = (startTime: string, timeStamp: string) => {
  let endTime = parseInt(startTime) + parseInt(timeStamp);
  if (endTime >= 24) {
    endTime = endTime % 24; // Сбрасывает часы на 0, если они превышают 23
  }
  return endTime.toString().padStart(2, '0') + ':00'; // Форматирует время в виде "HH:00"
};
