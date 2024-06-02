// import { AdminHeader } from '../../AdminHeader';
import Calendar from './Calendar';

const ScheduleTable = () => {
  const mockSlots = [
    { startTime: '10:00', endTime: '12:00', table: 1, occupied: true },
    { startTime: '15:30', endTime: '18:00', table: 1, occupied: true },
    { startTime: '10:30', endTime: '12:30', table: 2, occupied: false },
    { startTime: '11:00', endTime: '13:00', table: 3, occupied: true },
    { startTime: '11:30', endTime: '12:30', table: 4, occupied: false },
    { startTime: '12:00', endTime: '14:00', table: 5, occupied: true },
    { startTime: '12:30', endTime: '14:30', table: 6, occupied: false },
    { startTime: '13:00', endTime: '15:00', table: 7, occupied: true },
    { startTime: '13:30', endTime: '15:30', table: 8, occupied: false },
    { startTime: '14:00', endTime: '16:00', table: 9, occupied: true },
    { startTime: '14:30', endTime: '16:30', table: 10, occupied: false },
    { startTime: '15:00', endTime: '17:00', table: 11, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 11, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 12, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 13, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 14, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 15, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 17, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 18, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 19, occupied: true },
    { startTime: '14:00', endTime: '15:00', table: 20, occupied: true },
  ];

  return (
    <div className="flex flex-col">
      {/*<AdminHeader />*/}
      <Calendar slots={mockSlots} />
    </div>
  );
};

export default ScheduleTable;
