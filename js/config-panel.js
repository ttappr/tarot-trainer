
'use strict';

const _MAJOR_CARDS = [
    "Fool", "Magician", "High Priestess", "Empress", "Emperor",
    "Hierophant", "Lovers", "Chariot", "Strength", "Hermit", 
    "Wheel of Fortune", "Justice", "Hanged Man", "Death", "Temperance", 
    "Devil", "Tower", "Star", "Moon", "Sun", "Judgement", "World"
];

const _MINOR_CARDS = [
    "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Page", "Knight",
    "Queen", "King"
];

class ConfigPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._load();
    }    
    async _load() {
        // Related file: file:///./../html-partials/config-panel.html
        let html = await loadText("./html-partials/config-panel.html");
        this.shadowRoot.innerHTML = html;
        let qs      = s => this.shadowRoot.querySelector(s);
        let qsa     = s => this.shadowRoot.querySelectorAll(s);
        let config  = qs("#config");
        let suit    = qs("#suit-select");
        let range   = qs("#range-select");
        let suits   = qsa("#suit-select > input");

        suit.oninput = this._onSuitInput.bind(this);
        this._suits  = {};
        for (let s of suits) {
            this._suits[s.value] = s;
        }
        range.loaded = (range) => {
            this._populateRange(range);
        }
    }
    _populateRange(range) {
        range.addHeader("Order", "Minor", "Major");
        for (let i = 0; i < 22; i++) {
            let minor = (i > 0 && i < 15) ? _MINOR_CARDS[i - 1] : "";
            let major = _MAJOR_CARDS[i];
            range.addRow(i, minor, major);
        }
        range.start = 1; range.end = 14;

    }
    _onSuitInput(e) {
        // e.target.value in ['rods','swords','cups','coins','major-arcana'].
    }
    openMenu() {
        this._side.style.width = "250px";
    }
    closeMenu() {
        this._side.style.width = "0";
    }
}

customElements.define("config-panel", ConfigPanel);
