
//import {CARD_DATA} from "./card-data.js";

/**
 * Represents a flashcard with face and back sides.
 */
class FlashCard {
    /**
     * Constructor - creates an FlashCard instance.
     * @param {string} suit     One of Wands, Cups, Swords, Pentacles.
     * @param {string} value    The numerical value of the card, written out.
     * @param {string} pic      The path to the image file for the card.
     * @param {string} descr    A description of the card.
     * @param {string} meaning  The divinatory meaning of the card rightside up.
     * @param {string} reverse  The meaning of the card upside down.
     */
    constructor(suit, value, pic, descr, meaning, reverse) {
        Object.assign(
            this, {
                _suit    : suit,
                _value   : value,
                _pic     : pic,
                _descr   : descr,
                _meaning : meaning,
                _reverse : reverse
            });

        this._image     = null;
        this._inverted  = false;
        this._meaning   = document.createElement("p");
        this._reverse   = document.createElement("p");
        this._meaning.innerHTML = meaning;
        this._reverse.innerHTML = reverse;
    }
    get name() {
        return `${this._value} of ${this._suit}` + 
               `${(this._inverted) ? " (reversed)":""}`;
    }
    set reversed(b) {
        this._inverted = b;
        if (this._image) {
            if (this._inverted) {
                this._image.style["transform"] = "rotate(180deg)";
            } else {
                this._image.style["transform"] = "";
            }
        }
    }
    get reversed() {
        return this._inverted;
    }
    /**
     * Property giving the element that holds the content for the face card.
     * The content is an image file for the card.
     * @returns {HTMLElement} The card's face content.
     */
    get face() {
        if (!this._image) {
            let image = new Image();
            image.src = "img/" + this._pic;
            image.style["max-width"] = "100%";
            image.style["max-height"] = "100%";
            image.style["outline"] = "2px solid black";
            this._image = image;
            this.reversed = this.reversed;
        }
        return this._image;
    }
    /**
     * Property giving the element that holds the content for the back side.
     * This holds text giving the divinatory meaning of the card.
     * @returns {HTMLElement} The element with the back side's content.
     */
    get back() {
        return (this._inverted) ? this._reverse : this._meaning;
    }
}

/**
 * An element that can be placed on an HTML page that displays the Tarot cards
 * and reacts to events to pick a random card and display it.
 */
class FlashCardDeck extends HTMLElement {
    /**
     * Creates a new instance for FlashCardDeck.
     */
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._cards = [];
        this._current = null;
        this._load();
    }
    async _load() {
        // Related file: file:///./../html-partials/flash-card.html
        let html = await loadText("./html-partials/flash-card.html");
        this.shadowRoot.innerHTML = html;

        this._face  = this.shadowRoot.getElementById("face");
        this._back  = this.shadowRoot.getElementById("back");
        this._title = this.shadowRoot.getElementById("title");

        let data = JSON.parse(await loadText("./data/card-data.json"));

        for (let obj of data) {
            this._cards.push(new FlashCard(...Object.values(obj)));
        }
        this.pickRandom();
    }
    /**
     * Returns the number of cards in the deck.
     */
    get numCards() {
        return this._cards.length;
    }
    get currentCard() {
        return this._current;
    }
    /**
     * Chooses a card at random and displays it.
     * @param {number[]} [weights] An optional array of weights for each card.
     */
    pickRandom(weights) {
        if (weights) {
            var card = this._wchoose(this._cards, weights);
        } else {
            let idx = Math.floor(Math.random() * this._cards.length);
            var card = this._cards[idx];
        }
        if (card === this._current) {
            card.reversed = !card.reversed;
        } else {
            card.reversed = (Math.random() < 0.50);
        }
        this._title.innerHTML = card.name;

        if (this._current) {
            let curFace = this._face.firstChild;
            let curBack = this._back.firstChild;
            this._face.replaceChild(card.face, curFace);
            this._back.replaceChild(card.back, curBack);
        } else {
            this._face.appendChild(card.face);
            this._back.appendChild(card.back);
        }
        this._current = card;
    }

    /**
     * Produces an array of cummulative values from the array of numbers passed 
     * in.
     * @param {number[]} numbers An array of numbers to accumulate.
     * @returns {number[]} An array of accumulated values.
     */
    static _accumulate(numbers) {
        let accum = [];
        let total = 0;
        for (let n of numbers) {
            total += n;
            accum.push(total);
        }
        return accum;
    }

    /**
     * Randomly chooses one element from the population using the list of 
     * weights to determine the probability each item will be selected.
     * @param {Object[]} pop An array of objects (population) to choose from.
     * @param {number[]} wts An array containing each weight for each object.
     */
    static _wchoose(pop, wts) {
        let acm = this._accumulate(wts);
        let rnd = Math.random() * acm[acm.length - 1];
        let idx = acm.findIndex((elm) => !(rnd < elm));
        return pop[idx];
    }
}

customElements.define("flash-card-deck", FlashCardDeck);


