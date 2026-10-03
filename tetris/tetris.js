import { sleep } from "../utils/sleep.js";
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

    async stepDown(display){
        while(true){
            clearTetri(this, display);
            let updatedBoxes = [];
            for(const box of this.boxes){
                if (box.y + 1 == 19 || world[box.y + 1][box.x] == 1){
                    renderTetri(this, display);
                    return;
                }
                updatedBoxes.push({...box, y: box.y+1});
            }
            this.boxes = [];
            this.boxes = [... updatedBoxes];
            renderTetri(this, display);
            await sleep(50);
        }
    }
}