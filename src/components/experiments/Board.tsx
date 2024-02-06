import matchstickImage from "./assets/matchstick.png";

interface BoardProps {
  count: number;
}

export default function Board({ count }: BoardProps) {
  return (
    <div>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            <img
              src={matchstickImage}
              className="matchstick"
              alt="Matchstick"
            />
          </div>
        ))}
    </div>
  );
}

