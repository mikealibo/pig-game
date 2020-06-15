/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameStatus;
init();


// ROLL THE DICE
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gameStatus) {

        // create the dice
        var dice = Math.floor( ( Math.random() * 6 ) + 1);

        // change the dice by the result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";

        // check if the dice roll is 1 then the next player will be playing
        if(dice !== 1) {

            // add the dice roll to roundscore
            roundScore += dice;

            // add the current score on current player
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            
        } else {
            // set the next player
            nextplayer();
        }
    }

});

// HOLD THE SCORE
document.querySelector('.btn-hold').addEventListener('click', function () {

    if(gameStatus) {

        // add the round score to global score of current player
        scores[activePlayer] += roundScore;
        
        // get the score of the current player on global score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if the score win
        if(scores[activePlayer] >= 100) {
            // WINNER
            roundScore = 0;
            document.getElementById('name-' + activePlayer).textContent = "Winner!!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            document.querySelector('.dice').style.display = "none";
            gameStatus = false;
        } else {
            // set the next player
            nextplayer();
        }
    }

});

// NEW GAME/RESET THE GAME
document.querySelector('.btn-new').addEventListener('click', init);

// NEXT PLAYER
function nextplayer() {

    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector('.dice').style.display = "none";
    activePlayer = activePlayer === 0 ? 1 : 0 ;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameStatus = true;
    
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;
    document.getElementById('score-0').textContent = roundScore;
    document.getElementById('score-1').textContent = roundScore;
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
}