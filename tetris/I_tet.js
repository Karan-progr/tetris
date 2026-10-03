import { world } from "../world/world.js";
import { tetris } from "./tetris.js";
import { box } from "./tetris.js";

export class I_tet extends tetris {
    constructor(color){
        super();
        let x = Math.floor(Math.random() * 10); //0 - 9
        this.boxes.push(new box (x, 4));
        this.boxes.push(new box (x, 3));
        this.boxes.push(new box (x, 2));
        this.boxes.push(new box (x, 1));
        this.color = color;

        for (const box of this.boxes){
            if (world[box.y+1][box.x] == 2)
                box.isbase = true;            
        }


    }
}