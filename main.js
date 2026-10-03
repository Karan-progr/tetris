import { I_tet } from "./tetris/I_tet.js";
import { random } from "./utils/random.js";
import { initWorld, renderWorld, updateWorld } from "./world/world.js";

const disp = document.getElementById("board");
export const display = disp.children;

initWorld();
const colors = ["yellow", "purple", "orange", "red"];

renderWorld(null, display);

let i = 10;
while(i){
    let tetri = new I_tet(colors[random(0, 3)]);
    await tetri.stepDown(display);
    updateWorld(tetri, display);
    i--;
}

window.location.reload();