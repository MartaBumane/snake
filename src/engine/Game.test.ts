import { Game, Cell } from './Game'
import { Snake, Direction } from './Snake'

it('should have apple placed', ()=>{
    const game = new Game();
    const apple = game.getApple();

    expect(apple).toEqual(new Cell(3,1));

})

it('should be possible to change field size', ()=>{
    const game = new Game();
    game.setField(3,3);
    const field = game.getField();
    const fieldSize = field.length


    expect(fieldSize).toEqual(9);

})


it('should return possible positions for apple', ()=>{
    const game = new Game();
    game.setField(2,4);
    const snake = new Snake();
    const possiblePositions = game.getPositionsWithoutSnake(snake.cells, game.getField());
    

    expect(possiblePositions).toEqual([
        new Cell (3,0),
        new Cell (0,1),
        new Cell (1,1),
        new Cell (2,1),
        new Cell (3,1)
    ]
    );

})


it('should know is snake in same position with apple', ()=>{
    const snake = new Snake();
    const game = new Game();
    snake.move();
    snake.changeDirection(Direction.South);
    snake.move();
    const status = game.isSnakeInSamePositionWithApple(snake.getCells(), game.getApple());

    expect(status).toEqual(true);

})


