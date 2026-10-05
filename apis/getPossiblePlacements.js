import { curTet } from "../main.js";
import { attic, clearTetri, height, renderTetri, validPosition, world } from "../world/world.js";

export async function getPossiblePlacements (display){
    //for every x try all possible four orientations and push it straight down till it's base hit something then store the world's state;
    const possiblePlacements = [];

    let worldClone = structuredClone(world);

    //sweep from current pos to world's right boundary
    let cpyCurTet = curTet.clone();
    let r = 1;
    while (cpyCurTet.moveRight(display)){
        let cpyCpyCurTet = cpyCurTet.clone();
        for (let i = 0; i < 4; i++){
            await cpyCpyCurTet.stepDown(0, display);
            possiblePlacements.push({world: world, moves: r, rots: i});
            clearTetri(cpyCpyCurTet, display);
            cpyCurTet.rotate90(display);
            cpyCpyCurTet = cpyCurTet.clone();
        }
        r++;
    }
    clearTetri(curTet, display);

    //sweep from current pos to world's left boundary
    r = -1;
    cpyCurTet = curTet.clone();
    while (cpyCurTet.moveLeft(display)){
        let cpyCpyCurTet = cpyCurTet.clone();
        for (let i = 0; i < 4; i++){
            await cpyCpyCurTet.stepDown(0, display);
            possiblePlacements.push({world: world, moves: r, rots: i});
            clearTetri(cpyCpyCurTet, display);
            cpyCurTet.rotate90(display);
            cpyCpyCurTet = cpyCurTet.clone();
        }
        r--;
    }
    clearTetri(curTet, display);


    for (let i = 0; i < height + attic; i++){
        world[i] = structuredClone(worldClone[i]);
    }

    console.log (possiblePlacements);

    return possiblePlacements;
}