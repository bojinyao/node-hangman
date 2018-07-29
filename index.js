const Word = require("./Word");
const inquirer = require("inquirer");
const TRIES = 10;
const CHOICES = shuffle([
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
        return true;
    }
    if (tries < 1) {
        console.log(`Game Over!`);
        return true;
    }
    inquirer.prompt([
        {
            type: 'input',
            message: `Guess a letter:`,
            name: 'guess',
            validate: (input) => {
                return /[a-z]{1}/i.test(input);
            }
        }
    ]).then((answer) => {
        let guessResult = wordObj.makeGuess(answer.guess);
        if (guessResult) {
            console.log(`Correct! Tries: ${tries}`);
            playGame(tries, wordObj);
        } else {
            console.log(`NOT Correct! Tries: ${tries - 1}`);
            playGame(tries - 1, wordObj);
        }

    })

}

function main(arr) {
    if (!arr) {
        return;
    }
    let currWord = new Word(arr[0]);
    inquirer.prompt([
        {
            type: 'confirm',
            message: `Start new game?`,
            name: 'newGame'
        }
    ]).then(answer => {
        if (answer.newGame) {
            let roundOver;
            roundOver = playGame(TRIES, currWord);
            while (roundOver !== true) {
                setTimeout(() => {

                }, 1000);
            }
            if (arr.length > 1) {
                main(arr.slice(1));
            } else {
                console.log(`You've played all the games!`);
                return;
            }
        } else {
            console.log(`You're always welcome back!`);
        }
    })
}

// playGame(5, new Word('hello world'));
main(CHOICES);
