import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaChalkboardTeacher, FaBook, FaUniversity } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import './Overview.css';
import api from '../../api/axiosConfig';
import LecturerService from '../../services/LecturerService';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Overview = () => {
	const initData = {
		giangVien: 0,
		hocPhan: 0,
		chuongTrinhDaoTao: 0,
	};

	const [data, setData] = useState(initData);

	const getAllLecturers = async () => {
		const res = await LecturerService.getAllLecturers();
		if (res.success)
			setData((prev) => ({
				...prev,
				giangVien: res.data.length - 1,
			}));
		else console.log('Lỗi khi lấy danh sách giảng viên ', res.error);
	};
	const getAllSubjects = async () => {
		try {
			const res = await api.get('/hocphan');
			if (res.status === 200)
				setData((prev) => ({
					...prev,
					hocPhan: res.data.result.length,
				}));
		} catch (error) {
			console.log('Lỗi khi lấy danh sách học phần ', error);
		}
	};
	const getAllPrograms = async () => {
		try {
			const res = await api.get('/ctdt');
			if (res.status === 200)
				setData((prev) => ({
					...prev,
					chuongTrinhDaoTao: res.data.result.length,
				}));
		} catch (error) {
			console.log('Lỗi khi lấy danh sách chương trình đào tạo ', error);
		}
	};

	useEffect(() => {
		getAllLecturers();
		// getAllSubjects();
		// getAllPrograms();
	}, []);
	// Cấu hình cho biểu đồ
	const chartData = {
		labels: ['Giảng Viên', 'Học Phần', 'Chương Trình Đào Tạo'],
		datasets: [
			{
				label: 'Tổng Số Lượng',
				data: [data.giangVien, data.hocPhan, data.chuongTrinhDaoTao],
				backgroundColor: ['#2196f3', '#4caf50', '#ff9800'], // Màu sắc cho các cột
				borderColor: ['#1976d2', '#388e3c', '#f57c00'],
				borderWidth: 1,
				hoverBackgroundColor: ['#64b5f6', '#81c784', '#ffb74d'], // Màu khi hover
			},
		],
	};

	// Tùy chọn cho biểu đồ
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				labels: {
					font: {
						size: 14,
					},
				},
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
				ticks: {
					stepSize: 20, // Bước nhảy của các ticks trên trục Y
				},
			},
		},
	};

	return (
		<div className='overview-container'>
			<Row className='mb-4'>
				<Col xs={12} md={4}>
					<Card className='overview-card shadow-sm giang-vien-card'>
						<Card.Body className='p-2'>
							<Card.Title className='overview-card-title'>
								<FaChalkboardTeacher className='overview-icon' /> Tổng Số Lượng
								Giảng Viên
							</Card.Title>
							<Card.Text className='overview-card-text'>
								{data.giangVien}
							</Card.Text>
							<Card.Text className='overview-card-subtext'>
								👨‍🏫 Giảng viên đang tham gia giảng dạy tại các học phần.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card className='overview-card shadow-sm hoc-phan-card'>
						<Card.Body className='p-2'>
							<Card.Title className='overview-card-title'>
								<FaBook className='overview-icon' /> Tổng Số Lượng Học Phần
							</Card.Title>
							<Card.Text className='overview-card-text'>
								{data.hocPhan}
							</Card.Text>
							<Card.Text className='overview-card-subtext'>
								📚 Các học phần hiện có trong chương trình đào tạo.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card className='overview-card shadow-sm chuong-trinh-card'>
						<Card.Body className='p-2'>
							<Card.Title className='overview-card-title'>
								<FaUniversity className='overview-icon' /> Tổng Số Lượng Chương
								Trình Đào Tạo
							</Card.Title>
							<Card.Text className='overview-card-text'>
								{data.chuongTrinhDaoTao}
							</Card.Text>
							<Card.Text className='overview-card-subtext'>
								🎓 Các chương trình đào tạo đang được triển khai.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Thêm phần Content bên dưới Row với biểu đồ */}
			<div className='overview-content'>
				{/* Thêm biểu đồ */}
				<div className='chart-container'>
					<Bar data={chartData} options={chartOptions} />
				</div>
			</div>
		</div>
	);
};

export default Overview;
