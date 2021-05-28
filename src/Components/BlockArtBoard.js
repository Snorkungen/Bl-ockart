import "./board.scss"
import {
    createElement
} from "../modules/createElement";
import {
    BaseElement,
    Block
} from "./Base"
import {
    Row,
    Board
} from "./Board";
import Router, {
    LcAPi
} from "./Router"
const randomRGB = () => {

    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
}

function getParent(el, elName) {
    if (el.localName === elName) return el;
    return getParent(el.parentNode, elName);
}

class ColorPalette extends BaseElement {
    constructor(props) {
        super(props);

        this.activeColorBlock = new Block(props);
        this.availableColorsRow = new Row(props);


        this.paletteColors = props.paletteColors;
        this.setActiveColor(this.paletteColors[0]);
        this.style.display = "flex";
        this.style.flexDirection = "row";


        this.appendChild(this.activeColorBlock);
        this.appendChild(this.availableColorsRow);
        this.forEachBlock((block, {
            x
        }) => {
            const blockSize = Math.floor(this.getMaximumBlockSize() / 1.2);
            block.setSize(blockSize);
            block.setColor(this.paletteColors[x]);
            block.addEventListener("click", ({
                target: block
            }) => {
                this.setActiveColor(block.color);
                if (this.updateActiveColor) this.updateActiveColor(block.color);
            })
        });

    }
    resetColorPallette (paletteColors) {
        this.paletteColors = paletteColors;

        this.forEachBlock((block,{x}) => block.setColor(this.paletteColors[x]))

        this.setActiveColor(this.paletteColors[0]);
    }

    setUpdateActiveColorFunction(cb) {
        this.updateActiveColor = cb;
    }

    setActiveColor(color) {
        this.activeColor = color;
        this.activeColorBlock.setColor(color);
        return this;
    }

}

class BlockArt extends BaseElement {
    constructor(props) {
        super(props);

        this.paletteColors = new Array(this.blockAmount).fill(0).map(() => randomRGB());

        this.colorPalette = new ColorPalette({
            ...props,
            paletteColors: this.paletteColors
        });
        this.board = new Board(props);

        this.activeColor = this.paletteColors[0]

        this.colorPalette.setActiveColor(this.activeColor)
        this.board.setActiveColor(this.activeColor)

        this.colorPalette.setUpdateActiveColorFunction((color) => {
            this.setActiveColor(color);
            this.board.setActiveColor(color);
            return this;
        });
        this.board.setUpdateActiveColorFunction((color) => {
            this.setActiveColor(color);
            this.colorPalette.setActiveColor(color);
            return this;
        });
        createElement(this, "button", "content=Toggle Gap").addEventListener("click", (event) => event.target.parentNode.board.toggleGap())
        createElement(this, "button", "content=Save Board").addEventListener("click", this.saveBoard)
        createElement(this, "button", "content=Scale +").addEventListener("click", (event) => event.target.parentNode.board.scaleBoard(1))
        createElement(this, "button", "content=Scale -").addEventListener("click", (event) => event.target.parentNode.board.scaleBoard(-1))

        this.appendChild(this.colorPalette);
        this.appendChild(this.board);

        this.board.toggleGap()
    }
    __initState (boardState) {
        this.colorPalette.resetColorPallette(boardState.paletteColors);
        this.board.__initState(boardState);
    }
    saveBoard(event) {
        const target = getParent(this, "sk-bl-ockart");
        const boardState = {
            size : target.blockAmount,
            paletteColors : target.paletteColors,
            gap: target.board.gap,
            blockValues : target.board.saveBoardState()
        };
        
        const lcApi = new LcAPi("BoardStates");

        lcApi.saveNewBoard(boardState)
    }
}

customElements.define("sk-bl-ockart", BlockArt);
customElements.define("sk-color-palette", ColorPalette);
customElements.define("sk-board", Board);
customElements.define("sk-block", Block);
customElements.define("sk-row", Row);

export {
    Row,
    Board,
    Block
}
export default BlockArt;