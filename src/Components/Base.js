function getParent(el, elName) {
    if (el.localName === elName) return el;
    return getParent(el.parentNode, elName);
}

class BaseElement extends HTMLElement {
    constructor({
        blockAmount,
        blockSize,
        blockColor
    }) {
        super();
        this.blockAmount = blockAmount;
        this.blockSize = blockSize;
        this.blockColor = blockColor;

        this.activeColor = this.blockColor;
    }
    get gap() {
        return this.currgap
    }
    set gap(gap) {
        this.currgap = gap;
        this.style.gap = `${this.currgap}px`;
    }
    getMaximumBlockSize() {
        let h = window.innerHeight;
        let w = window.innerWidth


        if (this.parentNode && this.parentNode.navbar) {
            h -= this.parentNode.navbar.clientHeight;
        }

        const smallestN = w < h ? w : h;

        return Math.floor(smallestN / this.blockAmount - 4);
    }
    setActiveColor(color) {
        this.activeColor = color;
        return this;
    }
    forEachBlock(cb) {
        for (let rowIndex = 0; rowIndex < this.children.length; rowIndex++) {
            for (let blockIndex = 0; blockIndex < this.children[rowIndex].children.length; blockIndex++) {
                cb(
                    this.children[rowIndex].children[blockIndex], {
                        x: blockIndex,
                        y: rowIndex
                    })
            }
        }
    }
    forEachRow(cb) {
        for (let rowIndex = 0; rowIndex < this.children.length; rowIndex++) {
            cb(
                this.children[rowIndex], {
                    y: rowIndex
                })
        }
    }
}

class Block extends HTMLElement {
    constructor({
        blockSize,
        blockColor,
        index
    }) {
        super();

        if (index || index === 0) this.blockIndex = index

        this.colors = [];

        this.setSize(blockSize);
        this.setColor(blockColor);
    }

    setSize(size) {
        this.size = size;
        this.style.width = `${this.size}px`;
        this.style.height = `${this.size}px`;
        return this;
    }
    setColor(color) {
        if (this.color === color) return false;
        this.color = color;
        this.style.background = this.color;
        if (this.colors[this.colors.length - 1] === this.color) return false;
        this.colors.push(color);
        return this;
    }
    revertColor() {
        if (this.colors.length <= 1) return;
        this.colors.pop();
        this.setColor(this.colors[this.colors.length - 1]);
        return this;
    }
}

class BrushTooltip extends HTMLElement {
    constructor({
        color,
        size
    }) {
        super();

        this.id = "brush";
        this.size = size;
        this.color = "#323232"

        this.style.display = "block";
        this.style.position = "absolute";
        this.style.width = size + "px";
        this.style.height = size + "px";

        this.style.borderRadius = "30%"
        this.style.border = `thin solid ${this.color}`;

        window.addEventListener("mousemove", this.mouseMoveHandler)
    }
    set pos ([x,y]) {
        this.style.left = (x - (this.size / 2)) + "px";
        this.style.top = (y - (this.size / 2)) + "px"
    }
    mouseMoveHandler(event) {
        let x = document.getElementById("brush");
        if(!x) return
        x.pos = [event.pageX,event.pageY];
    }
}

customElements.define("sk-brush", BrushTooltip);

export {
    Block,
    BaseElement,
    getParent,
    BrushTooltip
}