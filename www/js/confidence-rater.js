
class ConfidenceRater extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._ready = false;
        this._load();
    }
    async _load() {
        // ctrl+click file:///./../html-partials/confidence-rater.html
        let rsp = await fetch("./html-partials/confidence-rater.html");

        if (rsp.status != 200) {
            throw new Error(`${typeof this} failed to fetch HTML content ` +
                            `for "${src}"; response status ${rsp.status}.`);
        }
        this.shadowRoot.innerHTML = await rsp.text();

        let container = this.shadowRoot.querySelector(".slidecontainer");
        let slider    = this.shadowRoot.querySelector(".slidecontainer input");
        let orient    = this.attributes.orient;
        this._sizeObs = null;

        if (orient && orient.value.toLowerCase() == "vertical") {
            slider.setAttribute("orient", "vertical");

            let obs = new ResizeObserver(
                (entries) => {
                    let ent = entries[0];
                    let h   = ent.contentRect.height;
                    slider.style.width = `${h - 20}px`;
                }
            );
            obs.observe(container);
            this._sizeObs = obs;
        }
        this._ready = true;
    }
}

customElements.define("confidence-rater", ConfidenceRater);