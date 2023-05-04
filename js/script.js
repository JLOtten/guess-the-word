//ul of player's guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with text "Guess!" in it
const guessLetterButton = document.querySelector(".guess");
//text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//hidden button that will appear promption the player to play again
const playAgainButton = document.querySelector(".play-again");

//starting test word
let word = "magnolia"; //changed from const to let so this could be reassigned later
const guessedLetters = [];
let remainingGuesses = 8;

//add an async function 
const getword = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    console.log(words);
    //split the text file into words at each delimiter ("\n") and save it to an array
    const wordArray = words.split("\n");
    //grab a random word from the wordsArray
    const randomIndex = Math.floor(Math.random() * wordArray.length); //create a variable to pull a random index from wordArray
    word = wordArray[randomIndex].trim(); //pull a random word from the wordArray and trim extra whitespace, reassign the exsisting value of word to this
    placeholder(word); //call this function & pass it the random, trimmed word
};

//start game
getword();

//create and name a function to update the paragraph's innerText for word-in-progress
//display our symbols as placeholders for the chosen wor
const placeholder = function (word) { //function declaration
    const placeholderLetters = []; //name a variable for an empty array
    for (const letter of word) { //loop through each letter in the word
        console.log(letter); //print out the letter to the console
        placeholderLetters.push("●"); //add the dot icon to the empty array
    }
    wordInProgress.innerText = placeholderLetters.join(""); //change the dot to a letter and join it to array
};

placeholder(word); //call this function on the word magnolia

//add an event listener for when the player clicks the guess button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); //b/c you're working with a form, you want to prevent the default behavior of clicking a button ->the form submitting -> and reloading the page
    //empty the message paragraph
    message.innerText = ""; 
    //grab what was entererd in the input
    const guess = letterInput.value;
    //make sure guess was a single value
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        //there's a single letter input, so make the guess
        makeGuess(guess);
    } 
    letterInput.value = "";
});

//create a name and function that accepts the input value as a parameter. 
//this functions purpose is to validate the player's input
const validateInput = function (input) {
    //create a variable with a regular expression for the accepted letter sequence
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

const makeGuess = function (guess) { //call makeGuess function on guess param
    guess = guess.toUpperCase(); //change the guessed letter to uppercase
    if (guessedLetters. includes(guess)) { //if the entered letter is already in the array, send the following message:
        message.innerText = "That letter was already guessed. Please try a different letter.";
    } else { //if a new letter was guessed, add that to the guessedLetters array
        guessedLetters.push(guess); //
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters(); //call this function to see the letter displayed when it hasn't been guessed before
        updateWordInProgress(guessedLetters);
    }
};


//function to update the page with the letters the player guesses
const showGuessedLetters = function () {
    //clear the list first
    guessedLettersElement.innerHTML = ""; //empty the text of the ul where the guessed letters display
    for (const letter of guessedLetters) { //create a new item for each letter inside your guessedLetters array
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li); //add it to the unordered list
    }
};

//create a function to update the word in progress that accepts the guessedLetters array as a parameter.
//this function will replace circle symbols with the correct letters guessed
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); //converts the word variable to uppercase
    const wordArray = wordUpper.split(""); //variable that splits the word string into an array so the letter can appear in the guessedLetters array
    //console.log(wordArray);
    const revealWord = []; //create a new array with updated characters
    for (const letter of wordArray) {  //loop thru each letter in wordArray and check if it includes letters from guessedLetters
        if (guessedLetters.includes(letter)) { //check if wordArray contains any letters from the guessedLetters array
            revealWord.push(letter.toUpperCase()); //if it does, update the circle symbol with the correct letter (in uppercase)
        } else {
        revealWord.push("●"); //if it doesn't include the letter in wordArray, push the dot to the revealWord array
        }
    }
//console.log((revealWord));
wordInProgress.innerText = revealWord.join(""); //use join() to update teh empty paragraph where the word in progress will appear
checkIfWin(); //call function to see if the player won
};

// create a new function that will accept guess as the input param.
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase(); //grab the word and make it uppercase
    if (!upperWord.includes(guess)) { //find out if the word contains the guess
        //bad guess, lose a chance
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1; //subtract the number of guesses remaining
    } else { //if the word does contain the guess, let the player know:
        message.innerText = `Good guess! The word has the letter ${guess}.`; 
    }

    if (remainingGuesses === 0) { //if there are no guesses left, display this message:
        message.innerHTML = `Game over! The word was <span class ="highlight">${word}</span>.`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    } else if (remainingGuesses === 1) { //if there is one remaining guess, update the span inside the paragraph:
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else { //if they have more than one guess left, update the span element to let them know how many guesses are remaining
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//create a function to see if a player won
const checkIfWin = function () {
    //verify if their word in progress matches the word they should guess
    if (word.toUpperCase() === wordInProgress.innerText) { //if the player has won, add t
        message.classList.add("win"); //add the win class to teh empty paragraph where messages appear when they guess the letter
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; //update the paragraph's contents
    }
};