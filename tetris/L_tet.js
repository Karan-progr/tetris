import { random } from "../utils/random.js";
import { tetris } from "./tetris.js";
import { box } from "./tetris.js";
import { getDirections } from "../utils/directions.js";
import { clearTetri, renderTetri, validPosition, world } from "../world/world.js";

export class L_tet extends tetris {
    constructor(color, display){
        super();
        let x = random(0, 8);
        this.boxes.push(new box (x, 4));
        this.boxes.push(new box (x+1, 4));
        this.boxes.push(new box (x, 3));
        this.boxes.push(new box (x, 2));
        this.color = color;

        for (const box of this.boxes){
            world[box.y][box.x] = 2;
        }

        this.setbasis();

    }

    getPivot(){
        return this.boxes[2];
    }
}