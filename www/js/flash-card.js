
//import {CARD_DATA} from "./card-data.js";

class FlashCard extends HTMLElement {
    constructor(suit, value, pic, descr, meaning, reverse) {
        super();

        Object.assign(
            this, {
                _suit    : this.getAttribute('suit')     || suit,
                _value   : this.getAttribute('value')    || value,
                _img     : this.getAttribute('img')      || pic,
                _descr   : this.getAttribute('descr')    || descr,
                _meaning : this.getAttribute('meaning')  || meaning,
                _reverse : this.getAttribute('reverse')  || reverse
            });

        this.attachShadow({mode: 'open'});

        let image = new Image();
        if (this._img) {
            image.src = "img/" + this._img;
        }
        this.shadowRoot.append(image);
        this.shadowRoot.append(new Text(this.getAttribute("question")));
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
    }
    adoptedCallback() {
        super.adoptedCallback();
    }
}

class FlashCardDeck extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._cards = [];
        for (let obj of CARD_DATA) {
            this._cards.push(new FlashCard(...Object.values(obj)));
        }
        console.info(this._cards);
    }
}

customElements.define("flash-card", FlashCard);
customElements.define("flash-card-deck", FlashCardDeck);
