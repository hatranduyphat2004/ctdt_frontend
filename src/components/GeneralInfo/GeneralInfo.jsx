import React, { useState, useEffect } from 'react';
import {
	Table,
	Button,
	Badge,
	Row,
	Col,
	InputGroup,
	Form,
	Pagination,
} from 'react-bootstrap';
import InfoGeneralService from '../../services/InfoGeneralService';
import { toast } from 'react-toastify';
import InfoGeneralModal from './Modal/InfoGeneralModal';
import Confirm from './Modal/Confirm';
import MajorService from '../../services/MajorService';

const GeneralInfo = () => {
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
	const [data, setData] = useState([]);

	const [modalMode, setModalMode] = useState(null); // "view", "edit", "add"
	const [modalData, setModalData] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [majors, setMajors] = useState([]);

	const getAllInfoGenerals = async () => {
		const res = await InfoGeneralService.getAllInfoGenerals();
		if (res.success) {
			setData(res.data); // Lưu dữ liệu vào state
		} else {
			toast.error(res?.error ?? 'Lỗi khi lấy thông tin chung');
			console.error('Error fetching data: ', res.error);
			setData([]); // Lưu dữ liệu vào state
		}
	};

	const getAllMajors = async () => {
		const res = await MajorService.getAllMajors();

		if (res.success) {
			setMajors(res.data);
		} else {
			setMajors([]);
			console.log('Lỗi khi lấy danh sách ngành', res?.error);
		}
	};
	// Open modal handler
	const handleOpenModal = (mode, data = null) => {
		setModalMode(mode);
		setModalData(data);
		setShowModal(true);
	};
	const handleCloseModal = () => {
		setShowModal(false);
		setModalMode(null);
		setModalData(null);
	};

	const handleOpenConfirm = (id) => {
		setShowConfirm(true);
		setSelectedId(id);
	};
	const handleCloseConfirm = () => {
		setShowConfirm(false);
		setSelectedId(null);
	};

	const handleRefresh = () => {
		setSearchText('');
		setFilterNganh('');
		setFilterHeDaoTao('');
		setCurrentPage(1);
		setModalMode(null);
		setModalData(null);
		setShowModal(false);
		setShowConfirm(false);
		setSelectedId(null);

		getAllMajors();
		getAllInfoGenerals();
	};
	// Fetching the data
	useEffect(() => {
		getAllInfoGenerals();
		getAllMajors();
	}, []);

	const [searchText, setSearchText] = useState('');
	const [filterNganh, setFilterNganh] = useState('');
	const [filterHeDaoTao, setFilterHeDaoTao] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const accountsPerPage = 2;
	// Filter logic
	const filteredData = data.filter((inf) => {
		const search = searchText.toLowerCase();
		const matchSearch =
			inf?.maCtdt?.toLowerCase().includes(search) ||
			inf?.tenCtdt?.toLowerCase().includes(search) ||
			inf?.namBanHanh?.includes(search);

		const matchNganh = filterNganh ? inf.nganh.maNganh === filterNganh : true;
		const matchHeDaoTao = filterHeDaoTao
			? inf.heDaoTao === filterHeDaoTao
			: true;

		return matchSearch && matchNganh && matchHeDaoTao;
	});

	// Pagination logic
	const indexOfLast = currentPage * accountsPerPage;
	const indexOfFirst = indexOfLast - accountsPerPage;
	const currentData = filteredData.slice(indexOfFirst, indexOfLast);
	const pageCount = Math.ceil(filteredData.length / accountsPerPage);

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='mt-4'>
			<h2 className='mb-3'>Quản lý thông tin chung</h2>
			<Row className='mb-5'>
				<Col md={4}>
					<InputGroup>
						<InputGroup.Text>Tìm kiếm</InputGroup.Text>
						<Form.Control
							placeholder='Mã CTĐT, tên, năm...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</InputGroup>
				</Col>
				<Col md={3}>
					<Form.Select
						value={filterNganh}
						onChange={(e) => setFilterNganh(e.target.value)}
					>
						<option value=''>-- Lọc theo Ngành --</option>
						{majors.map((m) => (
							<option key={m.id} value={m.maNganh}>
								{m.tenNganh}
							</option>
						))}
					</Form.Select>
				</Col>
				<Col md={3}>
					<Form.Select
						value={filterHeDaoTao}
						style={{ maxHeight: '50px', overflowY: 'auto' }}
						onChange={(e) => setFilterHeDaoTao(e.target.value)}
					>
						<option value=''>-- Lọc theo Hệ đào tạo --</option>
						{DSHeDaoTao.map((he, idx) => (
							<option key={idx} value={he}>
								{he}
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
					onClick={() => handleOpenModal('view')}
				>
					+ Thêm mới
				</Button>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Mã CTDT</th>
						<th>Tên gọi</th>
						<th>Ngành</th>
						<th>Hệ Đào Tạo</th>
						<th>Năm Ban Hành</th>
						<th>Trạng Thái</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentData.length > 0 ? (
						currentData.map((item) => (
							<tr key={item.id}>
								<td>{item.maCtdt}</td>
								<td>{item.tenCtdt}</td>
								<td>{item.nganh.tenNganh}</td>
								<td>{item.heDaoTao}</td>
								<td>{item.namBanHanh}</td>
								<td>
									<Badge
										bg={
											item.trangThai === 'Đang hoạt động'
												? 'success'
												: 'secondary'
										}
									>
										{item.trangThai === 'Đang hoạt động'
											? 'Đang hoạt động'
											: 'Ngừng hoạt động'}
									</Badge>
								</td>
								<td>
									<Button
										// size='sm'
										onClick={() => handleOpenModal('view', item)}
									>
										Chi tiết
									</Button>
									<Button
										// size='sm'
										variant='warning'
										className='mx-3'
										onClick={() => handleOpenModal('edit', item)}
									>
										Sửa
									</Button>
									<Button
										variant='danger'
										onClick={() => handleOpenConfirm(item.id)}
									>
										Xoá
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={8} className='text-center text-bold'>
								Không có dữ liệu
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			{/* Pagination */}
			{pageCount >= 1 && (
				<Pagination>
					<Pagination.Prev
						disabled={currentPage === 1}
						onClick={() => handlePageChange(currentPage - 1)}
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
						disabled={currentPage === pageCount}
						onClick={() => handlePageChange(currentPage + 1)}
					/>
				</Pagination>
			)}
			<InfoGeneralModal
				show={showModal}
				onHide={handleCloseModal}
				mode={modalMode}
				data={modalData}
				onSave={getAllInfoGenerals}
				handleCloseModal={handleCloseModal}
				majors={majors}
			/>
			<Confirm
				setShowConfirm={setShowConfirm}
				showConfirm={showConfirm}
				handleCloseConfirm={handleCloseConfirm}
				id={selectedId}
			/>
		</div>
	);
};

export default GeneralInfo;
