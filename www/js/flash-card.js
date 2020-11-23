
//import {CARD_DATA} from "./card-data.js";

class FlashCard extends HTMLElement {
    constructor(suit, value, pic, descr, meaning, reverse) {
        super();

        Object.assign(
            this, {
                _suit    : this.getAttribute('suit')     || suit,
                _value   : this.getAttribute('value')    || value,
                _img     : this.getAttribute('img')      || pic,
                _descr   : this.getAttribute('descr')    || descr,
                _meaning : this.getAttribute('meaning')  || meaning,
                _reverse : this.getAttribute('reverse')  || reverse
            });

        this.attachShadow({mode: 'open'});

        let image = new Image();
        if (this._img) {
            image.src = this._img;
        }
        this.shadowRoot.append(image);
        this.shadowRoot.append(new Text(this.getAttribute("question")));
    }
}

class FlashCardDeck extends HTMLElement {
    constructor(dataURL) {
        super();
        dataURL = dataURL || this.getAttribute('data') || "./js/card-data.json";
        this._cards = [];
        this.attachShadow({mode: 'open'});

        document.addEventListener("deviceready", () => {
            console.info("Trying to read JSON file...");
            this.loadJSON(dataURL).then((data)=> {
                for (let obj of data) {
                    obj.pic = "./img/" + obj.pic;
                    this._cards.push(new FlashCard(...Object.values(obj)));
                }
                console.info(this._cards);
            }).catch((err) => {
                console.error(`loadJSON(${dataURL}) ERROR: ${err}`);
            });
        }, false);
    }

    _reqFS() {
        return new Promise((resolve, reject) => {
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT, 0, 
                (fs) => {
                    return resolve(fs);
                }, (err) => {
                    return reject(err);
                });
        });
    }
    
    _getFile(fs, path) {
        return new Promise((resolve, reject) => {
            fs.root.getFile(
                path, {create: false, exclusive: true},
                (fileEntry) => {
                    return resolve(fileEntry);
                }, (err) => {
                    return reject(err);
                });
        });
    }
    _getText(fileEntry) {
        return new Promise((resolve, reject) => {
            fileEntry.file((file) => {
                let reader = new FileReader();
                reader.onloaded = () => {
                    return resolve(this.result);
                };
                reader.onerror = () => {
                    return reject(this.error);
                };
                reader.readAsText(file);
            }, (err) => {
                return reject(err);
            });
        });
    }
    _resolveLocalFSUrl(url) {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(url, 
                (fs) => {
                    return resolve(fs);
                }, (err) => {
                    return reject(err);
                });
        });
    }

    async loadJSON(path) {
        let appBase     = cordova.file.applicationDirectory + "www/";
        let fs          = await this._resolveLocalFSUrl(appBase);
        let fileEntry   = await this._getFile(fs, path);
        let text        = await this._getText(fileEntry);
        return JSON.parse(text);
    }
}

customElements.define("flash-card", FlashCard);
customElements.define("flash-card-deck", FlashCardDeck);
