import { useGameContext } from "@/contexts/Game.context";
import { cn } from "@/lib/utils";
import {
	ArrowUpFromLine,
	Eraser,
	MenuIcon,
	Pause,
	Play,
	RotateCcw,
	Save,
	X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
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
import LoadGridForm from "./LoadGridForm";
import SaveGridForm from "./SaveGridForm";

const MobileMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const saveFormRef = useRef<HTMLDivElement>(null);
	const loadFormRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	useClickOutside(menuRef, () => setIsMenuOpen(false), [
		menuRef,
		saveFormRef,
		loadFormRef,
	]);

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
		<div className="flex w-full bg-neutral-900 flex-row items-center justify-start lg:gap-8 gap-4 p-2 border-b border-neutral-400 text-white text-xs">
			<div className="flex flex-grow justify-between">
				<img src="/life-favicon.png" alt="logo" className="w-10 h-10" />
				{/* Controls */}
				<div className="flex flex-row m-auto items-center gap-2 p-0">
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

					<Button
						variant="ghost"
						className="border border-neutral-50 hover:border-neutral-400 hover:bg-inherit hover:text-neutral-400 h-6 rounded-xs"
						onClick={controls.reset}
					>
						<RotateCcw />
					</Button>

					<Button
						variant="ghost"
						className="border border-neutral-50 hover:border-neutral-400 hover:bg-inherit hover:text-neutral-400 h-6 rounded-xs"
						onClick={controls.clearGrid}
					>
						<Eraser />
					</Button>
				</div>

				<button
					className="w-8 h-8 self-center"
					ref={buttonRef}
					onClick={(e) => {
						e.stopPropagation();
						setIsMenuOpen((prev) => !prev);
					}}
				>
					{isMenuOpen ? (
						<X className="w-8 h-8" />
					) : (
						<MenuIcon className="w-8 h-8" />
					)}
				</button>
			</div>
			{isMenuOpen && (
				<div
					className="absolute top-[55px] right-0 w-full h-fit border-b-2 z-50 bg-neutral-800 p-2"
					ref={menuRef}
				>
					<div className="flex flex-col gap-4">
						{/* Grid */}
						<section className="flex flex-col gap-2">
							<h2 className="text-md font-bold">Grid</h2>
							<div className="flex flex-row items-center justify-start gap-2">
								<div>
									<label htmlFor="grid-height">Rows: </label>
									<Input
										id="grid-height"
										placeholder="height"
										className="w-15 h-6 rounded-xs"
										value={rows}
										type="number"
										step={1}
										min={1}
										max={1000}
										onChange={(e) => setRows(Number(e.target.value))}
									/>
								</div>
								<div>
									<label htmlFor="grid-width">Columns: </label>
									<Input
										id="grid-width"
										placeholder="width"
										className="w-15 h-6 rounded-xs"
										value={columns}
										type="number"
										step={1}
										min={1}
										max={1000}
										onChange={(e) => setColumns(Number(e.target.value))}
									/>
								</div>
								<Button
									variant="outline"
									className="text-gray-800 h-6 rounded-xs self-end ml-auto"
									onClick={handleGenerate}
								>
									<span>Generate</span>
								</Button>
							</div>
						</section>

						<Separator orientation="horizontal" className="bg-neutral-600" />

						{/* Tick speed */}
						<section className="flex flex-col gap-2">
							<h2 className="text-md font-bold">Tick speed</h2>
							<div className="flex flex-row items-center justify-start gap-2">
								<Slider
									id="evolution-delay"
									value={[tickSpeed]}
									onValueChange={(value) => setTickSpeed(value[0])}
									min={50}
									max={5000}
									step={50}
								/>
								<p>{tickSpeed}ms</p>
							</div>
						</section>

						<Separator orientation="horizontal" className="bg-neutral-600" />

						{/* Save & load */}
						<section className="flex flex-col gap-2">
							<h2 className="text-md font-bold">Save & load</h2>
							<div className="flex flex-row items-center justify-start gap-2">
								<AlertDialog
									open={displaySaveForm}
									onOpenChange={setDisplaySaveForm}
								>
									<AlertDialogTrigger>
										<Button
											variant="outline"
											className="text-gray-800 h-6 rounded-xs hover:text-green-500"
											title="Save"
										>
											<Save />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent ref={saveFormRef}>
										<AlertDialogTitle>Save grid</AlertDialogTitle>
										<SaveGridForm
											onClose={() => {
												setDisplaySaveForm(false);
												setIsMenuOpen(false);
											}}
										/>
									</AlertDialogContent>
								</AlertDialog>

								<AlertDialog
									open={displayLoadForm}
									onOpenChange={setDisplayLoadForm}
								>
									<AlertDialogTrigger>
										<Button
											variant="outline"
											className="text-gray-800 h-6 rounded-xs hover:text-green-500"
											title="Load"
										>
											<ArrowUpFromLine />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent ref={loadFormRef}>
										<AlertDialogTitle>Load grid</AlertDialogTitle>
										<LoadGridForm
											onClose={() => {
												setDisplayLoadForm(false);
												setIsMenuOpen(false);
											}}
										/>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileMenu;
