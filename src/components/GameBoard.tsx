import { FC } from "react";

type GameBoardProps = {
  board: any[][];
  onSquareSelect: (rowIndex: number, colIndex: number) => void;
};

const GameBoard: FC<GameBoardProps> = ({ board, onSquareSelect }) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol: string, colIndex: number) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSquareSelect(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
