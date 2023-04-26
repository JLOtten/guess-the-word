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
const word = magnolia;

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value="";
});

