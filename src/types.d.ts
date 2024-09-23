export type ActivePlayerProps = "X" | "O";

export type SqureProps = {
  row: number;
  col: number;
};

export type GameTurnProps = {
  square: SqureProps;
  player: ActivePlayerProps;
};

export type PlayersProps = {
  X: string;
  O: string;
};
