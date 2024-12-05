import React from 'react';
import { Modal } from 'react-bootstrap';

interface IEurekaModals {
  id?: string;
  manejador: {
    show: boolean;
    id?: number;
    accion?: string;
  };
  children: React.ReactNode;
  modalTitulo: string;
  sizeModal?: 'lg' | 'sm' | 'xl' | undefined;
  handleClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalDinamico: React.FC<IEurekaModals> = ({ manejador, children, modalTitulo, sizeModal, handleClose }) => {
  return (
    <>
      <Modal size={sizeModal} className={manejador.show ? ' modal-dinamico' : 'hide'} show={manejador.show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pt-0'>{children}</Modal.Body>
      </Modal>
    </>
  );
};
export default ModalDinamico;

