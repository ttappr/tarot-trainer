
'use strict';

const _MAJOR_CARDS = [
    "Fool", "Magician", "High Priestess", "Empress", "Emperor",
    "Hierophant", "Lovers", "Chariot", "Strength", "Hermit", 
    "Wheel of Fortune", "Justice", "Hanged Man", "Death", "Temperance", 
    "Devil", "Tower", "Star", "Moon", "Sun", "Judgement", "World"
].map(s => s.padEnd(16, ' '));

const _MINOR_CARDS = [
    "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Page", "Knight",
    "Queen", "King"
].map(s => s.padEnd(6, ' '));

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
    }
    _onSuitInput(e) {
        // e.target.value in ['rods','swords','cups','coins','major-arcana'].
        console.info(`e.target.value="${e.target.value}"`);
        console.info(`e.target.checked="${e.target.checked}"`);
        console.info(`this=${this}`);
    }
    _buildList() {
        let suits = this._suits;
        let minor = suits.swords.checked || suits.cups.checked || 
                    suits.rods.checked   || suits.coins.checked;
        let major = suits["major-arcana"].checked;
        let list  = document.createElement("ol");
        list.setAttribute("style", "font-family: monospace");

        if (major || minor) {
            let start = (major) ?  0 :  1;
            let end   = (major) ? 22 : 15;
            list.setAttribute("start", start);

            for (let i = start; i < end; i++) {
                let item = "";
                if (minor) {
                    if (i > 0 && i < 15) {
                        item = `${_MINOR_CARDS[i - 1]} `;
                    } else if (major) {
                        item = "       ";
                    }
                }
                if (major) {
                    item = `${item}${_MAJOR_CARDS[i]}`;
                }
                let li = document.createElement("li");
                li.innerHTML = item.replace(/\s/g, '&nbsp;');
                list.appendChild(li);
            }
        }
        return list;
    }
    openMenu() {
        this._side.style.width = "250px";
    }
    closeMenu() {
        this._side.style.width = "0";
    }
}

customElements.define("config-panel", ConfigPanel);
