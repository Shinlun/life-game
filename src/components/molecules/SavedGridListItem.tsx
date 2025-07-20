import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

type SavedGridListItemProps = {
	name: string;
	selected: boolean;
	onSelect: () => void;
	onDelete: () => void;
};

const SavedGridListItem = ({
	name,
	selected,
	onSelect,
	onDelete,
}: SavedGridListItemProps) => {
	return (
		<div className="flex gap-2">
			<Button
				variant="ghost"
				onClick={onSelect}
				className={cn(
					"flex-grow rounded-none hover:bg-neutral-100 text-left",
					selected && "font-bold bg-neutral-100"
				)}
			>
				{name}
			</Button>

			<Button
				variant="ghost"
				onClick={onDelete}
				className="rounded-none hover:bg-transparent hover:text-red-600"
			>
				<Trash />
			</Button>
		</div>
	);
};

export default SavedGridListItem;
