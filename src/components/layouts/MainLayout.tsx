import type { ComponentProps } from "react";
import Menu from "../organisms/Menu";

const MainLayout = ({ children }: ComponentProps<"div">) => {
	return (
		<div className="h-[100vh] w-full bg-neutral-800 overflow-hidden flex flex-col">
			<Menu />
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default MainLayout;
