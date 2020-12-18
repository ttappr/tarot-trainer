
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
        this._range = { start: -1, end: -1 };
        this._suits = { cups: false, swords: false, 
                        coins: false, rods: false,
                        'major-arcana': false, reverse: false };
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
        range.addEventListener("range", this._onRange.bind(this));
    }
    get range() {
        return { ...this._range };
    }
    get suits() {
        return { ...this._suits };
    }

    _populateRange(range) {
        range.addHeader("Order", "Minor", "Major");
        for (let i = 0; i < 22; i++) {
            let minor = (i > 0 && i < 15) ? _MINOR_CARDS[i - 1] : "";
            let major = _MAJOR_CARDS[i];
            range.addRow(i, minor, major);
        }
        range.start = 1; range.end = 14; // Default range.

    }
    _onSuitInput(e) {
        // e.target.value in ['rods','swords','cups','coins','major-arcana', 
        //                    'reverse'].
        console.info(`${e.target.value} checked: ${e.target.checked}`);
        this._suits[e.target.value] = e.target.checked;
    }
    _onRange(e) {
        this._range.start = e.detail.start;
        this._range.end = e.detail.end;
        console.info(e.detail);
    }
    _dispatchSuitSelect() {
        let e = new CustomEvent("suit", {
            bubbles: true,
            detail: ""
        });
        this.dispatchEvent(e);
    }
    openMenu() {
        this._side.style.width = "250px";
    }
    closeMenu() {
        this._side.style.width = "0";
    }
}

customElements.define("config-panel", ConfigPanel);
