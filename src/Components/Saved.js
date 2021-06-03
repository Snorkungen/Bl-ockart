import { createElement } from "../modules/createElement";
import {
    getParent,
    Block
} from "./Base";
import BoardRouter, {
    LcAPi
} from "./Router";

class BoardIcon extends HTMLElement {
    constructor(id, data) {
        super();

        this.id = id;
        this.data = data;

        this.blockSize = 14;

        this.loadBlocks();
        createElement(this,"hah",`content=${this.id}`);

        this.addEventListener("click", () => {
            const {
                router
            } = getParent(this, "sk-saved");
            router.loadRoute(this.id);
        });

    }
    loadBlocks() {
        const {
            paletteColors: colors
        } = this.data;

        this.innerHTML = "";
        
        this.createBlock(colors [0]);
        this.createBlock(colors [1]);
        this.createBlock(colors [colors.length - 1]);
        this.createBlock(colors [colors.length - 2]);
        return
    }
    createBlock(color) {
        const block = new Block({
            blockSize: this.blockSize,
            blockColor: color,
            index: 0
        });

        this.appendChild(block);
    }
}

class SavedBoards extends HTMLElement {
    constructor(blockArtBoard) {
        super();
        this.blockArtBoard = blockArtBoard;
        this.LcAPI = new LcAPi("BoardStates");
        this.router = new BoardRouter(this.blockArtBoard);

        this.loadBoardIcons()
    }
    loadBoardIcons() {
        const boards = this.LcAPI.state;

        this.innerHTML = "";

        boards.forEach((data, i) => {
            this.appendChild(new BoardIcon(i, data))
        })
    }
}

customElements.define("sk-saved-icon", BoardIcon);
customElements.define("sk-saved", SavedBoards);

export default SavedBoards;