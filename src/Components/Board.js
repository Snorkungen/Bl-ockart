import "./board.scss";
import {BaseElement,Block} from "./Base"

class Row extends BaseElement {
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
        this.setBlocks(this.blockAmount);
    }
    setBlocks(blockAmount) {
        for (let i = 0; i < blockAmount; i++) {
            this.appendChild(new Block({
                blockSize: this.blockSize,
                blockColor: this.blockColor,
                index : i
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
        this.activeColor = this.blockColor;

        this.baseColor = this.blockColor;

        this.history = [];

        this.setRows(this.blockAmount);

        this.setGap(0)
        
        // EventListeners
        this.addEventListener("mousedown", this.clickHandler);
        this.addEventListener("mouseover", this.mouseOverHandler)
        // this.addEventListener("wheel", this.wheelHandler);
        this.addEventListener("dragstart", ev => ev.preventDefault());
        this.addEventListener("contextmenu", ev => ev.preventDefault());

        document.addEventListener("keydown", (event) => {
            // ctrl + z
            if (event.ctrlKey && event.key === "z") this.revertHistory();
        })
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

    saveBoardState() {
        const blockData = [];
        this.forEachBlock((block, {
            x,
            y
        }) => {
            blockData.push({
                x,
                y,
                color: block.color
            })
        });
        return blockData;
    }
    toggleGap () {
        let gap = 0;
        if(this.gap === 0) gap = 1;
        return this.setGap(gap)
    }

    revertHistory() {
        if (this.history.length < 1) return this;

        this.history[this.history.length - 1].revertColor();
        this.history.pop();
        return this;
    }

    pushHistory(block) {
        const maxHistoryLength = 50;

        this.history.push(block);
        if (this.history.length > maxHistoryLength) this.history.shift();
        return this;
    }

    setGap(gap) {
        this.gap = gap;
        this.forEachRow((row) =>{
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
        if (event.target.constructor.name !== "Block") return;

        if(event.ctrlKey) {
            // fill Logic
            return this.fillColor(event.target);
        }
        if (!event.ctrlKey && event.shiftKey) {
            // copy Color;
            return this.copyColor(event);
        }
        if ((event.ctrlKey && event.shiftKey) || (event.buttons == 2 && event.button == 2)) {
            // Revert Color;
            return event.target.revertColor();
        }

        this.pushHistory(event.target);
        event.target.setColor(this.activeColor);
        return this;
    }
    mouseOverHandler(event) {
        if (event.target.constructor.name !== "Block") return;
        if (!event.buttons) return;
        this.pushHistory(event.target);
        event.target.setColor(this.activeColor);
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
    fillRowColor (target,activeColor) {
        const targetColor = target.color
        // const activeColor = this.activeColor;
        function recursiveN (block) {
            if(!block) return;
             if(block.color !== targetColor) return;
            block.setColor(activeColor);
            return recursiveN(block.nextSibling);
        };
        function recursiveP (block) {
            if(!block) return;
             if(block.color !== targetColor) return;
            block.setColor(activeColor);
            return recursiveP(block.previousSibling);

        };

        target.setColor(activeColor);
        recursiveN(target.nextSibling)
        recursiveP(target.previousSibling)
    }

    fillColor(target) {
        const targetColor = target.color;
        const activeColor = this.activeColor;
        const targetIndex = target.blockIndex;

        const fillRowColor = this.fillRowColor; 

        function recursiveN (row) {
            if(!row) return;
            const block = row.children[targetIndex];
            if(block.color !== targetColor) return;
            fillRowColor(block,activeColor);
            return recursiveN(row.nextSibling);
        };
        function recursiveP (row) {
            if(!row) return;
            const block = row.children[targetIndex];
            if(block.color !== targetColor) return;
            fillRowColor(block,activeColor);
            return recursiveP(row.previousSibling);
        };


        this.fillRowColor(target,activeColor);
        recursiveN(target.parentNode.nextSibling);
        recursiveP(target.parentNode.previousSibling);
    }

}

export {
    Board,
    Row
}