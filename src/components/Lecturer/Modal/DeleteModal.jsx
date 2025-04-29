import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../../api/axiosConfig';
const DeleteModal = ({
	showConfirm,
	setShowConfirm,
	selectedLecturer,
	getAllLecturers,
}) => {
	const confirmDelete = async () => {
		try {
			const res = await api.delete(`/giangvien/${selectedLecturer.id}`);
			if (res.status === 200) {
				toast.success(res.data.message || 'Xóa giảng viên thành công');
				await getAllLecturers();
			} else {
				toast.error(res.data.message || 'Xóa giảng viên thất bại');
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Xóa giảng viên thất bại');
			console.error('Lỗi khi xóa giảng viên:', error);
		}
		setShowConfirm(false);
	};

	return (
		<div>
			<Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận xóa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có chắc chắn muốn xóa giảng viên{' '}
					{selectedLecturer?.hoTen ?? 'này'} không?
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShowConfirm(false)}>
						Hủy
					</Button>
					<Button variant='danger' onClick={confirmDelete}>
						Xóa
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default DeleteModal;
