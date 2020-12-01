
/**
 * Custom element <html-include> to operate like a C #include. The URL to the
 * HTML file to be included must be placed between the open and close tags of
 * this element: <html-include>./partials/my-partial-page.html</html-include>.
 */
class HTMLInclude extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        setTimeout(() => this._load());
    }
    async _load() {
        let src = this.textContent.trim();

        if (!src) {
            throw new Error("URL missing between <html-import> tags.")
        } 

        let rsp = await fetch(src);

        if (rsp.status != 200) {
            throw new Error(`Failed to load file (${src}) for <html-import>.`);
        }

        this.shadowRoot.innerHTML = await rsp.text();
    }
}
customElements.define("html-include", HTMLInclude);
