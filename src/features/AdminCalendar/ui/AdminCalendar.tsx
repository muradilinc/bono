import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface PropsType {
  setCurrentDate: any;
  currentDate: Date | null;
  setCalendar: (value: boolean) => void;
}

const AdminCalendar: FC<PropsType> = ({
  setCurrentDate,
  currentDate,
  setCalendar,
}) => {
  console.log(currentDate);

  return (
    <div className="p-4 absolute top-14 left-0 z-30">
      <Calendar
        onChange={setCurrentDate}
        value={currentDate}
        onClickDay={() => setCalendar(false)}
      />
    </div>
  );
};

export default AdminCalendar;
