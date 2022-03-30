import styled from 'styled-components';

export default styled.div`
	padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingBase} 45px;
	margin-top: 60px;

	h2 {
		color: ${(p) => p.theme.black};
		font-size: 24px;
		margin-bottom: ${(p) => p.theme.paddingBase};
	}

	.playlists__wrapper {
		overflow: hidden;
		padding: ${(p) => p.theme.paddingSmall};
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		grid-template-rows: 1fr;
		gap: ${(p) => p.theme.paddingBase};

		.playlists__item-wrapper {
			padding: ${(p) => p.theme.paddingBase};
			cursor: pointer;
			border-radius: 8px;

			&:hover {
				background: ${(p) => p.theme.grayLight};
			}

			&.collection {
				color: #fff;
				font-size: 16px;
				grid-column: span 2;
				background: linear-gradient(149.46deg, #450af5, #8e8ee5 99.16%);

				.collected-track {
					div:nth-of-type(1) {
						font-size: 32px;
					}

					div:nth-of-type(2) {
						font-size: 14px;
					}
				}
			}
		}

		.item__image-wrapper {
			margin-bottom: ${(p) => p.theme.paddingSmall};

			img {
				border: 1px solid ${(p) => p.theme.grayLight};
				width: 100%;
				border-radius: 15px;
				object-fit: cover;
			}
		}

		.item__basic-info {
			.item-name {
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 18px;
				font-weight: bold;
				color: ${(p) => p.theme.black};
				margin-bottom: ${(p) => p.theme.paddingExSmall};
			}

			.item-description {
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 14px;
				color: ${(p) => p.theme.gray5};
			}
		}
	}
`;
