
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
                        major_arcana: false, reverse: false };
        this._initialized = false;
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

        this._loadState();

        for (let s of suits) {
            s.checked = this._suits[s.value];
        }
        range.loaded = (range) => {
            this._populateRange(range);
        };
        
        this._initialized = true;
        this._dispatchInitialized();
    }
    get range() {
        return { ...this._range };
    }
    get suits() {
        return { ...this._suits };
    }
    get initialized() {
        return this._initialized;
    }

    _populateRange(range) {
        range.addHeader("Order", "Minor", "Major");
        for (let i = 0; i < 22; i++) {
            let minor = (i > 0 && i < 15) ? _MINOR_CARDS[i - 1] : "";
            let major = _MAJOR_CARDS[i];
            range.addRow(i, minor, major);
        }
        range.start = this._range.start; 
        range.end   = this._range.end;
        range.addEventListener("range", this._onRange.bind(this));
    }
    _onSuitInput(e) {
        // e.target.value in ['rods','swords','cups','coins','major-arcana', 
        //                    'reverse'].
        let suit    = e.target.value;
        let checked = e.target.checked;
        this._suits[suit] = checked;
        this._dispatchSuitSelect(suit, checked);
        this._saveState();
    }
    _onRange(e) {
        this._range = e.detail;
        e = new CustomEvent("range", {
            bubbles: true,
            detail: { range: {...e.detail } }
        });
        this.dispatchEvent(e);
        this._saveState();
    }
    _dispatchSuitSelect(suit, checked) {
        let e = new CustomEvent("suit", {
            bubbles: true,
            detail: { suit: suit, checked: checked, allSuits: this.suits }
        });
        this.dispatchEvent(e);
    }
    _dispatchInitialized() {
        let e = new CustomEvent("initialized", {
            bubbles: true,
            detail: { suits: this.suits, range: this.range }
        });
        this.dispatchEvent(e);
    }
    openMenu() {
        this._side.style.width = "250px";
    }
    closeMenu() {
        this._side.style.width = "0";
    }
    _saveState() {
        setPData("range", this._range);
        setPData("suits", this._suits);        
    }
    _loadState() {
        let suits = getPData("suits");
        let range = getPData("range");
        if (range !== null && suits !== null) {
            this._suits = suits;
            this._range = range;
        }        
    }
}

customElements.define("config-panel", ConfigPanel);
