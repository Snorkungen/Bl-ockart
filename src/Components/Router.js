class LcAPi {
    constructor(key) {
        this.key = key;

        this.state.forEach((board, i) => {
            this[i] = board;
        });


    }

    updateBoard(i, boardState) {
        const state = this.state;
        state[i] = boardState;
        this[i] = boardState;

        return localStorage.setItem(this.key, JSON.stringify(state));
    }

    saveNewBoard(boardState) {
        const state = this.state;
        state.push(boardState);

        this[state.length] = boardState;
        return localStorage.setItem(this.key, JSON.stringify(state));
    }

    get state() {
        const lcStore = localStorage.getItem(this.key);

        if (Array.isArray(JSON.parse(lcStore))) return JSON.parse(lcStore);
        return [];
    }
    get length() {
        return this.state.length;
    }
}

class BoardRouter {
    constructor() {
        this.LcAPi = new LcAPi("BoardStates");
        console.log(this.LcAPi)
    }
}

export {
    LcAPi
};
export default BoardRouter;