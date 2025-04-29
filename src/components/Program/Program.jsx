import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const nganhList = [
	{
		id: 1,
		ten: 'Công nghệ thông tin',
		moTa: 'Chuyên ngành về hệ thống máy tính, lập trình và quản lý dữ liệu.',
	},
	{
		id: 2,
		ten: 'An toàn thông tin',
		moTa: 'Chuyên ngành về bảo mật, kiểm soát an ninh hệ thống thông tin.',
	},
	{
		id: 3,
		ten: 'Marketing',
		moTa: 'Chuyên ngành về kinh doanh, quảng cáo và chiến lược tiếp thị.',
	},
	// Thêm các ngành khác nếu cần
];

const Program = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedNganh, setSelectedNganh] = useState(null);

	const handleShow = (nganh) => {
		setSelectedNganh(nganh);
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		setSelectedNganh(null);
	};
	return (
		<div className='container my-5'>
			<h3>Danh sách các ngành</h3>
			<Table striped bordered hover responsive className='mt-3'>
				<thead>
					<tr>
						<th>#</th>
						<th>Tên ngành</th>
						<th>Mô tả ngắn</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{nganhList.map((nganh, idx) => (
						<tr key={nganh.id}>
							<td>{idx + 1}</td>
							<td>{nganh.ten}</td>
							<td>{nganh.moTa}</td>
							<td>
								<Button variant='primary' onClick={() => handleShow(nganh)}>
									Xem chi tiết
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* Modal Chi tiết ngành */}
			<Modal show={showModal} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Chi tiết ngành</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedNganh && (
						<>
							<h5>{selectedNganh.ten}</h5>
							<p>{selectedNganh.moTa}</p>
							{/* Nếu bạn muốn hiển thị nhiều thông tin hơn, thêm vào đây */}
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Đóng
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Program;
