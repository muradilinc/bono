import { Schedule } from '../../shedule/model/scheduleSlice';
import { Floor } from '../../floors/model/floors';

interface Table {
  id: number;
  number_table: number;
}
interface TableUpdateProps {
  id: number;
  number_table: number;
  floor: number;
}

interface TableAll {
  id: number;
  number_table: number;
  occupated: boolean;
  floor: Floor;
  books: Schedule[];
}
