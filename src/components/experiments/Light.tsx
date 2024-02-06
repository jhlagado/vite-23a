export interface Props {
  variant: "green" | "yellow" | "red";
}

export default function App({ variant }: Props) {
  let bg;
  switch (variant) {
    case "green":
      bg = "bg-green-400";
      break;
    case "yellow":
      bg = "bg-yellow-400";
      break;
    default:
      bg = "bg-red-400";
      break;
  }
  return <div className={`rounded-full ${bg} w-9 h-9`}></div>;
}
