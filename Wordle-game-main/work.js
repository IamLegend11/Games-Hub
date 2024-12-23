const dic = [
    "Apple",
    "Beach",
    "Charm",
    "Dance",
    "Eagle",
    "Faith",
    "Giant",
    "Happy",
    "Image",
    "Joker",
    "Knack",
    "Llama",
    "Mango",
    "Ocean",
    "Paint",
    "Quiet",
    "Razor",
    "Sugar",
    "Toast",
    "Union",
    "Water",
    "Yield",
    "Zebra",
    "Angle",
    "Brush",
    "Crown",
    "Drift",
    "Excel",
    "Frost",
    "Glove",
    "Honey",
    "Irony",
    "Jewel",
    "Knife",
    "Level",
    "Movie",
    "Novel",
    "world",
    "sweet"];
const state = {
    secret:dic[Math.floor(Math.random() * dic.length)].toUpperCase(),
    grid:Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow:0,
    currentCol:0,
};

function updateGrid() {
    for(let i = 0;i<state.grid.length;i++){
        for(let j = 0;j<state.grid[i].length;j++){
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(cont, row, col, letter = ''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;
    cont.appendChild(box);
    return box;
}

function drawgrid(cont){
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i = 0;i<6;i++){
        for(let j = 0;j<5;j++){
            drawBox(grid,i,j);
        }
    }
    cont.appendChild(grid);
}

function getKBE(){
    document.body.onkeydown = (e) =>{
        const key = e.key;
        if(key === 'Enter'){
            if(state.currentCol === 5) {
                const word = getCW();
                revealWord(word.toUpperCase());
                state.currentRow++;
                state.currentCol = 0;
            }
        }
        if(key === 'Backspace'){
            removeLetter();
        }
        if(isLetter(key)){
            addLetter(key);
        }

        updateGrid();
    };
}

function getCW(){
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function revealWord(guess){
    const row = state.currentRow;
    const animation_D = 500; //ms
    

    for(let i = 0;i<5;i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if(guess[i] === state.secret[i]){
                box.classList.add('right');
            }
            else if(state.secret.includes(letter.toUpperCase())) {
                box.classList.add('wrong');
            }
            else{
                box.classList.add('empty');
            }
        }, ((i+1) * animation_D) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_D) / 2}ms`;
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    setTimeout(() => {
        if(isWinner){
            alert('Congratulations! You won');
            location.reload();
        }
        else if(isGameOver){
            alert(`Better luck next time! the word was : ${state.secret.toLowerCase()}`);
            location.reload();
        }
    }, 3 * animation_D);
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i)
}

function addLetter(letter){
    if(state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter(){
    if(state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol-1] = '';
    state.currentCol--;
}

function startup(){
    const all = document.getElementById('all');
    drawgrid(all);

    getKBE();

    // next line is only for testing
    console.log(state.secret);
}

startup();
