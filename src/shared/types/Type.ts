import React from 'react';

export interface IForms {
  name: string;
  tel: string;
  timeA: string;
  time: string;
  guests: string;
  comments: string;
}
export interface IFormsTable {
  table: string;
  floor: string;
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
