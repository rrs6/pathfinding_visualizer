import { directions } from "./utils.js";
import { colorCell } from "./main.js";
var pathList = [];
export function dijkstra(grid, n, m, start, target) {
    let goFrom = new Array(n);
    for(let i = 0; i < n; i++){
        goFrom[i] = new Array(m);
        for(let j = 0; j < m; j++)
            goFrom[i][j] = null;
    }
    let start_i = start.y;
    let start_j = start.x;
    let previousPos = {x: start_j, y: start_i};
    let positions = [];
    goFrom[start.y][start.x] = start;
    positions.push(previousPos);
    while(positions.length>0){
        let pos = positions.shift();
        for(let k = 0; k < directions.length; k++){
            let newJ = pos.x + directions[k].h;
            let newI = pos.y + directions[k].v;
            if(newI >= 0 && newI < n && newJ >= 0 && newJ < m){
                if(grid[newI][newJ]==4 || grid[newI][newJ]==0){
                    grid[newI][newJ] = 5;
                    positions.push({x: newJ, y: newI});
                    goFrom[newI][newJ] = {x: pos.x, y: pos.y};
                }else if(grid[newI][newJ]==3){
                    goFrom[newI][newJ] = {x: pos.x, y: pos.y};
                    let i_target = target.y;
                    let j_target = target.x;
                    while(goFrom[i_target][j_target] != start){
                        let fromP = goFrom[i_target][j_target];
                        pathList.push(fromP);
                        i_target = fromP.y;
                        j_target = fromP.x;
                    }
                    pathList.pop();
                    pathList=pathList.reverse();
                    while(pathList.length>0){
                        let posit = pathList.shift();
                        console.log(posit);
                        colorCell(posit.y, posit.x, "#DC155C", "#DC143C", true);
                    }
                    return ;
                }
            }
        }
    }
}