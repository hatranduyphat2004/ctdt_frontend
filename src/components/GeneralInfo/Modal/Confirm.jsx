import React from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

const Confirm = ({ showConfirm, handleCloseConfirm, id }) => {
	const handleConfirm = async () => {
		toast.success('xoá thành công');
		handleCloseConfirm();
	};

	return (
		<>
			<Modal show={showConfirm} onHide={handleCloseConfirm} centered>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận xoá</Modal.Title>
				</Modal.Header>
				<Modal.Body>Bạn có chắc chắn muốn xoá id= {id} không?</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseConfirm}>
						Hủy
					</Button>
					<Button variant='danger' onClick={handleConfirm}>
						Xác nhận
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Confirm;
