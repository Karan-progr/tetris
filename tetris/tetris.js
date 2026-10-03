import { sleep } from "../utils/sleep.js";
import { clearTetri, renderTetri, validPosition, world } from "../world/world.js";


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
            await sleep(300);
        }
    }

    updateBoxes(boxes){
        this.boxes = [];
        this.boxes = boxes;
    }

    moveLeft (display){
        const newBoxes = [];
        for (const box of this.boxes){
            newBoxes.push({...box, x : box.x - 1});
        }
        if (!validPosition(newBoxes))
            return;
        clearTetri(this, display);
        this.updateBoxes(newBoxes);
        renderTetri(this, display);
    }

    moveRight(display){
        const newBoxes = [];
        for (const box of this.boxes){
            newBoxes.push({...box, x : box.x + 1});
        }
        if (!validPosition(newBoxes))
            return;
        clearTetri(this, display);
        this.updateBoxes(newBoxes);
        renderTetri(this, display);
    }

    setbasis(){
        for (const box of this.boxes){
            if (world[box.y+1][box.x] != 2)
                box.isbase = true;
        }
    }
}