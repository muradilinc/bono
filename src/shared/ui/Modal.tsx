import React from 'react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({ show, title, children, onClose }) => {
  // const onInnerClick = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  // };

  return (
    <>
      <div
        className="w-[400px] bg-black flex flex-col items-center rounded-[8px] z-[100]"
        style={{ display: show ? 'block' : 'none' }}
        onClick={onClose}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
