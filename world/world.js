import { Z_tet } from "../tetris/Z_tet.js";
import { I_tet } from "../tetris/I_tet.js";
import { L_tet } from "../tetris/L_tet.js";
import { T_tet } from "../tetris/T_tet.js";
import { random } from "../utils/random.js";
import { O_tet } from "../tetris/O_tet.js";
import { crushSound } from "../sounds/sounds.js";
import { sleep } from "../utils/sleep.js";
import { colors } from "../main.js";
import { colorMap } from "../main.js";

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


export function renderWorld(display){
    for (let i = 0; i < 15; i++){
        for (let j = 0; j < 10; j++){
            if (display)
                display[i].getElementsByClassName(`${j}`)[0].style.backgroundColor = colorMap[world[i+attic][j]];
        }
    }
}

export async function updateWorld(tetri, display){
    for (const box of tetri.boxes){
        if (box.y < 5)
            return true; //game over
        world[box.y][box.x] = tetri.clno;
    }
    renderWorld(display);

    for (let i = height+attic-1; i > attic; i--){
        if(!world[i].includes(0)){
            crushSound.play();
            for (let j = i; j > attic; j--){
                world[j] = structuredClone(world[j-1]);
                renderWorld(display);
                await sleep(100);
            }
            world[attic] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            renderWorld(display);
            i++;
        }
    }
    renderWorld(display);
    return false;
}

export function clearTetri(tetri, display){
    for (const box of tetri.boxes){
        world[box.y][box.x] = 0;
    }

    renderWorld(display);
}

export function renderTetri(tetri, display){
    for (const box of tetri.boxes){
        world[box.y][box.x] = tetri.clno;
    }

    renderWorld(display);
}

export function validPosition(boxes){
    for (const box of boxes){
        if (box.x < 0 || box.x > 9 || box.y < 0 || world[box.y][box.x] != 0){
            return false;
        }
    }
    return true;
}

export function spawnRandomTetri(display){
    const clrRno = random(1, colors.length-1);
    const color = colors[clrRno];
    const rno = random(0, 4);
    switch(rno){
        case 0:
            return new I_tet(color, clrRno, display);
        case 1:
            return new T_tet(color, clrRno, display);
        case 2:
            return new L_tet(color, clrRno, display);
        case 3:
            return new Z_tet(color, clrRno, display);
        case 4:
            return new O_tet(color, clrRno, display);
    }
}