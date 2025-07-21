import type { ComponentProps } from "react";
import Menu from "../organisms/Menu";
import MobileMenu from "../organisms/MobileMenu";

const MainLayout = ({ children }: ComponentProps<"div">) => {
	return (
		<div className="h-[100vh] w-full bg-neutral-800 overflow-hidden flex flex-col">
			<div className="hidden md:block">
				<Menu />
			</div>
			<div className="md:hidden">
				<MobileMenu />
			</div>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default MainLayout;
