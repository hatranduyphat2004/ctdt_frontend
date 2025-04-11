import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fakeLogin } from './authActions'; // import action login từ features/auth/authActions
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit'; // để lấy kết quả từ asyncThunk
import { useNavigate } from 'react-router';

const Login = () => {
	const [id, setID] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector((state) => state.auth.isLoading);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	// Nếu người dùng đã đăng nhập, tự động chuyển hướng về dashboard
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard');
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const resultAction = await dispatch(fakeLogin({ id, password }));
			const data = unwrapResult(resultAction);

			// ✅ Hiển thị toast thành công
			toast.success(`Xin chào ${data.user.name || 'người dùng'}!`);

			// 👉 Chuyển hướng nếu cần, ví dụ:
			navigate('/dashboard');
		} catch (err) {
			toast.error(err || 'Đăng nhập thất bại');
		}
	};

	// Hàm để quay lại trang chủ
	const handleGoBackToHome = () => {
		navigate('/');
	};

	return (
		<div className='d-flex flex-column justify-content-center align-items-center vh-100 bg-light'>
			{/* 🔶 Dòng tiêu đề ứng dụng */}
			<h2 className='mb-5 text-center text-primary fw-bold'>
				ỨNG DỤNG QUẢN LÍ CHƯƠNG TRÌNH ĐÀO TẠO
			</h2>

			<Card style={{ width: '30rem' }} className='shadow p-4'>
				<h4 className='text-center mb-4'>ĐĂNG NHẬP</h4>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='formEmail'>
						<Form.Label>Mã cán bộ</Form.Label>
						<Form.Control
							type='text'
							placeholder='Nhập mã cán bộ'
							value={id}
							onChange={(e) => setID(e.target.value)}
							required
							className='py-2'
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formPassword'>
						<Form.Label>Mật khẩu</Form.Label>
						<InputGroup>
							<Form.Control
								type={showPassword ? 'text' : 'password'}
								placeholder='Nhập mật khẩu'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<Button
								variant='outline-secondary'
								onClick={() => setShowPassword(!showPassword)}
								type='button'
							>
								{showPassword ? '🙈' : '👁️'}
							</Button>
						</InputGroup>
					</Form.Group>

					<Button
						variant='primary'
						type='submit'
						className='w-100'
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Spinner
									as='span'
									animation='border'
									size='sm'
									role='status'
									aria-hidden='true'
									className='me-2'
								/>
								Đang đăng nhập...
							</>
						) : (
							'Đăng nhập'
						)}
					</Button>
				</Form>
				{/* Nút quay lại trang chủ */}
				<div className='text-center mt-3'>
					<Button variant='link' onClick={handleGoBackToHome}>
						🡸 Quay lại trang chủ
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Login;
