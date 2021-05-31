import { createElement } from "../modules/createElement";
import { getParent } from "./Base";

class ToastMessage extends HTMLElement {
    constructor ({ttl,msg}) {
        super();

        setTimeout(()=>this.remove(),ttl);

        // Content
        createElement(this,"p",`content=${msg}`);
       
        this.removeButton = createElement(this,"button")
        this.removeButton.innerHTML = "&times;"
        this.removeButton.addEventListener("click",({target})=>getParent(target,"sk-toast-message").remove());
    }
}

class Toast {
    constructor () {
        this.elem = document.getElementById("toastContainer");
    }
    message (props) {
        this.elem.appendChild(new ToastMessage(props));
    }
}

customElements.define("sk-toast-message", ToastMessage);

export default Toast;