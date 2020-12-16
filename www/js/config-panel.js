
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
        let ranges  = qsa(".range-select");
        let suits   = qsa("#suit-select > input");

        suit.oninput = this._onSuitInput.bind(this);
        this._suits  = {};
        for (let s of suits) {
            this._suits[s.value] = s;
        }
        let dds = qsa(".range-select .dropdown-content");
        for (let dd of dds) {
            dd.appendChild(this._buildList());
        }
        this._rangeStart = qs("#range-start .range-list")
        this._rangeEnd   = qs("#range-end .range-list");
        this._dds        = dds;
    }
    _onSuitInput(e) {
        // e.target.value in ['rods','swords','cups','coins','major-arcana'].
        for (let dd of this._dds) {
            dd.innerHTML = "";
            dd.appendChild(this._buildList());
        }
    }
    _buildList() {
        let suits = this._suits;
        let minor = suits.swords.checked || suits.cups.checked || 
                    suits.rods.checked   || suits.coins.checked;
        let major = suits["major-arcana"].checked;

        let list  = document.createElement("div");

        list.classList.add("range-list");
        list.onclick = this._onRangeClick.bind(this);

        if (major || minor) {
            if (major && minor) {
                list.setAttribute("range-two", "");
            }
            let start = (major) ?  0 :  1;
            let end   = (major) ? 22 : 15;

            for (let i = start; i < end; i++) {
                this._addRItem(list, i, i);
                if (minor) {
                    if (i > 0 && i < 15) {
                        this._addRItem(list, _MINOR_CARDS[i - 1], i);
                    } else if (major) {
                        this._addRItem(list, "", i);
                    }
                }
                if (major) {
                    this._addRItem(list, _MAJOR_CARDS[i], i);
                }
            }
        }
        return list;
    }
    _addRItem(p, txt, v) {
        let span = document.createElement("span");
        span.innerHTML = txt
        span.setAttribute("range-value", v);
        p.appendChild(span);
    }
    _onRangeClick(e) {
        let value  = e.target.getAttribute("range-value");
        let parent = e.target.parentElement;
        let range  = parent.parentElement
                           .parentElement
                           .querySelector(".range-list");
        let elms   = parent.querySelectorAll(`[range-value='${value}']`);
        range.innerHTML = "";
        let seen = [];
        for (let e of elms) {
            if (!seen.includes(e.textContent)) {
                seen.push(e.textContent);
                range.appendChild(e.cloneNode(true));
            }
        }
        console.info(`value=${value}`);
    }
    openMenu() {
        this._side.style.width = "250px";
    }
    closeMenu() {
        this._side.style.width = "0";
    }
}

customElements.define("config-panel", ConfigPanel);
