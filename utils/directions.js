export function getDirections(source, goals){
    res = [];
    for (const goal of goals){
        res.push([goal.x - source.x, goal.y - source.y]);
    }
    return res;
}