import { useGameContext } from "@/contexts/Game.context";
import { cn } from "@/lib/utils";
import {
	ArrowUpFromLine,
	Pause,
	Play,
	RotateCcw,
	Save,
	Trash,
} from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import LoadGridForm from "./LoadGridForm";
import SaveGridForm from "./SaveGridForm";

const Menu = () => {
	const { grid, setGrid, controls, tickSpeed, setTickSpeed, isRunning } =
		useGameContext();

	const [columns, setColumns] = useState(
		grid.reduce((max, cell) => Math.max(max, cell.x), 0) + 1
	);
	const [rows, setRows] = useState(
		grid.reduce((max, cell) => Math.max(max, cell.y), 0) + 1
	);
	const [displaySaveForm, setDisplaySaveForm] = useState(false);
	const [displayLoadForm, setDisplayLoadForm] = useState(false);

	const handleGenerate = () => {
		setGrid(
			Array.from({ length: rows }, (_, x) =>
				Array.from({ length: columns }, (_, y) => ({ alive: false, x, y }))
			).flat()
		);
	};

	return (
		<div className="w-full bg-neutral-900 flex flex-row items-center justify-start gap-8 p-2 border-b border-neutral-400 text-white text-xs">
			{/* Grid */}
			<section className="flex flex-row items-center gap-2 p-0">
				<label htmlFor="grid-height">Rows: </label>
				<Input
					id="grid-height"
					placeholder="height"
					className="w-20 h-6 rounded-xs"
					value={rows}
					type="number"
					step={1}
					min={1}
					max={1000}
					onChange={(e) => setRows(Number(e.target.value))}
				/>
				<label htmlFor="grid-width">Columns: </label>
				<Input
					id="grid-width"
					placeholder="width"
					className="w-20 h-6 rounded-xs"
					value={columns}
					type="number"
					step={1}
					min={1}
					max={1000}
					onChange={(e) => setColumns(Number(e.target.value))}
				/>
				<Button
					variant="outline"
					className="text-gray-800 h-6 rounded-xs"
					onClick={handleGenerate}
				>
					Generate
				</Button>
			</section>

			<Separator orientation="vertical" className="bg-neutral-600" />

			{/* Tick speed */}
			<section className="flex flex-row items-center gap-2 p-0">
				<label htmlFor="evolution-delay">Tick speed: </label>
				<Slider
					id="evolution-delay"
					value={[tickSpeed]}
					onValueChange={(value) => setTickSpeed(value[0])}
					min={50}
					max={5000}
					step={50}
					className="w-40"
				/>
				<p>{tickSpeed}ms</p>
			</section>

			<Separator orientation="vertical" className="bg-neutral-600" />

			{/* Controls */}
			<section className="flex flex-row items-center gap-2 p-0">
				<Tooltip>
					<TooltipTrigger>
						<Button
							className={cn(
								"h-6 rounded-xs",
								isRunning
									? "bg-red-600 hover:bg-red-700"
									: " bg-green-600 hover:bg-green-700"
							)}
							onClick={isRunning ? controls.stop : controls.start}
						>
							{isRunning ? <Pause /> : <Play />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>{isRunning ? "Pause" : "Start"}</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							className="hover:bg-inherit hover:text-neutral-400 h-6 rounded-xs"
							onClick={controls.reset}
						>
							<RotateCcw />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Reset</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							className="hover:bg-inherit hover:text-neutral-400 h-6 rounded-xs"
							onClick={controls.clearGrid}
						>
							<Trash />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Clear grid</TooltipContent>
				</Tooltip>
			</section>

			<section className="flex flex-row items-center gap-2 p-0 ml-auto">
				<AlertDialog open={displaySaveForm} onOpenChange={setDisplaySaveForm}>
					<AlertDialogTrigger>
						<Tooltip>
							<TooltipTrigger>
								<Button
									variant="outline"
									className="text-gray-800 h-6 rounded-xs hover:text-green-500"
									title="Save"
									onClick={() => setDisplaySaveForm(true)}
								>
									<Save />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Save grid</TooltipContent>
						</Tooltip>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogTitle>Save grid</AlertDialogTitle>
						<SaveGridForm onClose={() => setDisplaySaveForm(false)} />
					</AlertDialogContent>
				</AlertDialog>

				<AlertDialog open={displayLoadForm} onOpenChange={setDisplayLoadForm}>
					<AlertDialogTrigger>
						<Tooltip>
							<TooltipTrigger>
								<Button
									variant="outline"
									className="text-gray-800 h-6 rounded-xs hover:text-green-500"
									title="Load"
								>
									<ArrowUpFromLine />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Load grid</TooltipContent>
						</Tooltip>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogTitle>Load grid</AlertDialogTitle>
						<LoadGridForm onClose={() => setDisplayLoadForm(false)} />
					</AlertDialogContent>
				</AlertDialog>
			</section>
		</div>
	);
};

export default Menu;
