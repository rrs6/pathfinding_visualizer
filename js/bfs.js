import { directions } from "./utils.js";
import { colorCell } from "./main.js";
export function bfs(grid, m, n, startPos, targetPos) {
    let posQueue = [];
    posQueue.push(startPos);
    while(posQueue.length>0){
        let pos = posQueue.shift();
        let i = pos.y;
        let j = pos.x;
        if(grid[i][j]==0)
            grid[i][j] = 4;
        colorCell(i, j, true);
        for(let k = 0; k < 4; k++){
            let newI = i + directions[k].v;
            let newJ = j + directions[k].h;
            if(newI == targetPos.y && newJ == targetPos.x)
                return;
            if(newI >= 0 && newI < n && newJ >= 0 && newJ < m && grid[newI][newJ]==0){
                grid[newI][newJ] = 4;
                colorCell(newI, newJ, true);
                posQueue.push({x:newJ, y:newI});
            }
        }
    }
}