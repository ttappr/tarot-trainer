
const State = Object.freeze({
    NEW_CARD:           1 << 0,
    ANSWER_REVEALED:    1 << 2,
    CONFIDENCE_RATED:   1 << 3,
    PROGRESS_COMPUTED:  1 << 4
});

var _instance = null;

class Coach {
    constructor() {
        if (!_instance) {
            _instance = this;
            this._meter = null;
            this._conf  = null;
            this._next  = null;        
        } else {
            throw Error("Use Coach.instance to get the Coach instance.");
        }
    }
    static get instance() {
        if (!_instance) {
            new Coach();
        }
        return _instance;
    }
    set deck(d) { 
        this._deck  = d;
        this._iwdict = getPData("cardWeights") || {};
        this._icdict = getPData("cardConfidence") || {};

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
    set progressMeter(pm) { 
        this._meter = pm; 
    }
    set confidenceInput(ci) {
        this._conf  = ci;
        if (this._deck) {
            ci.value = this._icdict[this._card_id];
        }
    }
    set nextInput(ni) {
        this._next  = ni;
    }
    static updateConf(value) {
        let coach = Coach.instance;
        let id = coach._card_id;
        coach._iwdict[id] = (100 - value) || 10;
        coach._icdict[id] = value;
    }
    static nextCard() {
        let coach = Coach.instance;
        let cid = wchoice(coach._ids, coach._wts);
        coach._card_id = cid;
        coach._deck.setCardByID(cid);
        coach._conf.value = coach._icdict[cid];
    }
    static revealAnswer() {
        Coach.instance._deck.revealAnswer();
    }
    static save() {
        Coach.instance._saveWeights();
    }
    _saveWeights() {
        setPData("cardWeights", this._iwdict);
        setPData("cardConfidence", this._icdict);
    }
}

