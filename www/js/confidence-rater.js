'use strict';

/**
 * An element the user uses to indicate how confident they are in knowing the
 * currently displayed card's answer/back side.
 */
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
            Coach.updateConfidence(+e.target.value);
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
    /**
     * Sets the user's confidence value for knowing the current card.
     * @param {number} n The user's self-chosen confidence score. A number from
     *                   0 to 100, with 0 being "don't know" and 100 being 
     *                   100% certain.
     */
    set value(n) {
        this._slider.value = n;
    }
    /**
     * Gives the user's self-chosen confidence level in the current card.
     * @returns {number} The confidence level value (0 to 100).
     */
    get value() {
        return +this._slider.value;
    }
    /**
     * Enables/disables the element. Used by the Coach as part of the learning
     * flow.
     * @param {boolean} b The enabled value.
     */
    set disabled(b) {
        this._slider.disabled = b;
    }
}

customElements.define("confidence-rater", ConfidenceRater);