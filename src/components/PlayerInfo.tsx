import { FC, useState } from "react";

type PlayerInfoProps = {
  name: string;
  symbol: string;
  isActive: boolean;
  onNameChange: (symbol: string, newName: string) => void;
};

const PlayerInfo: FC<PlayerInfoProps> = ({
  name,
  symbol,
  isActive,
  onNameChange,
}) => {
  const [playerName, setPlayerName] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            required
            autoFocus={isEditing}
            onChange={handleNameChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default PlayerInfo;
