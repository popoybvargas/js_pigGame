/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* VARIABLES */
const winScore = 50;
let dice, activePlayer, roundScore, globalScores, totalCurrentScore, gotWinner;

/* DOM ELEMENTS */
const playerPanel0 = document.querySelector('.player-0-panel');
const playerPanel1 = document.querySelector('.player-1-panel');
const globalScoreDOM0 = document.getElementById('score-0');
const globalScoreDOM1 = document.getElementById('score-1');
const currentScoreDOM0 = document.getElementById('current-0');
const currentScoreDOM1 = document.getElementById('current-1');
const diceImgDOM = document.querySelector('img.dice');
const rollDiceDOM = document.querySelector('button.btn-roll');
const holdDOM = document.querySelector('button.btn-hold');
const newGameDOM = document.querySelector('button.btn-new');

const init = () => {
	if (gotWinner) {
		isPlayer1() ? playerPanel0.classList.remove('winner') : playerPanel1.classList.remove('winner');
		isPlayer1() ? playerPanel0.classList.remove('active') : playerPanel1.classList.remove('active');
		isPlayer1() ? document.getElementById('name-0').textContent = 'Player 1' : document.getElementById('name-1').textContent = 'Player 2';
	}
	activePlayer = 0;
	roundScore = 0;
	globalScores = [0, 0];
	totalCurrentScore = 0;
	gotWinner = false;
	globalScoreDOM0.textContent = 0;
	globalScoreDOM1.textContent = 0;
	currentScoreDOM0.textContent = 0;
	currentScoreDOM1.textContent = 0;
	diceImgDOM.style.display = 'none';
	playerPanel0.classList.add('active');
	holdDOM.disabled = false;
};
init();

const isPlayer1 = () => activePlayer === 0;

const swithchTurn = () => {
	playerPanel0.classList.toggle('active');
	playerPanel1.classList.toggle('active');
	roundScore = 0;
	totalCurrentScore = 0;
	currentScoreDOM0.textContent = 0;
	currentScoreDOM1.textContent = 0;
	isPlayer1() ? activePlayer = 1 : activePlayer = 0;
};

const winCheck = () => {
	if (totalCurrentScore >= winScore) {
		document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
		isPlayer1() ? playerPanel0.classList.remove('active') : playerPanel1.classList.remove('active');
		isPlayer1() ? playerPanel0.classList.add('winner') : playerPanel1.classList.add('winner');
		holdDOM.disabled = true;
		gotWinner = true;
		holdScore();
	}
};

const rollDice = () => {
	if (!gotWinner) {
		diceImgDOM.style.display = 'none';
		dice = Math.ceil(Math.random() * 6);
		diceImgDOM.src = `dice-${dice}.png`;
		window.setTimeout(() => {
			diceImgDOM.style.display = 'block';

			if (dice > 1) {
				roundScore += dice;
				isPlayer1() ? currentScoreDOM0.textContent = roundScore : currentScoreDOM1.textContent = roundScore;
				totalCurrentScore = (document.getElementById(`score-${activePlayer}`).textContent * 1) + roundScore;
				winCheck();
			} else { swithchTurn(); }
		}, 250);
	}
};
rollDiceDOM.addEventListener('click', rollDice);

const holdScore = () => {
	globalScores[activePlayer] = totalCurrentScore;
	isPlayer1() ? globalScoreDOM0.textContent = totalCurrentScore : globalScoreDOM1.textContent = totalCurrentScore;

	if (!gotWinner) swithchTurn();
};
holdDOM.addEventListener('click', holdScore);

newGameDOM.addEventListener('click', init);