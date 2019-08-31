export class Game {
    field= {
        fieldHeight: 25,
        fieldWidth: 25
    }
    cells: Cell[] = [];

    constructor(){
        this.setField(this.field.fieldHeight, this.field.fieldWidth);
    }
    

    setField(height: number, width: number): void {
        this.cells = [];
        
        this.field.fieldHeight = height;
        this.field.fieldWidth = width;

        for(let i=0;i<this.field.fieldHeight; i++){
            for(let j=0;j<this.field.fieldWidth; j++){
                this.cells.push(new Cell(j, i));            
            }
        }
    }

    getField(){
        return [...this.cells]
    }

    getApple(){
        return new Cell(3, 1)
    }

    getPositionsWithoutSnake(cellsWithSnake: Cell[], a: Cell[]): Cell[]{
        let possiblePositions: Cell[] = [];
        
        for(let i = 0;i<a.length;i++){
            if (cellsWithSnake.some(cell=>cell.x === a[i].x && cell.y===a[i].y)===false){
                possiblePositions.push(a[i]);
            }
        }

        return possiblePositions
    }

    isSnakeInSamePositionWithApple(snake:Cell[], apple:Cell):boolean{
        if (snake.some(cell=>cell.x === apple.x && cell.y===apple.y)){
            return true;;
        }

        return false;
    }

    getRandomApple(snake: Cell[], field: Cell[]){
        const possiblePositions  = this.getPositionsWithoutSnake(snake, field);
        const index = Math.floor(Math.random()*possiblePositions.length);
        return possiblePositions[index] as Cell;
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