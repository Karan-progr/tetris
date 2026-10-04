import { random } from "./utils/random.js";
import { initWorld, renderWorld, spawnRandomTetri, updateWorld, world } from "./world/world.js";
import { T_tet } from "./tetris/T_tet.js";

const disp = document.getElementById("board");
export const display = disp.children;
export const scoreDOM = document.getElementById("score");
const gameOverDOM = document.getElementById("gameOver");
const retryDOM = document.getElementById("retry");

export let score = 0;
export function updateScore(){
    scoreDOM.textContent = `${score}`;
}

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

retryDOM.addEventListener("click", (e) => {
    window.location.reload();
});

//mobile doms

const leftbtn = document.getElementById("left");
const rightbtn = document.getElementById("right");
const rotatebtn = document.getElementById("rotate");

leftbtn.addEventListener("click", (e)=>{
    curTet.moveLeft(display);
    e.stopPropagation();
});

rightbtn.addEventListener("click", (e)=>{
    curTet.moveRight(display);
    e.stopPropagation();
});

rotatebtn.addEventListener("click", (e)=>{
    curTet.rotate90(display);
    e.stopPropagation();
});

let gameover = false;

while(!gameover){
    curTet = spawnRandomTetri(display);
    await curTet.stepDown(display);
    gameover = updateWorld(curTet, display);
    score++;
    updateScore();
    console.log (world);
}

gameOverDOM.classList.toggle("pop");

// window.location.reload();