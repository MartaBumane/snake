import React, { useState } from "react";
import "./App.css";
import { Snake, Direction } from "./engine/Snake";
import { Game } from "./engine/Game";
import { Cell } from "./engine/Cell";

const game = new Game();
let applesInGame = game.getApples();
const appleCount = 5;

const isAppleInside = (x: number, y: number): boolean => {
  for (let i = 0; i < applesInGame.length; i++) {
    if (applesInGame[i].x === x && applesInGame[i].y === y) {
      return true;
    }
  }
  return false;
};

const snake = new Snake(isAppleInside);

const cssClass = (x: number, y: number): string => {
  if (snake.isOnCell(x, y)) {
    return "snake";
  }
  for (let i = 0; i < applesInGame.length; i++) {
    if (applesInGame[i].x === x && applesInGame[i].y === y) {
      return "apple";
    }
  }
  return "";
};

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

document.addEventListener("keyup", e => {
  e.preventDefault();
  const direction = parseDirection(e);

  if (direction) {
    snake.changeDirection(direction);
  }
});
let upDate: () => void;

setInterval(() => {
  if (upDate) {
    upDate();
  }
}, 150);

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>(snake.getCells());
  const [apples, setApples] = useState<Cell[]>(
    game.getRandomApples(snake.cells, game.cells, appleCount)
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);

  applesInGame = apples;

  function reset(): void {
    snake.arrWithDirections = [];
    snake.cells = snake.reset();
    snake.direction = Direction.East;
    setApples(game.getRandomApples(cells, game.cells, appleCount));
    setGameOver(false);
    setLevel(1);
  }

  function updatePosition() {
    if (snake.isGameOver()) {
      setGameOver(true);
      return;
    }

    if (game.isSnakeInSamePositionWithApple(snake.cells, apples)) {
      snake.move();
      setApples(game.applesRemoveTheEatenOne(snake.cells, apples));
      if (apples.length < 1) {
        setLevel(level + 1);
        setApples(game.getRandomApples(cells, game.cells, appleCount));
      }
      setCells(snake.getCells());
    } else {
      snake.move();
      setCells(snake.getCells());
    }
  }

  upDate = updatePosition;

  function createTableBody() {
    let tableBody;

    tableBody = Array(height)
      .fill(null)
      .map((_, y: number) => (
        <tr key={y}>
          {Array(width)
            .fill(null)
            .map((_, x: number) => (
              <td key={`${y}${x}`} className={cssClass(x, y)} />
            ))}
        </tr>
      ));

    return tableBody;
  }
  function displayLevel(): string {
    if (gameOver) {
      return "Game Over";
    } else {
      return "Level " + level;
    }
  }

  return (
    <div className={"App"}>
      <h1>Snake</h1>
      <table className={`Tab ${gameOver ? "gameOver" : ""}`}>
        <tbody>{createTableBody()}</tbody>
      </table>
      <h3>{displayLevel()}</h3>
      <button className="reset" onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
};

export default App;
