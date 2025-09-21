
const readline = require('readline');

function getHint(word, correctGuesses) {
    return word.split('').map(letter => correctGuesses.includes(letter) ? letter : '_').join('');
}

function runGame() {
    const words = ["HANGMAN", "PYTHON", "DEVELOPER", "COMPUTER", "PROGRAMMING"];
    const word = words[Math.floor(Math.random() * words.length)]; 
    let attemptsLeft = 6; 
    let guessedLetters = []; 
    let correctGuesses = []; 

    console.log("Welcome to Hangman!");
    console.log("Try to guess the word.");
    console.log(`The word has ${word.length} letters.`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    function gameLoop() {
        const hint = getHint(word, correctGuesses);
        console.log(`\nCurrent Word: ${hint}`);
        console.log(`Attempts left: ${attemptsLeft}`);
        console.log(`Guessed letters: ${guessedLetters.join(', ')}`);

        rl.question("Enter a letter: ", (guess) => {
            guess = guess.toUpperCase();

            
            if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
                console.log("Invalid input. Please enter a single letter.");
                gameLoop(); 
                return;
            }

            if (guessedLetters.includes(guess)) {
                console.log("You've already guessed that letter.");
                gameLoop(); 
                return;
            }
            
            guessedLetters.push(guess);

           
            if (word.includes(guess)) {
                correctGuesses.push(guess);
                console.log(`Good job! '${guess}' is in the word.`);
            } else {
                attemptsLeft--;
                console.log(`Oops! '${guess}' is not in the word.`);
            }

            
            if (word.split('').every(letter => correctGuesses.includes(letter))) {
                console.log(`Congratulations! You guessed the word '${word}' correctly!`);
                rl.close();
                return;
            }

            
            if (attemptsLeft === 0) {
                console.log(`\nSorry, you're out of attempts. The correct word was '${word}'. Better luck next time!`);
                rl.close();
                return;
            }

            gameLoop();
        });
    }

    gameLoop();
}

runGame();
