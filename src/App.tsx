import { FC, useState } from "react";
import GameBoard from "./components/GameBoard";
import PlayerInfo from "./components/PlayerInfo";
import GameLog from "./components/GameLog";
import { ActivePlayerProps, GameTurnProps, PlayersProps } from "./types";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

// type AppProps = {};

const PLAYERS: PlayersProps = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD: any = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const derivedActivePlayer = (gameTurns: GameTurnProps[]) => {
  let currentPlayer: ActivePlayerProps = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const derivedGameBoard = (gameTurns: GameTurnProps[]) => {
  const gameBoard = structuredClone(INITIAL_GAME_BOARD);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const derivedWinner = (gameBoard: any, players: PlayersProps) => {
  let winner: string | null = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstPlayerSymbol: string =
      gameBoard[combination[0].row][combination[0].column];
    const secondPlayerSymbol: string =
      gameBoard[combination[1].row][combination[1].column];
    const thirdPlayerSymbol: string =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstPlayerSymbol &&
      firstPlayerSymbol === secondPlayerSymbol &&
      firstPlayerSymbol === thirdPlayerSymbol
    ) {
      winner = players[firstPlayerSymbol];
    }
  }
  return winner;
};

const App: FC = () => {
  const [players, setPlayers] = useState<PlayersProps>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<GameTurnProps[]>([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelect = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns: GameTurnProps[] = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handlePlayerNameChange = (playerSymbol: string, newName: string) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [playerSymbol]: newName,
    }));
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <PlayerInfo
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard board={gameBoard} onSquareSelect={handleSelect} />
      </div>
      <GameLog turns={gameTurns} />
    </main>
  );
};

export default App;
