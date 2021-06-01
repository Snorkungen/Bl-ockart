import {
    createElement
} from "../modules/createElement";
import {
    getParent
} from "./Base";

class Settings extends HTMLElement {
    constructor(board) {
        super();
        this.board = board;

        this.blockAmountInput = this.createInput("Board size", "type=number", `value=${this.blockAmount}`);
        this.brushSizeInput = this.createInput("Brush size", "type=number", `value=${this.brushSize}`);

        this.gapToggle = createElement(this,"button","content=Toggle board gap!");
        this.gapToggle.addEventListener("click",({target}) => getParent(target,"sk-settings").board.toggleGap());

        this.blockAmountInput.addEventListener("input", this.unsavedNotice);
        this.blockAmountInput.addEventListener("keyup", this.blockAmountInputKeyUpHandler);

        this.brushSizeInput.addEventListener("input", this.unsavedNotice);
        this.brushSizeInput.addEventListener("keyup", this.brushSizeInputKeyUpHandler);
    }
    get blockAmount() {
        return this.board.blockAmount;
    }
    set blockAmount(size) {
        const scaleInt = size - this.blockAmount;
        this.board.scaleBoard(scaleInt);
        return;
    }
    get brushSize() {
        return this.board.brushFillSize;
    }
    set brushSize(size) {
        console.log(size)
        return this.board.brushFillSize = size >= 3 ? size : 3;
    }

    createInput(label, ...inputAttributes) {
        const container = createElement(this, "div", "class=settings-section");
        createElement(container, "label", `content=${label}`);
        return createElement(container, "input", ...inputAttributes);
    }

    unsavedNotice (event,bool) {
        const {target} = event;
        if(!!!bool) {
           return target.classList.add("unsaved");
        }
        return target.classList.remove("unsaved");
    }

    blockAmountInputKeyUpHandler(event) {
        if (event.keyCode === 13) {
            const settings = getParent(event.target, "sk-settings");
            const {
                target: {
                    value
                }
            } = event;

            settings.blockAmount = parseInt(value);
            return settings.unsavedNotice(event,true);
        }
    }
    
    brushSizeInputKeyUpHandler(event) {
        if (event.keyCode === 13) {
            const settings = getParent(event.target, "sk-settings");
            const {
                target: {
                    value
                }
            } = event;
            settings.brushSize = parseInt(value);
            return settings.unsavedNotice(event,true);
        }
    }

}

customElements.define("sk-settings", Settings);
export default Settings;