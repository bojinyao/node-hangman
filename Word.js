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
        this.secret = secret;
        this.wordCorrect = false;
        this.chars = [];
        for (let i = 0; i < this.secret.length; i ++) {
            this.chars.push(new Letter(this.secret.charAt(i)))
        }
    }

    /**
     * 
     * @param {string} guess 
     * @returns {boolean} return true if guess matches one of the letters, false otherwise.
     */
    makeGuess(guess) {
        if (this.secret.toLowerCase().includes(guess.toLowerCase())) {
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

module.exports = Word;