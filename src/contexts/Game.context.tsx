import useLocalStorage from "@/hooks/useLocalStorage";
import { getNextGrid } from "@/lib/game";
import { createContext, useContext, useEffect, useState } from "react";

export type GridCell = {
	alive: boolean;
	x: number;
	y: number;
};

type GameContextProps = {
	grid: GridCell[];
	setGrid: (grid: GridCell[]) => void;
	tickSpeed: number;
	setTickSpeed: (delay: number) => void;
	isPainting: boolean;
	isRunning: boolean;
	savedGrids: Record<string, GridCell[]>;
	controls: {
		start: () => void;
		stop: () => void;
		reset: () => void;
		clearGrid: () => void;
		toggleCell: (x: number, y: number) => void;
		saveGrid: (name?: string) => void;
		loadGrid: (name: string) => void;
		deleteGrid: (name: string) => void;
	};
};

const GameContext = createContext<GameContextProps>({
	grid: [],
	setGrid: () => {},
	tickSpeed: 500,
	setTickSpeed: () => {},
	isPainting: false,
	isRunning: false,
	savedGrids: {},
	controls: {
		start: () => {},
		stop: () => {},
		reset: () => {},
		clearGrid: () => {},
		toggleCell: () => {},
		saveGrid: () => {},
		loadGrid: () => {},
		deleteGrid: () => {},
	},
});

export const GameContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [grid, setGrid] = useState<GridCell[]>(
		Array.from({ length: 50 }, (_, x) =>
			Array.from({ length: 70 }, (_, y) => ({ alive: false, x, y }))
		).flat()
	);

	const [loadedGrid, setLoadedGrid] = useState<GridCell[]>(grid);

	const [isRunning, setIsRunning] = useState(false);
	const [gameTick, setGameTick] = useState<NodeJS.Timeout | null>(null);
	const [isPainting, setIsPainting] = useState(false);
	const [tickSpeed, setTickSpeed] = useState(500);

	const [rowsCount, setRowsCount] = useState(50);
	const [columnsCount, setColumnsCount] = useState(70);

	const [savedGrids, setSavedGrids] = useLocalStorage<
		Record<string, GridCell[]>
	>("grids", {});

	useEffect(() => {
		setRowsCount(grid.reduce((max, cell) => Math.max(max, cell.x), 0) + 1);
		setColumnsCount(grid.reduce((max, cell) => Math.max(max, cell.y), 0) + 1);
	}, [grid]);

	const controls: GameContextProps["controls"] = {
		start: () => {
			setIsRunning(true);
		},
		stop: () => {
			setIsRunning(false);
		},
		reset: () => {
			setGrid(loadedGrid);
		},
		clearGrid: () => {
			setGrid(
				Array.from({ length: rowsCount }, (_, x) =>
					Array.from({ length: columnsCount }, (_, y) => ({
						alive: false,
						x,
						y,
					}))
				).flat()
			);
		},
		toggleCell: (x: number, y: number) => {
			setGrid(
				grid.map((cell) =>
					cell.x === x && cell.y === y ? { ...cell, alive: !cell.alive } : cell
				)
			);
		},
		saveGrid: (name?: string) => {
			setSavedGrids((prev) => ({
				...prev,
				[name || `grid-${Object.keys(prev || {}).length + 1}`]: grid,
			}));
		},
		loadGrid: (name: string) => {
			const gridToLoad = savedGrids?.[name] || grid;
			setLoadedGrid(gridToLoad);
		},
		deleteGrid: (name: string) => {
			const { [name]: deleted, ...newSavedGrids } = savedGrids || {};
			setSavedGrids(newSavedGrids);
		},
	};

	useEffect(() => {
		if (gameTick) {
			clearInterval(gameTick);
		}
		if (isRunning) {
			setGameTick(
				setInterval(() => {
					setGrid(getNextGrid(grid));
				}, tickSpeed)
			);
		}
	}, [isRunning, grid, tickSpeed]);

	useEffect(() => {
		const handleMouseDown = () => setIsPainting(true);
		const handleMouseUp = () => setIsPainting(false);

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	useEffect(() => {
		setGrid(loadedGrid);
	}, [loadedGrid]);

	return (
		<GameContext.Provider
			value={{
				grid,
				setGrid,
				isPainting,
				isRunning,
				controls,
				tickSpeed,
				setTickSpeed,
				savedGrids: savedGrids || {},
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error("useGameContext must be used within a GameContextProvider");
	}
	return context;
};
