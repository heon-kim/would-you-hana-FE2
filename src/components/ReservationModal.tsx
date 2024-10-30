import React from 'react';
import { Modal } from 'antd';

interface ReservationModalProps {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({isOpen, onOk, onCancel}) => {
    return (
        <Modal title="Reservation" open={isOpen} onOk={onOk} onCancel={onCancel} bodyStyle={{ maxHeight: '400px', overflowY: 'auto'}} className='scrollbar-thumb-rounded'>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      );
};

export default ReservationModal;
