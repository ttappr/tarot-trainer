'use strict';

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

        this._inverted  = false;
        this._image     = this.face;
        this._meaning   = document.createElement("p");
        this._reverse   = document.createElement("p");
        this._meaning.innerHTML = meaning;
        this._reverse.innerHTML = reverse;
    }
    /**
     * The title of the card. The name of the card with '(reversed)' included if
     * it's in reverse position.
     * @returns {string} The title.
     */
    get title() {
        return `${this.name} ${(this._inverted) ? " (reversed)":""}`;
    }
    /**
     * The name of the card.
     * @returns {string} The name.
     */
    get name() {
        if (!this._name) {
            this._name = `${this._value} of ${this._suit}`;
        }
        return this._name;
    }
    /**
     * A unique identifier for the card.
     * @returns {Object} The card's ID.
     */
    get id() {
        if (!this._id) {
            this._id = this.name.replace(/ /g, '_');
        }
        return this._id;
    }
    /**
     * Set to true, to position the card upside down. 
     * @param {boolean} b true for reversed, false otherwise.
     */
    set reversed(b) {
        this._inverted = b;
        if (this._image) {
            if (this._inverted) {
                this._image.style.transform = "rotate(180deg)";
            } else {
                this._image.style.transform = "";
            }
        }
    }
    /**
     * Indicates whether the card has been turned upside down.
     * @returns {boolean} true for reversed, false otherwise.
     */
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
        this._cards = {};
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
            let card = new FlashCard(...Object.values(obj));

            this._cards[card.id         ] = [card, false];
            this._cards[card.id + '_rev'] = [card, true ];
        }
        let i = Math.floor(Math.random() * this.numCards);
        let [c, r] = Object.values(this._cards)[i];
        c.reversed = r;
        this._setCard(c);
        Coach.instance.deck = this;
    }
    /**
     * A unique identifier for the deck.
     * @returns {string} The ID.
     */
    get id() {
        return "Rider_Waite_Smith_Tarot";
    }
    /**
     * The title of the deck.
     * @returns {string} The title that can be displayed.
     */
    get title() {
        return "Rider Waite Smith Tarot";
    }
    /**
     * A list of the ID's of the cards in the deck.
     * @returns {Object[]} The identifiers of the cards in the deck.
     */
    get cardIDs() {
        return Object.keys(this._cards);

    }
    /**
     * The ID of the currently displayed card.
     * @returns {Object} The ID of the current card.
     */
    get curCardID() {
        return `${this._current.id}${this._current.reversed ? "_rev" : ""}`;
    }

    /**
     * Sets the currently displayed card using its id.
     * @param {Object} id The ID of the card make current.
     */
    set curCardID(id) {
        let [card, rev] = this._cards[id];
        card.reversed = rev;
        this._setCard(card);
    }

    /**
     * Returns the number of cards in the deck treating the card rightside up
     * and upside down as two.
     * @returns {number} The number of cards.
     */
    get numCards() {
        return Object.keys(this._cards).length;
    }
    /**
     * The currently displayed card.
     * @returns {FlashCard} The currently active flash card.
     */
    get currentCard() {
        return this._current;
    }
    /**
     * Causes the card's back with the answer to be displayed.
     */
    revealAnswer() {
        // TODO - This fade-in code might be cleaned up a bit.
        let child = this._back.firstChild;
        let back  = this._back;
        back.removeChild(child);
        child.classList.add("fade-in");
        back.style.visibility = "visible";
        back.appendChild(child);
    }
    _setCard(card) {
        this._back.style.visibility = "hidden";
        this._title.innerHTML = card.title;

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
}

customElements.define("flash-card-deck", FlashCardDeck);


