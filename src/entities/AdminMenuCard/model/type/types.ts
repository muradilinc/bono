import { MenuType } from '../../../../features/AdminFilterMenu/model/types/type';

export interface DataMenuCard {
  item: MenuType;
  onDelete: (id: number) => void;
}
