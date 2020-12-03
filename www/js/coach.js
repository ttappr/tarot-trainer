class Coach {
    constructor(deck, meter, rater) {
        this._deck = deck;
        rater.attachListener(
            {valueChanged: (source, value) => {
                this._updateCardConfidenceScore(value);
            }});
    }
    static get instance() {
        if (!Coach._instance) {
            Coach._instance = new Coach();
        }
        return Coach._instance;
    }
    _updateCardConfidenceScore(value) {

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
