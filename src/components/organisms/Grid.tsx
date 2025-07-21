import { useGameContext } from "@/contexts/Game.context";
import Cell from "../molecules/Cell";

const Grid = () => {
	const { grid } = useGameContext();

	// Group cells by x value
	const rows: Record<number, typeof grid> = {};
	grid.forEach((cell) => {
		if (!rows[cell.x]) rows[cell.x] = [];
		rows[cell.x].push(cell);
	});

	return (
		<div className="max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-5rem)] max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-5rem)] overflow-auto scrollbar-gutter-stable">
			<div className="flex flex-col w-fit border-t border-l border-neutral-500">
				{Object.values(rows).map((row, rowIndex) => (
					<div className="flex flex-row" key={rowIndex}>
						{row.map((cell) => (
							<Cell key={cell.x + "," + cell.y} x={cell.x} y={cell.y} />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Grid;
