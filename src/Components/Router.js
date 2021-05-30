import Board from "./Board";

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

    deleteBoard(i) {
        const state = this.state;
        state[i] = null;
        this[i] = null;

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

        // console.log(this.LcAPi.state)
    }
    __initRoute() {
        const search = window.location.search;

        if(!search) {

            this.loadRoute(this.LcAPi.length)

            return;
        }

        const id = search.substr(1).split("id=")[1];

        return this.loadBoard(id);
    }

    loadBoard(id) {
        if (!!!id) return;

        const boardState = this.LcAPi[parseInt(id)];
        if (!!!boardState) return;

        this.blockArtBoard.__initState(boardState)
    }

    loadRoute(id) {
        const url = new URL(window.location);
        url.searchParams.set("id", id);
        window.history.pushState({}, '', url);
        this.loadBoard(id);
    }
}

export {
    LcAPi
};
export default BoardRouter;