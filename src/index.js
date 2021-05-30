import BlockArtBoard,{Block} from "./Components/BlockArtBoard";
import History from "./Components/History";
import Router from "./Components/Router";

const root = document.getElementById("root");


const blockArtBoard = new BlockArtBoard({
    blockAmount : 40,
    blockSize : 10,
    blockColor : "#e0e0e0"
});

root.appendChild(blockArtBoard);

const test = new Router(blockArtBoard);
