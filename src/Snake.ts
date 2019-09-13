import { Game } from './Game'
import { Cell } from './Cell'

const game = new Game();

export enum Direction {
    North = 1,
    South = 2,
    West = 3,
    East = 4
}

export class Snake {

    arrWithDirections: Direction[] = [];
    direction: Direction = Direction.East;
    cells: Cell[] = [
        new Cell(0, 0),
        new Cell(1, 0),
        new Cell(2, 0)
    ]

    isAppleInside?: (x: number, y: number) => boolean;

    fieldLength = game.field.fieldHeight * game.field.fieldWidth;

    constructor(isAppleInside?: (x: number, y: number) => boolean) {
        this.isAppleInside = isAppleInside;
    }

    reset(): Cell[] {
        this.cells = [
            new Cell(0, 0),
            new Cell(1, 0),
            new Cell(2, 0)
        ]

        return this.cells
    }


    isOnCell(x: number, y: number): boolean {
        return this.cells.some(cell => cell.x === x && cell.y === y);
    }

    getCells() {
        return [...this.cells]
    }


    isGameOver(): boolean {
        if (this.direction === Direction.North) {
            if (this.isOnCell(this.cells[this.cells.length - 1].x, this.cells[this.cells.length - 1].y - 1)) {
                return true;
            }
        }
        if (this.direction === Direction.South) {
            if (this.isOnCell(this.cells[this.cells.length - 1].x, this.cells[this.cells.length - 1].y + 1)) {
                return true;
            }
        }
        if (this.direction === Direction.East) {
            if (this.isOnCell(this.cells[this.cells.length - 1].x + 1, this.cells[this.cells.length - 1].y)) {
                return true;
            }
        }
        if (this.direction === Direction.West) {
            if (this.isOnCell(this.cells[this.cells.length - 1].x - 1, this.cells[this.cells.length - 1].y)) {
                return true;
            }
        }
        return false;
    }

    getDirection() {
        return this.direction;
    }

    updatePosition() {
        const head = this.cells[this.cells.length - 1];


        if (head.x > game.field.fieldWidth - 1) {
            this.cells[this.cells.length - 1].x = 0;
        }

        
        
        if (this.direction === Direction.East) {
            this.cells.push(new Cell(head.x + 1, head.y))
            
        } else if (this.direction === Direction.South) {
            this.cells.push(new Cell(head.x, head.y + 1))
            
        } else if (this.direction === Direction.North) {
            
            this.cells.push(new Cell(head.x, head.y - 1))
        } else if (this.direction === Direction.West) {
            
            this.cells.push(new Cell(head.x - 1, head.y))
        }
        if (!this.isAppleInside || !this.isAppleInside(head.x, head.y)) {
            this.cells.shift();
        }
        if (this.cells[this.cells.length - 1].x > game.field.fieldWidth - 1) {
            this.cells[this.cells.length - 1].x = 0
        }

        if (this.cells[this.cells.length - 1].x < 0) {
            this.cells[this.cells.length - 1].x = game.field.fieldWidth - 1;
        }

        if (this.cells[this.cells.length - 1].y > game.field.fieldHeight - 1) {
            this.cells[this.cells.length - 1].y = 0
        }

        if (this.cells[this.cells.length - 1].y < 0) {
            this.cells[this.cells.length - 1].y = game.field.fieldHeight - 1;
        }
    }

    move() {
        if (this.arrWithDirections.length > 0) {
            this.direction = this.arrWithDirections[0];
            this.updatePosition();
            this.arrWithDirections.shift();
        }
        else {
            this.updatePosition();
        }
    }

    changeDirection(direction: Direction) {
        if (this.direction === Direction.East && direction === Direction.West) {
            this.arrWithDirections.push(this.direction)
            return this.direction
        } else if (this.direction === Direction.West && direction === Direction.East) {
            this.arrWithDirections.push(this.direction)
            return this.direction
        } else if (this.direction === Direction.South && direction === Direction.North) {
            this.arrWithDirections.push(this.direction)
            return this.direction
        } else if (this.direction === Direction.North && direction === Direction.South) {
            this.arrWithDirections.push(this.direction)
            return this.direction
        }

        else {
            this.direction = direction;
            this.arrWithDirections.push(this.direction)
        }
    }
}

