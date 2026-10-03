import { random } from "../utils/random.js";
import { tetris } from "./tetris.js";
import { box } from "./tetris.js";
import { getDirections } from "../utils/directions.js";
import { clearTetri, renderTetri, validPosition, world } from "../world/world.js";

export class T_tet extends tetris {
    constructor(color, display){
        super();
        let x = random(1, 8);
        this.boxes.push(new box (x, 4));
        this.boxes.push(new box (x, 3));
        this.boxes.push(new box (x+1, 3));
        this.boxes.push(new box (x-1, 3));
        this.color = color;

        for (const box of this.boxes){
            world[box.y][box.x] = 2;
        }

        this.setbasis();

    }

    rotate90(display) {
        const source = this.boxes[1];
        const dists = getDirections(source, this.boxes);
        for (let i = 0; i < dists.length; i++){
            dists[i] = [-dists[i][1], dists[i][0]];
        }
        const newBoxes = []
        for (let i = 0; i < 4; i++){
            newBoxes.push(new box(source.x + dists[i][0], source.y + dists[i][1]));
        }
        if(!validPosition(newBoxes))
            return;
        
        clearTetri(this, display);
        this.updateBoxes(newBoxes);
        this.setbasis();
        renderTetri(this, display);
    }
}