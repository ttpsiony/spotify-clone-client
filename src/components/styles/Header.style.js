import styled from 'styled-components';

const HeaderWrapper = styled.header`
	position: relative;

	.inner-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		width: calc(100% - 15px);
		height: 60px;
		z-index: 10;
		padding: ${(p) => p.theme.paddingBase};
		display: flex;
		align-items: center;
		transition: box-shadow linear 0.2s, background linear 0.3s;
		background: transparent;

		&.scrolling {
			/* box-shadow: 0px 6px 10px -5px ${(p) => p.theme.gray2}; */
			background: #fff;
			width: 100%;
			padding-right: 30px;
		}
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		width: 30px;
		height: 30px;
		background: ${(p) => p.theme.gray1};
		border-radius: 50%;
		border: none;
		outline: none;

		img {
			width: 24px;
			height: 24px;
			user-select: none;
		}
	}

	.header__browser-history-controls {
		display: flex;
		gap: ${(p) => p.theme.paddingSmall};
		margin-right: ${(p) => p.theme.paddingBase};

		button:nth-of-type(2) img {
			transform: rotate(180deg);
		}
	}

	.header__content-wrapper {
		flex: auto;
		display: flex;

		.header__content-wrapper__search-bar {
			position: relative;
			flex: 0 1 364px;

			input {
				outline: none;
				font-size: 14px;
				width: 100%;
				padding: ${(p) => p.theme.paddingExSmall} 45px;
				border: 1px solid ${(p) => p.theme.gray3};
				background: #fff;
				border-radius: 500px;
				color: #000;
				height: 40px;
				text-overflow: ellipsis;
			}

			img {
				position: absolute;
				width: 24px;
				height: 24px;
			}
			img[alt='search'] {
				left: 10px;
				top: 8px;
				pointer-events: none;
			}

			img[alt='cross'] {
				cursor: pointer;
				right: 10px;
				top: 8px;
			}
		}

		.header__content-wrapper__title {
			font-size: 24px;
			color: ${(p) => p.theme.black};
			padding-left: 4px;
			transition: opacity linear 0.2s;
			opacity: 0;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;

			&.show {
				opacity: 1;
			}
		}
	}

	.header__sign-up-btn,
	.header__login-btn {
		min-width: 87px;
		width: auto;
		height: auto;
		padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingLarge};
		text-align: center;
		background: #ffffff;
		border-radius: 30px;
		box-shadow: 0 2px 5px ${(p) => p.theme.gray1};
		transition: transform 0.2s linear;

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}
	}

	.header__sign-up-btn {
		background: none;
		box-shadow: none;
	}

	.header__user-profile-button {
		margin-left: ${(p) => p.theme.paddingBase};
	}

	.header__user-profile__contextmenu {
		position: absolute;
		bottom: -70px;
		right: 20px;
		width: 150px;
		background: ${(p) => p.theme.white};
		box-shadow: 0 0 10px ${(p) => p.theme.gray2};
		border-radius: 4px;
		z-index: 99;

		ul {
			width: 100%;
		}

		li {
			list-style: none;
			padding: 4px;
		}

		button {
			width: 100%;
			border-radius: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: transparent;
			cursor: pointer;
			padding: 4px;
			font-weight: bold;
			font-size: 16px;
			color: ${(p) => p.theme.gray5};
			padding: 4px 8px;

			&:hover {
				background: ${(p) => p.theme.grayLight};
			}
		}

		img {
			width: 18px;
			height: 18px;
			object-fit: cover;
		}
	}
`;

export default HeaderWrapper;
