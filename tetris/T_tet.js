import { random } from "../utils/random.js";
import { tetris } from "./tetris.js";
import { box } from "./tetris.js";
import { getDirections } from "../utils/directions.js";
import { clearTetri, renderTetri, validPosition, world } from "../world/world.js";

export class T_tet extends tetris {
    constructor(color, clno, display){
        super();
        let x = random(1, 8);
        this.boxes.push(new box (x, 3));
        this.boxes.push(new box (x, 2));
        this.boxes.push(new box (x+1, 2));
        this.boxes.push(new box (x-1, 2));
        this.color = color;
        this.clno = clno;

        for (const box of this.boxes){
            world[box.y][box.x] = clno;
        }

        this.setbasis();

    }

    getPivot(){
        return this.boxes[1];
    }
}