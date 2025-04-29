import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import AccountService from '../../../services/AccountService';

const AddEditUser = ({
	showAddEditModal,
	setShowAddEditModal,
	account,
	getAllAccount,
	lecturers,
	getAllLecturers,
}) => {
	const initNewUser = {
		id: '',
		username: '',
		password: '',
		hoTen: '',
		email: '',
		soDienThoai: '',
		ngaySinh: '',
		vaiTro: 'GIANG_VIEN',
		trangThai: true,
		maGv: '',
	};

	const [newUser, setNewUser] = useState(initNewUser);

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (account) {
			setNewUser({ ...initNewUser, ...account, maGv: account.giangvien.id });
		} else {
			setNewUser(initNewUser);
		}
	}, [account]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (!value || value === '') return;

		if (name == 'maGv') {
			const lecturer = lecturers.find((lec) => +lec.id === +value);
			setNewUser((prev) => ({
				...prev,
				username: lecturer.maGv,
				hoTen: lecturer.hoTen,
			}));
		}

		if (name == 'ngaySinh') {
			const pw = value.split('-').join('');
			setNewUser((prev) => ({
				...prev,
				password: pw,
			}));
		}

		setNewUser((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async () => {
		let res;
		if (account) {
			res = await AccountService.updateAccount(newUser);
		} else {
			res = await AccountService.createAccount(newUser);
		}

		if (res.success) {
			toast.success(
				account
					? 'Cập nhật người dùng thành công!'
					: 'Thêm người dùng thành công!'
			);
			setShowAddEditModal(false);
			setNewUser(initNewUser);
			getAllAccount?.(); // callback reload danh sách nếu cần
			getAllLecturers?.();
		} else {
			console.error(res.error);
			toast.error(account ? 'Cập nhật thất bại.' : 'Thêm người dùng thất bại.');
		}
	};

	return (
		<Modal
			show={showAddEditModal}
			onHide={() => setShowAddEditModal(false)}
			centered
			size='lg'
		>
			<Modal.Header closeButton>
				<Modal.Title>{account ? 'Chỉnh sửa' : 'Thêm'} người dùng</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6'>
							<div className='form-group mb-2'>
								<label>Username</label>
								<input
									disabled
									name='username'
									value={newUser.username}
									className='form-control'
								/>
							</div>
							{!account && (
								<div className='form-group mb-2'>
									<label>Password</label>
									<div className='input-group'>
										<input
											name='password'
											type={showPassword ? 'text' : 'password'}
											value={newUser.password}
											className='form-control'
											disabled
										/>
										<button
											type='button'
											className='btn btn-outline-secondary'
											onClick={() => setShowPassword(!showPassword)}
											tabIndex={-1}
										>
											{showPassword ? 'Ẩn' : 'Hiện'}
										</button>
									</div>
								</div>
							)}
							<div className='form-group mb-2'>
								<label>Fullname</label>
								<input
									name='hoTen'
									value={newUser.hoTen}
									className='form-control'
									disabled
								/>
							</div>
							<div className='form-group mb-2'>
								<label>Email</label>
								<input
									name='email'
									type='email'
									value={newUser.email}
									className='form-control'
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className='col-md-6'>
							<div className='form-group mb-2'>
								<label>Phone</label>
								<input
									name='soDienThoai'
									value={newUser.soDienThoai}
									className='form-control'
									onChange={handleChange}
								/>
							</div>
							<div className='form-group mb-2'>
								<label>Ngày sinh</label>
								<input
									name='ngaySinh'
									type='date'
									value={newUser.ngaySinh}
									className='form-control'
									onChange={handleChange}
								/>
							</div>
							<div className='form-group mb-2'>
								<label>Vai trò</label>
								<select
									name='vaiTro'
									className='form-select'
									onChange={handleChange}
									value={newUser.vaiTro}
								>
									<option value='ADMIN'>Admin</option>
									<option value='GIANG_VIEN'>Giảng viên</option>
								</select>
							</div>
							<div className='form-group mb-2'>
								<label>Giảng viên </label>
								<select
									name='maGv'
									className='form-select'
									onChange={!account ? handleChange : null}
									value={newUser.maGv}
									disabled={!!account}
								>
									<option value=''>-- Chọn giảng viên --</option>
									{lecturers
										.filter((lec) => lec.maGv !== 'ADMIN' && !lec.hasAccount)
										.map((lec, idx) => (
											<option
												key={idx}
												value={lec.id}
											>{`${lec.id} - ${lec.hoTen}`}</option>
										))}
								</select>
							</div>
							<div className='form-check mt-3'>
								<input
									type='checkbox'
									name='trangThai'
									className='form-check-input'
									checked={newUser.trangThai}
									onChange={handleChange}
								/>
								<label className='form-check-label'>Đang hoạt động</label>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant='secondary' onClick={() => setShowAddEditModal(false)}>
					Hủy
				</Button>
				<Button variant='success' onClick={handleSubmit}>
					{account ? 'Cập nhật' : 'Thêm mới'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddEditUser;
