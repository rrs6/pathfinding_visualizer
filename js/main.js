import { bfs } from './bfs.js';
import { dfs } from './dfs.js';
const content = document.getElementById('content');
var canvas = document.createElement('canvas');
const numCellsInput = document.getElementById("numCells");
canvas.id = "cvs";
const context = canvas.getContext('2d');
let setT = false;
let setS = false;
export let startPos, targetPos;
let targetPlaced = false;
let startPlaced = false;
let interv;
let width, height;
let boxWidth = numCellsInput.value;
let boxHeight = numCellsInput.value;
let cvsWidth;
let cvsHeight;
let n, m;
var grid;
let colorQueue = [];
let gridFreezed = false;
function initialize() {
    width = content.getBoundingClientRect().width;
    height = content.getBoundingClientRect().height;
    canvas.height = (Math.floor((height - 200) / boxHeight)) * boxHeight;
    canvas.width = (Math.floor((width - 200) / boxWidth)) * boxWidth;
    cvsWidth = canvas.width;
    cvsHeight =  canvas.height;
    n = cvsHeight/boxHeight;
    m = cvsWidth/boxWidth;
    grid = new Array(n);
    targetPlaced = false;
    startPlaced = false;
    for(let i = 0; i < n; i++){
        grid[i] = new Array(m);
        for(let j = 0; j < m; j++){
            grid[i][j] = 0;
            colorCell(i, j, "#cbcbcb", "#cbcbcb" ,false);
        }
    }
    targetPlaced = false;
    startPlaced = false;
    colorQueue = [];
    clearInterval(interv);
    interv = null;
    gridFreezed = false;
}
function resetGrid() {
    for(let i = 0; i < n; i++){
        let onesInRow = 3;
        grid[i] = new Array(m);
        for(let j = 0; j < m; j++){
            let v;
            if(onesInRow>0){
                v = Math.floor(Math.random() * 2);
                onesInRow = (v==1 ? onesInRow-1 : 3);
            }else {
                v = 0;
                onesInRow = 3;
            }
            grid[i][j] = v;
            let vv = grid[i][j];
            let color = (vv == 0 ? "#cbcbcb" : (vv == 1 ? "#000000" : (vv == 2 ? "#4dff7d" : (vv == 3 ? "#ca33ff" : "#fac222"))));
            colorCell(i,j,color,color,false);
        }
    }
    for(let j = 0; j < m; j++){
        let onesInRow = 3;
        for(let i = 0; i < n; i++){
            let v;
            if(onesInRow>0){
                v = Math.floor(Math.random() * 2);
                onesInRow = (v==1 ? onesInRow-1 : 3);
            }else {
                v = 0;
                onesInRow = 3;
            }
            grid[i][j]= v;
            let vv = grid[i][j];
            let color = (vv == 0 ? "#cbcbcb" : (vv == 1 ? "#000000" : (vv == 2 ? "#4dff7d" : (vv == 3 ? "#ca33ff" : "#fac222"))));
            colorCell(i,j,color,color,false);
        }
    }
    targetPlaced = false;
    startPlaced = false;
    colorQueue = [];
    clearInterval(interv);
    interv = null;
    gridFreezed = false;
}
document.getElementById("clear").addEventListener('click', () => {
    resetGrid();
})
const btnTarget = document.getElementById("target");
btnTarget.addEventListener('click', () => {
    setT = !setT;
    setS = false;
    btnTarget.classList.toggle('selected');
    btnStart.classList.remove('selected');
})
const btnStart = document.getElementById("start");
btnStart.addEventListener('click', () => {
    setS = !setS;
    setT = false;
    btnStart.classList.toggle('selected');
    btnTarget.classList.remove('selected');
})
document.getElementById("dfs").addEventListener('click', () => {
    traversalDFS()
})
document.getElementById("bfs").addEventListener('click', () => {
    traversalBFS()
})
numCellsInput.addEventListener('change', (e) => {
    let value = e.target.value;
    boxHeight = value;
    boxWidth = value;
    initialize();
})
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
    if(!gridFreezed)
        getPosClick(pos);
});
function traversalDFS() {
    clearFilled();
    colorQueue = [];
    if(startPlaced&&targetPlaced&&!gridFreezed){
        gridFreezed = true;
        dfs(grid, n, m, startPos, targetPos);
        gridFreezed = false;
    }
}
function traversalBFS() {
    clearFilled();
    colorQueue = [];
    if(startPlaced&&targetPlaced&&!gridFreezed){
        gridFreezed = true;
        bfs(grid, m, n, startPos, targetPos);
        gridFreezed = false;
    }
}
function getPosClick(position) {
    let i = Math.floor(position.y/boxHeight);
    let j = Math.floor(position.x/boxWidth);
    if(setS){
        if(!startPlaced){
            grid[i][j] = 2;
            startPlaced = true;
            startPos =  {x: j, y: i};
        }else if(grid[i][j]==2){
            startPlaced = false;
            grid[i][j] = 0;
        }
    }else if(setT){
        if(!targetPlaced){
            grid[i][j] = 3;
            targetPlaced = true;
            targetPos = {x: j, y: i};
        }else if(grid[i][j]==3) {
            targetPlaced = false;
            grid[i][j] = 0;
        }
    }else {
        grid[i][j] = 1 - grid[i][j];
    }
    let v = grid[i][j];
    let color = (v == 0 ? "#cbcbcb" : (v == 1 ? "#000000" : (v == 2 ? "#4dff7d" : (v == 3 ? "#ca33ff" : "#fac222"))));
    colorCell(i, j, color, color, false);
}
export function colorCell(i, j, color, colorstep, delayed) {
    if(delayed){
        colorQueue.push({x: j, y: i, color: color});
        colorQueue.push({x: j, y: i, color: colorstep});
        let iteration = 0;
        if(!interv)
            interv = setInterval(() => { colorDelay(iteration++) }, 40);
    }else{
        let v = grid[i][j];
        let color = (v == 0 ? "#cbcbcb" : (v == 1 ? "#000000" : (v == 2 ? "#4dff7d" : (v == 3 ? "#ca33ff" : "#fac222"))));
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(j * boxWidth, i * boxHeight, boxWidth-1, boxHeight-1);
    }
}
function clearFilled() {
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            grid[i][j] = ((grid[i][j] == 4 || grid[i][j]==5) ? 0 : grid[i][j]);
            colorCell(i,j,"#cbcbcb","#cbcbcb",false);
        }
    }
}
function colorDelay() {
    if(colorQueue.length > 0){
        let newPos = colorQueue.shift();
        let newI = newPos.y;
        let newJ = newPos.x;
        let color = newPos.color;
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(newJ * boxWidth, newI * boxHeight, boxWidth-1, boxHeight-1);
    }else{
        clearInterval(interv);
        interv = null;
    }
}
initialize();
content.appendChild(canvas);