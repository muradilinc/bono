import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface PropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentDate: any;
  currentDate: Date | null;
  setCalendar: (value: boolean) => void;
}

const AdminCalendar: FC<PropsType> = ({
  setCurrentDate,
  currentDate,
  setCalendar,
}) => {
  return (
    <div className="p-4 absolute top-14 left-0 z-30">
      <Calendar
        className="bg-[#2B2B2B] text-white"
        onChange={setCurrentDate}
        value={currentDate}
        onClickDay={() => setCalendar(false)}
      />
    </div>
  );
};

export default AdminCalendar;
