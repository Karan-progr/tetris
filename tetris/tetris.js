import { sleep } from "../utils/sleep.js";
import { clearTetri, attic, height, renderTetri, validPosition, world } from "../world/world.js";
import { getDirections } from "../utils/directions.js";

export class box {
    x = 0;
    y = 0;
    isbase = false;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export class tetris {
    color = "white";
    boxes = [];

    pivot = null;

    async stepDown(display){
        while(true){
            clearTetri(this, display);
            let updatedBoxes = [];
            for(const box of this.boxes){
                if (box.y + 1 == height + attic || world[box.y + 1][box.x] == 1){
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

    rotate90(display) {
        if (this.constructor.name == "O_tet")
            return;
        const source = this.getPivot();
        const dists = getDirections(source, this.boxes);
        for (let i = 0; i < dists.length; i++){
            dists[i] = [-dists[i][1], dists[i][0]];
        }
        const newBoxes = []
        for (let i = 0; i < this.boxes.length; i++){
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