import { FC } from "react";

type GameOverProps = {
  winner: string | null;
  onRematch: () => void;
};

const GameOver: FC<GameOverProps> = ({ winner, onRematch }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={onRematch}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
