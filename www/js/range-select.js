'use strict';

class RangeSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        
        this._value = "";   // Element displaying brief descr of range.
        this._table = null; // Table with range items.
        this._low   = -1;   // Index of range start.
        this._high  = -1;   // Index of range end.
        this._nrows =  0;
        this._rows  = [];
        this._loaded    = false;
        this._loadedcb  = rs => {};
        this._load();
    }
    async _load() {
        // Related file: file:///./../html-partials/range-select.html
        let html = await loadText("./html-partials/range-select.html");
        this.shadowRoot.innerHTML = html;
        const qs = s => this.shadowRoot.querySelector(s);

        // TODO - Handle elements declared in this element's body?

        this._value = qs(".range-value");
        this._table = qs("table");

        this._table.onclick = this._onClick.bind(this);
        this._loaded = true;
        this._loadedcb(this);
    }
    get start() {
        return this._low;
    }
    get end() {
        return this._high;
    }
    set start(n) {
        this._select(n);
    }
    set end(n) {
        this._select(n);
    }
    set loaded(cb) {
        this._loadedcb = cb;
        if (this._loaded) {
            cb(this);
        }
    }
    clearTable() {
        this._table.innerHTML = "";
        this._rows  = [];
        this._nrows =  0;
        this._start = -1;
        this._end   = -1;
    }
    addRow(...cellText) {
        this._addRow(false, cellText);
        return this._nrows - 1;
    }
    addHeader(...cellText) {
        this._addRow(true, cellText);
    }
    _addRow(isHeader, cellText) {
        let elmType = (isHeader) ? "th" : "td";
        let row     = document.createElement("tr");
        if (isHeader) {
            row.setAttribute("nrow", -1);
        } else {
            row.setAttribute("nrow", this._nrows);
            this._nrows++;
            this._rows.push(row);
        }
        for (let ct of cellText) {
            let cell = document.createElement(elmType);
            cell.textContent = ct;
            row.appendChild(cell);
        }
        this._table.appendChild(row);
    }
    _onClick(e) {
        if (e.target.tagName === "TD") {
            let row  = e.target.parentElement;
            let nrow = Number.parseInt(row.getAttribute("nrow"));
            this._select(nrow);
        }
    }
    _select(nrow) {
        // Update high and low indices of selected range.
        if (this._low === -1 || this._low !== this._high) {
            this._low   = nrow;
            this._high  = nrow;
        } else if (nrow < this._low) {
            this._low   = nrow;
        } else if (nrow > this._high) {
            this._high  = nrow;
        }
        // Highlight the range of selected rows.
        for (let nrow = 0; nrow < this._nrows; nrow++) {
            let row = this._rows[nrow];
            if (nrow >= this._low && nrow <= this._high) {
                row.classList.add("highlight");
            } else {
                row.classList.remove("highlight");
            }
        }
        // Generate a condensed string representation of the selected range.
        let loNote = rangeNote(this._rows[this._low ]);
        let hiNote = rangeNote(this._rows[this._high]);

        // Example: "1 (Ace, Magician)  to  11 (Page, Justice)"
        let val = `<b>${this._low}</b> ` +
                  `<span class="bc"><i>(${loNote})</i></span>` + 
                  `&nbsp;&nbsp;&nbsp;` + 
                  `<i><b>to</b></i>` + 
                  `&nbsp;&nbsp;&nbsp;` +
                  `<b>${this._high}</b> ` + 
                  `<span class="bc"><i>(${hiNote})</i></span>`;

        // Display the string.
        this._value.innerHTML = val;
    }
}
function rangeNote(tr) {
    let m = map    (tr.children, td => td.textContent.trim());
    let f = filter (m, t => t !== "");
    let s = slice  (f, 1);
    return [...s].join(", ");
}

customElements.define("range-select", RangeSelect);
