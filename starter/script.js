'use strict';

//Selecting the player Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Player score elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

//Dice element
const diceEl = document.querySelector('.dice');

//Current score element
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Selecting button elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Setting the score display to zero when the application is loaded.
score0El.textContent = 0;
score1El.textContent = 0;

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function()
{
    //giving values to delcared variables.
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    //resetting scores
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    //Adds the hidden class to the dice element so that the dice display is hidden when the game is loaded.
    diceEl.classList.add('hidden');

    //Will remove the Winner from the players.
    //document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    //sets the player one back to active.
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    
    
};

init();

const switchPlayer = function()
{
    //Switch to next player.
    //Switches the score back to zero of the current player before  switching to new player.
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //Will "Add or Remove" the player--active class from the current player to the next player.
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function()
{
    if(playing)
    {
        //Generates a random number between 1-6
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Removes the hidden class from the dice element once the player clicks roll.
        diceEl.classList.remove('hidden');

        //adds the random dice roll to the image name to display the same number as the dice.
        diceEl.src = `dice-${dice}.png`;

        //Need to check if rolled 1, then switch to different player
        if(dice !== 1)
        {
            //Add dice to current score.
            //currentScore = currentScore + dice;
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;     
        }
        else
        {
            switchPlayer();
        }
    }
});

//Adds the function to the hold button
btnHold.addEventListener('click', function()
{
    if(playing)
    {
        //Add current score to total score of active player
        //Ex scores[1] = scores[1] + currentScore;
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        //Check if player's score is >= 100
        if(scores[activePlayer] >= 100)
        {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else
        {
            switchPlayer();
        }
    }
});

//Resetting the game.
btnNew.addEventListener('click', init);
