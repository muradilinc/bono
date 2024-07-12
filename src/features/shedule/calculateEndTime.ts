export const calculateEndTime = (startTime: string, timeStamp: number) => {
  // Разделяем входное время на часы и минуты
  const [startHourStr, startMinuteStr] = startTime.split(':');

  // Преобразуем строки в числа
  const startHour = parseInt(startHourStr, 10);
  const startMinute = parseInt(startMinuteStr, 10);

  // Преобразуем timestamp в часы и минуты
  const timeStampHour = Math.floor(timeStamp);
  const timeStampMinute = Math.round((timeStamp - timeStampHour) * 60);

  // Проверяем, что все преобразования прошли успешно
  if (isNaN(startHour) || isNaN(startMinute)) {
    throw new Error('Invalid start time format');
  }

  // Считаем конечное время
  let endHour = startHour + timeStampHour;
  let endMinute = startMinute + timeStampMinute;

  // Обрабатываем минуты, если их больше 60
  if (endMinute >= 60) {
    endHour += Math.floor(endMinute / 60);
    endMinute = endMinute % 60;
  }

  // Обрабатываем часы, если их больше 24
  if (endHour >= 24) {
    endHour = endHour % 24;
  }

  // Возвращаем время в формате "HH:MM"
  return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
};
