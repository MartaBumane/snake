import { Snake, Direction } from './Snake'
import { Cell, Game } from './Game'
const game = new Game();
const fieldLength = game.field.fieldHeight * game.field.fieldWidth

describe('Snake', () => {
    it('should have initial position', () => {
        const snake = new Snake();
        const cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(0, 0),
                new Cell(1, 0),
                new Cell(2, 0)
            ]
        );
    })

    it('should be able to move east', () => {
        const snake = new Snake();
        snake.move();
        const cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(1, 0),
                new Cell(2, 0),
                new Cell(3, 0)
            ]
        );
    })

    it('should be able to move south', () => {
        const snake = new Snake();
        snake.changeDirection(Direction.South);
        snake.move();
        const cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(1, 0),
                new Cell(2, 0),
                new Cell(2, 1)
            ]
        );
    })


    it('should be able to move north', () => {
        const snake = new Snake();
        snake.changeDirection(Direction.South);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(Direction.East);
        snake.move();
        snake.move();
        snake.move();
        snake.changeDirection(Direction.North);
        snake.move();
        snake.move();
        snake.move();

        const cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(5, 2),
                new Cell(5, 1),
                new Cell(5, 0)
            ]
        );
    })

    it('should be able to move west', () => {
        const snake = new Snake();
        snake.changeDirection(Direction.South);
        snake.move();
        snake.changeDirection(Direction.West);
        snake.move();
        const cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(2, 0),
                new Cell(2, 1),
                new Cell(1, 1)
            ]
        );
    })

    it('should not be able to change direction to opsit', () => {
        const snake = new Snake();

        snake.changeDirection(Direction.West);
        expect(snake.direction).toBe(Direction.East);
        snake.changeDirection(Direction.South);

        snake.changeDirection(Direction.North);
        expect(snake.direction).toBe(Direction.South);
        snake.changeDirection(Direction.West);

        snake.move();
        snake.changeDirection(Direction.North);


        snake.changeDirection(Direction.South);
        expect(snake.direction).toBe(Direction.North);

    })

    it('should be able to grow', () => {
        const isAppleInside = (x: number, y: number) => true;
        const snake = new Snake(isAppleInside);
        snake.move();
        const cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(0, 0),
                new Cell(1, 0),
                new Cell(2, 0),
                new Cell(3, 0)

            ]
        );
    })

    it('should tell if snake is on cell', () => {
        const snake = new Snake();
        const cells = snake.getCells();

        expect(snake.isOnCell(0, 0)).toBeTruthy()
        expect(snake.isOnCell(-1, -1)).toBeFalsy()

    })

    it('should be able to go through walls', () => {
        const snake = new Snake();

        for (let index = 0; index < 23; index++) {
            snake.move();
        }
        let cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(23, 0),
                new Cell(24, 0),
                new Cell(0, 0)
            ]
        );

        snake.changeDirection(Direction.South);
        snake.move();
        snake.changeDirection(Direction.West);
        snake.move();


        cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(0, 0),
                new Cell(0, 1),
                new Cell(24, 1)
            ]
        );

        snake.changeDirection(Direction.South);

        for (let index = 0; index < 24; index++) {
            snake.move();
        }

        cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(24, 23),
                new Cell(24, 24),
                new Cell(24, 0)
            ]
        );

        snake.changeDirection(Direction.West);
        snake.move();
        snake.changeDirection(Direction.North);
        snake.move();


        cells = snake.getCells();

        expect(cells).toEqual(
            [
                new Cell(24, 0),
                new Cell(23, 0),
                new Cell(23, 24)
            ]
        );
    })

    it('should be game over, when snake reach its tail', () => {
        const snake = new Snake();
        snake.cells = [
            new Cell(0, 0),
            new Cell(1, 0),
            new Cell(2, 0),
            new Cell(3, 0),
            new Cell(4, 0)
        ]

        snake.changeDirection(Direction.South)
        snake.move();
        snake.changeDirection(Direction.West);
        snake.move();

        expect(snake.cells).toEqual([
            new Cell(2, 0),
            new Cell(3, 0),
            new Cell(4, 0),
            new Cell(4, 1),
            new Cell(3, 1)
        ])

        snake.changeDirection(Direction.North);
        const result = snake.isGameOver();
        expect(result).toEqual(true)

    })

    it('should remember all keypress for move', () => {
        const snake = new Snake();
        snake.changeDirection(Direction.South);
        snake.changeDirection(Direction.East);
        snake.changeDirection(Direction.North);

        snake.move();
        expect(snake.getDirection()).toBe(Direction.South);

        snake.move();
        expect(snake.getDirection()).toBe(Direction.East);

        snake.move();
        expect(snake.getDirection()).toBe(Direction.North);

    })


})