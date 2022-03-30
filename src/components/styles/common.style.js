import styled from 'styled-components';

export const TracksListWrapper = styled.div`
	width: 100%;

	.tracks__list-wrapper {
		padding-top: ${(p) => p.theme.paddingLarge};
	}

	.tracks__list-item {
		position: relative;
		display: grid;
		grid-template-columns: 20px 6fr 4fr 3fr minmax(90px, 1fr);
		grid-template-rows: auto;
		grid-gap: ${(p) => p.theme.paddingBase};
		padding: ${(p) => p.theme.paddingSmall};
		align-items: center;
		color: ${(p) => p.theme.black};
		height: 56px;

		img {
			-webkit-user-drag: none;
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

		&.active,
		&:not(.list-item__header):hover {
			cursor: pointer;
			box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
			background: rgba(0, 0, 0, 0.03);
			transition: all 0.01s linear;

			.tracks__list-item__index {
				span {
					display: none;
				}
				button {
					display: inline-block;
				}
			}

			.tracks__list-item__status button {
				display: inline;
			}
		}

		//
		//
		&__index {
			button {
				width: 20px;
				height: 20px;
				display: none;
			}
		}

		&__basic {
			display: flex;
			align-items: center;

			img {
				width: 40px;
				height: 40px;
				object-fit: cover;
				margin-right: ${(p) => p.theme.paddingBase};
			}

			.name {
				flex: auto;
				padding-right: ${(p) => p.theme.paddingSmall};

				div {
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					display: -webkit-box;
					white-space: unset;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				div:nth-of-type(2) {
					font-size: 14px;
					color: ${(p) => p.theme.gray3};
				}
			}
		}

		&__album {
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			white-space: unset;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;

			&.album-name {
				font-size: 14px;
				color: ${(p) => p.theme.gray3};
				padding-right: ${(p) => p.theme.paddingSmall};
			}
		}

		&__created-time {
			&.added-time {
				font-size: 16px;
				color: ${(p) => p.theme.gray3};
			}
		}

		&__status {
			justify-self: flex-end;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			button {
				display: none;
				margin-right: ${(p) => p.theme.paddingBase};

				&.collected {
					display: inline;
				}
			}
		}
	}

	.list-item__header {
		font-weight: bold;
		border-bottom: 1px solid ${(p) => p.theme.gray1};
		padding: 4px ${(p) => p.theme.paddingSmall};
		margin-bottom: ${(p) => p.theme.paddingBase};
		height: auto;
		background: #fff;
		position: sticky;
		top: 60px;
		margin-left: -15px;
		margin-right: -15px;
		padding-left: calc(15px + 8px);
		padding-right: calc(15px + 8px);
		z-index: 5;
	}

	.contextmenu-container {
		position: fixed;
		width: 200px;
		padding: 4px;
		border-radius: 4px;
		font-size: 16px;
		background: #fff;
		color: ${(p) => p.theme.black};
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 0, 0, 0.01);
		z-index: 20;
		cursor: pointer;

		div {
			border-radius: 2px;
			padding: 4px;
			&:hover {
				background: ${(p) => p.theme.grayLight};
			}
		}

		// 播放列表歌曲 [playlist.jsx]
		div.add-track-to-playlist {
			position: relative;
			padding: 0;

			div.user-playlists {
				width: 200px;
				padding: 4px;
				border-radius: 4px;
				position: absolute;
				background: #fff;
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
				border: 1px solid rgba(0, 0, 0, 0.01);
				z-index: 21;

				div {
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenSm}) {
		.tracks__list-item {
			grid-template-columns: 20px 4fr 2fr minmax(70px, 1fr);

			&__album {
				display: none;
			}
		}
	}
`;

export const RecommendListWrapper = styled.div`
	.recommendation-list-container {
		overflow: hidden;
		margin-bottom: ${(p) => p.theme.paddingExLarge};
	}

	.recommendation-list__title-wrapper {
		margin-bottom: ${(p) => p.theme.paddingBase};

		h2 {
			font-size: 24px;
			color: ${(p) => p.theme.black};
		}

		> div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 16px;
			color: ${(p) => p.theme.gray3};
			cursor: default;

			span {
				cursor: pointer;
				color: ${(p) => p.theme.mint};
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	.recommendation-list__items-wrapper {
		overflow: hidden;
		padding: ${(p) => p.theme.paddingSmall};
		display: grid;
		/* grid-template-columns: repeat(5, 1fr); */
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		grid-template-rows: 1fr;
		gap: ${(p) => p.theme.paddingBase};
	}

	.recommendation-list__item {
		padding: ${(p) => p.theme.paddingBase};
		cursor: pointer;
		border-radius: 8px;

		&:hover {
			background: ${(p) => p.theme.grayLight};
		}

		.recommendation-list__item-image-wrapper {
			margin-bottom: ${(p) => p.theme.paddingSmall};

			img {
				border-radius: 15px;
				width: 100%;
				object-fit: cover;
				border: 1px solid rgba(0, 0, 0, 0.05);
			}
		}

		.recommendation-list__item-basic-info {
			.item-basic-name {
				font-size: 18px;
				font-weight: bold;
				color: ${(p) => p.theme.black};
				margin-bottom: ${(p) => p.theme.paddingExSmall};
			}

			.item-basic-description {
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

	@media screen and (max-width: ${(p) => p.theme.screenLg}) {
		.recommendation-list__items-wrapper {
			/* grid-template-columns: repeat(4, 1fr); */
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

			div:nth-of-type(5).recommendation-list__item {
				display: none;
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenMd}) {
		.recommendation-list__items-wrapper {
			/* grid-template-columns: repeat(3, 1fr); */
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

			div:nth-of-type(4).recommendation-list__item {
				display: none;
			}
		}
	}

	@media screen and (max-width: ${(p) => p.theme.screenSm}) {
		.recommendation-list__items-wrapper {
			/* grid-template-columns: repeat(2, 1fr); */
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

			div:nth-of-type(3).recommendation-list__item {
				display: none;
			}
		}
	}
`;
