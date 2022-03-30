import styled from 'styled-components';

export default styled.div`
	padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingBase} 45px;
	background-color: transparent;
	position: relative;
	margin-top: 60px;

	&::before {
		position: absolute;
		content: '';
		width: 100%;
		height: calc(260px + 60px);
		left: 0;
		top: -60px;
		z-index: -1;
		background-image: linear-gradient(
			to top,
			#d5d4d0 0%,
			#d5d4d0 1%,
			#eeeeec 31%,
			#efeeec 75%,
			#e9e9e7 100%
		);
	}

	.tracks__banner {
		display: flex;
		gap: ${(p) => p.theme.paddingLarge};
		height: 260px;
		user-select: none;
		align-items: flex-end;
		padding: ${(p) => p.theme.paddingLarge} 0;

		.tracks__banner-icon {
			width: 192px;
			height: 192px;
			min-width: 192px;
			min-height: 192px;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 4px 15px rgb(0, 0, 0, 0.15);
			background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

			img {
				width: 80px;
			}
		}

		.tracks__banner-text {
			padding-bottom: ${(p) => p.theme.paddingExSmall};

			&__list {
				font-size: 16px;
			}

			&__title {
				font-size: 75px;
				line-height: 1.2;
				color: ${(p) => p.theme.black};
			}

			&__total {
				color: ${(p) => p.theme.gray5};
				font-size: 14px;
			}
		}
	}

	.tracks__list-empty {
		user-select: none;
		padding-top: ${(p) => p.theme.paddingExLarge};
		padding-bottom: ${(p) => p.theme.paddingBase};
		text-align: center;
		color: ${(p) => p.theme.color};

		img {
			width: 60px;
			margin-bottom: ${(p) => p.theme.paddingBase};
		}

		&__desc-1 {
			font-size: 24px;
			margin-bottom: ${(p) => p.theme.paddingSmall};
		}
		&__desc-2 {
			font-size: 18px;
			margin-bottom: ${(p) => p.theme.paddingLarge};
		}

		button {
			font-size: 16px;
			outline: none;
			border: 1px solid ${(p) => p.theme.grayLight};
			border-radius: 20px;
			cursor: pointer;
			background: ${(p) => p.theme.black};
			color: ${(p) => p.theme.grayLight};
			padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingLarge};
			box-shadow: 0 0 10px ${(p) => p.theme.gray1};
			transition: transform linear 0.2s;

			&:hover {
				text-decoration: underline;
				transform: scale(1.05);
			}

			&:active {
				transform: scale(0.95);
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenMd}) {
		.tracks__banner {
			.tracks__banner-text__title {
				font-size: 55px;
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenSm}) {
		.tracks__banner {
			.tracks__banner-text__title {
				font-size: 40px;
			}
		}
	}
`;
