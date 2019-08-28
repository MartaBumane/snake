import { Cell } from './Game'

export enum Direction{
    North=1, 
    South=2, 
    West=3, 
    East=4
}
export class Snake{
    direction: Direction= Direction.East;
    cells = [
        new Cell (0,0),
        new Cell (1,0),
        new Cell (2,0)
    ]
    isAppleInside?:(x:number, y:number)=>boolean;

    constructor(isAppleInside?:(x:number, y:number)=>boolean){
        this.isAppleInside = isAppleInside;
    }
    
    isOnCell(x:number, y:number): boolean{
        return this.cells.some(cell=>cell.x === x && cell.y===y);
    }

    getCells(){
       return [...this.cells]
    }

    move(){
        const head = this.cells[this.cells.length-1];

        if(!this.isAppleInside||!this.isAppleInside(head.x, head.y)){
            this.cells.shift();
        }

        if(this.direction ===Direction.East){
            this.cells.push(new Cell(head.x+1, head.y))

        }else if (this.direction===Direction.South){
            this.cells.push(new Cell(head.x, head.y+1))
            
        }else if (this.direction===Direction.North){

            this.cells.push(new Cell(head.x, head.y-1))
        }else if (this.direction===Direction.West){

            this.cells.push(new Cell(head.x-1, head.y))
        }
    }



    changeDirection(direction: Direction){
        if(this.direction===Direction.East && direction===Direction.West){
            return this.direction
        }else if(this.direction===Direction.West && direction===Direction.East){
            return this.direction
        }else if(this.direction===Direction.South && direction===Direction.North){
            return this.direction
        } else if(this.direction===Direction.North && direction===Direction.South){
            return this.direction
        } 

        else{
            this.direction = direction;
        }

    }
}

