import React, { useState } from 'react';
import './App.css';
import { Snake, Direction } from './engine/Snake'
import { Game, Cell } from './engine/Game'

const game = new Game();
let appleInGame = game.getApple()


const isAppleInside=(x:number, y:number)=>{
  return appleInGame.x === x && appleInGame.y === y

}
const snake = new Snake(isAppleInside);

const cssClass = (x: number, y:number): string=>{
  if(snake.isOnCell(x,y)){
    return 'snake'
  }
  if(appleInGame.x===x&&appleInGame.y===y){
    return 'apple'
  }
    return ''
  
}

const width = game.field.fieldWidth;
const height = game.field.fieldHeight;


function parseDirection(e: KeyboardEvent): Direction | null {
  switch (e.key) {
    case "ArrowUp":
      return Direction.North;
    case "ArrowRight":
      return Direction.East;
    case "ArrowDown":
      return Direction.South;
    case "ArrowLeft":
      return Direction.West;
  }
  return null;
 }


document.addEventListener('keyup', (e)=>{
  e.preventDefault();
  const direction = parseDirection(e)

  if(direction){
    snake.changeDirection(direction);
  }
  
})

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>(snake.getCells());
  const [apple, setApple] = useState<Cell>(game.getRandomApple(snake.cells, game.cells));
  const [gameOver, setGameOver] = useState<boolean>(false);

  appleInGame = apple;

  if(game.isSnakeInSamePositionWithApple(snake.cells, apple)){
    snake.move();    
    setApple(game.getRandomApple(cells, game.cells))
    setCells([...cells]);
  }else{
    setTimeout(()=>{
      snake.move();
      setCells([...cells]);
    },350)

  }

  console.log(snake.isGameOver(snake.getCells()));

  return (<div className='App'>
    <h1>Snake</h1>
    <table>
      <tbody>
        {Array(height)
          .fill(null)
          .map((_, y: number) => (
            <tr key = {y}>
              {Array(width)
                .fill(null)
                .map((_, x: number) => (
                  <td key = {`${y}${x}`} className={cssClass(x,y)} />
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  );
}

export default App;
