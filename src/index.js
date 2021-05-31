import BlockArtBoard,{Block} from "./Components/BlockArtBoard";
import Modal from "./Components/Modal";
import Router from "./Components/Router";
import { createElement } from "./modules/createElement";

const root = document.getElementById("root");
// Toast container
createElement(root,"aside","id=toastContainer");

const modal = new Modal();
document.body.appendChild(modal);

const blockArtBoard = new BlockArtBoard({
    blockAmount : 22,
    blockSize : 22,
    blockColor : "#e0e0e0"
});


root.appendChild(blockArtBoard);
new Router(blockArtBoard);

const f = document.createElement("p")
f.innerHTML = "hello world this is so not my thing"

modal.show(f)