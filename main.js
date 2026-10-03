const grid = []
const doms = []
const board = document.getElementById("board");
let curTet = null;

board.addEventListener('click', (e)=>{
    for (let box of curTet.boxes){
        if (grid[box.y][box.x-1] == 1 || box.x == 0){
            return;
        }
    }
    
    for (let box of curTet.boxes){
        grid[box.y][box.x] = 0;
        doms[box.y][box.x].style.backgroundColor = "";
        box.x -= 1;
    }
})

board.addEventListener('contextmenu', (e)=>{
    e.preventDefault();
    for (let box of curTet.boxes){
        if (grid[box.y][box.x+1] == 1 || box.x == 9){
            return;
        }
    }
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
    color = "green";
    constructor (color){
        this.color = color;
    }
    async stepDown(){
        while(1){
            console.log(this.boxes);
            for(const box of this.boxes) {
                //check if the shape's base hit something
                if (box.y == 0 || (grid[box.y-1][box.x] == 1 && !this.boxes.some(b => b.x == box.x && b.y == box.y-1))){
                    return this;
                }
            };
            for (const box of this.boxes){
                if (box.y < 15)
                    doms[box.y][box.x].style.backgroundColor="";
            }
            for(const box of this.boxes){
                if (box.y == 0 && box.isbase) return this;
                box.y -= 1;
            };
            for (const box of this.boxes){
                if (box.y < 15)
                    doms[box.y][box.x].style.backgroundColor=this.color;                
            }
            console.log (doms)
            await sleep(100);
        }
    }
}

class I_tet extends tetris {
    constructor(color){
        //lets define where the base can be! it can be anywhere between 0 - 9 in x right
        super(color);
        let x = Math.floor(Math.random() * 10);
        this.boxes.push(new box(x, 16, true));
        for (let i = 1; i < 4; i++){
            this.boxes.push(new box(x, 16+i, false));
        }
        console.log ("I_tet Created!");
    }

    rotateP90(){
        
        // for (let box of this.boxes){
        //     if (!box.isbase){
        //         box.
        //     }
        // }
    }
}

class T_tet extends tetris {
    constructor(color){
        //lets define where the base can be! it can be anywhere between 0 - 9 in x right
        super(color);
        let x = Math.floor((Math.random() * 8) + 1);
        this.boxes.push(new box(x, 16, true));
        for (let i = 0; i < 3; i++){
            if (i == 1){
                this.boxes.push(new box(x - 1 + i, 16+1, false));
                continue;
            }
            this.boxes.push(new box(x-1+i, 16+1, true));
        }
        console.log ("T_tet Created!");
    }
}

class L_tet extends tetris {
    constructor(color){
        //lets define where the base can be! it can be anywhere between 0 - 9 in x right
        super(color);
        let x = Math.floor(Math.random() * 9);
        this.boxes.push(new box(x, 16, true));
        this.boxes.push(new box(x+1, 16, true));
        for (let i = 0; i < 3; i++){
            this.boxes.push(new box(x, 16+i, false));
        }
        console.log ("L_tet Created!");
    }
}

function updateGrid(tetri){
    for (const box of tetri.boxes){
        if (box.y > 14){
            grid.forEach(row => 
                row.fill(0)
            );
            initGrid();
        }
        grid[box.y][box.x] = 1;
        doms[box.y][box.x].style.backgroundColor = tetri.color;
    };

    //clear an entire row if it is fully populated logic comes here
    let crush = false;
    grid.forEach((row, idx) => {
        if (Array.isArray(row) && row.reduce((sum, cur) => sum + cur, 0)){
            for (let i = idx; i < 14; i++){
                grid[i] = [...grid[i+1]];
            }
        }         
    });

    //DOM render logic

    return false;
}

function spawnTet(){
    let colorlist = ["red", "yellow", "black", "white"];
    let color = colorlist[Math.floor(Math.random()*4)];
    let num = Math.floor(Math.random()*3);
    switch(num){
        case 0:
            return new I_tet(color);
        case 1:
            return new T_tet(color);
        case 2:
            return new L_tet(color);
    }
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