import React, { useEffect, useState } from 'react';
import {
	Button,
	Modal,
	Form,
	Table,
	Badge,
	Row,
	Col,
	InputGroup,
	Pagination,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import MajorService from '../../services/MajorService';

const Major = () => {
	const initMajorData = {
		id: '',
		maNganh: '',
		tenNganh: '',
		trangThai: 'Đang hoạt động',
	};

	const [majors, setMajors] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedMajor, setSelectedMajor] = useState(null);
	const [formData, setFormData] = useState(initMajorData);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchText, setSearchText] = useState('');

	const itemsPerPage = 2;

	// Hàm mở modal thêm/sửa
	const handleShowModal = (nganh = null) => {
		if (nganh) {
			setFormData({
				...formData,
				id: nganh.id,
				maNganh: nganh.maNganh,
				tenNganh: nganh.tenNganh,
				trangThai: nganh.trangThai,
			});
			setSelectedMajor(nganh);
		} else {
			setFormData(initMajorData);
			setSelectedMajor(null);
		}
		setShowModal(true);
	};

	// Hàm đóng modal thêm/sửa
	const handleCloseModal = () => {
		setShowModal(false);
		setFormData(initMajorData);
		setSelectedMajor(null);
	};

	// Hàm mở modal xác nhận xoá
	const handleShowDeleteModal = (nganh) => {
		setSelectedMajor(nganh);
		setShowDeleteModal(true);
	};

	// Hàm đóng modal xoá
	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
		setFormData(initMajorData);
		setSelectedMajor(null);
	};

	// Refresh
	const handleRefresh = () => {
		setShowDeleteModal(false);
		setShowModal(false);

		setFormData(initMajorData);
		setSelectedMajor(null);

		setCurrentPage(1);
		setSearchText('');

		getAllMajors();
	};

	// Hàm xử lý thay đổi input
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Hàm thêm/sửa ngành
	const handleSave = async () => {
		let res;
		if (selectedMajor) {
			// Chỉnh sửa
			res = await MajorService.updateAccount(formData);
		} else {
			// Thêm mới
			res = await MajorService.createAccount(formData);
		}

		if (res.success) {
			await getAllMajors();
			setFormData(initMajorData);
			toast.success(res?.data?.message || 'Lưu ngành học thành công');
		} else {
			toast.error(res.error || 'Lưu ngành học thất bại');
			console.error('Lỗi khi lưu ngành học:', res.error);
		}

		handleCloseModal();
	};

	// Hàm xoá ngành
	const handleDelete = async () => {
		const res = await MajorService.deleteAccount(selectedMajor.id);

		if (res.success) {
			handleCloseModal();
			await getAllMajors();
			setFormData(initMajorData);
			toast.success(res.data?.message || 'Xóa ngành học thành công');
		} else {
			toast.error(res.error || 'Xóa ngành học thất bại');
			console.error('Lỗi khi xóa giảng viên:', res.error);
		}

		handleCloseDeleteModal();
	};

	// Lấy danh sách ngành học
	const getAllMajors = async () => {
		const res = await MajorService.getAllMajors();
		if (res.success) {
			setMajors(res.data);
		} else {
			console.log('Lỗi khi lấy danh sách ngành học ', res.error);
		}
	};

	// Xử lý phân trang
	const filteredMajors = majors.filter((acc) => {
		const search = searchText.toLowerCase();
		return (
			acc.tenNganh?.toLowerCase().includes(search) ||
			acc.maNganh?.toLowerCase().includes(search)
		);
	});

	const totalPages = Math.ceil(filteredMajors.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedMajors = filteredMajors.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	useEffect(() => {
		getAllMajors();
	}, []);

	return (
		<div>
			<h3 className='mb-4'>Quản lý ngành học</h3>
			<Row className='mb-5'>
				<Col md={4}>
					<InputGroup>
						<InputGroup.Text>Tìm kiếm</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Tên ngành, mã ngành...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</InputGroup>
				</Col>
			</Row>

			{/* Nút thêm mới, làm mới */}
			<div className='d-flex justify-content-end '>
				<Button
					variant='info text-white '
					className='mb-3 me-3 px-4 py-2'
					onClick={() => handleRefresh()}
				>
					Làm mới
				</Button>
				<Button
					variant='success'
					className='mb-3 px-4 py-2'
					onClick={() => handleShowModal()}
				>
					+ Thêm Ngành
				</Button>
			</div>

			{/* Bảng danh sách ngành học */}
			<Table striped bordered hover className='mt-3'>
				<thead>
					<tr>
						<th>#</th>
						<th>Mã ngành</th>
						<th>Tên ngành</th>
						<th>Trạng thái</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{paginatedMajors.map((nganh, idx) => (
						<tr key={nganh.id}>
							<td>{startIndex + idx + 1}</td>
							<td>{nganh.maNganh}</td>
							<td>{nganh.tenNganh}</td>
							<td>
								<Badge
									bg={
										nganh.trangThai === 'Đang hoạt động'
											? 'success'
											: 'secondary'
									}
								>
									{nganh.trangThai}
								</Badge>
							</td>
							<td>
								<Button
									variant='warning'
									className='me-3'
									onClick={() => handleShowModal(nganh)}
								>
									Sửa
								</Button>
								<Button
									variant='danger'
									onClick={() => handleShowDeleteModal(nganh)}
								>
									Xoá
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* Phân trang */}
			{totalPages >= 1 && (
				<Pagination>
					<Pagination.Prev
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
					/>
					{Array.from({ length: totalPages }, (_, i) => (
						<Pagination.Item
							key={i + 1}
							active={i + 1 === currentPage}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</Pagination.Item>
					))}
					<Pagination.Next
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage === totalPages}
					/>
				</Pagination>
			)}

			{/* Modal Thêm/Sửa Ngành */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						{selectedMajor ? 'Sửa Ngành' : 'Thêm Ngành'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='formMaNganh'>
							<Form.Label>Mã ngành</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập mã ngành'
								name='maNganh'
								value={formData.maNganh}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group controlId='formTenNganh'>
							<Form.Label>Tên ngành</Form.Label>
							<Form.Control
								type='text'
								placeholder='Nhập tên ngành'
								name='tenNganh'
								value={formData.tenNganh}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Trạng thái</Form.Label>
							<Form.Select
								name='trangThai'
								value={formData.trangThai}
								onChange={handleInputChange}
							>
								<option value='Đang hoạt động'>Đang hoạt động</option>
								<option value='Ngưng hoạt động'>Ngưng hoạt động</option>
							</Form.Select>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseModal}>
						Đóng
					</Button>
					<Button
						variant='primary'
						onClick={handleSave}
						disabled={!formData.maNganh.trim() || !formData.tenNganh.trim()}
					>
						Lưu
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal xác nhận xoá */}
			<Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
				<Modal.Header closeButton>
					<Modal.Title>Xác nhận Xoá Ngành</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có chắc chắn muốn xoá ngành "{selectedMajor?.tenNganh}" không?
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseDeleteModal}>
						Hủy
					</Button>
					<Button variant='danger' onClick={handleDelete}>
						Xoá
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Major;
