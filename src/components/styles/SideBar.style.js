import styled from 'styled-components';

const SideBarWrapper = styled.div`
	height: 100%;
	padding-top: ${(p) => p.theme.paddingLarge};
	border-right: 1px solid ${(p) => p.theme.gray1};

	div.sidebar-container__logo-wrapper {
		padding: 0 ${(p) => p.theme.paddingBase};
		height: 65px;

		img {
			cursor: pointer;
			height: 45px;
			object-fit: contain;
		}
	}

	ul.sidebar-container__main-nav {
		li {
			position: relative;
			list-style: none;
			padding: 0 ${(p) => p.theme.paddingSmall};

			a {
				position: relative;
				display: flex;
				align-items: center;
				height: 40px;
				gap: ${(p) => p.theme.paddingBase};
				color: ${(p) => p.theme.black};
				font-size: 16px;
				text-decoration: none;
				border-radius: 4px;
				padding: 0 ${(p) => p.theme.paddingBase};
				background: #fff;
				transition: color linear 0.2s;

				&:hover:not(.active) {
					color: ${(p) => p.theme.mint};

					img {
						filter: invert(87%) sepia(7%) saturate(2674%) hue-rotate(138deg) brightness(86%)
							contrast(87%);
					}
				}

				&.active {
					background: ${(p) => p.theme.grayLight};
					color: ${(p) => p.theme.black};
					font-weight: bold;
				}

				img {
					transition: filter linear 0.2s;
					width: 24px;
					height: 24px;
				}
			}
		}
	}

	.sidebar_container__playlist-wrapper {
		padding-top: ${(p) => p.theme.paddingLarge};

		.playlist-add-button,
		.playlist-collection-button {
			position: relative;
			padding: ${(p) => p.theme.paddingSmall};

			button:not(.prompt-btn) {
				padding: 0 ${(p) => p.theme.paddingBase};
				width: 100%;
				display: flex;
				align-items: center;
				border: none;
				background: transparent;
				outline: none;
				cursor: pointer;
				font-size: 16px;
				transition: color linear 0.2s;

				&:hover {
					color: ${(p) => p.theme.mint};

					img {
						filter: invert(87%) sepia(7%) saturate(2674%) hue-rotate(138deg) brightness(86%)
							contrast(87%);
					}
				}

				div {
					width: 24px;
					height: 24px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: ${(p) => p.theme.paddingSmall};

					img {
						width: 16px;
						height: 16px;
					}
				}

				.add-button__img-wrapper {
					background: ${(p) => p.theme.grayLight};
					border-radius: 1px;
				}

				.collection-button__img-wrapper {
					background: ${(p) => p.theme.grayLight};
					border-radius: 1px;
				}

				&.active {
					color: ${(p) => p.theme.black};
					font-weight: bold;
				}
			}
		}
	}

	.collection-playlists-prompt,
	.playlist-add-button-prompt,
	.playlist-collection-prompt {
		user-select: none;
		display: flex;
		flex-direction: column;
		padding: ${(p) => p.theme.paddingBase};
		position: absolute;
		width: 350px;
		min-height: 150px;
		right: -300px;
		top: -10px;
		background: #fff;
		z-index: 20;
		border-radius: 15px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(0, 0, 0, 0.1);
		opacity: 0;
		animation: showPrompt 300ms ease-in 0s 1 forwards;

		@keyframes showPrompt {
			0% {
				opacity: 0;
				transform: translateX(10px);
			}

			40% {
				opacity: 1;
			}

			100% {
				opacity: 1;
				transform: translateX(0px);
			}
		}

		&:before {
			position: absolute;
			z-index: 20;
			content: '';
			left: -5px;
			top: 20px;
			width: 14px;
			height: 14px;
			background: #fff;
			transform: rotate(45deg);
			box-shadow: -3px 3px 2px -2px rgba(0, 0, 0, 0.15);
		}

		h3 {
			font-size: 20px;
			margin-bottom: ${(p) => p.theme.paddingSmall};
		}

		p {
			font-size: 14px;
			color: ${(p) => p.theme.gray4};
		}

		.prompt-btn-wrapper {
			margin-top: auto;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			button.prompt-btn {
				font-size: 14px;
				width: auto;
				height: auto;
				background: none;
				cursor: pointer;
				text-align: center;
				padding: ${(p) => p.theme.paddingExSmall} ${(p) => p.theme.paddingLarge};
				border-radius: 30px;
				border: 1px solid #ccc;

				&:nth-of-type(1) {
					border: none;
				}
			}
		}
	}

	.separator {
		position: relative;

		&:before {
			content: '';
			position: absolute;
			width: 90%;
			height: 1px;
			background: ${(p) => p.theme.grayLight};
			left: 5%;
			top: 4px;
		}
	}

	.playlist-wrapper__items-container {
		margin-top: ${(p) => p.theme.paddingBase};
		height: calc(100vh - 90px - 95px - 120px - 110px - 15px);
		min-height: 185px;
		overflow-y: auto;

		ul {
			padding: 0 ${(p) => p.theme.paddingSmall};

			li {
				position: relative;
				display: flex;
				list-style: none;
				padding: 0 ${(p) => p.theme.paddingBase};

				.context-menu-container {
					position: fixed;
					width: 150px;
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
				}

				a {
					width: 100%;
					text-decoration: none;
					padding: ${(p) => p.theme.paddingExSmall} 0;
					color: ${(p) => p.theme.black};
					font-size: 16px;
					line-height: 1.6;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;

					&.active {
						color: ${(p) => p.theme.black};
						font-weight: bold;
					}

					&:hover {
						color: ${(p) => p.theme.mint};
					}
				}

				input {
					width: 100%;
					text-decoration: none;
					padding: 2px 0;
					color: ${(p) => p.theme.black};
					font-size: 16px;
					line-height: 1.5;
				}
			}
		}
	}
`;

export default SideBarWrapper;
