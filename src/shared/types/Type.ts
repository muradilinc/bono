import React from 'react';

export interface FormComeMutation {
  user_name: string;
  phone_number: string;
  will_come: string;
  amount_guest: string;
  start_time: string;
  time_stamp: string;
  comment: string;
  table?: string;
}

export interface FormTable {
  table: string;
  floor: string;
}
export interface FormFloor {
  title: string;
}
export interface IFormsAuto {
  name: string;
  tel: string;
  timeA: string;
  time: string;
  guests: string;
  comments: string;
  table: string;
}
export interface IModal {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
export interface IModalTable {
  modalTable: boolean;
  setModalTable: (modal: boolean) => void;
  refBg: React.RefObject<HTMLDivElement>;
}
export interface IModal2 {
  modal2: boolean;
  setModal2: (modal: boolean) => void;
}
export interface IAddModalHead {
  addModal: boolean;
  setAddModal: (value: boolean) => void;
}
export interface IAddModal {
  addModal: boolean;
  setAddModal: (value: boolean) => void;
  onDelete: () => void;
}
export interface IAddModal2 {
  addModal2: boolean;
  setAddModal2: React.Dispatch<React.SetStateAction<boolean>>;
  refBg: React.RefObject<HTMLDivElement>;
}

export interface IPopUp {
  popUp: boolean;
  setPopUp: (popUp: boolean) => void;
  propText: string;
}
export interface INameManager {
  nameManager: string;
}

export interface AdminSlideType {
  id: number;
  name: string;
  image?: string;
  created_at?: string;
}

export interface AdminSliderProps {
  items: AdminSlideType[];
  onCategoryChange: (id: number) => void;
}

export interface IconButtonProps {
  text: string;
  iconUrl: string;
  onClick: () => void;
}
