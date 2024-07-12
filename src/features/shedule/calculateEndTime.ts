// Функция для вычисления end_time
export const calculateEndTime = (startTime: string, timeStamp: string) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [timeStampHour, timeStampMinute] = timeStamp.split(':').map(Number);

  let endHour = startHour + timeStampHour;
  let endMinute = startMinute + timeStampMinute;

  if (endMinute >= 60) {
    endHour += Math.floor(endMinute / 60);
    endMinute = endMinute % 60;
  }

  if (endHour >= 24) {
    endHour = endHour % 24;
  }

  return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
};
