import { curTet } from "../main.js";
import { sleep } from "../utils/sleep.js";
import { attic, clearTetri, height, renderTetri, validPosition, world } from "../world/world.js";
let data;

export async function getPossiblePlacements (display){
    //for every x try all possible four orientations and push it straight down till it's base hit something then store the world's state;
    const possiblePlacements = [];

    let worldClone = structuredClone(world);

    //sweep from current pos to world's right boundary
    let cpyCurTet = curTet.clone();
    let r = 1;
    
    let cpyCpyCurTet = cpyCurTet.clone();
    for (let i = 0; i < 4; i++){
        await cpyCpyCurTet.stepDown(0, display);
        possiblePlacements.push({world: structuredClone(world), moves: 0, rots: i});
        clearTetri(cpyCpyCurTet, display);
        cpyCurTet.rotate90(display);
        cpyCpyCurTet = cpyCurTet.clone();
    }

    while (cpyCurTet.moveRight(display)){
        let cpyCpyCurTet = cpyCurTet.clone();
        for (let i = 0; i < 4; i++){
            await cpyCpyCurTet.stepDown(0, display);
            possiblePlacements.push({world: structuredClone(world), moves: r, rots: i});
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
            possiblePlacements.push({world: structuredClone(world), moves: r, rots: i});
            clearTetri(cpyCpyCurTet, display);
            cpyCurTet.rotate90(display);
            cpyCpyCurTet = cpyCurTet.clone();
        }
        r--;
    }
    clearTetri(curTet, display);


    // trying to repeat the above steps again but this time though let do the rotation first then do the 


    for (let i = 0; i < height + attic; i++){
        world[i] = structuredClone(worldClone[i]);
    }

    console.log (possiblePlacements);

    const res = await fetch("http://10.54.5.170:5000/state", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(possiblePlacements)
    });

    data = await res.json();

    data = data.data;

}


export async function applyAction(display) {
    let moves = data["moves"];
    console.log (curTet);
    console.log (data);
    // if (curTet.constructor.name === "O_tet"){
    //     moves = moves > 0? moves + 1:moves;
    //     moves = moves < 0? moves - 1:moves;
    //     console.log ("Altering moves");
    // }
    while (moves){
        curTet.stepOnce(display);
        await sleep(100);
        if (moves > 0){
            curTet.moveRight(display);
            moves--;
        }
        else {
            curTet.moveLeft(display);
            moves++;
        }
    }

    for (let i = 0; i < data["rots"]; i++){
        curTet.stepOnce(display);
        curTet.rotate90(display);
        await sleep(100);
    }
}