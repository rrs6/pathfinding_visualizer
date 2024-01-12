import {colorCell} from './main.js';
import { directions } from './utils.js';
export function dfs(grid, n, m, pos, targetPos) {
    let i = pos.y;
    let j = pos.x;
    if(grid[i][j] == 0)
        grid[i][j] = 4;
    colorCell(i, j, true);
    for(let k = 0; k < 4; k++){
        let newI = i + directions[k].v;
        let newJ = j + directions[k].h;
        let newPos = {x: newJ, y: newI};
        if(newPos.x == targetPos.x && newPos.y == targetPos.y){
            return true;
        }
        if(newI >= 0 && newI < n && newJ >= 0 && newJ < m && grid[newI][newJ] == 0){
            let isPath = dfs(grid,n,m,newPos,targetPos);
            if(isPath)
                return true;
        }
    }
    return false;
};