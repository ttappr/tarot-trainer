
class ConfidenceRater extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._listeners = [];
        this._ready = false;
        this._load();
        Coach.instance.confidenceInput = this;
    }
    async _load() {
        // Related file: file:///./../html-partials/confidence-rater.html
        let html = await loadText("./html-partials/confidence-rater.html");
        this.shadowRoot.innerHTML = html;

        let container = this.shadowRoot.querySelector(".slidecontainer");
        let slider    = this.shadowRoot.querySelector(".slidecontainer input");
        let orient    = this.attributes.orient;
        this._sizeObs = null;
        this._slider  = slider;

        slider.onchange = (e) => {
            Coach.updateConf(e.target.value);
        }

        if (orient && orient.value.toLowerCase() == "vertical") {
            slider.setAttribute("orient", "vertical");

            let obs = new ResizeObserver(
                (entries) => {
                    let ent = entries[0];
                    let h   = ent.contentRect.height;
                    slider.style.width = `${h}px`;
                }
            );
            obs.observe(container);
            this._sizeObs = obs;
        }
        this._ready = true;
    }
    set value(n) {
        this._slider.value = n;
    }
    get value() {
        return this._slider.value;
    }
    set disabled(b) {
        this._slider.disabled = b;
    }
}

customElements.define("confidence-rater", ConfidenceRater);