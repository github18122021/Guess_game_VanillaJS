import './style.css'

let playBtn = document.querySelector('.play-btn');
let playerName = document.querySelector('input[name="playerName"]');

let gameTitle = document.querySelector('.game-title');

let nameSectionUI = document.querySelector('.game-initiate');
let gameSectionUI = document.querySelector('.game-started');

function gettingName(e) {
    // ensuring that the name given by player is not empty

    if (playerName.value !== "") {
        // changing the title name
        gameTitle.textContent = `Welcome to the guess game, ${playerName.value}`;

        // removing the displaying playerName section
        nameSectionUI.style.display = "none";

        // making game section visible
        gameSectionUI.style.display = "block";

    } else {
        // in the case when the name is empty
        playerName.placeholder = "provide a player name!!";
    }
}

playBtn.onclick = gettingName;
playerName.onkeydown = gettingName;