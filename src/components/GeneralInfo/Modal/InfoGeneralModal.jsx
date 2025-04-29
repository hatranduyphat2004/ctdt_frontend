// ModalComponent.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import InfoGeneralService from '../../../services/InfoGeneralService';
import { toast } from 'react-toastify';

const InfoGeneralModal = ({
	show,
	onHide,
	mode,
	data,
	onSave,
	handleCloseModal,
	majors,
}) => {
	const DSHeDaoTao = [
		'Chính quy',
		'Vừa làm vừa học',
		'Liên thông',
		'Văn bằng hai',
		'Đào tạo từ xa',
		'Hệ chất lượng cao',
		'Hệ tiên tiến',
		'Hệ cử nhân tài năng',
		'Hệ liên kết quốc tế',
	];
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
	const initData = {
		id: '',
		maCtdt: '',
		tenCtdt: '',
		maNganh: '',
		khoaQuanLy: '',
		heDaoTao: '',
		trinhDo: '',
		tongTinChi: '',
		thoiGianDaoTao: '',
		namBanHanh: '',
		banHanh: '',
		trangThai: 'Đang hoạt động',
	};

	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState(initData);

	useEffect(() => {
		if (data && mode === 'view') {
			setIsEditing(false);
			setFormData({ ...data, maNganh: data?.nganh?.maNganh });
		} else if (data && mode === 'edit') {
			setIsEditing(true);
			setFormData({ ...data, maNganh: data?.nganh?.maNganh });
		} else {
			setIsEditing(true);
			setFormData(initData);
		}
	}, [data, mode]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async () => {
		let res;
		if (mode === 'add') {
			res = await InfoGeneralService.createInfoGeneral(formData);
		} else if (mode === 'edit') {
			res = await InfoGeneralService.updateInfoGeneral(formData);
		}

		if (res.success) {
			toast.success(
				res.data.message ||
					`${mode == 'add' ? 'Thêm' : 'Sửa'} thành công thông tin chung`
			);
			handleCloseModal();
			onSave();
		} else {
			toast.error(
				res.error ||
					`${mode == 'add' ? 'Thêm' : 'Sửa'} thông tin chung thất bại`
			);
		}
	};

	return (
		<Modal show={show} onHide={onHide} backdrop='static'>
			<Modal.Header closeButton>
				<Modal.Title>
					{mode === 'add'
						? 'Thêm mới thông tin chung'
						: mode === 'edit'
						? 'Cập nhật thông tin chung'
						: 'Chi tiết thông tin chung'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Mã CTDT</Form.Label>
						<Form.Control
							type='text'
							name='maCtdt'
							value={formData.maCtdt}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Tên gọi</Form.Label>
						<Form.Control
							type='text'
							name='tenCtdt'
							value={formData.tenCtdt}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</Form.Group>

					{/* ComboBox Mã Ngành */}
					<Form.Group className='mb-3'>
						<Form.Label>Mã ngành</Form.Label>
						<Form.Select
							name='maNganh'
							value={formData?.nganh?.maNganh}
							onChange={handleChange}
							disabled={!isEditing}
						>
							<option value=''>-- Chọn ngành --</option>
							{majors.map((nganh) => (
								<option key={nganh.maNganh} value={nganh.maNganh}>
									{nganh.tenNganh}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Khoa quản lý</Form.Label>
						<Form.Select
							name='khoaQuanLy'
							value={formData.khoaQuanLy}
							onChange={handleChange}
							disabled={!isEditing}
						>
							<option value=''>-- Chọn khoa --</option>
							{departments.map((he, idx) => (
								<option key={idx} value={he}>
									{he}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Hệ Đào Tạo</Form.Label>
						<Form.Select
							name='heDaoTao'
							value={formData.heDaoTao}
							onChange={handleChange}
							disabled={!isEditing}
						>
							<option value=''>-- Chọn hệ đào tạo --</option>
							{DSHeDaoTao.map((he, idx) => (
								<option key={idx} value={he}>
									{he}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Tổng tín chỉ</Form.Label>
						<Form.Control
							type='number'
							name='tongTinChi'
							value={formData.tongTinChi}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Thời gian đào tạo (năm)</Form.Label>
						<Form.Control
							type='number'
							step='0.5'
							name='thoiGianDaoTao'
							value={+formData.thoiGianDaoTao}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Năm ban hành</Form.Label>
						<Form.Control
							type='number'
							name='namBanHanh'
							value={formData.namBanHanh}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Ban hành</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							name='banHanh'
							value={formData.banHanh}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</Form.Group>
					{/* ComboBox Trạng Thái */}
					<Form.Group className='mb-3'>
						<Form.Label>Trạng thái</Form.Label>
						<Form.Select
							name='trangThai'
							value={formData.trangThai}
							onChange={handleChange}
							disabled={!isEditing}
						>
							<option value='Đang hoạt động'>Đang hoạt động</option>
							<option value='Ngừng hoạt động'>Ngừng hoạt động</option>
						</Form.Select>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Đóng
				</Button>
				{isEditing && (
					<Button variant='primary' onClick={handleSave}>
						Lưu
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default InfoGeneralModal;
