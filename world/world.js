import { Z_tet } from "../tetris/Z_tet.js";
import { I_tet } from "../tetris/I_tet.js";
import { L_tet } from "../tetris/L_tet.js";
import { T_tet } from "../tetris/T_tet.js";
import { random } from "../utils/random.js";
import { O_tet } from "../tetris/O_tet.js";

export const world = [];
export const height = 15;
export const width = 10;
export const attic = 5;
export const neighbours = [[-1, 0], [0, 1], [1, 0]];

export function initWorld(){
    for (let i = 0; i < height + attic; i++){
        const row = [];
        for (let j = 0; j < width; j++){
            row.push(0);
        }
        world.push(row);
    }

    console.log ("World Initialized !");
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
        if (box.y < 5)
            return true; //game over
        world[box.y][box.x] = 1;
    }
    renderWorld(tetri, display);

    for (let i = height+attic-1; i > attic; i--){
        if(!world[i].includes(0)){
            console.log ("has no 0s");
            for (let j = i; j > attic; j--){
                world[j] = structuredClone(world[j-1]);
                renderWorld(null, display);
                console.log (display);
                for (let k = 0; k < 10 && j > attic; k++){
                    display[j - attic].getElementsByClassName(`${k}`)[0].style.backgroundColor
                    = display[j-1-attic].getElementsByClassName(`${k}`)[0].style.backgroundColor;
                }
            }
            world[attic] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            i++;
        }
    }

    renderWorld(null, display);
    return false;
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

export function validPosition(boxes){
    for (const box of boxes){
        if (world[box.y][box.x] == 1 || box.x < 0 || box.x > 9){
            return false;
        }
    }
    return true;
}

export function spawnRandomTetri(display){
    const colors = ["yellow", "purple", "orange", "red"];
    const color = colors[random(0, colors.length-1)];
    const rno = random(0, 4);
    switch(rno){
        case 0:
            return new I_tet(color, display);            
        case 1:
            return new T_tet(color, display);
        case 2:
            return new L_tet(color, display);
        case 3:
            return new Z_tet(color, display);
        case 4:
            return new O_tet(color, display);
    }
}