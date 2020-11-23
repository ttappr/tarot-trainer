
//import {CARD_DATA} from "./card-data.js";

class FlashCard {
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
        this._meaning   = new Text(meaning);
        this._reverse   = new Text(reverse);
    }
    get face() {
        let image = this._image.deref();
        if (!image) {
            image = new Image();
            image.src = "img/" + this._pic;
            this._image = new WeakRef(image);
        }
        let inv = this._inverted;
        image.style.cssText = (inv) ? "transform: rotate(180deg);" : "";
        return image;
    }
    get back() {
        return (this._inverted) ? this._reverse : this._meaning;
    }
    invert() {
        this._inverted = !this._inverted;
    }
}

class FlashCardDeck extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._cards = [];
        this._current = null;

        this.shadowRoot.innerHTML = `
            <style>
                #card {
                    width: 55%;
                    //margin-right: 1%;
                    float: left;
                }
                #text {
                    width: 42%;
                    float: left;
                }
                #para {
                    font: 1.2em "Fira Sans", sans-serif;
                }
                #clearfix {
                    clear: both;
                }
            </style>
            <div id="card"></div>
            <div id="text"><p id="para"></p></div>
            <div id="clearfix"></div>
        `;
        this._card = this.shadowRoot.getElementById("card");
        this._text = this.shadowRoot.getElementById("para");

        for (let obj of CARD_DATA) {
            this._cards.push(new FlashCard(...Object.values(obj)));
        }
        console.info(this._cards);
        this.pickRandom();
    }
    pickRandom() {
        let idx = Math.floor(Math.random() * this._cards.length);
        let rev = Math.random() < 0.50;
        let card = this._cards[idx];
        if (rev) { card.invert(); }
        let [face, back] = [card.face, card.back];
        if (this._current) {
            this._card.replaceChild(face, this._current.face);
            this._text.replaceChild(back, this._current.back);
        } else {
            this._card.appendChild(face);
            this._text.appendChild(back);
        }
        this._current = {face: face, back: back};
    }
}

customElements.define("flash-card-deck", FlashCardDeck);

/*
    connectedCallback() {
        console.info(`connectedCallback()`);
        this.shadowRoot.append(this._image);
    }
    disconnectedCallback() {
        console.info(`disconnectedCallback()`);
        this.shadowRoot.removeChild(this._image.deref());
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    adoptedCallback() {
    }
*/
