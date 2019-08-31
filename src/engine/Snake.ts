import { Cell, Game } from './Game'

const game = new Game();

export enum Direction{
    North=1, 
    South=2, 
    West=3, 
    East=4
}
export class Snake{
    direction: Direction= Direction.East;
    cells:Cell[] = [
        new Cell (0,0),
        new Cell (1,0),
        new Cell (2,0)
    ]
    isAppleInside?:(x:number, y:number)=>boolean;

    fieldLength = game.field.fieldHeight*game.field.fieldWidth;

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

        if(head.x>game.field.fieldWidth-1){
            this.cells[this.cells.length-1].x=0;
        } 
        
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
        if(this.cells[this.cells.length-1].x>game.field.fieldWidth-1){
            this.cells[this.cells.length-1].x = 0
        }

        if(this.cells[this.cells.length-1].x<0){
            this.cells[this.cells.length-1].x = game.field.fieldWidth-1;
        }

        if(this.cells[this.cells.length-1].y>game.field.fieldHeight-1){
            this.cells[this.cells.length-1].y = 0
        }

        if(this.cells[this.cells.length-1].y<0){
            this.cells[this.cells.length-1].y = game.field.fieldHeight-1;
        }
    }

    isGameOver(snake: Cell[]): boolean{
        console.log(snake)

        for(let i = 0;i<snake.length;i++){
            if(snake[snake.length-1].x===snake[i].x && snake[snake.length-1].y===snake[i].y){
              return true;  
            }
        }
        return false;
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

