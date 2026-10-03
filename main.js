import { I_tet } from "./tetris/I_tet.js";
import { initWorld, renderWorld } from "./world/world.js";

const disp = document.getElementById("board");
export const display = disp.children;

initWorld();
renderWorld(null, display);
const tetri = new I_tet("yellow");
tetri.stepDown(display);