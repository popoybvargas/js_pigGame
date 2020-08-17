/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* VARIABLES */
let dice, dice1, dice2, activePlayer, roundScore, globalScores, totalCurrentScore, gotWinner, previousDice, targetScore;

/* DOM ELEMENTS */
const playerPanel0 = document.querySelector('.player-0-panel');
const playerPanel1 = document.querySelector('.player-1-panel');
const globalScoreDOM0 = document.getElementById('score-0');
const globalScoreDOM1 = document.getElementById('score-1');
const currentScoreDOM0 = document.getElementById('current-0');
const currentScoreDOM1 = document.getElementById('current-1');
// const diceImgDOM = document.querySelector('img.dice');
const diceImgsDOM = document.getElementById( 'dices' );
const dice1ImgDOM = document.querySelector('img.dice-1');
const dice2ImgDOM = document.querySelector('img.dice-2');
const rollDiceDOM = document.querySelector('button.btn-roll');
const holdDOM = document.querySelector('button.btn-hold');
const newGameDOM = document.querySelector('button.btn-new');
const targetScoreDOM = document.querySelector( '.target-score' );

window.setGlobalScoreForPlayer0 = () => globalScoreDOM0.textContent = totalCurrentScore;
function setGlobalScoreForPlayer1() { globalScoreDOM1.textContent = totalCurrentScore; }

const init = () => {
	if (gotWinner) {
		document.querySelector(`.player-${activePlayer}-panel`).classList.remove('winner');
		// document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
		document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
	}
	activePlayer = 0;
	roundScore = 0;
	globalScores = [0, 0];
	totalCurrentScore = 0;
	gotWinner = false;
	dice = 0;
	dice1 = 0;
	dice2 = 0;
	previousDice = 0;
	globalScoreDOM0.textContent = 0;
	globalScoreDOM1.textContent = 0;
	currentScoreDOM0.textContent = 0;
	currentScoreDOM1.textContent = 0;
	// diceImgDOM.style.display = 'none';
	diceImgsDOM.style.display = 'none';
	playerPanel0.classList.add('active');
	holdDOM.disabled = false;
	targetScoreDOM.disabled = false;
	targetScoreDOM.select();
	targetScoreDOM.focus();
};
init();

targetScoreDOM.addEventListener( 'focusout', () =>
{
	const targetScoreInput = targetScoreDOM.value;

	if ( ! targetScoreInput || isNaN( targetScoreInput ) || targetScoreInput < 13 ) targetScoreDOM.value = 100;

	targetScore = targetScoreInput;
	targetScoreDOM.disabled = true;
});

const switchTurn = ( rolled2Sixes = false ) =>
{
	playerPanel0.classList.toggle('active');
	playerPanel1.classList.toggle('active');
	previousDice = 0;
	roundScore = 0;
	totalCurrentScore = 0;

	if ( rolled2Sixes )
	{
		globalScores[ activePlayer ] = 0;
		window[`setGlobalScoreForPlayer${activePlayer}`]();
	}
	currentScoreDOM0.textContent = 0;
	currentScoreDOM1.textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
};

const winCheck = () => {
	if ( totalCurrentScore >= ( targetScoreDOM.value || 100 ) )
	{
		document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
		document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
		document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
		holdDOM.disabled = true;
		gotWinner = true;
		holdScore();
	}
};

const rollDice = () =>
{
	if (!gotWinner) {
		// diceImgDOM.style.display = 'none';
		diceImgsDOM.style.display = 'none';
		// dice = Math.ceil(Math.random() * 6);
		dice1 = Math.ceil(Math.random() * 6);
		dice2 = Math.ceil(Math.random() * 6);
		// diceImgDOM.src = `dice-${dice}.png`;
		dice1ImgDOM.src = `dice-${dice1}.png`;
		dice2ImgDOM.src = `dice-${dice2}.png`;
		window.setTimeout(() => {
			// diceImgDOM.style.display = 'block';
			diceImgsDOM.style.display = 'block';

			// if (dice > 1) {
			if ( dice1 > 1 && dice2 > 1 )
			{
				// if (previousDice === 6 && dice === 6) switchTurn(true);
				if ( dice1 === 6 && dice2 === 6 ) switchTurn( true );

				// previousDice = dice;
				// roundScore += dice;
				roundScore += dice1 + dice2;
				document.getElementById(`current-${activePlayer}`).textContent = roundScore;
				totalCurrentScore = (document.getElementById(`score-${activePlayer}`).textContent * 1) + roundScore;
				winCheck();
			} else { switchTurn(); }
		}, 250);
	}
};
rollDiceDOM.addEventListener('click', rollDice);

const holdScore = () => {
	globalScores[activePlayer] = totalCurrentScore;
	window[`setGlobalScoreForPlayer${activePlayer}`]();

	if (!gotWinner) switchTurn();
};
holdDOM.addEventListener('click', holdScore);

newGameDOM.addEventListener('click', init);

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/