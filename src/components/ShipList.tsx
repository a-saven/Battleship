const shipTypes = [
  { name: "carrier", size: 5 },
  { name: "battleship", size: 4 },
  { name: "cruiser", size: 3 },
  { name: "destroyer", size: 2 },
  { name: "submarine", size: 3 },
];

export function ShipList() {
  return (
    <div className="ship-list">
      {shipTypes.map((ship) => (
        <div key={ship.name} className="ship-item">
          <div className="ship-image-container">
            <img src={`/assets/${ship.name}.png`} alt={ship.name} title={`${ship.name} (Size: ${ship.size})`} />
          </div>
        </div>
      ))}
    </div>
  );
}
