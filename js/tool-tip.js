

class ToolTip extends HTMLElement {
    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});
        this._pressTimer = null;
        this._timeout = 1000;
        this._load();
    }
    async _load() {
        // ctrl+click file:///./../html-partials/tool-tip.html
        let html          = await loadText("./html-partials/tool-tip.html");
        let tip           = this.textContent;
        this.textContent  = "";
        let root          = this.shadowRoot;
        root.innerHTML    = html;
        let tc            = root.querySelector(".tip-content");
        let target        = this.getAttribute("target") 
        this._tip_content = tc;
        tc.innerHTML      = tip;

        target = (target) ? document.querySelector(target) : this.parentElement;

        target.addEventListener("mousedown",   this._startTimer.bind(this));
        target.addEventListener("mouseup",     this._cancelTimer.bind(this));
        target.addEventListener("mousemove",   this._cancelTimer.bind(this))
        target.addEventListener("contextmenu", this._showTip.bind(this));

        document.addEventListener("mousedown", this._dismissTip.bind(this));
    }
    _startTimer(e) {
        this._pressTimer = setTimeout(this._showTip.bind(this), 
                                      this._timeout, e);
        e.preventDefault();
        return false;
    }
    _cancelTimer(e) {
        clearTimeout(this._pressTimer);
    }
    _showTip(e) {
        e.preventDefault();
        let tc = this._tip_content;
        tc.style.left = e.clientX + 'px';
        tc.style.top = e.clientY + 'px';
        tc.style["z-index"] = 99;
        tc.style.display = "block";
    }
    _dismissTip(e) {
        this._tip_content.style.display = "none";
    }
}

customElements.define("tool-tip", ToolTip);