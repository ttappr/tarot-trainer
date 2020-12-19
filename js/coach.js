
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
            _instance           = this;
            this._meter         = null;
            this._conf          = null;
            this._next          = null;
            this._reveal        = null;
            this._confDict      = {};
            this._wghtDict      = {};
            this._wghtDictFilt  = {}

            this._range  = { start: 0, end: 21 };
            this._suits  = { cups: true, swords: true, rods: true, coins: true,
                             major_arcana: true, reverse: true };

            this._restore();

            document.addEventListener('range', this._onRange.bind(this));
            document.addEventListener('suit',  this._onSuit.bind(this));
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
            if (!this._wghtDict[id]) {
                this._wghtDict[id] = 100;
                this._confDict[id] = 0;
            }
        }
        this._card_id = d.curCardID;
        if (this._conf) {
            this._conf.value = this._confDict[this._card_id];
        }
        this._nextCard();
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
    set configPanel(cp) {
        this._configPanel = cp;
        if (cp.initialized) {
            this._range = cp.range;
            this._suits = cp.suits;
            this._updateFilteredWeights();
        } else {
            let oninit = (e) => {
                this._range = e.detail.range;
                this._suits = e.detail.suits;
                this._updateFilteredWeights();
            }
            cp.addEventListener("initialized", 
                                oninit.bind(this), 
                                { once: true });
        }
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
            ci.value = this._confDict[this._card_id];
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
        let id    = coach._card_id;

        coach._confDict[id]     = +value;
        coach._wghtDict[id]     = // ...
        coach._confDictFilt[id] = (100 - value) * 10 || 1;
        
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
        coach._next.disabled   = true;
        coach._conf.disabled   = true;
        coach._reveal.disabled = false;

        coach._save();
        coach._nextCard();
    }
    _nextCard() {
        // let ids = Object.keys(coach._wghtDict);
        // let wts = Object.values(coach._wghtDict);
        let ids = Object.keys  (this._wghtDictFilt);
        let wts = Object.values(this._wghtDictFilt);

        let cid = wchoice(ids, wts);

        for (let i = 0; cid === this._card_id && i < 10; i++) {
            cid = ids[ Math.floor(Math.random() * wts.length) ];
        }
        this._card_id          = cid;
        this._deck.curCardID   = cid;
        this._conf.value       = coach._confDict[cid];
    }
    _updateFilteredWeights() {
        // TODO - This is a bad solution as far as encapsulation is concerned.
        //        Rework the config code so the deck provides the specific 
        //        names and IDs for things, rather than reproducing strings
        //        in several places and hacking into ID's (which are supposed
        //        to be opaque).
        if (!Coach._ordMinor) {
            Coach._ordMinor = [ 
                '_', 'Ace', 'Two', 'Three', 'Four', 'Five', 
                'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                'Page', 'Knight', 'Queen', 'King'
            ];
            Coach._ordMajor = [ 
                'Fool', 'Magician', 'High_Priestess', 'Empress', 
                'Emperor', 'Hierophant', 'Lovers', 'Chariot', 
                'Fortitude', 'Hermit', 'Wheel_of_Fortune', 
                'Justice', 'Hanged_Man', 'Death', 'Temperance', 
                'Devil', 'Tower', 'Star', 'Moon', 'Sun', 
                'Last_Judgement', 'World'
            ];
            Coach._filtExpr = 
                new RegExp( "(?:The_)?(.*?)_of_" +
                            "(Major_Arcana|Cups|Wands|Swords|Pentacles)" +
                            "(_rev)?" );
        }
        let ordMinor = Coach._ordMinor;
        let ordMajor = Coach._ordMajor;
        let filtExpr = Coach._filtExpr;
        let range    = this._range;
        let suits    = this._suits;
        let filt     = { 
            Cups        : suits.cups,
            Wands       : suits.rods,
            Swords      : suits.swords,
            Pentacles   : suits.coins,
            Major_Arcana: suits.major_arcana,
            _rev        : suits.reverse
        };
        
        for (let ord = 0; ord < 22; ord++) {
            if (ord >= range.start && ord <= range.end) {
                filt[ordMajor[ord]] = true;
                if (ord > 0 && ord < 15) {
                    filt[ordMinor[ord]] = true;
                }
            } else {
                filt[ordMajor[ord]] = false;
                if (ord > 0 && ord < 15) {
                    filt[ordMinor[ord]] = false;
                }
            }
        }
        this._wghtDictFilt = {};
        for (let key in this._wghtDict) {
            let [_, value, suit, rev] = key.match(filtExpr);
            if (filt[value] && filt[suit] && (rev === undefined || filt[rev])) {
                this._wghtDictFilt[key] = this._wghtDict[key];
            }
        }
    }
    /**
     * Requests the Coach to display the answer for the current flash card.
     * The coach delegates this request to the FlashCardDeck object.
     */
    static revealAnswer(event) {
        let coach = Coach.instance;
        coach._deck.revealAnswer();

        // Update button state.
        coach._conf.disabled   = false;
        coach._reveal.disabled = true;
        coach._next.disabled   = false;
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
            let accm = accumulate(Object.values(this._confDict));
            if (accm.length !== 0) {
                let total           = accm[accm.length - 1];
                let possible        = 100 * accm.length;
                this._meter.value   = total / possible;
            } else {
                this._meter.value = 0;
            }
        }
    }
    _onRange(e) {
        this._range = e.detail.range;
        this._updateFilteredWeights();
    }
    _onSuit(e) {
        this._suits = e.detail.allSuits;
        this._updateFilteredWeights();
    }
    _save() {
        setPData("cardWeights",     this._wghtDict);
        setPData("cardConfidence",  this._confDict);
        setPData("data_version",    this._data_version);
    }
    _restore() {
        this._data_version = getPData("data_version");
        if (this._data_version !== _DATA_VERSION) {
            clearPData();
            this._data_version = _DATA_VERSION;
            this._wghtDict = {};
            this._confDict = {};
        } else {
            this._wghtDict = getPData("cardWeights") || {};
            this._confDict = getPData("cardConfidence") || {};
        }
    }
}
/**
 * Reject invalid configurations.
 * Open and close config.
 * Persist the settings.
 * Fix the meaning div so the drop down doesn't have that partial outline.
 */
