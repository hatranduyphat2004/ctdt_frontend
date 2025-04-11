import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';

const Profile = () => {
	const user = useSelector((state) => state.auth.user);
	const initFormData = {
		id: user?.id || '',
		name: user?.name || '',
		birthDate: user?.birthDate || '',
		email: user?.email || '',
		phone: user?.phone || '',
		qualification: user?.qualification || '',
		status: user?.status || '',
	};
	// Khởi tạo state form theo dữ liệu user
	const [formData, setFormData] = useState(initFormData);

	const [isEditing, setIsEditing] = useState(false);
	const [originalData, setOriginalData] = useState(initFormData); // để lưu lại khi bấm Cancel

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleEdit = () => {
		setOriginalData(initFormData); // Lưu lại dữ liệu cũ
		setIsEditing(true);
	};
	const handleReset = () => {
		setFormData(originalData);
	};

	const handleCancel = () => {
		setFormData(originalData); // Quay về dữ liệu ban đầu
		setIsEditing(false);
	};

	const handleSave = () => {
		// TODO: dispatch API update profile
		console.log('Cập nhật thông tin:', formData);
		setIsEditing(false);
	};

	return (
		<div>
			<h3>Thông tin cá nhân</h3>
			<Form>
				<Row>
					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label>Mã cán bộ</Form.Label>
							<Form.Control
								type='text'
								name='id'
								value={formData.id}
								disabled
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Họ tên</Form.Label>
							<Form.Control
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Ngày sinh</Form.Label>
							<Form.Control
								type='date'
								name='birthDate'
								value={formData.birthDate}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group>
					</Col>

					<Col md={6}>
						<Form.Group className='mb-3'>
							<Form.Label>Số điện thoại</Form.Label>
							<Form.Control
								type='text'
								value={formData.phone}
								onChange={(e) => {
									// Loại bỏ ký tự không phải là số và giới hạn độ dài là 10
									const onlyNums = e.target.value
										.replace(/\D/g, '')
										.slice(0, 10);
									setFormData({ ...formData, phone: onlyNums });
								}}
								disabled={!isEditing}
								placeholder='Nhập số điện thoại'
								maxLength={10} // Giới hạn độ dài nhập vào là 10 ký tự
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Trình độ</Form.Label>
							<Form.Control
								type='text'
								name='qualification'
								value={formData.qualification}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Trạng thái</Form.Label>
							<Form.Select
								name='status'
								value={formData.status}
								onChange={handleChange}
								disabled={!isEditing}
							>
								<option value='active'>Đang hoạt động</option>
								<option value='inactive'>Ngừng hoạt động</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>

				{/* Nút chức năng */}
				<div className='mt-3'>
					{isEditing ? (
						<>
							<Button variant='success' onClick={handleSave} className='me-2'>
								Lưu
							</Button>
							<Button
								variant='secondary'
								onClick={handleCancel}
								className='me-2'
							>
								Hủy
							</Button>
							<Button variant='warning' onClick={handleReset}>
								Reset
							</Button>
						</>
					) : (
						<Button variant='primary' onClick={handleEdit}>
							Chỉnh sửa
						</Button>
					)}
				</div>
			</Form>
		</div>
	);
};

export default Profile;
