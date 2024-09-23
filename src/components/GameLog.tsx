import { FC } from "react";
import { GameTurnProps } from "../types";

type GameLogProps = {
  turns: GameTurnProps[];
};

const GameLog: FC<GameLogProps> = ({ turns }) => {
  return (
    <li id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}-${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </li>
  );
};

export default GameLog;
