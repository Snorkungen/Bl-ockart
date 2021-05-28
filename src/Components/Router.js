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
    constructor(blockArtBoard) {
        this.blockArtBoard = blockArtBoard;
        this.LcAPi = new LcAPi("BoardStates");
        this.__initRoute();
    }
    __initRoute () {
        const search = window.location.search;
        const id = search.substr(1).split("id=")[1];

        return this.loadBoard(id);
    }

    loadBoard (id) {
        if(!!!id) return;
 
        const boardState = this.LcAPi[parseInt(id)];

        if(!!!boardState) return ;

        this.blockArtBoard.__initState(boardState)
    }

}

export {
    LcAPi
};
export default BoardRouter;