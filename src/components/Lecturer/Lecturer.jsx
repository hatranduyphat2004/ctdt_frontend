import React, { useEffect, useState } from 'react';
import {
	Table,
	Badge,
	Button,
	Pagination,
	Row,
	Col,
	InputGroup,
	Form,
} from 'react-bootstrap';
import api from '../../api/axiosConfig';
import DeleteModal from './Modal/DeleteModal';
import AddEditModal from './Modal/AddEditModal';

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

const Lecturer = () => {
	const [lecturers, setLecturers] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedLecturer, setSelectedLecturer] = useState(null);
	const [showConfirm, setShowConfirm] = useState(false);

	const [searchText, setSearchText] = useState('');
	const [filterDepartment, setFilterDepartment] = useState('');
	const [filterDegree, setFilterDegree] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const lecturersPerPage = 5;

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const getAllLecturers = async () => {
		try {
			const res = await api.get('/giangvien');
			if (res.status === 200 && Array.isArray(res.data.result)) {
				setLecturers(res.data.result);
			} else {
				setLecturers([]);
			}
		} catch (error) {
			console.error('Lỗi khi lấy danh sách giảng viên', error);
			setLecturers([]);
		}
	};

	useEffect(() => {
		getAllLecturers();
	}, []);

	const handleShowAddEditModal = (lecturer = null) => {
		setSelectedLecturer(lecturer);
		setShowModal(true);
	};

	const handleShowConfirm = (lecturer) => {
		setShowConfirm(true);
		setSelectedLecturer(lecturer);
	};

	const handleRefresh = () => {
		setShowModal(false);
		setShowConfirm(false);
		setSelectedLecturer(null);
		setSearchText('');
		setFilterDegree('');
		setFilterDepartment('');
		setCurrentPage(1);

		getAllLecturers();
	};
	// FILTER
	const filteredLecturers = lecturers.filter((lec) => {
		if (lec.maGv === 'ADMIN') return false;

		const search = searchText.toLowerCase();
		const matchesSearch =
			lec.maGv?.toLowerCase().includes(search) ||
			lec.hoTen?.toLowerCase().includes(search);

		const matchesDepartment = filterDepartment
			? lec.khoa === filterDepartment
			: true;

		const matchesDegree = filterDegree ? lec.trinhDo === filterDegree : true;

		return matchesSearch && matchesDegree && matchesDepartment;
	});

	// PAGINATION SAU KHI LỌC
	const pageCount = Math.ceil(filteredLecturers.length / lecturersPerPage);
	const indexOfLast = currentPage * lecturersPerPage;
	const indexOfFirst = indexOfLast - lecturersPerPage;
	const currentLecturers = filteredLecturers.slice(indexOfFirst, indexOfLast);

	useEffect(() => {
		// Reset về page 1 nếu thay đổi filter/search
		setCurrentPage(1);
	}, [searchText, filterDepartment, filterDegree]);

	return (
		<div className='mt-4'>
			<h2 className='mb-4'>Quản lý giảng viên</h2>

			{/* Bộ lọc */}
			<Row className='mb-5'>
				<Col md={4}>
					<InputGroup>
						<InputGroup.Text>Tìm kiếm</InputGroup.Text>
						<Form.Control
							type='text'
							placeholder='Họ tên, Mã cán bộ...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</InputGroup>
				</Col>
				<Col md={3}>
					<Form.Select
						value={filterDepartment}
						onChange={(e) => setFilterDepartment(e.target.value)}
					>
						<option value=''>-- Lọc theo Khoa --</option>
						{departments.map((d, idx) => (
							<option key={idx} value={d}>
								{d}
							</option>
						))}
					</Form.Select>
				</Col>
				<Col md={3}>
					<Form.Select
						value={filterDegree}
						onChange={(e) => setFilterDegree(e.target.value)}
					>
						<option value=''>-- Lọc theo Trình độ --</option>
						{degrees.map((d, idx) => (
							<option key={idx} value={d}>
								{d}
							</option>
						))}
					</Form.Select>
				</Col>
			</Row>

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
					className='mb-3  px-4 py-2'
					onClick={() => handleShowAddEditModal()}
				>
					+ Thêm mới
				</Button>
			</div>

			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Mã Cán Bộ</th>
						<th>Họ tên</th>
						<th>Bộ môn</th>
						<th>Khoa</th>
						<th>Trình độ</th>
						<th>Chuyên môn</th>
						<th>Trạng thái</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentLecturers.length === 0 ? (
						<tr>
							<td colSpan='9' className='text-center'>
								Không có dữ liệu
							</td>
						</tr>
					) : (
						currentLecturers.map((lecturer, index) => (
							<tr key={lecturer.id}>
								<td>{indexOfFirst + index + 1}</td>
								<td>{lecturer.maGv}</td>
								<td>{lecturer.hoTen}</td>
								<td>{lecturer.boMon}</td>
								<td>{lecturer.khoa}</td>
								<td>{lecturer.trinhDo}</td>
								<td>{lecturer.chuyenMon}</td>
								<td>
									<Badge
										bg={
											lecturer.trangThai === 'Đang công tác'
												? 'success'
												: 'secondary'
										}
									>
										{lecturer.trangThai}
									</Badge>
								</td>
								<td>
									<Button
										onClick={() => handleShowAddEditModal(lecturer)}
										variant='outline-primary me-3'
										size='sm'
									>
										Sửa
									</Button>
									<Button
										onClick={() => handleShowConfirm(lecturer)}
										variant='outline-danger'
										size='sm'
									>
										Xóa
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>

			{pageCount >= 1 && (
				<Pagination>
					<Pagination.Prev
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					/>
					{Array.from({ length: pageCount }, (_, i) => (
						<Pagination.Item
							key={i + 1}
							active={i + 1 === currentPage}
							onClick={() => handlePageChange(i + 1)}
						>
							{i + 1}
						</Pagination.Item>
					))}
					<Pagination.Next
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === pageCount}
					/>
				</Pagination>
			)}

			{/* Modals */}
			<AddEditModal
				showModal={showModal}
				setShowModal={setShowModal}
				selectedLecturer={selectedLecturer}
				setSelectedLecturer={setSelectedLecturer}
				getAllLecturers={getAllLecturers}
			/>
			<DeleteModal
				showConfirm={showConfirm}
				setShowConfirm={setShowConfirm}
				selectedLecturer={selectedLecturer}
				getAllLecturers={getAllLecturers}
			/>
		</div>
	);
};

export default Lecturer;
