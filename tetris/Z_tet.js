import { random } from "../utils/random.js";
import { tetris } from "./tetris.js";
import { box } from "./tetris.js";
import { world } from "../world/world.js";

export class Z_tet extends tetris {
    constructor(color, display){
        super();
        let x = random(1, 8);
        this.boxes.push(new box (x, 3));
        this.boxes.push(new box (x, 2));
        this.boxes.push(new box (x+1, 2));
        this.boxes.push(new box (x+1, 1));
        this.color = color;

        for (const box of this.boxes){
            world[box.y][box.x] = 2;
        }

        this.setbasis();

    }

    getPivot(){
        return this.boxes[1];
    }
}