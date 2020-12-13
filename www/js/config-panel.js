
'use strict';

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
        
        let qs = s => this.shadowRoot.querySelector(s);

        this._open.onclick  = this._openMenu.bind(this);
        this._close.onclick = this._closeMenu.bind(this);
    }
    openMenu() {
        this._side.style.width = "250px";
    }
    closeMenu() {
        this._side.style.width = "0";
    }
}

customElements.define("config-panel", ConfigPanel);
