import { clearTetri, renderTetri, world } from "../world/world.js";


export class box {
    x = 0;
    y = 0;
    isbase = false;
    moving = true;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export class tetris {
    color = "white";
    boxes = [];

    stepDown(display){
        clearTetri(this, display);
        let updatedBoxes = [];
        for(const box of this.boxes){
            if (world[box.y + 1][box.x] == 1 || box.y + 1 == 15)
                return;
            updatedBoxes.push({...box, y: box.y+1});
        }
        this.boxes = [];
        this.boxes = [... updatedBoxes];
        renderTetri(this, display);
    }
}