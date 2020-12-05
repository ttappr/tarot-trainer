class Coach {
    constructor(deck, meter, rater, next) {
        this._deck = deck;
        this._meter = meter;
        this._rater = rater;
        this._next = next;
        rater.attachListener(
            {valueChanged: (source, value) => {
                this._updateCardConfidenceScore(source, value);
            }});
        next.attachListener(
            {nextRequest: (source) => {
                this._nextCard(source);
            }});
    }
    static get instance() {
        if (!Coach._instance) {
            Coach._instance = new Coach();
        }
        return Coach._instance;
    }
    _updateCardConfidenceScore(source, value) {

    }
    _nextCard(source) {
        
    }
    _retrieveDisciplesData() {
        this._userData = JSON.parse(window.localStorage.getItem("userData"));
    }
    _storeDisciplesData() {
        window.localStorage.setItem("userData", JSON.stringify(this._userData));
    }
    _clearDiscipleData() {
        window.localStorage.removeItem("userData");
    }
}

Coach._instance = null;
