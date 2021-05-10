import "./board.scss"
import {createElement} from "../modules/createElement";
import {BaseElement,Block} from "./Base"
import {Row,Board} from "./Board";
const randomRGB = () => {

    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
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
        createElement(this,"button","content=Toggle Gap").addEventListener("click",(event)=>event.target.parentNode.board.toggleGap())
        createElement(this,"button","content=Log Board State").addEventListener("click",(event)=>console.log(event.target.parentNode.board.saveBoardState()))

        this.appendChild(this.colorPalette);
        this.appendChild(this.board);

        this.board.toggleGap()
    }
}

customElements.define("sk-bl-ockart", BlockArt);
customElements.define("sk-color-palette", ColorPalette);
customElements.define("sk-board", Board);
customElements.define("sk-block", Block);
customElements.define("sk-row", Row);

export default BlockArt;