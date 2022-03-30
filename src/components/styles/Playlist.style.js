import styled from 'styled-components';

export default styled.div`
	padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingBase} 45px;
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
		background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
	}

	.playlist__banner {
		display: flex;
		gap: ${(p) => p.theme.paddingLarge};
		height: 260px;
		user-select: none;
		align-items: flex-end;
		padding: ${(p) => p.theme.paddingLarge} 0;

		.playlist__banner-icon {
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
				width: 100%;
				object-fit: cover;
			}
		}

		.playlist__banner-text {
			display: flex;
			flex-direction: column;
			padding-bottom: ${(p) => p.theme.paddingExSmall};

			&__list {
				font-size: 16px;
			}

			&__title {
				font-size: 60px;
				line-height: 1.2;
				color: ${(p) => p.theme.black};
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				white-space: unset;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			&__desc {
				color: ${(p) => p.theme.gray3};
				font-size: 14px;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				white-space: unset;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			&__detail {
				display: flex;
				align-items: center;
				color: ${(p) => p.theme.gray3};
				font-size: 14px;
				margin-bottom: auto;

				span.dot {
					margin: 0 ${(p) => p.theme.paddingSmall};
					width: 4px;
					height: 4px;
					background: ${(p) => p.theme.gray4};
					border-radius: 50%;
				}

				span:nth-of-type(1) {
					color: ${(p) => p.theme.black};
				}
			}

			&__collection {
				display: flex;
				align-items: flex-end;
				justify-content: flex-start;
				margin-top: 8px;

				button {
					border: none;
					background: none;
					outline: none;
					cursor: pointer;
					width: 35px;
					height: 35px;

					img {
						-webkit-user-drag: none;
						width: 100%;
						object-fit: cover;
					}
				}
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenMd}) {
		.playlist__banner {
			.playlist__banner-text__title {
				font-size: 55px;
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenSm}) {
		.playlist__banner {
			.playlist__banner-text__title {
				font-size: 40px;
			}
		}
	}
`;
