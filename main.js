const grid = []
const doms = []
const board = document.getElementById("board");
let curTet = null;

board.addEventListener('click', (e)=>{
    for (let box of curTet.boxes){
        grid[box.y][box.x] = 0;
        doms[box.y][box.x].style.backgroundColor = "";
        box.x -= 1;
    }
})

board.addEventListener('contextmenu', (e)=>{
    e.preventDefault();
    for (let box of curTet.boxes){
        grid[box.y][box.x] = 0;
        doms[box.y][box.x].style.backgroundColor = "";
        box.x += 1;
    }
})

function initGrid(){
    for (let i = 0; i < 19; i++){
        const row = [];
        for (let j = 0; j < 10; j++){
            row.push(0);
        }
        grid.push(row);
    }

    console.log ("Grid Initialized!");
    console.log (grid);

    for (let i = 0; i < 15; i++){
        const row = [];
        for (let j = 0; j < 10; j++){
            row.push(document.getElementById(`r${i}`).children[j]);
        }
        doms.push(row);
    }
}

class box {
    x = null;
    y = null;
    isbase = false;

    constructor(x, y, isbase){
        this.x = x;
        this.y = y;
        this.isbase = isbase;
    }
}

class tetris {
    // color = white;
    speed = 0;
    boxes = [];
    async stepDown(){
        while(1){
            console.log(this.boxes);
            for(const box of this.boxes) {
                //check if the shape's base hit something
                if (box.y == 0 || (grid[box.y-1][box.x] == 1) && box.isbase){
                    return this;
                }
            };
            for (const box of this.boxes){
                if (box.y < 15)
                    doms[box.y][box.x].style.backgroundColor="";
            }
            for(const box of this.boxes){
                if (box.y == 0) return this;
                box.y -= 1;
            };
            for (const box of this.boxes){
                if (box.y < 15)
                    doms[box.y][box.x].style.backgroundColor="#00ffb3";                
            }
            console.log (doms)
            await sleep(500);
        }
    }
}

class I_tet extends tetris {
    constructor(){
        //lets define where the base can be! it can be anywhere between 0 - 9 in x right
        super();
        let x = Math.floor(Math.random() * 10);
        this.boxes.push(new box(x, 16, true));
        for (let i = 1; i < 4; i++){
            this.boxes.push(new box(x, 16+i, false));
        }
        console.log ("I_tet Created!");
    }
}

function updateGrid(tetri){
    for (const box of tetri.boxes){
        if (box.y > 14)
            return true;
        grid[box.y][box.x] = 1;
        doms[box.y][box.x].style.backgroundColor = "#00ffb3";
    };

    //clear an entire row if it is fully populated logic comes here


    //DOM render logic

    return false;
}

function spawnTet(){
    return new I_tet();
}


function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function main(){
    console.log ("Game Started!");
    initGrid();
    let finished = false;
    while (!finished){
        const tetri = spawnTet();
        curTet = tetri;
        await tetri.stepDown();
        finished = updateGrid(tetri);
        console.log(grid);
    }
}

main();