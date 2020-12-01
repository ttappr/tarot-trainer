
/**
 * Custom element <html-include> to operate like a C #include. The URL to the
 * HTML file to be included must be placed between the open and close tags of
 * this element: <html-include>./partials/my-partial-page.html</html-include>.
 */
class HTMLInclude extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this._populated = false;
    }
    connectedCallback() {
        //setTimeout(() => this._fetch());
        this._fetch();
    }
    async _fetch() {
        try {
            if (this.isConnected && !this._populated) {
                this._populated = true;
                let src = this.textContent;
                let rsp = await fetch(src);
                let txt = await rsp.text();
                this.shadowRoot.innerHTML = txt;
            }
        } catch (error) {
            console.error(`HTMLInclude._fetch() caught an error: ${error}`);
            this._populated = false;
            throw error;
        }
    }
}
customElements.define("html-include", HTMLInclude);

async function foo() {
    console.warn(`foo() called`);
}
