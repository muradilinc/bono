export interface IForms {
  name: string;
  tel: string;
  timeA: string;
  time: string;
  guests: string;
  comments: string;
}
export interface IModal {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
