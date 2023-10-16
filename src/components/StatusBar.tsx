import React from "react";

interface StatusBarProps {
  sunkShips: number;
  totalShips: number;
  score: string;
  resetGame: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ sunkShips, totalShips, score, resetGame }) => (
  <div className="status-bar">
    <span>
      Ships Sunk: {sunkShips} / {totalShips}
    </span>
    {sunkShips === totalShips && (
      <div className="victory">
        <span>Victory!</span>
        <button className="play-again-button" onClick={resetGame}>
          Play Again
        </button>
      </div>
    )}
    <div>
      <span>Hit Rating: {score}%</span>
    </div>
  </div>
);

export default StatusBar;
