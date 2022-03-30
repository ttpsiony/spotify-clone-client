import styled from 'styled-components';

const AudioPlayerWrapper = styled.div`
	height: 100%;
	padding: 0 ${(p) => p.theme.paddingBase};
	display: flex;
	align-items: center;
	background: ${(p) => p.theme.grayLight};

	&.noToken {
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		outline: none;
		background: transparent;
		width: 32px;
		height: 32px;

		&:hover img {
			filter: invert(87%) sepia(7%) saturate(2674%) hue-rotate(138deg) brightness(86%) contrast(87%);
		}

		img {
			width: 20px;
			height: 20px;
			object-fit: cover;
			transition: filter linear 0.2s;
			user-select: none;
			-webkit-user-drag: none;
		}
	}

	.player-controller__empty {
		width: 30%;
		min-width: 150px;
	}

	.player-controller__current-song {
		width: 30%;
		min-width: 150px;
		display: flex;
		align-items: center;

		picture {
			width: 56px;
			height: 56px;

			img {
				width: 100%;
				object-fit: cover;
			}
		}

		.current-song__info {
			/* flex: auto; */
			margin: 0 ${(p) => p.theme.paddingBase};
			word-break: keep-all;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			div {
				word-break: keep-all;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&:first-child {
					color: ${(p) => p.theme.black};
					font-size: 14px;
				}
				&:last-child {
					color: ${(p) => p.theme.gray5};
					font-size: 12px;
				}
			}
		}

		button {
			cursor: pointer;
			background: none;
			outline: none;
			border: none;

			&:hover img {
				filter: none;
			}
		}
	}

	.player-controller__empty-control-bar {
		flex: auto;
		color: ${(p) => p.theme.black};

		span {
			color: #ef1d1d;
			display: inline-block;
			padding-right: 4px;
		}
	}

	.player-controller__control-bar {
		flex: auto;

		.controller-bar {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: ${(p) => p.theme.paddingSmall};
			margin-bottom: ${(p) => p.theme.paddingSmall};
		}

		button.controller-bar__center {
			background: #ffffff;
			border-radius: 50%;
			box-shadow: 0 2px 5px ${(p) => p.theme.gray1};
			transition: transform linear 0.1s;

			&:hover {
				transform: scale(1.1);
			}

			&:active {
				transform: scale(0.95);
			}
		}

		.controller-bar__left,
		.controller-bar__right {
			display: flex;
			gap: ${(p) => p.theme.paddingSmall};
		}

		.controller-bar__left {
			align-items: flex-end;
		}

		.controller-bar__right {
			align-items: flex-start;
		}

		//
		// progress-bar
		.progress-bar {
			display: flex;
			align-items: center;

			.progress-bar__time {
				font-size: 12px;
				min-width: 40px;
				text-align: center;
				color: ${(p) => p.theme.gray5};
				cursor: default;
				user-select: none;
			}
		}
	}

	.progress-bar__bar-outer {
		width: 100%;
		position: relative;
		height: 4px;
		background: ${(p) => p.theme.gray2};
		border-radius: 2px;
		cursor: pointer;

		&:hover .progress-bar__bar-inner::after {
			opacity: 1;
		}

		.progress-bar__bar-inner {
			position: absolute;
			z-index: 3;
			left: 0;
			top: 0px;
			height: 100%;
			border-radius: 3px;
			background: ${(p) => p.theme.gray5};

			&::after {
				content: '';
				position: absolute;
				width: 10px;
				height: 10px;
				right: -4px;
				top: -3px;
				border-radius: 50%;
				background: #ffffff;
				opacity: 0;
				transition: opacity ease-in-out 300ms;
				box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
			}
		}

		.time-tip {
			position: absolute;
			top: calc(-30px);
			transform: translateX(-50%);
			background-color: rgba(0, 0, 0, 0.8);
			color: #fff;
			border-radius: 4px;
			padding: 4px 8px;
			font-size: 12px;
		}
	}

	// volume
	.progress-bar__progress {
		width: 100%;
		position: relative;
		height: 4px;
		background: ${(p) => p.theme.gray2};
		border-radius: 2px;
		cursor: pointer;

		input[type='range'] {
			position: absolute;
			top: 0;
			cursor: pointer;
			width: 100%;
			-webkit-appearance: none;
			outline: none;
			background: none;
			height: 4px;
			border-radius: 4px;

			&::-webkit-slider-thumb {
				position: relative;
				-webkit-appearance: none;
				background: ${(p) => p.theme.gray5};
				width: 4px;
				height: 4px;
				border-radius: 50%;
				opacity: 0;
			}

			&::-webkit-slider-runnable-track {
				background: rgba(0, 0, 0, 0.1);
				height: 4px;
				border-radius: 4px;
			}

			&:hover + .progress-bar__progress-inner:before {
				opacity: 1;
			}
		}

		.progress-bar__progress-inner {
			position: absolute;
			z-index: 3;
			left: 0;
			top: 0px;
			height: 100%;
			border-radius: 3px;
			background: ${(p) => p.theme.gray5};
			pointer-events: none;

			&:before {
				position: absolute;
				content: '';
				right: -5px;
				top: -3px;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background: #ffffff;
				box-shadow: 0 0px 10px ${(p) => p.theme.gray1};
				opacity: 0;
				transition: opacity linear 0.2s;
			}
		}
	}

	.player-controller__other-controls {
		width: 20%;
		min-width: 150px;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.progress-bar__progress {
			width: 100px;
		}
	}

	.copyright {
		flex: auto;

		background: transparent;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 ${(p) => p.theme.paddingBase};
		font-size: 14px;

		a {
			text-decoration: none;
			color: ${(p) => p.theme.gray4};
			font-weight: bold;

			&:hover {
				text-decoration: underline;
			}
		}

		p.warning {
			font-weight: bold;
			color: #ef1d1d;

			a {
				color: #ef1d1d;
			}
		}

		button.footer_sign-up-btn {
			font-size: 14px;
			width: auto;
			height: auto;
			padding: ${(p) => p.theme.paddingSmall} 45px;
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
	}
`;

export default AudioPlayerWrapper;
