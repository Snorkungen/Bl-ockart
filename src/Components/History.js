// This is pointless why ????????
class ArraySk extends Array {
    get first() {
        return this[0];
    }
    get last() {
        return this[this.length - 1];
    }
    get lastIndex() {
        return this.length - 1;
    }
}

class BoardHistory {
    constructor(options = {}) {

        this.history = new ArraySk();
        this.maxHistoryLength = options.maxHistoryLength || 40;

        this.dragLength = options.dragLength || 10;
        this.dragColor = null;

        this.lastFillIndex = null;
    }

    remove() {
        this.history.pop();
        return this;
    }

    trimHistory() {
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
        return;
    }

    click(block) {
        this.history.push([block]);
        return this.trimHistory();
    }

    drag(block) {
        if (this.history.last) {
            const lastDragArr = this.history.last;
            if (lastDragArr.length < this.dragLength && lastDragArr[lastDragArr.length - 1].color == this.dragColor) {
                lastDragArr.push(block);
                return this.trimHistory();
            }
        }
        this.dragColor = block.color;
        this.history.push([block]);
        return this.trimHistory();
    }

    fill(block) {
        // HAHAHHAH HOW is this going to happen
        if (this.lastFillIndex !== null) {
            const lastFillArr = this.history[this.lastFillIndex];
                lastFillArr.push(block);
                return this.trimHistory();
        }

        this.history.push([block]);
        this.lastFillIndex = this.history.lastIndex;

        return this.trimHistory();
    }
    fillReset () {
        this.lastFillIndex = null;
    }

    get state() {
        return this.history.last
    }
}

export default BoardHistory;