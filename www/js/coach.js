class Coach {
    _instance = null;

    static get instance() {
        if (Coach._instance) {
            return Coach._instance;
        } else {
            Coach._instance = new Coach();
            return Coach._instance;
        }
    }
}

let c = Coach.instance;
