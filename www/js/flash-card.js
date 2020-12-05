
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

        this._inverted  = false;
        this._image     = this.face;
        this._meaning   = document.createElement("p");
        this._reverse   = document.createElement("p");
        this._meaning.innerHTML = meaning;
        this._reverse.innerHTML = reverse;
    }
    get title() {
        return `${this.name} ${(this._inverted) ? " (reversed)":""}`;
    }
    get name() {
        if (!this._name) {
            this._name = `${this._value} of ${this._suit}`;
        }
        return this._name;
    }
    get id() {
        if (!this._id) {
            this._id = this.name.replaceAll(' ', '_');
        }
        return this._id;
    }
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
    get id() {
        return "Rider_Waite_Smith_Tarot";
    }
    get title() {
        return "Rider Waite Smith Tarot";
    }
    get cardIDs() {
        return Object.keys(this._cards);

    }
    get curCardID() {
        return `${this._current.id}${this._current.reversed ? "_rev" : ""}`;
    }
    setCardByID(id) {
        let [card, rev] = this._cards[id];
        card.reversed = rev;
        this._setCard(card);
    }
    /**
     * Returns the number of cards in the deck.
     */
    get numCards() {
        return Object.keys(this._cards).length;
    }
    get currentCard() {
        return this._current;
    }
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


