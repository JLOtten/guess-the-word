//ul of player's guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
//button with text "Guess!" in it
const guessLetterButton = document.querySelector(".guess");
//text input where the player will guess a letter
const playerGuess = document.querySelector(".letter");
//empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//hidden button that will appear promption the player to play again
const playAgainButton = document.querySelector(".play-again");

//starting test word
const word = "magnolia";

//create and name a functionto update the paragraph's innerText for worde-in-progress
const updateWords = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

updateWords(word);

//add an event listener for when the player clicks the guess button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); //b/c you're working with a form, you want to prevent the default behavior of clicking a button ->the form submitting -> and reloading the page
    //empty the message paragraph
    message.innerText = "";
    //grab what was entererd in the input
    const guess = letterInput.value;
    //make sure guess was a single value
    const goodGuess = checkInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//create a name and function that accepts the input value as a parameter. 
//this functions purpose is to validate the player's input
const checkInput = function (input) {
    //create a variable with a regular expressioin for the accepted letter sequence
    const acceptedLetter = /[a-zA-Z]/;

    //use a conditional block to check for different scenarios
    if (input.length === 0) {
        //is the input empty?
    message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        //was more than one number typed in?
    message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        //did you type something that's not a letter?
    message.innerText = "Please enter a letter from A to Z.";
    } else {
    //one single letter was entered
    return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters. includes(guess)) {
        message.innerText = "That letter was already guessed. Please try a different letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};