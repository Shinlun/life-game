import { useGameContext } from "@/contexts/Game.context";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SaveGridFormProps = {
	onClose: () => void;
};

const SaveGridForm = ({ onClose }: SaveGridFormProps) => {
	const { controls, savedGrids } = useGameContext();

	const [gridName, setGridName] = useState(
		`grid-${Object.keys(savedGrids).length + 1}`
	);

	const handleSave = () => {
		controls.saveGrid(gridName);
		onClose();
	};

	return (
		<div className="flex flex-col gap-2">
			<Input
				type="text"
				placeholder="Grid name"
				value={gridName}
				onChange={(e) => setGridName(e.target.value)}
			/>
			<div className="flex gap-2 justify-end">
				<Button
					onClick={handleSave}
					className="bg-green-600 hover:bg-green-700"
				>
					Save
				</Button>
				<Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
					Cancel
				</Button>
			</div>
		</div>
	);
};

export default SaveGridForm;
