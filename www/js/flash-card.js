
//import {CARD_DATA} from "./card-data.js";

/**
 * If the platform doesn't support WeakRef, provide a dummy stub for it.
 */
if (typeof WeakRef === "undefined") {
    console.info("WeakRef is undefined for this platform. " +
                 "Using stub version instead.");
    WeakRef = class {
        constructor(obj) {
            this._obj = obj;
        }
        deref() {
            return this._obj;
        }
    }
}

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

        this._image     = {deref: () => null};
        this._inverted  = false;
        this._meaning   = document.createElement("p");
        this._reverse   = document.createElement("p");
        this._meaning.innerHTML = meaning;
        this._reverse.innerHTML = reverse;
    }
    /**
     * Property giving the element that holds the content for the face card.
     * The content is an image file for the card.
     * @returns {HTMLElement} The card's face content.
     */
    get face() {
        let image = this._image.deref();
        if (!image) {
            image = new Image();
            image.src = "img/" + this._pic;
            image.style["max-width"] = "100%";
            image.style["max-height"] = "100%";
            this._image = new WeakRef(image);
        }
        let inv = this._inverted;
        image.style["transform"] = (inv) ? "rotate(180deg)" : "";
        return image;
    }
    /**
     * Property giving the element that holds the content for the back side.
     * This holds text giving the divinatory meaning of the card.
     * @returns {HTMLElement} The element with the back side's content.
     */
    get back() {
        return (this._inverted) ? this._reverse : this._meaning;
    }
    /**
     * Turns the card upside down. The face and back are updated.
     */
    invert() {
        this._inverted = !this._inverted;
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

        this.shadowRoot.innerHTML = `
            <style>
                #container {
                    float: left;
                    max-height: 100%;
                    width: 100%;
                }
                #face {
                    width: 45%;
                    margin-right: 2%;
                    margin-left: 5%;
                    max-height: 100%;
                    float: left;
                }
                #back {
                    width: 45%;
                    float: left;
                    font: 1.2em "Fira Sans", sans-serif;
                }
                #clearfix {
                    clear: both;
                }
            </style>
            <div id="container">
                <div id="face"></div>
                <div id="back"></div>
                <div id="clearfix"></div>
            </div>
        `;
        this._face = this.shadowRoot.getElementById("face");
        this._back = this.shadowRoot.getElementById("back");

        for (let obj of CARD_DATA) {
            this._cards.push(new FlashCard(...Object.values(obj)));
        }
        console.info(this._cards);
        this.pickRandom();
    }
    /**
     * Chooses a card at random and displays it.
     */
    pickRandom() {
        let idx = Math.floor(Math.random() * this._cards.length);
        let rev = Math.random() < 0.50;
        let card = this._cards[idx];
        if (rev) { card.invert(); }
        let [face, back] = [card.face, card.back];
        if (this._current) {
            this._face.replaceChild(face, this._current.face);
            this._back.replaceChild(back, this._current.back);
        } else {
            this._face.appendChild(face);
            this._back.appendChild(back);
        }
        this._current = {face: face, back: back};
    }
}

customElements.define("flash-card-deck", FlashCardDeck);


