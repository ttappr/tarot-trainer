
/**
 * Source in ROUND_METER_HTML adapted from 
 *      https://css-tricks.com/html5-meter-element/
 */
const ROUND_METER_HTML = `
    <style>
        /* Custom properties supported by the round-meter element.
         * The values in :host hold the default values.
         */
        :host {
            --background-color  : white;
            --font-family       : Jancient; /* "Roboto", sans-serif; */
            --font-size         : 32px;
            --text-color        : #004033;
            --gauge-fill        : #009578;
            --gauge-bg-color    : #b4c0be;
        }
        /* Top host for gauge elements. */
        .gauge {
            width: 100%;
            max-width: 250px;
            font-family: var(--font-family);
            font-size: var(--font-size);
            background-color: var(--background-color);
            color: var(--text-color);
        }
        /* The background color area in the gauge curve. */
        .gauge__body {
            width: 100%;
            height: 0;
            padding-bottom: 50%;
            background: var(--gauge-bg-color);
            position: relative;
            border-top-left-radius: 100% 200%;
            border-top-right-radius: 100% 200%;
            overflow: hidden;
        }
        /* The rotating element. */
        .gauge__fill {
            position: absolute;
            top: 100%;
            left: 0;
            width: inherit;
            height: 100%;
            background: var(--gauge-fill);
            transform-origin: center top;
            transform: rotate(0.25turn);
            transition: transform 1s linear; /* ease-out; */
        }
        /* The center circle with the value shown. */
        .gauge__cover {
            width: 75%;
            height: 150%;
            background: var(--background-color);
            border-radius: 50%;
            position: absolute;
            top: 25%;
            left: 50%;
            transform: translateX(-50%);
        
            /* Text */
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 25%;
            box-sizing: border-box;
        }  
    </style>
    <div class="gauge">
        <div class="gauge__body">
            <div class="gauge__fill"></div>
            <div class="gauge__cover"></div>
        </div>
    </div>
`;

class RoundMeter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = ROUND_METER_HTML;
        this._gauge = this.shadowRoot.querySelector(".gauge");
        this._fill  = this.shadowRoot.querySelector(".gauge__fill");
        this._cover = this.shadowRoot.querySelector(".gauge__cover");
        this.value = 0;
    }
    /**
     * Setter for value of the meter.
     * @param {number} value A value between 0 and 1 inclusive.
     */
    set value(value) {
        if (value < 0 || value > 1) {
            throw new RangeError(
                `RoundMeter.value received an invalid value (${value}). ` +
                "Value must be between 0 and 1 (both inclusive).");
        }
        this._fill.style.transform  = `rotate(${value / 2}turn)`;
        this._cover.textContent     = `${Math.round(value * 100)}%`;
        this._value                 = 0;
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
        console.info(
            `RoundMeter.attributeChanged(${name}, ${oldValue}, ${newValue})`);
    }
}

// Register the custom element.
customElements.define("round-meter", RoundMeter);

/**
 * Notes: 
 *  - To do conditional CSS rules, do something like:
 *    .elm[--prop="somevalue"] { ... }
 */
