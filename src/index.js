import BlockArtBoard from "./Components/BlockArtBoard";

const root = document.getElementById("root");




root.appendChild(new BlockArtBoard({
    blockAmount : 20,
    blockSize : 20,
    blockColor : "hotpink"
}))