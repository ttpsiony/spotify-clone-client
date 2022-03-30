import styled from 'styled-components';

export default styled.div`
	padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingBase} 45px;
	margin-top: 60px;

	h2 {
		color: ${(p) => p.theme.black};
		font-size: 24px;
		margin-bottom: ${(p) => p.theme.paddingBase};
	}

	button {
		width: 24px;
		height: 24px;
		background: transparent;
		border: none;
		outline: none;
		cursor: pointer;
		img {
			width: 100%;
			object-fit: cover;
		}
	}

	.queue__item-list__song {
		display: flex;
		align-items: center;
		gap: ${(p) => p.theme.paddingBase};
		margin-bottom: ${(p) => p.theme.paddingBase};
		padding: ${(p) => p.theme.paddingExSmall};

		&:hover {
			cursor: pointer;
			box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
			background: rgba(0, 0, 0, 0.03);
			transition: all 0.01s linear;

			.song-index {
				span {
					display: none;
				}
				button {
					display: inline-block;
				}
			}

			.song-status img {
				display: inline;
			}
		}

		.song-index {
			flex: 0 0 30px;
			text-align: center;

			button {
				width: 20px;
				height: 20px;
				display: none;
			}
		}

		.song-cover {
			flex: 0 0 40px;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 100%;
				object-fit: cover;
			}
		}

		.song-basic-info {
			flex: auto;

			div {
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;

				&:first-child {
					font-size: 18px;
					color: ${(p) => p.theme.black};
				}
				&:last-child {
					font-size: 14px;
					color: ${(p) => p.theme.gray3};
				}
			}
		}

		.song-status {
			flex: 0 0 90px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			user-select: none;

			img {
				display: none;
			}
		}
	}
`;
