#! /usr/bin/env node
import inquirer from "inquirer";
function guessNumberGame() {
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    function promptGuess() {
        inquirer.prompt({
            type: 'input',
            name: 'guess',
            message: 'Guess the number (between 1 and 10):',
            validate: (value) => {
                const parsedValue = parseInt(value);
                if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 10) {
                    return 'Please enter a valid number between 1 and 10';
                }
                return true;
            }
        }).then(answer => {
            const guessedNumber = parseInt(answer.guess);
            attempts++;
            if (guessedNumber === secretNumber) {
                console.log(`Congratulations! You guessed the number in ${attempts} attempts.`);
                playAgain();
            }
            else {
                console.log(guessedNumber > secretNumber ? 'Higher!' : 'Lower!');
                promptGuess();
            }
        });
    }
    function playAgain() {
        inquirer.prompt({
            type: 'confirm',
            name: 'playAgain',
            message: 'Do you want to play again?',
            default: false
        }).then(answer => {
            if (answer.playAgain) {
                guessNumberGame(); // Start a new game
            }
            else {
                console.log('Thanks for playing! Goodbye.');
            }
        });
    }
    promptGuess();
}
// Start the game
guessNumberGame();
