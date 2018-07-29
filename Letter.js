/**
 * A Letter Object that is essentially a wrapper one letter.
 */
class Letter {

    /**
     * A Letter Object that contains a letter as val
     * @param {string} val 
     * @param {boolean} guessed 
     * @param {Letter} nextLetter
     */
    constructor(val, nextLetter=null, guessed=false) {
        this.val = val;
        this.guessed = guessed;
        this.nextLetter = nextLetter;
        if (val === ' ') {
            this.isSpace = true;
            this.guessed = true;
        } else {
            this.isSpace = false;
        }
    }

    /**
     * Make a guess of this letter and update guessed
     * @param {string} guess 
     */
    makeGuess(guess) {
        if (guess === this.val) {
            this.guessed = true;
        }
        return this;
    }

    /**
     * Stringfy this Letter Object
     */
    toString() {
        if (this.isSpace) {
            return ' ';
        }
        if (this.guessed) {
            return this.val;
        }
        return '_';
    }
}

module.exports = Letter;
