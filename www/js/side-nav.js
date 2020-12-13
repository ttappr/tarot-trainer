
class SideNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._load();
    }    
    async _load() {
        // Related file: file:///./../html-partials/tool-tip.html
        let html = await loadText("./html-partials/side-nav.html");
        this.shadowRoot.innerHTML = html;
        
        let qs = (s) => this.shadowRoot.querySelector(s);

        this._open  = qs("#opener");
        this._side  = qs("#side-nav");
        this._close = qs("#close");

        this._open.onclick  = this._openMenu.bind(this);
        this._close.onclick = this._closeMenu.bind(this);
    }
    _openMenu(e) {
        this._side.style.width = "250px";
    }
    _closeMenu(e) {
        this._side.style.width = "0";
    }
}

customElements.define("side-nav", SideNav);
