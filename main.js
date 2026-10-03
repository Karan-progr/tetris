import { random } from "./utils/random.js";
import { initWorld, renderWorld, spawnRandomTetri, updateWorld, world } from "./world/world.js";
import { T_tet } from "./tetris/T_tet.js";

const disp = document.getElementById("board");
export const display = disp.children;

initWorld();
const colors = ["yellow", "purple", "orange", "red"];

renderWorld(null, display);


let curTet = null;
window.addEventListener("wheel", () => {
    curTet.rotate90(display);
});

window.addEventListener("click", (e)=>{
    curTet.moveLeft(display);
});

window.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
    curTet.moveRight(display);
});

let i = 10;
while(i){
    curTet = spawnRandomTetri(display);
    await curTet.stepDown(display);
    updateWorld(curTet, display);
    console.log (world);
    i--;
}

// window.location.reload();