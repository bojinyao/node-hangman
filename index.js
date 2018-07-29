const Word = require("./Word");
const inquirer = require("inquirer");
const TRIES = 10;
var CHOICES = shuffle([
    "hello world", "game of thrones"
])

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * 
 * @param {number} tries 
 * @param {Word} wordObj 
 * @returns {boolean} true if a round of game is over
 */
function playGame(tries, wordObj) {
    console.log(wordObj.toString());
    if (wordObj.wordCorrect) {
        console.log(`You guessed it!`)
        promptNextGame();
        return true;
    }
    if (tries < 1) {
        console.log(`You lost this round!`);
        promptNextGame();
        return true;
    }
    inquirer.prompt([
        {
            type: 'input',
            message: `Guess a letter:`,
            name: 'guess',
            validate: (input) => {
                return input.length === 1 && /[a-z]{1}/i.test(input) ? true: `Please only guess one letter at a time!`;
            }
        }
    ]).then((answer) => {
        let guessResult = wordObj.makeGuess(answer.guess);
        if (guessResult) {
            console.log(`Correct! Tries left: ${tries}`);
            playGame(tries, wordObj);
        } else {
            console.log(`NOT Correct! Tries left: ${tries - 1}`);
            playGame(tries - 1, wordObj);
        }

    })

}

function promptNextGame() {
    if (CHOICES.length > 0) {
        inquirer.prompt([
            {
                type: 'confirm',
                message: `Start new game?`,
                name: 'newGame'
            }
        ]).then(answer => {
            if (answer.newGame) {
                let currWord = new Word(CHOICES[0]);
                CHOICES = CHOICES.slice(1);
                playGame(TRIES, currWord);
            } else {
                console.log(`You're always welcome back!`);
            }
        })
    } else {
        console.log(`You've played all the games!`);
    }
}

promptNextGame();
