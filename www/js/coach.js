
'use strict';

/**
 * This shouldn't be accessed outside this file. Use the Coach.instance property
 * to get the singleton instance for the Coach.
 * @type Coach
 */
var _instance = null;
var _DATA_VERSION  = "0.0.1.2";

/**
 * The high level component that interacts with the various other components of
 * the application to provide the learning process flow for the user. This
 * is meant to be a singleton class, globally accessible to the other 
 * components.
 */
class Coach {
    /**
     * This method shouldn't be called from outside its file. To get the
     * the instance of the Coach, use the Coach.instance property.
     */
    constructor() {
        if (!_instance) {
            _instance    = this;
            this._meter  = null;
            this._conf   = null;
            this._next   = null;
            this._reveal = null;
            this._restore();
        } else {
            throw Error("Use Coach.instance to get the Coach instance.");
        }
    }
    /**
     * The singleton instance for the Coach.
     * @returns {Coach} The Coach instance.
     */
    static get instance() {
        if (!_instance) {
            new Coach();
        }
        return _instance;
    }
    /**
     * Sets the deck used by the coach to train the user on.
     * @param {FlashCardDeck} d The deck to use.
     */
    set deck(d) { 
        this._deck  = d;

        for (let id of d.cardIDs) {
            if (!this._iwdict[id]) {
                this._iwdict[id] = 100;
                this._icdict[id] = 0;
            }
        }
        this._card_id = d.curCardID;
        if (this._conf) {
            this._conf.value = this._icdict[this._card_id];
        }
    }
    /**
     * Sets the widget used by the Coach to indicate the user's progress in 
     * learning. The progress widget needs to implement a `value` property that
     * the Coach can set.
     * @param {Object} pm The object that supports a settable `value` property.
     */
    set progressMeter(pm) { 
        this._meter = pm;
        this._updateProg();
    }
    /**
     * Sets the widget used by the Coach to show the confidence level of the
     * currently displayed card. The object must implement a `value` property
     * that the Coach can set.
     * @param {Object} ci The widget with a settable `value` property.
     */
    set confidenceInput(ci) {
        this._conf  = ci;
        ci.disabled = true;
        if (this._deck) {
            ci.value = this._icdict[this._card_id];
        }
    }
    /**
     * Sets the widget that the user uses to indicate they're ready for the next
     * flash card. the object must implement a settable `disabled` property
     * that takes a boolean to indicate it is not accepting user input.
     * @param {Object} ni The next input widget.
     */
    set nextInput(ni) {
        this._next  = ni;
        ni.disabled = true;
    }
    set revealInput(ri) {
        this._reveal = ri;
    }
    /**
     * Update the user's confidence value for the currently displayed card.
     * If the user doesn't know the card's backside answer, 0 should be used;
     * if the user knows it with certainty, 100 should be used.
     * @param {number} value The user's certainty value for the current card.
     */
    static updateConfidence(value) {
        let coach = Coach.instance;
        let id = coach._card_id;
        coach._iwdict[id] = (100 - value) * 10 || 1;
        coach._icdict[id] = +value;
        coach._updateProg();

        // Update button state.
        coach._next.disabled = false;
    }
    /**
     * Advances the app to the next randomly chosen flash card.
     */
    static nextCard(event) {
        let coach = Coach.instance;
        coach._next = event.target;
        
        // Update button state.
        coach._next.disabled = true;
        coach._conf.disabled = true;
        coach._reveal.disabled = false;

        coach._save();
        let ids = Object.keys(coach._iwdict);
        let wts = Object.values(coach._iwdict);

        let cid = wchoice(ids, wts);

        for (let i = 0; cid === coach._card_id && i < 10; i++) {
            cid = ids[ Math.floor(Math.random() * wts.length) ];
        }
        coach._card_id = cid;
        coach._deck.curCardID = cid;
        coach._conf.value = coach._icdict[cid];
    }
    /**
     * Requests the Coach to display the answer for the current flash card.
     * The coach delegates this request to the FlashCardDeck object.
     */
    static revealAnswer(event) {
        let coach = Coach.instance;
        coach._deck.revealAnswer();

        // Update button state.
        coach._conf.disabled = false;
        coach._reveal.disabled = true;
        coach._next.disabled = false;
    }
    /**
     * Requests the coach to save the user's confidence scores for use in 
     * the following session.
     */
    static save(event) {
        Coach.instance._save();
    }
    _updateProg() {
        if (this._meter) {
            let accm = accumulate(Object.values(this._icdict));
            if (accm.length !== 0) {
                let total = accm[accm.length - 1];
                let possible = 100 * accm.length;

                this._meter.value = total / possible;
            } else {
                this._meter.value = 0;
            }
        }
    }
    _save() {
        setPData("cardWeights", this._iwdict);
        setPData("cardConfidence", this._icdict);
        setPData("data_version", this._data_version);
    }
    _restore() {
        this._data_version = getPData("data_version");
        if (this._data_version !== _DATA_VERSION) {
            clearPData();
            this._data_version = _DATA_VERSION;
            this._iwdict  = {};
            this._icdict  = {};
        } else {
            this._iwdict = getPData("cardWeights") || {};
            this._icdict = getPData("cardConfidence") || {};
        }
    }
}

