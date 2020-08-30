/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// document.getElementById('current-0').textContent = dice;
var score, activePlayer, roundScore, gamePlaying;

init();

function init() {
    // 1. reset vars
    gamePlaying = true;
    score = [0,0];
    activePlayer = 0;
    roundScore = 0;

    // 2. reset scores in UI
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // 3. remove dice
    document.querySelector('.dice').style.display = 'none';

    // 3.1  Display roll dice and hold buttons
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    // 4. toggle winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';  

    // 5. remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); //player 1 active upon init
}
function changePlayer() {
    // 0. Hide the dice
    //diceDOM.style.display = 'none';

    // 1. reset previous active player
    document.getElementById('current-'+activePlayer).textContent = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    //document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');

    // 2. Change active player
    activePlayer === 0? activePlayer = 1: activePlayer = 0;

    // 3. Update new active player
    roundScore = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
    //document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice = Math.ceil((Math.random() * 6));
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        if(dice !== 1) {
            // Update round score/current score
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        } else {
            // Next player
            changePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        score[activePlayer] += roundScore;
        document.getElementById('score-'+activePlayer).textContent = score[activePlayer];
        document.getElementById('current-'+activePlayer).textContent = 0;  
    
        if(score[activePlayer] >= 100) {
            //Declare winner
            document.getElementById('name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    
            //Stop the game
            gamePlaying = false;

            //Disable roll dice and hold buttons
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';

        }
        else {
            changePlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

