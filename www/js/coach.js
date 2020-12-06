
'use strict';

/**
 * This shouldn't be accessed outside this file. Use the Coach.instance property
 * to get the singleton instance for the Coach.
 * @type Coach
 */
var _instance = null;

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
            this._iwdict = getPData("cardWeights") || {};
            this._icdict = getPData("cardConfidence") || {};
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
        this._ids = Object.keys(this._iwdict);
        this._wts = Object.values(this._iwdict);
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
    }
    /**
     * Update the user's confidence value for the currently displayed card.
     * If the user doesn't know the card's backside answer, 0 should be used;
     * if the user knows it with certainty, 100 should be used.
     * @param {number} value The user's certainty value for the current card.
     */
    static updateConf(value) {
        let coach = Coach.instance;
        let id = coach._card_id;
        coach._iwdict[id] = (100 - value) || 10;
        coach._icdict[id] = value;
        coach._updateProg();
    }
    /**
     * Advances the app to the next randomly chosen flash card.
     */
    static nextCard() {
        let coach = Coach.instance;
        let cid = wchoice(coach._ids, coach._wts);
        coach._card_id = cid;
        coach._deck.curCardID = cid;
        coach._conf.value = coach._icdict[cid];
    }
    /**
     * Requests the Coach to display the answer for the current flash card.
     * The coach delegates this request to the FlashCardDeck object.
     */
    static revealAnswer() {
        Coach.instance._deck.revealAnswer();
    }
    /**
     * Requests the coach to save the user's confidence scores for use in 
     * the following session.
     */
    static save() {
        Coach.instance._saveWeights();
    }
    _updateProg() {
        if (this._meter) {
            let accm = accumulate(Object.values(this._icdict));
            if (accm.length != 0) {
                let total = accm[accm.length - 1];
                let possible = 100 * accm.length;

                this._meter.value = total / possible;
            } else {
                this._meter.value = 0;
            }
        }
    }
    _saveWeights() {
        setPData("cardWeights", this._iwdict);
        setPData("cardConfidence", this._icdict);
    }
}

