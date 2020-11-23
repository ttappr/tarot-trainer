
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

        console.info(CARD_DATA);

        this.attachShadow({mode: 'open'});

        let image = new Image();
        if (this._img) {
            image.src = this._img;
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
    constructor(dataURL) {
        super();
        this.attachShadow({mode: 'open'});
        dataURL = dataURL || this.getAttribute('data');
        console.info(CARD_DATA)
    }
}

customElements.define("flash-card", FlashCard);
customElements.define("flash-card-deck", FlashCardDeck);
