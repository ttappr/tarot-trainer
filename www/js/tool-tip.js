

class ToolTip extends HTMLElement {
    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});
        this._parent = this.shadowRoot.parentElement;
        this._load();
    }
    async _load() {
        // ctrl+click file:///./../html-partials/tool-tip.html
        let html          = await loadText("./html-partials/tool-tip.html");
        let tip           = this.textContent;
        this.textContent  = "";
        let root          = this.shadowRoot;
        root.innerHTML    = html;
        this._tip_content = root.querySelector(".tip-content");

        if (this.hasAttribute("target")) {
            var parent = document.querySelector(this.getAttribute("target"));
        } else {
            var parent = this.parentElement;
        }

        this._tip_content.innerHTML = tip;
        this._tip_content.addEventListener("click", 
                                           this._onTipClick.bind(this));
        parent.addEventListener("long-press", this._onQueryTip.bind(this));
        parent.addEventListener("contextmenu", this._onQueryTip.bind(this));
    }
    _onQueryTip(e) {
        this._tip_content.style.display = "block";
        if (e.detail) {
            this._tip_content.style.left = `${e.detail.clientX}px`;
            this._tip_content.style.top = `${e.detail.clientY}px`;
        } else {
            this._tip_content.style.left = `${e.clientX}px`;
            this._tip_content.style.top = `${e.clientY}px`;
        }
        this._tip_content.style["z-index"] = 99;
        e.preventDefault();
        return false;
    }
    _onTipClick(e) {
        this._tip_content.style.display = "none";
    }
    /**
     * The attributes this element is interested in.
     * @returns {string[]} The names of the attributes to watch for.
     */
    static get observedAttributes() {
    }
    /**
     * Called when an observed attribute has been added, removed, updated, or 
     * replaced. 
     * @param {string} name The name of the attribute.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
    }
    /**
     * Called every time the element is inserted into the DOM. 
     */
    connectedCallback() {
        // Useful for  running setup code, such as fetching resources or 
        // rendering. Generally,  you should try to delay work until this time.
    }
    /**
     * Called when element has been moved into a new document.
     */
    adoptedCallback() {

    }
}

customElements.define("tool-tip", ToolTip);