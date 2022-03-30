import styled from 'styled-components';

export default styled.div`
	padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingBase} 60px;
	margin-top: 60px;

	h2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: ${(p) => p.theme.black};
		font-size: 24px;
		margin-bottom: ${(p) => p.theme.paddingBase};

		span {
			font-weight: normal;
			font-size: 16px;
			cursor: pointer;
			color: ${(p) => p.theme.mint};
			&:hover {
				text-decoration: underline;
			}
		}
	}

	.search__item-list-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-auto-rows: auto;
		grid-gap: ${(p) => p.theme.paddingBase} ${(p) => p.theme.paddingBase};
	}

	.search__item {
		position: relative;
		width: 100%;
		padding-top: 100%;
		border: 1px solid #eee;
		cursor: pointer;
		overflow: hidden;
		border-radius: 15px;

		.search__item-name {
			position: absolute;
			left: 0;
			top: 0;
			font-size: 24px;
			padding: ${(p) => p.theme.paddingBase};
			color: #fff;
			font-weight: bold;
		}

		.search__item-cover {
			position: absolute;
			width: 100px;
			height: 100px;
			right: 0;
			bottom: 0;
			transform: rotate(25deg) translate(18%, -2%);

			img {
				width: 100%;
				object-fit: cover;
				box-shadow: 0 2px 4px 0 rgb(0, 0, 0, 0.2);
				user-select: none;
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenLg}) {
		.search__item-list-container {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenMd}) {
		.search__item-list-container {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenSm}) {
		.search__item-list-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	// track

	.tracks__wrapper {
		margin-bottom: ${(p) => p.theme.paddingBase};

		.track {
			width: 100%;
			display: flex;
			align-items: center;
			gap: ${(p) => p.theme.paddingSmall};
			padding: ${(p) => p.theme.paddingSmall};
			cursor: pointer;
			background: #fff;
			border-radius: ${(p) => p.theme.paddingSmall};

			&:not(:last-child) {
				margin-bottom: ${(p) => p.theme.paddingSmall};
			}

			&:hover,
			&:focus,
			&:active {
				background: ${(p) => p.theme.grayLight};

				.track-cover {
					img.track-cover__img {
						filter: brightness(0.5);
					}
					img[alt='play'] {
						opacity: 1;
					}
				}
				.track-operation {
					button.track-operation__button {
						opacity: 1;
					}
				}
			}
		}

		.track-cover {
			position: relative;
			width: 40px;
			min-width: 40px;
			height: 40px;
			flex-shrink: 0;
			img.track-cover__img {
				width: 100%;
				object-fit: cover;
				border: 1px solid rgba(0, 0, 0, 0.03);
			}

			img[alt='play'] {
				position: absolute;
				width: 15px;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				filter: brightness(4);
				opacity: 0;
			}
		}

		.track-name {
			flex: auto;

			&__name,
			&__artist {
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				white-space: unset;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.track-time {
			width: 45px;
			flex-shrink: 0;
		}

		.track-operation {
			width: 30px;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			button.track-operation__button {
				position: relative;
				cursor: pointer;
				width: 20px;
				height: 20px;
				background: transparent;
				outline: none;
				border: none;
				opacity: 0;

				img[alt='more'] {
					width: 100%;
					object-fit: cover;
				}
			}

			.track-operation__list {
				position: absolute;
				top: 130%;
				right: 0;
				width: 170px;
				padding: ${(p) => p.theme.paddingExSmall} 0;
				text-align: left;
				background: #fff;
				border-radius: 4px;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
				border: 1px solid rgba(0, 0, 0, 0.01);
				z-index: 20;

				.track-operation__list-item {
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					display: -webkit-box;
					white-space: unset;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingSmall};
					&:hover {
						background: ${(p) => p.theme.grayLight};
					}
				}
			}

			div.user-playlists {
				width: 200px;
				padding: 4px 0;
				border-radius: 4px;
				position: absolute;
				right: 100%;
				top: 50%;
				max-height: 350px;
				overflow-y: auto;
				background: #fff;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
				border: 1px solid rgba(0, 0, 0, 0.01);
				z-index: 21;

				div {
					padding: ${(p) => p.theme.paddingSmall} ${(p) => p.theme.paddingSmall};
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					&:hover {
						background: ${(p) => p.theme.grayLight};
					}
				}
			}
		}
	}

	// playlist
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
			&__name {
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

			&__description {
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
