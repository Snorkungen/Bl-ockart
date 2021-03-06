import "./board.scss";
import {
    BaseElement,
    Block,
    getParent,
    BrushTooltip
} from "./Base";
import {
    createElement
} from "../modules/createElement";
import History from "./History";

class Row extends BaseElement {
    constructor({
        blockAmount,
        blockSize,
        blockColor,
        rowIndex
    }) {
        super({
            blockAmount,
            blockSize,
            blockColor
        });
        this.rowIndex = rowIndex;
        this.setBlocks(this.blockAmount);
    }
    setBlocks(blockAmount) {
        for (let i = 0; i < blockAmount; i++) {
            this.appendChild(new Block({
                blockSize: this.blockSize,
                blockColor: this.blockColor,
                index: i
            }))
        }
    }
}


class Board extends BaseElement {
    constructor({
        blockAmount,
        blockSize,
        blockColor
    }) {
        super({
            blockAmount,
            blockSize,
            blockColor
        });
        this.history = new History();
        this.activeColor = this.blockColor;

        this.baseColor = this.blockColor;


        this.setRows(this.blockAmount);

        this.setGap(0)

        // Overcomplicating Things but it's a fun challenge
        this.brushFillToggle = false;
        this.brushFillSize = 3;

        // EventListeners
        this.addEventListener("mousedown", this.clickHandler);
        this.addEventListener("mouseover", this.mouseOverHandler)
        // this.addEventListener("wheel", this.wheelHandler);
        this.addEventListener("dragstart", ev => ev.preventDefault());
        this.addEventListener("contextmenu", ev => ev.preventDefault());

        document.addEventListener("keydown", (event) => {
            // ctrl + z
            if (event.ctrlKey && event.key === "z") this.revertHistory();
        });
    }
    setRows(rowAmount) {
        for (let i = 0; i < rowAmount; i++) {
            this.blockAmount = rowAmount;
            this.appendChild(new Row({
                blockAmount: this.blockAmount,
                blockColor: this.blockColor,
                blockSize: this.blockSize
            }))
        }
        return this;
    }
    scaleBlocks(blockSize) {
        this.blockSize = blockSize;
        this.forEachBlock((block) => {
            block.setSize(blockSize);
        })
    }
    scaleBoard(scaleSize) {
        let increaseSizeBoolean = scaleSize > 0 ? true : false;

        if (increaseSizeBoolean) {
            // Increase size
            this.forEachRow((row) => {
                for (let index = 0; index < scaleSize; index++) {
                    row.appendChild(new Block({
                        blockSize: this.blockSize,
                        blockColor: this.blockColor,
                        index: this.blockAmount + index
                    }));
                }
            });
            for (let index = 0; index < scaleSize; index++) {
                this.appendChild(new Row({
                    blockAmount: this.blockAmount + scaleSize,
                    blockColor: this.blockColor,
                    blockSize: this.blockSize,
                    rowIndex : this.blockAmount + (index + 1)
                }));
            }
        } else {
            // Decrease size

            this.forEachRow((row) => {
                for (let index = 0; index < (scaleSize * -1); index++) {
                    row.children[row.children.length - 1].remove();
                }
            });
            for (let index = 0; index < (scaleSize * -1); index++) {
                this.children[this.children.length - 1].remove();
            }
        }
        this.blockAmount += scaleSize;
        this.setGap(this.currgap);

        return this.scaleBlocks(this.getMaximumBlockSize())
        // console.log(increaseSizeBoolean)
    }

    saveBoardState() {
        const blockData = [];
        this.forEachBlock((block, {
            x,
            y
        }) => {
            blockData.push({
                x,
                y,
                color: block.color,
                colors: block.colors
            })
        });
        return blockData;
    }
    toggleGap() {
        let gap = 0;
        if (this.gap === 0) gap = 1;
        return this.setGap(gap)
    }

    revertHistory() {

        const state = this.history.state ? this.history.state : [];
        state.forEach((block) => block.revertColor());
        this.history.remove()
        return this;
    }

    setGap(gap) {
        this.gap = gap;
        this.forEachRow((row) => {
            row.gap = gap;
        })
    }

    setUpdateActiveColorFunction(cb) {
        this.updateActiveColor = cb;
    }

    copyColor({
        target
    }) {
        this.setActiveColor(target.color);
        if (this.updateActiveColor) this.updateActiveColor(target.color);
        return this;
    }

