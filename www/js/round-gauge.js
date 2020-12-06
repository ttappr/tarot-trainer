'use strict';

class RoundGauge extends HTMLElement {
    constructor(value) {
        super();
        this.attachShadow({mode: 'open'});

        this._value = value || 0;
        this._ready = false;

        this._load();
    }
    async _load() {
        // ctrl+click file:///./../html-partials/round-gauge.html
        let html = await loadText("./html-partials/round-gauge.html");
        this.shadowRoot.innerHTML = html;

        this._gauge = this.shadowRoot.querySelector(".gauge");
        this._fill  = this.shadowRoot.querySelector(".gauge__fill");
        this._cover = this.shadowRoot.querySelector(".gauge__cover");
        
        this._ready = true;
        this.value  = this._value;
        Coach.instance.progressMeter = this;
    }
    /**
     * Setter for value of the meter.
     * @param {number} value A value between 0 and 1 inclusive.
     */
    set value(value) {
        if (0 <= value <= 1) {
            this._value = value;
            if (this._ready) {
                this._fill.style.transform = `rotate(${value / 2}turn)`;
                this._cover.textContent    = `${Math.round(value * 100)}%`;
            }
        } else {
            throw new RangeError(
                `RoundMeter.value received an invalid value (${value}). ` +
                "Value must be between 0 and 1 (both inclusive).");
        }
    }
    /**
     * Getter for the value displayed in the meter.
     * @returns {number} A value between 0 and 1 inclusive.
     */
    get value() {
        return this._value;
    }
    /**
     * The attributes this element is interested in.
     * @returns {string[]} The names of the attributes to watch for.
     */
    static get observedAttributes() {
        return ["value"];
    }
    /**
     * Called when an observed attribute has been added, removed, updated, or 
     * replaced. 
     * @param {string} name The name of the attribute.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        name = name.toLowerCase();
        switch (name) {
            case "value" : this.value = newValue; break;
        }
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

// Register the custom element.
customElements.define("round-gauge", RoundGauge);

