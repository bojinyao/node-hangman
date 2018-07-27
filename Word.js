const Letter = require("./Letter");

class Word {
    /**
     * 
     * @param {string} secretWord 
     * @param {string} guess 
     */
    constructor(secret) {
        this.secret = secret;
        this.chars = [];
        for (let i = 0; i < secret.length; i ++) {
            this.chars.push(new Letter(secret.charAt(i)))
        }
    }

    makeGuess(char) {
        if (this.secret.includes(char)) {
            this.chars = this.chars.map(letter => letter.makeGuess(char));
            return true;
        }
        return false;
    }

    toString() {
        return this.chars.join(" ");
    }
}
let word = new Word('hello world');
console.log(word.toString())
console.log(word.makeGuess('e'));
console.log(word.toString());
console.log(word.makeGuess('a'));
console.log(word.toString());