    clickHandler(event) {

        if (event.target.localName !== "sk-block") return;

        if (event.ctrlKey) {
            // fill Logic
            return this.fillColor(event.target);
        }
        if (!event.ctrlKey && event.shiftKey) {
            // copy Color;
            return this.copyColor(event);
        }
        // if ((event.ctrlKey && event.shiftKey) || (event.buttons == 2 && event.button == 2)) {
        //     // Revert Color;
        //     return event.target.revertColor();
        // }


        if (this.brushFillToggle) {
            return this.brushFill(event.target)
        }

        if (event.target.setColor(this.activeColor)) this.history.click(event.target);
        return this;
    }
    mouseOverHandler(event) {
        if (event.target.localName !== "sk-block") return;
        if (!event.buttons) return;

        if (this.brushFillToggle) {
            return this.brushFill(event.target)
        }

        if (event.target.setColor(this.activeColor)) this.history.drag(event.target);
        return this;
    }
    wheelHandler(event) {
        if (!event.shiftKey) return this;
        const maximumBlockSize = this.getMaximumBlockSize();
        const minimumBlockSize = 10;
        const blockSizeIncrement = 4;

        this.blockSize += event.deltaY < 0 ? blockSizeIncrement : -blockSizeIncrement;

        if (maximumBlockSize < this.blockSize) return this;
        if (minimumBlockSize > this.blockSize) return this
        this.forEachBlock((block) => {
            block.setSize(this.blockSize);
        })
    };



    // Complicated shit that doesnt work
    fillRowColor(target, activeColor, history) {
        const targetColor = target.color
        // const activeColor = this.activeColor;
        function recursiveN(block) {
            if (!block) return;
            if (block.color !== targetColor) return;
            if (block.setColor(activeColor)) history.fill(block)
            return recursiveN(block.nextSibling);
        };

        function recursiveP(block) {
            if (!block) return;
            if (block.color !== targetColor) return;
            if (block.setColor(activeColor)) history.fill(block)
            return recursiveP(block.previousSibling);

        };

        target.setColor(activeColor);
        history.fill(target);

        recursiveN(target.nextSibling)
        recursiveP(target.previousSibling)
    }

    fillColor(target) {
        const targetColor = target.color;
        const activeColor = this.activeColor;
        const targetIndex = target.blockIndex;
        const history = this.history;
        const fillRowColor = this.fillRowColor;

        function recursiveN(row) {
            if (!row) return;
            const block = row.children[targetIndex];
            if (block.color !== targetColor) return;
            fillRowColor(block, activeColor, history);
            return recursiveN(row.nextSibling);
        };

        function recursiveP(row) {
            if (!row) return;
            const block = row.children[targetIndex];
            if (block.color !== targetColor) return;
            fillRowColor(block, activeColor, history);
            return recursiveP(row.previousSibling);
        };


        this.fillRowColor(target, activeColor, history);
        recursiveN(target.parentNode.nextSibling);
        recursiveP(target.parentNode.previousSibling);

        this.history.fillReset();
    }
    toggleBrushFill() {

        if (this.brushFillToggle) {
            if (this.brushTooltip) {
                this.brushTooltip.remove();
            }
            return this.brushFillToggle = false;
        }

        this.brushTooltip = new BrushTooltip({
            color: "black",
            size: Math.round(this.blockSize * this.brushFillSize)
        })
        document.body.appendChild(this.brushTooltip)

        return this.brushFillToggle = true;
    }
    brushFill(target) {
        const fillAmountPerSide = Math.floor((this.brushFillSize - 1) / 2);
        const activeColor = this.activeColor;
        const targetIndex = target.blockIndex;
        const history = this.history;

        function rY(row, sw, blockIndex, ttl) {
            if (ttl <= 0 || !row) return;
            const block = row.children[blockIndex];

            if (block.setColor(activeColor)) history.fill(block);

            return rY(sw === "P" ? row.previousSibling : row.nextSibling, sw, blockIndex, ttl - 1);
        }

        function rX(block, sw, ttl) {
            if (ttl <= 0 || !block) return;

            rY(block.parentNode.previousSibling, "P", block.blockIndex, ttl);
            rY(block.parentNode.nextSibling, "N", block.blockIndex, ttl);

            if (block.setColor(activeColor)) history.fill(block);
            return rX(sw === "P" ? block.previousSibling : block.nextSibling, sw, ttl - 1);
        }

        rX(target.previousSibling, "P", fillAmountPerSide);
        rX(target.nextSibling, "N", fillAmountPerSide);

        rY(target.parentNode.previousSibling, "P", targetIndex, fillAmountPerSide);
        rY(target.parentNode.nextSibling, "N", targetIndex, fillAmountPerSide);

        if (target.setColor(activeColor)) history.fill(target);

        return this.history.fillReset();
    }



    __initState(boardState) {
        this.scaleBoard(boardState.size - this.blockAmount);
        this.activeColor = boardState.paletteColors[0]
        for (let i = 0; i < boardState.blockValues.length; i++) {
            const {
                x,
                y,
                color,
                colors
            } = boardState.blockValues[i];

            this.children[y].children[x].setColor(color);
            this.children[y].children[x].colors = colors;
        }
    }
}

export {
    Board,
    Row
}