// DRY! 
function compareGuesser(curr,prev) {
    let result;
    if (curr === prev) {
        result = curr;
    } else if (curr < prev) {
        result = curr - (prev - curr);
    } else {
        result = curr+ (curr - prev);
    }
    return result;
}

function predictor_v1(moves) {
    // Stupid Predictor

    const guess = [];

    const [currX, currY] = moves[0];
    const [prevX, prevY] = moves[1] ;
    
    guess[0] = compareGuesser(currX,prevX);
    guess[1] = compareGuesser(currY,prevY);
    
    return guess;
}

// moves v1 [3,6]
const moves_v1 = [
    [4, 5],
    [5, 4],
    [6, 3],
    [7, 2],
    [7, 1],
]

function predictor_v2 (moves) {
    // simplified one dimension

    // try to find steps pattern
    
    moves.reverse();
    
    const steps = [];

    for (let i = 0; i < moves.length; i++) {
        const [curr] = moves[i];
        const [prev] = steps[steps.length - 1] || [null];
        
        if(curr === prev) {
            steps[steps.length - 1].push(curr)
        } else {
            steps.push([curr])
        }
    }

    const stepLength = steps[0].length;
    const lastStep = steps[steps.length - 1];
    let next;

    if(lastStep.length === stepLength) {
        next = lastStep[0] + 1;
    } else {
        next = lastStep[0];
    }

    return next
}

const moves_v2 = [
    [3, 3],
    [3, 3],
    [3, 3],
    [2, 2],
    [2, 2],
    [1, 1],
    [1, 1],
]

console.dir(predictor_v2(moves_v2));