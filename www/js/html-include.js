
class HTMLInclude extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }
    /**
     * Called every time the element is inserted into the DOM. 
     */
    connectedCallback() {
        setTimeout(() => this._fetch());
    }
    async _fetch() {
        let src = this.textContent;
        let rsp = await fetch(src);
        let txt = await rsp.text();
        this.shadowRoot.innerHTML = txt;
    }
}

// Register the custom element.
customElements.define("html-include", HTMLInclude);
