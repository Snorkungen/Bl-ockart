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
    constructor() {
        this.history = new ArraySk();
        this.maxHistoryLength = 40;

        this.dragLength = 7;
        this.dragColor = null;
        this.lastDragIndex = null;
    }

    trimHistory() {
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
            if(this.lastDragIndex !== null) this.lastDragIndex -= 1;
        }
        return;
    }

    click(block) {
        this.history.push([block]);
        return this.trimHistory();
    }

    drag(block) {
        if (this.lastDragIndex !== null) {
            const lastDragArr = this.history[this.lastDragIndex];
            if (lastDragArr.length < this.dragLength && lastDragArr[lastDragArr.length - 1].color == this.dragColor) {
                lastDragArr.push(block);
                return this.trimHistory();
            }
        }
        this.dragColor = block.color;
        this.history.push([block]);
        this.lastDragIndex = this.history.lastIndex;
        return this.trimHistory();
    }

    fill (block) {
        // HAHAHHAH HOW is this going to happen
    }

    get state() {
        return this.history.last
    }
}

export default BoardHistory;