import {
    createElement
} from "../modules/createElement";

class Modal extends HTMLElement {
    constructor() {
        super();

        this.currContent = null;

        this.container = createElement(this, "aside");
        this.containerHeader = createElement(this.container, "nav");
        this.modalCloseButton = createElement(this.containerHeader, "button");
        this.modalContentContainer = createElement(this.container,"div");

        this.modalCloseButton.innerHTML = "&times;";

        this.addEventListener("click", this.clickHandler);
    }
    hide() {

        return this.style.display = "none";
    }
    show (el) {
        this.content = el;
        return this.style.display = "flex";
    }

    clickHandler(event) {
        const {
            target
        } = event;
        if((target.localName === "button" && target.parentNode.localName === "nav") || target.localName === "sk-modal") {
            return this.hide()
        }

    }

    set content (el) {
        this.currContent = el;
        this.modalContentContainer.innerHTML = "";
        this.modalContentContainer.appendChild(el);
    }
}

customElements.define("sk-modal", Modal);

export default Modal;