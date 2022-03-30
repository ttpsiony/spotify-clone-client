import styled from 'styled-components';

export default styled.div`
	position: fixed;
	background: rgba(0, 0, 0, 0.9);
	left: 0;
	top: 0;
	z-index: 1000;
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: backdrop ease-in 50ms forwards;

	@keyframes backdrop {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.modal {
		display: flex;
		flex-direction: column;
		margin: auto;
		min-width: 810px;
		min-height: 350px;
		width: 60vw;
		animation: modal ease-in-out 400ms forwards 1;
		animation-delay: 0.15s;
		opacity: 0;

		@keyframes modal {
			0% {
				opacity: 0;
				transform: translateY(50px);
			}

			100% {
				opacity: 1;
				transform: translateY(0px);
			}
		}
	}

	.modal-body {
		width: 100%;
		flex: auto;
		border-radius: ${(p) => p.theme.paddingBase};
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
		padding: ${(p) => p.theme.paddingExLarge};
		background: ${(p) => p.theme.grayLight};

		&.prompt {
			background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
		}
		&.warning {
			background-image: linear-gradient(-20deg, #d6dbf1 0%, #ffd1c4 100%);
		}
	}

	.close {
		padding: ${(p) => p.theme.paddingSmall};
		margin-top: auto;
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
		color: ${(p) => p.theme.grayLight};
		user-select: none;
		font-weight: bold;
	}

	//
	.modal-body__login-prompt {
		display: flex;

		.image-wrapper {
			flex: 1 1 50%;
			text-align: center;

			img {
				border: 1px solid rgba(0, 0, 0, 0.01);
				border-radius: ${(p) => p.theme.paddingSmall};
				text-align: center;
				max-width: 280px;
				object-fit: cover;
			}

			.image-provider {
				font-size: 14px;
				color: ${(p) => p.theme.gray5};

				a {
					text-decoration: none;
					color: ${(p) => p.theme.black};
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		.text-wrapper {
			padding: ${(p) => p.theme.paddingLarge};
			flex: 1 1 50%;
			text-align: center;

			h2 {
				font-size: 32px;
			}

			.prompt-btn-wrapper {
				margin: ${(p) => p.theme.paddingBase};

				button {
					width: 100%;
					padding: ${(p) => p.theme.paddingBase};
					cursor: pointer;
					background: none;
					border: none;
					border-radius: 30px;

					&:nth-of-type(1) {
						margin-bottom: ${(p) => p.theme.paddingSmall};
						background: #fff;
						color: ${(p) => p.theme.black};
						box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
					}

					&:nth-of-type(2) {
						margin-bottom: ${(p) => p.theme.paddingSmall};
						background: #1db954;
						color: #fff;
					}
				}
			}

			p {
				margin-top: ${(p) => p.theme.paddingLarge};
				font-weight: bold;
				color: #ef1d1d;

				a {
					color: #ef1d1d;
				}
			}
		}
	}

	.modal-body__warning-prompt {
		display: flex;
		text-align: center;

		.image-wrapper {
			flex: 1 1 50%;

			img {
				border-radius: ${(p) => p.theme.paddingSmall};
				text-align: center;
				width: 90%;
				object-fit: cover;
			}

			.image-provider a {
				font-size: 14px;
				color: ${(p) => p.theme.gray5};
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.text-wrapper {
			padding: ${(p) => p.theme.paddingLarge};
			flex: 1 1 50%;
			text-align: center;

			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			p {
				margin-bottom: ${(p) => p.theme.paddingBase};
				font-weight: bold;
				font-size: 18px;
				color: #ef1d1d;

				a {
					color: #ef1d1d;
				}
			}

			button {
				width: 100%;
				padding: ${(p) => p.theme.paddingBase};
				cursor: pointer;
				background: none;
				border: none;
				border-radius: 30px;
				cursor: pointer;
				background: #1db954;
				color: #fff;
			}
		}
	}

	// rwd
	@media screen and (max-width: ${(p) => p.theme.screenMd}) {
		.modal {
			min-width: auto;
			width: 420px;
			margin: auto 15px;
		}

		.modal-body {
			padding: ${(p) => p.theme.paddingBase};
		}

		.modal-body__login-prompt {
			flex-direction: column;

			.image-wrapper {
				img {
					max-width: 240px;
				}
			}

			.text-wrapper {
				h2 {
					font-size: 24px;
				}
			}
		}

		.modal-body__warning-prompt {
			flex-direction: column;

			.image-wrapper {
				img {
					width: 80%;
				}
			}

			.text-wrapper {
				p {
					font-size: 16px;
				}
			}
		}
	}
`;
