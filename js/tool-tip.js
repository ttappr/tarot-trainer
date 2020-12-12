

class ToolTip extends HTMLElement {
    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});
        this._parent = this.shadowRoot.parentElement;
        this._load();
    }
    async _load() {
        // ctrl+click file:///./../html-partials/tool-tip.html
        let html         = await loadText("./html-partials/tool-tip.html");
        let tip          = this.textContent;
        this.textContent = "";
        let root         = this.shadowRoot;
        root.innerHTML   = html;
        this._span       = root.querySelector(".tip-content");

        if (this.hasAttribute("target")) {
            var parent = document.querySelector(this.getAttribute("target"));
        } else {
            var parent = this.parentElement;
        }

        this._span.innerHTML = tip;
        this._span.addEventListener("click", this._onTipClick.bind(this));
        parent.addEventListener("contextmenu", this._onContextMenu.bind(this));
    }
    _onContextMenu(e) {
        this._span.style.display = "block";
        this._span.style.left = `${e.pageX}px`;
        this._span.style.top = `${e.pageY}px`;
        e.preventDefault();
        return false;
    }
    _onTipClick(e) {
        this._span.style.display = "none";
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