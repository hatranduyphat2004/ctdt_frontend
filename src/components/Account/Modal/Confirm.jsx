import React from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import AuthService from '../../../services/AuthService';
import AccountService from '../../../services/AccountService';

const Confirm = ({
	setShowConfirm,
	showConfirm,
	type,
	accountId,
	accountUsername,
	getAllAccount,
}) => {
	const ACTIONS = {
		reset: 'cấp lại mật khẩu',
		delete: 'xoá tài khoản',
	};

	const handleConfirm = async () => {
		try {
			if (type === 'reset') {
				const res = await AuthService.resetPassword(accountUsername);
				if (res.success) {
					toast.success('Đã cấp lại mật khẩu thành công.');
				} else {
					toast.error('Cấp lại mật khẩu thất bại.');
					console.log('Reset password: ', res.error);
				}
			} else {
				const res = await AccountService.deleteAccount(accountId);
				if (res.success) {
					toast.success('Đã xoá tài khoản thành công.');
					getAllAccount?.(); // Gọi nếu hàm tồn tại
				} else {
					toast.error('Xoá tài khoản thất bại.');
					console.log('Delete account: ', res.error);
				}
			}
		} catch (error) {
			console.error('Lỗi xử lý hành động:', error);
			toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
		} finally {
			setShowConfirm(false);
		}
	};

	return (
		<>
			<Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận {ACTIONS[type]}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có chắc chắn muốn {ACTIONS[type]} cho tài khoản{' '}
					<strong>{accountUsername}</strong> không?
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={() => setShowConfirm(false)}>
						Hủy
					</Button>
					<Button
						variant={type === 'reset' ? 'primary' : 'danger'}
						onClick={handleConfirm}
					>
						Xác nhận
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Confirm;
