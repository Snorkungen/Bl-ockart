import BlockArtBoard,{Block} from "./Components/BlockArtBoard";
import History from "./Components/History";

const root = document.getElementById("root");




root.appendChild(new BlockArtBoard({
    blockAmount : 20,
    blockSize : 20,
    blockColor : "hotpink"
}));

const test = new History()

// test drag

// for (let i = 0; i < 10; i++) {

//     const color = i < 5? "green":"purple"

//     test.drag(new Block({
//         blockSize : 20,
//         blockColor :color,
//         index : 0
//     }))
// }

console.log(test.state)
console.log(test.history)
