export const world = [];
export const height = 15;
export const width = 10;
export const attic = 4;
export const neighbours = [[-1, 0], [0, 1], [1, 0]];

export function initWorld(){
    for (let i = 0; i < height + attic; i++){
        const row = [];
        for (let j = 0; j < width; j++){
            row.push(0);
        }
        world.push(row);
    }
}


export function renderWorld(tetri, display){
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            const cell = display[i].getElementsByClassName(`${j}`)[0];
            if (cell){
                if (world[i+attic][j] == 2){
                    let color = tetri?tetri.color:"";
                    cell.style.backgroundColor = color;
                    continue;
                }
                else if (world[i+attic][j] == 0){
                    cell.style.backgroundColor = "";
                }
            }
        }
    }
}

export function updateWorld(tetri, display){
    for (const box of tetri.boxes){
        world[box.y][box.x] = 1;
    }
    renderWorld(tetri, display);
}

export function clearTetri(tetri, display){
    for (const box of tetri.boxes){
        world[box.y][box.x] = 0;
    }

    renderWorld(tetri, display);
}

export function renderTetri(tetri, display){
    for (const box of tetri.boxes){
        world[box.y][box.x] = 2;
    }

    renderWorld(tetri, display);
}