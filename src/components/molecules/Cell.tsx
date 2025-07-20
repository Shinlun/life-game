import { useGameContext } from "@/contexts/Game.context";
import { cn } from "@/lib/utils";

type CellProps = {
	x: number;
	y: number;
};

const Cell = ({ x, y }: CellProps) => {
	const { controls, isPainting, grid } = useGameContext();

	const alive = !!grid.find((cell) => cell.x === x && cell.y === y)?.alive;

	const toggleAlive = () => {
		if (isPainting) {
			controls.toggleCell(x, y);
		}
	};

	return (
		<div
			className={cn(
				"w-3 h-3 flex-shrink-0 bg-neutral-200 border-r border-b border-neutral-500 text-xs grid place-items-center",
				alive ? "bg-neutral-800 text-white" : "bg-neutral-100"
			)}
			onMouseEnter={toggleAlive}
			onMouseDown={() => controls.toggleCell(x, y)}
		>
			{/* ({x},{y}) */}
		</div>
	);
};

export default Cell;
