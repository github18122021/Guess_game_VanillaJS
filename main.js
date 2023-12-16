import './style.css'

let playBtn = document.querySelector('.play-btn');
let playerName = document.querySelector('input[name="playerName"]');

let gameTitle = document.querySelector('.game-title');

let nameSectionUI = document.querySelector('.game-initiate');
let gameSectionUI = document.querySelector('.game-started');

function gettingName(e) {
    if(e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
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
}

playBtn.onclick = gettingName;
playerName.onkeydown = gettingName;


let guessedNumber = document.querySelector('input[name="guessedNumber"]');
let guessBtn = document.querySelector('.guess-btn');

let randomNumber = Math.floor(Math.random() * 101);
let tried = 0;

function gettingGuessedNumber(e) {

    if (guessedNumber.value > 100 || guessedNumber.value < 0) {
        guessedNumber.value = "O to 100 only"
    } else if (guessedNumber.value === "") {
        guessedNumber.value = 5;
        console.log("value set");
    } else if (guessedNumber >= 0 || guessedNumber.value <= 100) {
        console.log(guessedNumber.value);
        console.log(howClose(guessedNumber.value, randomNumber));
    }
    console.log(guessedNumber.value);
}

function howClose(guessedNumber, randomNumber) {

    if(guessedNumber > randomNumber) {
        if ((guessedNumber - 10) > randomNumber) {
            return "Too High";
        } else if ((guessedNumber - 5) > randomNumber) {
            return "High";
        } else {
            return "Near (HINT : LOW)";
        }
    } else if (guessedNumber < randomNumber){
        if ((randomNumber - 10 > guessedNumber)) {
            return "Too Low"
        } else if ((randomNumber - 5 > guessedNumber)) {
            return "Low";
        } else {
            return "Near (HINT : PLUS)";
        }
    } else {
        console.log(randomNumber, guessedNumber);
    }

    // let tooHigh = randomNumber + 10;
    // let high = randomNumber + 5;
    // let near = randomNumber + 5;

    // let tooLow = randomNumber - 10;
    // let low = randomNumber - 5;
    // let near2 = randomNumber - 5;
    // console.log("random Number", randomNumber);
    // if (guessedNumber > tooHigh) {
    //     return "Too High";
    // } else if (guessedNumber > high) {
    //     return "High";
    // } else if (guessedNumber < near || guessedNumber > near2) {
    //     return "Near";
    // } else if (guessedNumber < low) {
    //     return "low";
    // } else if (guessedNumber < tooLow) {
    //     return "Too Low;"
    // } else {
    //     console.log("GN, Rn", guessedNumber, randomNumber);
    // }
}

guessBtn.onclick = gettingGuessedNumber;