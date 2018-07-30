//=============
// Dependencies
//=============
const Word = require("./Word");
const inquirer = require("inquirer");
const colors = require("colors");

//==========
// Variables
//==========
const TRIES = 10;
var WINS = 0;
var LOSSES = 0;
var CHOICES = shuffle([
    "Hello World", "Game of Thrones", "I'm sexy and I know it", 
    "Winter is Coming", "A dog is a man's best friend"
])

//--------------------- Functions ---------------------

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
 * Play one round of Hangman and prompt for next round(s)
 * @param {number} tries 
 * @param {Word} wordObj
 * @param {string[]} seen
 * @returns {boolean} true if a round of game is over
 */
function playGame(tries, wordObj, seen) {
    console.log(wordObj.toString());
    if (wordObj.wordCorrect) {
        WINS += 1;
        console.log(`You guessed it!`.bold.green)
        promptNextGame();
        return true;
    }
    if (tries < 1) {
        LOSSES += 1;
        console.log(`You lost this round!`.bold.red);
        promptNextGame();
        return true;
    }
    inquirer.prompt([
        {
            type: 'input',
            message: `Guess a letter:`,
            name: 'guess',
            validate: (input) => {
                if (seen.includes(input.toLowerCase())) {
                    return `You've guessed this already!`;
                }
                return input.length === 1 && /[a-z]/i.test(input) ? true: `Please only guess ` +  `one `.magenta  + `letter`.italic.underline + ` at a time!`;
            }
        }
    ]).then((answer) => {
        let input = answer.guess.toLowerCase();
        seen.push(input);
        let guessResult = wordObj.makeGuess(input);
        if (guessResult) {
            console.log(`Correct!`.green + ` Tries left: ` + `${tries}`.bold);
            playGame(tries, wordObj, seen);
        } else {
            console.log(`NOT Correct!`.yellow + ` Tries left:` + `${tries - 1}`.bold);
            playGame(tries - 1, wordObj, seen);
        }

    })

}

/**
 * After each round of Hangman, prompt the user for the next round.
 */
function promptNextGame() {
    if (CHOICES.length > 0) {
        inquirer.prompt([
            {
                type: 'confirm',
                message: `Start new round?`,
                name: 'newGame'
            }
        ]).then(answer => {
            if (answer.newGame) {
                let currWord = new Word(CHOICES[0]);
                CHOICES = CHOICES.slice(1);
                playGame(TRIES, currWord, []);
            } else {
                console.log(`You won: ${WINS} round(s), lost ${LOSSES} round(s).`);
                console.log(`You're always welcome back!`);
            }
        })
    } else {
        console.log(`You've played all the games!`.underline);
        console.log(`You won: ${WINS} round(s), lost ${LOSSES} round(s).`);
    }
}

//==============
// Start of Game
//==============
promptNextGame();
