
export class Game {
    getApple(){
        return new Cell(5, 5)
    }
}


export class Cell {
    x:number
    y:number

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}