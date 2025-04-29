import React, { useEffect, useState } from 'react';
import {
	Table,
	Badge,
	Button,
	Form,
	Row,
	Col,
	InputGroup,
	Pagination,
} from 'react-bootstrap';
import AddEditUser from './Modal/AddEditUser';
import Confirm from './Modal/Confirm';
import AccountService from '../../services/AccountService';
import LecturerService from '../../services/LecturerService';
import DatePicker from 'react-datepicker';

const Account = () => {
	const [accounts, setAccounts] = useState([]);
	const [lecturers, setLecturers] = useState([]);

	const [account, setAccount] = useState(null);
	const [type, setType] = useState('');
	const [accountId, setAccountId] = useState(null);

	const [showConfirm, setShowConfirm] = useState(false);
	const [showAddEditModal, setShowAddEditModal] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const accountsPerPage = 2;

	// API calls
	const getAllAccount = async () => {
		const res = await AccountService.getAllAccounts();
		console.log('>>>>>>>>..', res.data);
		if (res.success) {
			setAccounts(Array.isArray(res.data) ? res.data : []);
		} else {
			setAccounts([]);
		}
	};

	const getAllLecturers = async () => {
		const res = await LecturerService.getAllLecturers();
		if (res.success) {
			setLecturers(Array.isArray(res.data) ? res.data : []);
		} else {
			setLecturers([]);
		}
	};

	useEffect(() => {
		getAllAccount();
		getAllLecturers();
	}, []);

	const [searchText, setSearchText] = useState('');
	const [filterRole, setFilterRole] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	// Filter logic
	const filteredAccounts = accounts.filter((acc) => {
		const search = searchText.toLowerCase();
		const matchSearch =
			acc.username?.toLowerCase().includes(search) ||
			acc.hoTen?.toLowerCase().includes(search) ||
			acc.email?.toLowerCase().includes(search) ||
			acc.soDienThoai?.includes(search);

		const matchRole = filterRole ? acc.vaiTro === filterRole : true;
		const accountDate = new Date(acc.ngaySinh);
		const matchDateRange =
			(!startDate || accountDate >= startDate) &&
			(!endDate || accountDate <= endDate);

		return matchSearch && matchRole && matchDateRange;
	});

	// Pagination logic
	const indexOfLast = currentPage * accountsPerPage;
	const indexOfFirst = indexOfLast - accountsPerPage;
	const currentAccounts = filteredAccounts.slice(indexOfFirst, indexOfLast);
	const pageCount = Math.ceil(filteredAccounts.length / accountsPerPage);

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	const handleShowConfirm = (action, acc) => {
		setType(action);
		setAccountId(acc.id);
		setAccount(acc);
		setShowConfirm(true);
	};

	const handleShowAddEditModal = (acc = null) => {
		setAccount(acc);
		setShowAddEditModal(true);
	};

	const handleRefresh = () => {
		setSearchText('');
		setFilterRole('');
		setShowConfirm(false);
		setShowAddEditModal(false);
		setAccountId(null);
		setType('null');
		setAccount(null);
		setCurrentPage(1);
		setStartDate(null);
		setEndDate(null);

		getAllAccount();
		getAllLecturers();
	};

	return (
		<div>
			<h2 className='mb-4'>Quản lý Tài Khoản</h2>

			<Row className='mb-5'>
				<Col md={4}>
					<InputGroup>
						<InputGroup.Text>Tìm kiếm</InputGroup.Text>
						<Form.Control
							placeholder='Username, Họ tên, SĐT...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</InputGroup>
				</Col>
				<Col md={2}>
					<Form.Select
						value={filterRole}
						onChange={(e) => setFilterRole(e.target.value)}
					>
						<option value=''>-- Lọc theo Vai trò --</option>
						<option value='ADMIN'>Admin</option>
						<option value='GIANG_VIEN'>Lecturer</option>
					</Form.Select>
				</Col>
				<Col md={2} className='d-flex justify-content-end'>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						dateFormat='dd/MM/yyyy'
						className='form-control'
						placeholderText='Từ ngày (dd/MM/yyyy)'
						isClearable
					/>
				</Col>
				<Col md={2}>
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						dateFormat='dd/MM/yyyy'
						className='form-control'
						placeholderText='Đến ngày (dd/MM/yyyy)'
						isClearable
					/>
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
					className='mb-3 d-block  px-4 py-2'
					onClick={() => handleShowAddEditModal()}
				>
					+ Thêm mới
				</Button>
			</div>

			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>#</th>
						{/* <th>ID</th> */}
						<th>Fullname</th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th>DOB</th>
						<th>Role</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentAccounts.length === 0 ? (
						<tr>
							<td colSpan='10' className='text-center'>
								Không có dữ liệu
							</td>
						</tr>
					) : (
						currentAccounts.map((acc, index) => (
							<tr key={acc.id}>
								<td>{indexOfFirst + index + 1}</td>
								{/* <td>{acc.id}</td> */}
								<td>{acc.hoTen}</td>
								<td>{acc.username}</td>
								<td>{acc.email}</td>
								<td>{acc.soDienThoai}</td>
								<td>{acc.ngaySinh}</td>
								<td>
									<Badge bg={acc.vaiTro === 'ADMIN' ? 'warning' : 'primary'}>
										{acc.vaiTro === 'ADMIN' ? 'Admin' : 'Lecturer'}
									</Badge>
								</td>
								<td>
									<Badge bg={acc.trangThai ? 'success' : 'secondary'}>
										{acc.trangThai ? 'Đang hoạt động' : 'Ngừng hoạt động'}
									</Badge>
								</td>
								<td>
									{acc.vaiTro === 'ADMIN' ? (
										<span className='text-muted'>No action</span>
									) : (
										<>
											<Button
												variant='outline-primary'
												size='sm'
												onClick={() => handleShowAddEditModal(acc)}
											>
												Sửa
											</Button>
											<Button
												variant='outline-secondary'
												size='sm'
												className='mx-2'
												onClick={() => handleShowConfirm('reset', acc)}
											>
												Cấp lại mật khẩu
											</Button>
											<Button
												variant='outline-danger'
												size='sm'
												onClick={() => handleShowConfirm('delete', acc)}
											>
												Xóa
											</Button>
										</>
									)}
								</td>
							</tr>
						))
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

			{/* Modals */}
			<Confirm
				showConfirm={showConfirm}
				setShowConfirm={setShowConfirm}
				type={type}
				accountId={accountId}
				accountUsername={account?.username}
				getAllAccount={getAllAccount}
			/>
			<AddEditUser
				showAddEditModal={showAddEditModal}
				setShowAddEditModal={setShowAddEditModal}
				account={account}
				lecturers={lecturers}
				getAllAccount={getAllAccount}
				getAllLecturers={getAllLecturers}
			/>
		</div>
	);
};

export default Account;
