import './style.css'


let gameTitle = document.querySelector('.game-title');


// Game initiate section
let playBtn = document.querySelector('.play-btn');
let playerName = document.querySelector('input[name="playerName"]');


// UI Component section 

let nameSectionUI = document.querySelector('.game-initiate');
let gameSectionUI = document.querySelector('.game-started');

// Guess Game section 
let guessedNumber = document.querySelector('input[name="guessedNumber"]');
let guessBtn = document.querySelector('.guess-btn');
let playGameBtn = document.querySelector('.playGame-btn');

// response UI component section 

let responseSectionUI = document.querySelector('.game-response');




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



// creation of random number, and remembering the number of tries 
let randomNumber = Math.floor(Math.random() * 101);
let attempts = 5;


// as the name implies
function gettingGuessedNumber(e) {
    if(e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
        if (guessedNumber.value > 100 || guessedNumber.value < 0) {

            // handling out of bound values
            guessedNumber.value = "O to 100 only"
    
        } else if (guessedNumber.value === "") {
    
            // setting the default value 5, when the no value is provided
            guessedNumber.value = 5;
    
            // console.log("value set");
    
        } else if (guessedNumber.value >= 0 || guessedNumber.value <= 100) {
    
            // wrapper's internal structure: 
            // <p>10 is Too High!</p>  <p>(1 Attempt left)</p> 
    
            let wrapper = document.createElement('section');
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = 'space-between';
    
            // first flex-item on row
            let response = document.createElement('p');
            response.style.marginRight = "1rem";
    
            // last flex-item on row
            let attemptLeft = document.createElement('p');
    
            // calling function to determine the whether the number is too high, high, too low, low or near to the random number as the user guesses
            let guessHint = howClose(guessedNumber.value, randomNumber);
    
            // limiting the numbers of attempts
            attempts -= 1;
            
            // making the full sentences from the guessHint
            let updatedGuessHint;
    
            // win case:
            if(guessHint === 1) {
                updatedGuessHint =  `Congratulations, ${playerName.value} Won the game!!`;
    
                // standing out the win statement
                response.style.fontSize = "2rem";
                response.style.color = "green";
    
                // if set to 0, it will be displayed both lose, and win statement due to being condition truthy in if else conditional of attempt below down.
                attempts = -1;
    
                response.textContent = updatedGuessHint;
    
            } else if (attempts > 0){
                // attempt ongoing case
                // ex: 10 is Too High!
                updatedGuessHint = `${guessedNumber.value} is ${guessHint}`;
    
                response.style.color = "white";
                response.textContent = updatedGuessHint;
            }
    
            // dynamic attempt prompt 
    
            if(attempts > 1) {
                // when there are more than one attempt, use plural "attempts"
    
                attemptLeft.textContent = `${attempts} attempts left`;
                attemptLeft.style.color = "blue";
    
            } else if (attempts === 1) {
                // when only one attempt is left, use singular "attempt"
    
                attemptLeft.textContent = `Only ${attempts} attempt left`;
                attemptLeft.style.color = "blue";
    
            } else if (attempts === 0){ 
                // not to be displayed unnecessary "You Lose!" statement, in the case of being it more negative when the user keeps clicking on guess it button 
    
                attemptLeft.textContent = "You Lose!, Better Luck Next Time";
    
                // standing out the lose statement
                attemptLeft.style.fontSize = "2rem";
                attemptLeft.style.color = "red";
            }
            
            // wrapping it up in parenthesis
    
            // bug documentation: 
            // attemptLeft.textContent = `(${attemptLeft.textContent})`; 
            // above line will add only "()"  with win case statement, because every statement of how many attempts left is given by attempt conditionals or lose statement, however exception case is only win statement. (in lose statement, attempts === 0. like that specific condition does not go with win due to being guessed exact number when, is uncertain)
            attemptLeft.textContent = attemptLeft.textContent !== "" ? `(${attemptLeft.textContent})` : ""; 
    
            // adding elements in responseSectionUI to be displayed
            wrapper.appendChild(response);
            wrapper.appendChild(attemptLeft);
    
            
            console.log(randomNumber);
            responseSectionUI.appendChild(wrapper);
        }    
    }
}


// a function to determine guessedNumber relatively to the random number, be it high, low or near.
function howClose(guessedNumber, randomNumber) {

    if(guessedNumber > randomNumber) {

        if ((guessedNumber - 10) > randomNumber) {
            return "Too High!";
        } else if ((guessedNumber - 5) > randomNumber) {
            return "High!";
        } else {
            return "Near (HINT : LOW)";
        }

    } else if (guessedNumber < randomNumber){

        if ((randomNumber - 10 > guessedNumber)) {
            return "Too Low!"
        } else if ((randomNumber - 5 > guessedNumber)) {
            return "Low!";
        } else {
            return "Near (HINT : PLUS)";
        }

    } else {
        // in the case of exact match;
        return 1;
    }
}

// event listeners 
guessBtn.onclick = gettingGuessedNumber;
guessedNumber.onkeydown = gettingGuessedNumber;


function playGameFn() {
        attempts = 5;
        randomNumber = Math.floor(Math.random() * 101);
        guessedNumber.value = "";
        responseSectionUI.textContent = "";
}


playGameBtn.onclick = playGameFn;

// Future scope: theme of the button color could be more of theme wises, blue as the statements of attempts. balance the color yellow out in the game UI section.