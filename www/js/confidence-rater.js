
class ConfidenceRater extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._listeners = [];
        this._ready = false;
        this._load();
    }
    async _load() {
        // ctrl+click file:///./../html-partials/confidence-rater.html
        let html = await loadText("./html-partials/confidence-rater.html");
        this.shadowRoot.innerHTML = html;

        let container = this.shadowRoot.querySelector(".slidecontainer");
        let slider    = this.shadowRoot.querySelector(".slidecontainer input");
        let orient    = this.attributes.orient;
        this._sizeObs = null;

        slider.onchange = (e) => {
            this._notifyValueChanged(this, e.target.value);
        }

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
    set value(n) {
        this._slider.value = n;
    }
    set disabled(b) {
        this._slider.disabled = b;
    }
    attachListener(listener) {
        this._listeners.push(listener);
    }
    detachListener(listener) {
        this._listeners.delete(listener);
    }
    _notifyValueChanged(value) {
        for (let l of this._listeners) {
            l.valueChanged(this, value);
        }
    }
}

class ConfidenceRaterListener {
    valueChanged(source, value) {
    }
}

customElements.define("confidence-rater", ConfidenceRater);