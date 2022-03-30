import styled from 'styled-components';

export default styled.div`
	padding: ${(p) => p.theme.paddingLarge} ${(p) => p.theme.paddingBase};
	margin-top: 60px;

	.genre-list-name {
		font-size: 30px;
		color: ${(p) => p.theme.black};
		font-weight: bold;
		margin-bottom: ${(p) => p.theme.paddingBase};
	}

	.genre-list__items-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		grid-template-rows: auto;
		gap: ${(p) => p.theme.paddingBase} ${(p) => p.theme.paddingLarge};

		.genre-list__item {
			padding: ${(p) => p.theme.paddingBase};
			cursor: pointer;
			border-radius: 8px;

			&:hover {
				background: ${(p) => p.theme.grayLight};
			}
		}

		.genre-list__item-image-wrapper {
			img {
				border-radius: ${(p) => p.theme.paddingBase};
				width: 100%;
				object-fit: cover;
			}
		}

		.item-basic-description {
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
	}
`;
