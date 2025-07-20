import MainLayout from "./components/layouts/MainLayout";
import Grid from "./components/organisms/Grid";
import { GameContextProvider } from "./contexts/Game.context";

const App = () => {
	return (
		<GameContextProvider>
			<MainLayout>
				<div className="w-full h-full grid place-items-center">
					<Grid />
				</div>
			</MainLayout>
		</GameContextProvider>
	);
};

export default App;
