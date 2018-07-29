//=============
// Dependencies
//=============
const Letter = require("./Letter");

/**
 * A Word Object made of an array of Letter(s)
 */
class Word {
    /**
     * 
     * @param {string} secretWord 
     * @param {string} guess 
     */
    constructor(secret) {
        this.secret = secret.toLowerCase();
        this.wordCorrect = false;
        this.chars = [];
        for (let i = 0; i < this.secret.length; i ++) {
            this.chars.push(new Letter(this.secret.charAt(i)))
        }
    }

    /**
     * 
     * @param {string} guess 
     * @returns {boolean} return true if 
     */
    makeGuess(guess) {
        guess = guess.toLowerCase();
        if (this.secret.includes(guess)) {
            this.chars = this.chars.map(letter => letter.makeGuess(guess));
            this.wordCorrect = this.checkCorrectness();
            return true;
        }
        return false;
    }

    /**
     * Update this.wordCorrect to true if the user has guessed the word.
     */
    checkCorrectness() {
        for (let i = 0; i < this.secret.length; i++) {
            if (!this.chars[i].guessed) {
                return false;
            }
        }
        return true;
    }

    toString() {
        return this.chars.join(" ");
    }
}
// let word = new Word('abc');
// console.log(word);
// console.log(word.toString())
// console.log(word.makeGuess('c'));
// console.log(word);
// console.log(word.toString());
// console.log(word.makeGuess('a'));
// console.log(word.toString());
// console.log(word.makeGuess('b'));
// console.log(word.toString());
// console.log(word);

module.exports = Word;