export interface ButtonStatus {
  status: number;
  title: string;
}

export const btns: ButtonStatus[] = [
  {
    status: 9,
    title: 'Все',
  },
  {
    status: 0,
    title: 'Забронировано',
  },
  {
    status: 1,
    title: 'Занят',
  },
];
