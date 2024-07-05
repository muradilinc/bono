import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface PropsType {
  setCurrentDate: (date: Value) => void;
  currentDate: Value;
  setCalendar: (value: boolean) => void;
  setFilterDate: (date: Value) => void;
}

const AdminCalendar: FC<PropsType> = ({
  setCurrentDate,
  currentDate,
  setCalendar,
  setFilterDate,
}) => {
  const changeDate = (value: Value) => {
    setCurrentDate(value);
    setFilterDate(value);
  };
  return (
    <div className="p-4 absolute top-14 left-0 z-30">
      <Calendar
        className="bg-[#2B2B2B] text-white"
        onChange={changeDate}
        value={currentDate}
        onClickDay={() => setCalendar(false)}
      />
    </div>
  );
};

export default AdminCalendar;
