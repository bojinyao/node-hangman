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
        if (!/[a-z]/i.test(this.val)) {
            this.isSpecialChar = true;
            this.guessed = true;
        } else {
            this.isSpecialChar = false;
        }
    }

    /**
     * Make a guess of this letter and update guessed
     * @param {string} guess 
     */
    makeGuess(guess) {
        if (guess.toLowerCase() === this.val.toLowerCase()) {
            this.guessed = true;
        }
        return this;
    }

    /**
     * Stringfy this Letter Object
     */
    toString() {
        if (this.guessed || this.isSpecialChar) {
            return this.val;
        }
        return '_';
    }
}

module.exports = Letter;
