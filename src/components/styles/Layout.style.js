import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		font-family: 'Roboto', 'Noto Serif TC', serif, sans-serif;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		line-height: 1.5;
	}

	body {
		font-family: 'Roboto', 'Noto Serif TC', serif, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow: hidden;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
`;

export default styled.div`
	/* App container css */
	.Spotify-clone-App-container {
		display: grid;
		width: 100%;
		height: 100vh;
		min-width: 768px;
		min-height: 600px;
		overflow: hidden;
		grid-template-columns: 240px 1fr;
		grid-template-rows: 1fr 90px;
		grid-template-areas:
			'side main'
			'footer footer';
	}

	nav.App-container__navigation {
		grid-area: side;
	}

	div.App-container__main-page {
		grid-area: main;
		position: relative;
		overflow: hidden;
	}

	div.App-container__main-page__content {
		min-height: calc(600px - 90px);
		height: calc(100vh - 90px);
		overflow-y: auto;
	}

	footer.App-container__music-player-controller {
		grid-area: footer;
		width: 100%;
	}

	.auth-loading {
		width: 100vw;
		height: 30vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 8px;
		font-size: 24px;
		margin: 0;
		text-align: center;

		.lds-spinner {
			color: official;
			display: inline-block;
			position: relative;
			width: 80px;
			height: 60px;
		}
		.lds-spinner div {
			transform-origin: 40px 40px;
			animation: lds-spinner 1.2s linear infinite;
		}
		.lds-spinner div:after {
			content: ' ';
			display: block;
			position: absolute;
			top: 17px;
			left: 37px;
			width: 3px;
			height: 12px;
			border-radius: 20%;
			background: ${(p) => p.theme.mint};
		}
		.lds-spinner div:nth-child(1) {
			transform: rotate(0deg);
			animation-delay: -1.1s;
		}
		.lds-spinner div:nth-child(2) {
			transform: rotate(30deg);
			animation-delay: -1s;
		}
		.lds-spinner div:nth-child(3) {
			transform: rotate(60deg);
			animation-delay: -0.9s;
		}
		.lds-spinner div:nth-child(4) {
			transform: rotate(90deg);
			animation-delay: -0.8s;
		}
		.lds-spinner div:nth-child(5) {
			transform: rotate(120deg);
			animation-delay: -0.7s;
		}
		.lds-spinner div:nth-child(6) {
			transform: rotate(150deg);
			animation-delay: -0.6s;
		}
		.lds-spinner div:nth-child(7) {
			transform: rotate(180deg);
			animation-delay: -0.5s;
		}
		.lds-spinner div:nth-child(8) {
			transform: rotate(210deg);
			animation-delay: -0.4s;
		}
		.lds-spinner div:nth-child(9) {
			transform: rotate(240deg);
			animation-delay: -0.3s;
		}
		.lds-spinner div:nth-child(10) {
			transform: rotate(270deg);
			animation-delay: -0.2s;
		}
		.lds-spinner div:nth-child(11) {
			transform: rotate(300deg);
			animation-delay: -0.1s;
		}
		.lds-spinner div:nth-child(12) {
			transform: rotate(330deg);
			animation-delay: 0s;
		}
		@keyframes lds-spinner {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	}
`;
