// import { useEffect, useRef, useState } from 'react';
// import { IAddModalHead } from '../types/Type';
// import AddModalAuto from './AddModalAuto';
// import AddTable from './AddTable';
// import AddFloor from './AddFloor';
//
// const AddModal = ({ addModal, setAddModal }: IAddModalHead) => {
//   const refModal = useRef<HTMLDivElement>(null);
//   const refBg = useRef<HTMLDivElement>(null);
//   const [modal, setModal] = useState<boolean>(false);
//   const [modal2, setModal2] = useState<boolean>(false);
//   const [modalTable, setModalTable] = useState<boolean>(false);
//   const [modalTable2, setModalTable2] = useState<boolean>(false);
//   const [modalFloor, setModalFloor] = useState<boolean>(false);
//   const [modalFloor2, setModalFloor2] = useState<boolean>(false);
//
//   const onClickClient = () => {
//     setModal(true);
//     setModal2(true);
//     setAddModal(true);
//   };
//
//   const onClickTable = () => {
//     setModalTable2(true);
//     setModalTable(true);
//   };
//
//   const onClickFloor = () => {
//     setModalFloor2(true);
//     setModalFloor(true);
//   };
//
//   const onClickBg = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === refBg.current) {
//       setAddModal(false);
//     }
//   };
//
//   useEffect(() => {
//     if (addModal) {
//       if (refModal.current && refBg.current) {
//         refModal.current.style.transform = 'translateX(0)';
//         refBg.current.style.display = 'block';
//       }
//     } else {
//       if (refModal.current && refBg.current) {
//         refModal.current.style.transform = 'translateX(-100%)';
//         refBg.current.style.display = 'none';
//       }
//     }
//   }, [addModal]);
//
//   return (
//     <>
//       {modal && (
//         <AddModalAuto
//           addModal2={modal2}
//           setAddModal2={setModal2}
//           refBg={refBg}
//         />
//       )}
//       {modalTable2 && (
//         <AddTable
//           modalTable={modalTable}
//           setModalTable={setModalTable}
//           refBg={refBg}
//         />
//       )}
//       {modalFloor2 && (
//         <AddFloor
//           modalTable={modalFloor}
//           setModalTable={setModalFloor}
//           refBg={refBg}
//         />
//       )}
//       {!modal && !modalTable2 && !modalFloor2 && (
//         <>
//           <div
//             ref={refModal}
//             className="fixed w-full h-full flex justify-center items-center rounded-[8px] z-[100]"
//           >
//             <div
//               ref={refBg}
//               onClick={onClickBg}
//               className="fixed bg-[#00000050] left-0 right-0 bottom-0 top-0 w-full z-[99]"
//             ></div>
//             <div className="w-[400px]  bg-black flex flex-col items-center rounded-[8px] z-[100]">
//               <div className="flex items-center justify-between py-[15px] px-[15px] w-[100%] rounded-[8px]">
//                 <h2 className="text-white text-[17px] font-bold">
//                   Выберите одну из них
//                 </h2>
//                 <span
//                   onClick={() => setAddModal(false)}
//                   className="text-white text-[20px] cursor-pointer"
//                 >
//                   &#x2715;
//                 </span>
//               </div>
//               <button
//                 onClick={onClickClient}
//                 className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] mt-[50px] mb-[10px] duration-300 hover:bg-[#6BC678]"
//               >
//                 Добавить клиента
//               </button>
//               <button
//                 onClick={onClickTable}
//                 className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 mb-[10px] hover:bg-[#6BC678]"
//               >
//                 Добавить стол
//               </button>
//               <button
//                 onClick={onClickFloor}
//                 className="bg-[#2B2B2B] text-white h-[50px] rounded-[4px] w-[80%] duration-300 mb-[10px] hover:bg-[#6BC678]"
//               >
//                 Добавить этаж
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };
//
// export default AddModal;
