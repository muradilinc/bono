// Функция для вычисления end_time
export const calculateEndTime = (startTime: string, timeStamp: string) => {
  let endTime = parseInt(startTime) + parseInt(timeStamp);
  if (endTime >= 24) {
    endTime = endTime % 24; // Сбрасывает часы на 0, если они превышают 23
  }
  return endTime.toString().padStart(2, '0') + ':00'; // Форматирует время в виде "HH:00"
};

// Функция для вычисления end_time
export const calculateEndTime2 = (startTime: string, timeStamp: string) => {
  const startHour = parseInt(startTime.split(':')[0], 10);
  const timeStampHours = parseInt(timeStamp, 10);
  let endHour = startHour + timeStampHours;

  if (endHour >= 24) {
    endHour = endHour % 24; // Сбрасывает часы на 0, если они превышают 23
  }

  return endHour.toString().padStart(2, '0') + ':00:00'; // Форматирует время в виде "HH:00:00"
};
