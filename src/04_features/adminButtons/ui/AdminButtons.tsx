import { Status } from '@/05_entities/product/model/types';
import { Button } from '@/06_shared/ui/Button/Button';
import css from './AdminButtons.module.css'
import { useApproveProductMutation, useRejectProductMutation } from '@/06_shared/api/api';
import { useModal } from '@/06_shared/lib/useModal';
import { Modal } from '@/06_shared/ui/Modal/Modal';
import { Input } from '@/06_shared/ui/Input/Input';
import { useState } from 'react';

type Props = {
  status: Status;
  productId: number;
}

export const AdminButtons = ({status, productId} : Props) => {
  const [approveProduct, { isLoading: isApproving }] = useApproveProductMutation();
  const [rejectProduct, { isLoading: isRejecting }] = useRejectProductMutation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = async () => {
    await approveProduct(productId);
  };

  const handleReject = async () => {
    if (rejectionReason.trim()) {
      await rejectProduct({ id: productId, reason: rejectionReason });
      closeModal();
    }
  };

  const openRejectModal = () => {
    setRejectionReason('');
    openModal(
      (
        <div>
          <h3>Укажите причину отклонения</h3>
          <Input 
            value={rejectionReason} 
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Причина отклонения"
          />
        </div>
      ),
      'error',
      'Отклонить'
    );
  };
  
  return (
    <>  
      {status === Status.ON_MODERATION && (
        <div className={css.container}>
          <Button onClick={handleApprove} isLoading={isApproving}>Опубликовать</Button>
          <Button onClick={openRejectModal} isLoading={isRejecting}>Отправить на изменения</Button>
        </div>
      )}
       {isModalOpen && (
        <Modal 
          type={'error'}
          onClose={handleReject}
          buttonText={'Отклонить'}
        >
          <h3>Укажите причину отклонения</h3>
          <Input 
            value={rejectionReason} 
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Причина отклонения"
            inputStyle='description'
          />
        </Modal>
      )}
    </>
  )
}