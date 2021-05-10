

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
    get gap () {
        return this.currgap
    }
    set gap(gap) {
        this.currgap = gap;
        this.style.gap = `${this.currgap}px`;
    }
    getMaximumBlockSize() {
        const smallestN = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;

        return Math.floor(smallestN / this.blockAmount);
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

        if(index || index === 0) this.blockIndex = index

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
        if (this.color === color) return this;
        this.color = color;
        this.style.background = this.color;
        if (this.colors[this.colors.length - 1] === this.color) return this;
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

export {
    Block,
    BaseElement
}