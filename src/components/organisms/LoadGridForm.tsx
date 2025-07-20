import { useGameContext } from "@/contexts/Game.context";
import { useEffect, useState } from "react";
import SavedGridListItem from "../molecules/SavedGridListItem";
import { Button } from "../ui/button";

type LoadGridFormProps = {
	onClose: () => void;
};

const LoadGridForm = ({ onClose }: LoadGridFormProps) => {
	const { savedGrids, controls } = useGameContext();
	const noSavedGrids = Object.keys(savedGrids).length === 0;
	const [selectedGrid, setSelectedGrid] = useState<string | null>(null);

	useEffect(() => {
		console.log("saved grids changed");
	}, [savedGrids]);

	const handleClick = (name: string) => {
		if (selectedGrid === name) {
			setSelectedGrid(null);
		} else {
			setSelectedGrid(name);
		}
	};

	const handleDelete = (name: string) => {
		controls.deleteGrid(name);
	};

	const handleSave = () => {
		if (!selectedGrid) return;

		controls.loadGrid(selectedGrid);
		onClose();
	};

	return (
		<div className="flex flex-col gap-2">
			{noSavedGrids ? (
				<p className="text-gray-500">No saved grids</p>
			) : (
				Object.keys(savedGrids).map((name) => (
					<SavedGridListItem
						key={name}
						name={name}
						selected={selectedGrid === name}
						onSelect={() => handleClick(name)}
						onDelete={() => handleDelete(name)}
					/>
				))
			)}
			<div className="flex gap-2 justify-end">
				<Button
					onClick={handleSave}
					disabled={!selectedGrid}
					className="bg-green-600 hover:bg-green-700"
				>
					Load
				</Button>
				<Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
					Close
				</Button>
			</div>
		</div>
	);
};

export default LoadGridForm;
