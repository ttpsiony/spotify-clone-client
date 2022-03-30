import styled from 'styled-components';

export default styled.div`
	.text-danger {
		color: #eb1e32;
		font-size: 14px;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: ${(p) => p.theme.paddingLarge} 0;
		user-select: none;
		border-bottom: 1px solid ${(p) => p.theme.gray1};

		button {
			background: none;
			border: none;
			cursor: pointer;
		}

		img {
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}

		span {
			color: #1bd760;
			font-size: 28px;
			font-weight: bold;
			margin-left: ${(p) => p.theme.paddingSmall};
			vertical-align: middle;
		}
	}

	.login-permission {
		padding: ${(p) => p.theme.paddingLarge} ${(p) => p.theme.paddingSmall};
		max-width: 450px;
		margin: 0 auto;

		&__warning {
			font-size: 20px;
			font-weight: bold;
			color: ${(p) => p.theme.black};

			&:nth-of-type(2) {
				margin-bottom: ${(p) => p.theme.paddingLarge};
			}
		}

		&__btn {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		button {
			border: none;
			border-radius: 30px;
			font-weight: bold;
			background: #1bd760;
			color: #fff;
			font-size: 16px;
			width: 100%;
			text-align: center;
			padding: ${(p) => p.theme.paddingSmall};
			cursor: pointer;
		}
	}

	form#login-form {
		padding: ${(p) => p.theme.paddingLarge} ${(p) => p.theme.paddingSmall};
		max-width: 450px;
		margin: 0 auto;

		.form-control {
			margin-bottom: ${(p) => p.theme.paddingBase};
			font-size: 18px;

			label {
				display: block;
				width: 100%;
				font-weight: bold;
				margin-bottom: ${(p) => p.theme.paddingExSmall};
			}

			input {
				width: 100%;
				font-size: 16px;
				padding: ${(p) => p.theme.paddingSmall};
				border: 1px solid ${(p) => p.theme.gray1};
				margin-bottom: ${(p) => p.theme.paddingExSmall};

				&:focus {
					outline: 1px solid ${(p) => p.theme.gray3};
				}

				&.error:focus {
					outline: 1px solid #eb1e32;
					border-color: transparent;
				}
			}
		}

		.submit-btn {
			display: flex;
			justify-content: flex-end;
			padding-top: ${(p) => p.theme.paddingExSmall};

			input {
				border: none;
				border-radius: 30px;
				font-weight: bold;
				background: #1bd760;
				color: #fff;
				font-size: 16px;
				width: 150px;
				text-align: center;
				padding: ${(p) => p.theme.paddingSmall};
				cursor: pointer;
			}
		}

		.login-info {
			padding: ${(p) => p.theme.paddingSmall};
			border-radius: 4px;
			background: #ace0f97f;
			margin-bottom: ${(p) => p.theme.paddingBase};
			color: ${(p) => p.theme.black};
			font-weight: bold;
			font-size: 16px;
		}
	}

	.sign-up-btn {
		max-width: 450px;
		margin: 0 auto;
		margin-top: ${(p) => p.theme.paddingBase};
		padding-top: ${(p) => p.theme.paddingBase};
		border-top: 1px solid ${(p) => p.theme.gray1};
		text-align: center;

		h4 {
			font-size: 18px;
			margin-bottom: ${(p) => p.theme.paddingBase};
		}

		button {
			border: 1px solid ${(p) => p.theme.gray5};
			border-radius: 30px;
			font-weight: bold;
			background: #fff;
			color: ${(p) => p.theme.gray5};
			width: 100%;
			font-size: 16px;
			padding: ${(p) => p.theme.paddingSmall};
			cursor: pointer;
			transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

			&:hover {
				background: ${(p) => p.theme.gray5};
				color: #fff;
			}
		}
	}

	@media screen and (max-width: 500px) {
		.login-permission {
			max-width: none;
			width: calc(100% - 30px);
			margin: none;
		}

		form#login-form {
			max-width: none;
			width: calc(100% - 30px);
			margin: none;
		}

		.sign-up-btn {
			max-width: none;
			width: calc(100% - 30px);
		}
	}
`;
