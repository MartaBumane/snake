import { Cell } from './Cell'

export class Game {
    field = {
        fieldHeight: 25,
        fieldWidth: 25
    }

    cells: Cell[] = [];
    apples: Cell[] = [new Cell(3, 1), new Cell(5, 5), new Cell(6, 1), new Cell(4, 15), new Cell(16, 3)];

    constructor() {
        this.setField(this.field.fieldHeight, this.field.fieldWidth);
    }


    setField(height: number, width: number): void {
        this.cells = [];

        this.field.fieldHeight = height;
        this.field.fieldWidth = width;

        for (let i = 0; i < this.field.fieldHeight; i++) {
            for (let j = 0; j < this.field.fieldWidth; j++) {
                this.cells.push(new Cell(j, i));
            }
        }
    }


    getField() {
        return [...this.cells]
    }

    getApple() {
        return new Cell(3, 1)
    }

    getApples() {
        return [...this.apples]
    }

    getRandomApples(snake: Cell[], field: Cell[], count: number): Cell[] {
        const possiblePositions = this.getPositionsWithoutSnake(snake, field);
        let apples: Cell[] = [];
        for (let i = 0; i < count; i++) {
            let index = Math.floor(Math.random() * possiblePositions.length);
            apples.push(possiblePositions[index] as Cell);
        }
        return apples;
    }

    getRandomApple(snake: Cell[], field: Cell[]) {
        const possiblePositions = this.getPositionsWithoutSnake(snake, field);
        const index = Math.floor(Math.random() * possiblePositions.length);
        return possiblePositions[index] as Cell;
    }

    getPositionsWithoutSnake(cellsWithSnake: Cell[], a: Cell[]): Cell[] {
        let possiblePositions: Cell[] = [];

        for (let i = 0; i < a.length; i++) {
            if (cellsWithSnake.some(cell => cell.x === a[i].x && cell.y === a[i].y) === false) {
                possiblePositions.push(a[i]);
            }
        }

        return possiblePositions
    }

    isSnakeInSamePositionWithApple(snake: Cell[], apple: Cell[]): boolean {

        for (let i = 0; i < apple.length; i++) {
            if (snake.some(cell => cell.x === apple[i].x && cell.y === apple[i].y)) {
                return true;;
            }
        }

        return false;

    }

    applesRemoveTheEatenOne(snake: Cell[], apple: Cell[]): Cell[] {
        for (let i = 0; i < apple.length; i++) {
            if (snake.some(cell => cell.x === apple[i].x && cell.y === apple[i].y)) {
                apple.splice(i, 1);
            }
        }
        return apple;
    }

}
