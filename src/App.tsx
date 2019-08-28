import React, { useState } from 'react';
import './App.css';
import { Snake, Direction } from './engine/Snake'
import { Game, Cell } from './engine/Game'

const game = new Game();

const isAppleInside=(x:number, y:number)=>{
  const apple = game.getApple();
  return apple.x === x && apple.y === y

}


const snake = new Snake(isAppleInside);

const cssClass = (x: number, y:number): string=>{
  if(snake.isOnCell(x,y)){
    return 'snake'
  }
  const apple = game.getApple()
  if(apple.x===x&&apple.y===y){
    return 'apple'
  }
    return ''
  
}

const width = 25;
const height = 25;


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

  setTimeout(()=>{
    snake.move();
    setCells(snake.getCells());
  },250)


  return (<div>
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
