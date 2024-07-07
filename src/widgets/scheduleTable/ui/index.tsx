import { AdminHeader } from '../../AdminHeader';
import Calendar from './Calendar';

const ScheduleTable = () => {
  return (
    <div className="flex flex-col w-[98vw]">
      <AdminHeader />
      <Calendar />
    </div>
  );
};

export default ScheduleTable;
