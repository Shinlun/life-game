import { type GridCell } from "@/contexts/Game.context";

const isCurrentCell = (cell: GridCell, x: number, y: number) =>
	cell.x === x && cell.y === y;

const getNeighbors = (cell: GridCell, grid: GridCell[]) =>
	grid.filter(
		(c) =>
			Math.abs(c.x - cell.x) <= 1 &&
			Math.abs(c.y - cell.y) <= 1 &&
			!isCurrentCell(c, cell.x, cell.y)
	);

export const getNextState = (cell: GridCell, grid: GridCell[]) => {
	const neighbors = getNeighbors(cell, grid);
	const aliveNeighbors = neighbors.filter((n) => n.alive).length;

	if (aliveNeighbors === 3) return true;

	if (aliveNeighbors === 2) return cell.alive;

	return false;
};

export const getCellsToUpdate = (cell: GridCell, grid: GridCell[]) => {
	const neighbors = getNeighbors(cell, grid);
	const cellsToUpdate: GridCell[] = [];

	for (const neighbor of neighbors) {
		const aliveNeighbors = getNeighbors(neighbor, grid).filter(
			(n) => n.alive
		).length;

		if (neighbor.alive && aliveNeighbors !== 2 && aliveNeighbors !== 3) {
			cellsToUpdate.push(neighbor);
		}

		if (!neighbor.alive && aliveNeighbors === 3) {
			cellsToUpdate.push(neighbor);
		}
	}

	return cellsToUpdate;
};

export const getNextGrid = (grid: GridCell[]) => {
	const nextGrid: GridCell[] = [];

	for (const cell of grid) {
		nextGrid.push({ ...cell, alive: getNextState(cell, grid) });
	}

	return nextGrid;
};
