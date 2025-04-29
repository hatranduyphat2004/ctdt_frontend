import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { toast } from 'react-toastify';

// Danh sách cố định
const departments = [
	'Khoa Công nghệ Thông tin',
	'Khoa Giáo dục',
	'Khoa Giáo dục Chính trị',
	'Khoa Giáo dục Mầm non',
	'Khoa Giáo dục quốc phòng – An ninh – Giáo dục thể chất',
	'Khoa Giáo dục Tiểu học',
	'Khoa Khoa học Xã hội và Nghệ thuật',
	'Khoa Kỹ thuật và Công nghệ',
	'Khoa Luật',
	'Khoa Ngoại ngữ',
	'Khoa Quản trị Kinh doanh',
	'Khoa Sư phạm Khoa học Tự nhiên',
	'Khoa Tài chính – Kế toán',
	'Khoa Toán – Ứng dụng',
	'Khoa Văn hóa và Du lịch',
];

const degrees = [
	'Cử nhân',
	'Thạc sĩ',
	'Tiến sĩ',
	'Tiến sĩ khoa học',
	'PSG',
	'GS',
];

const Profile = () => {
	const user = useSelector((state) => state.auth.user);
	const giangvien = user?.giangvien ?? {};

	const initFormData = {
		boMon: giangvien.boMon ?? '',
		chuyenMon: giangvien.chuyenMon ?? '',
		hoTen: giangvien.hoTen ?? '',
		id: giangvien.id ?? '',
		khoa: giangvien.khoa ?? '',
		maGv: giangvien.maGv ?? '',
		trangThai: giangvien.trangThai ?? '',
		trinhDo: giangvien.trinhDo ?? '',
		ngaySinh: user?.ngaySinh ?? '',
		soDienThoai: user?.soDienThoai ?? '',
		email: user?.email ?? '',
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

	const handleSave = async () => {
		const dataEdit = {
			maGv: formData.maGv,
			hoTen: formData.hoTen,
			boMon: formData.boMon,
			khoa: formData.khoa,
			trinhDo: formData.trinhDo,
			chuyenMon: formData.chuyenMon,
			// trangThai: formData.trangThai,
		};
		try {
			const res = await api.put(`/giangvien/${formData.id}`, dataEdit);
			toast.success(
				res.data?.result?.message ?? 'Chỉnh sửa thành công thông tin'
			);
			setIsEditing(false);
		} catch (error) {
			toast.error(error?.respones?.message ?? 'Lỗi khi chỉnh sửa thông tin');
			console.log('Lỗi khi chỉnh sửa thông tin ', error);
		}
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
								value={formData.maGv}
								disabled
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Họ tên</Form.Label>
							<Form.Control
								type='text'
								name='hoTen'
								value={formData.hoTen}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Ngày sinh</Form.Label>
							<Form.Control
								type='date'
								name='ngaySinh'
								value={formData.ngaySinh}
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
						<Form.Group className='mb-3'>
							<Form.Label>Chuyên môn</Form.Label>
							<Form.Control
								type='text'
								name='chuyenMon'
								value={formData.chuyenMon}
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
								value={formData.soDienThoai}
								onChange={(e) => {
									// Loại bỏ ký tự không phải là số và giới hạn độ dài là 10
									const onlyNums = e.target.value
										.replace(/\D/g, '')
										.slice(0, 10);
									setFormData({ ...formData, soDienThoai: onlyNums });
								}}
								disabled={!isEditing}
								placeholder='Nhập số điện thoại'
								maxLength={10} // Giới hạn độ dài nhập vào là 10 ký tự
							/>
						</Form.Group>
						{/* <Form.Group className='mb-3'>
							<Form.Label>Trình độ</Form.Label>
							<Form.Control
								type='text'
								name='trinhDo'
								value={formData.trinhDo}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group> */}
						<Form.Group className='mb-3'>
							<Form.Label>Trình độ</Form.Label>
							<Form.Select
								disabled={!isEditing}
								value={formData.trinhDo}
								name='trinhDo'
								onChange={handleChange}
							>
								<option value=''>-- Chọn trình độ --</option>
								{degrees.map((dep, idx) => (
									<option key={idx} value={dep}>
										{dep}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Bộ môn</Form.Label>
							<Form.Control
								type='text'
								name='boMon'
								value={formData.boMon}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Khoa</Form.Label>
							<Form.Select
								disabled={!isEditing}
								value={formData.khoa}
								name='khoa'
								onChange={handleChange}
							>
								<option value=''>-- Chọn khoa --</option>
								{departments.map((dep, idx) => (
									<option key={idx} value={dep}>
										{dep}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						{/* <Form.Group className='mb-3'>
							<Form.Label>Khoa</Form.Label>
							<Form.Control
								type='text'
								name='khoa'
								value={formData.khoa}
								onChange={handleChange}
								disabled={!isEditing}
							/>
						</Form.Group> */}
						<Form.Group className='mb-3'>
							<Form.Label>Trạng thái</Form.Label>
							<Form.Select name='trangThai' value={formData.trangThai} disabled>
								<option value='Đang công tác'>Đang công tác</option>
								<option value='Ngừng công tác'>Ngừng công tác</option>
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
