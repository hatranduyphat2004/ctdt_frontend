import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import api from '../../../api/axiosConfig';
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

const AddEditModal = ({
	showModal,
	setShowModal,
	selectedLecturer,
	setSelectedLecturer,
	getAllLecturers,
}) => {
	const initLecturer = {
		maGv: '',
		hoTen: '',
		boMon: '',
		khoa: '',
		trinhDo: '',
		chuyenMon: '',
		trangThai: 'Đang công tác',
	};

	const [lecturerData, setLecturerData] = useState(initLecturer);

	useEffect(() => {
		if (selectedLecturer) {
			setLecturerData(selectedLecturer);
		} else {
			setLecturerData(initLecturer);
		}
	}, [selectedLecturer]);

	const handleInputChange = (field, value) => {
		setLecturerData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			let res;
			if (selectedLecturer) {
				// Chỉnh sửa
				res = await api.put(`/giangvien/${lecturerData?.id}`, lecturerData);
			} else {
				// Thêm mới
				res = await api.post('/giangvien', lecturerData);
			}

			if (res.status === 200) {
				await getAllLecturers();
				setLecturerData(initLecturer);
				toast.success(res.data.message || 'Lưu giảng viên thành công');
			} else {
				toast.error(res.data.message || 'Lưu giảng viên thất bại');
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Lưu giảng viên thất bại');
			console.error('Lỗi khi lưu giảng viên:', error);
		}

		handleCloseModal();
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedLecturer(null);
	};

	return (
		<Modal size='lg' show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
				<Modal.Title>
					{selectedLecturer ? 'Chỉnh sửa giảng viên' : 'Thêm giảng viên'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row>
						<Col md={6}>
							<Form.Group className='mb-3'>
								<Form.Label>Mã cán bộ</Form.Label>
								<Form.Control
									type='text'
									value={lecturerData.maGv}
									onChange={(e) => handleInputChange('maGv', e.target.value)}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Họ tên</Form.Label>
								<Form.Control
									type='text'
									value={lecturerData.hoTen}
									onChange={(e) => handleInputChange('hoTen', e.target.value)}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Bộ môn</Form.Label>
								<Form.Control
									type='text'
									value={lecturerData.boMon}
									onChange={(e) => handleInputChange('boMon', e.target.value)}
								/>
							</Form.Group>

							{/* <Form.Group className='mb-3'>
								<Form.Label>Khoa</Form.Label>
								<Form.Control
									type='text'
									value={lecturerData.khoa}
									onChange={(e) => handleInputChange('khoa', e.target.value)}
								/>
							</Form.Group> */}
							<Form.Group className='mb-3'>
								<Form.Label>Khoa</Form.Label>
								<Form.Select
									value={lecturerData.khoa}
									onChange={(e) => handleInputChange('khoa', e.target.value)}
								>
									<option value=''>-- Chọn khoa --</option>
									{departments.map((dep, idx) => (
										<option key={idx} value={dep}>
											{dep}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>

						<Col md={6}>
							{/* <Form.Group className='mb-3'>
								<Form.Label>Trình độ</Form.Label>
								<Form.Control
									type='text'
									value={lecturerData.trinhDo}
									onChange={(e) => handleInputChange('trinhDo', e.target.value)}
								/>
							</Form.Group> */}
							<Form.Group className='mb-3'>
								<Form.Label>Trình độ</Form.Label>
								<Form.Select
									value={lecturerData.trinhDo}
									onChange={(e) => handleInputChange('trinhDo', e.target.value)}
								>
									<option value=''>-- Chọn trình độ --</option>
									{degrees.map((deg, idx) => (
										<option key={idx} value={deg}>
											{deg}
										</option>
									))}
								</Form.Select>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Chuyên môn</Form.Label>
								<Form.Control
									type='text'
									value={lecturerData.chuyenMon}
									onChange={(e) =>
										handleInputChange('chuyenMon', e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Trạng thái</Form.Label>
								<Form.Select
									value={lecturerData.trangThai}
									onChange={(e) =>
										handleInputChange('trangThai', e.target.value)
									}
								>
									<option value='Đang công tác'>Đang công tác</option>
									<option value='Ngừng công tác'>Ngừng công tác</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleCloseModal}>
					Hủy
				</Button>
				<Button variant='primary' onClick={handleSave}>
					Lưu
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddEditModal;
