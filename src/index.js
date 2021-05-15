import BlockArtBoard,{Block} from "./Components/BlockArtBoard";
import History from "./Components/History";
import Router from "./Components/Router";

const root = document.getElementById("root");




root.appendChild(new BlockArtBoard({
    blockAmount : 20,
    blockSize : 20,
    blockColor : "#e0e0e0"
}));

const test = new Router();