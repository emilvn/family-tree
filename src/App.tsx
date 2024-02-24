import { BrowserRouter, Route, Routes } from "react-router-dom";
import FamilyTree from "./containers/FamilyTree.tsx";
import Statistics from "./containers/Statistics.tsx";
import { family, henning } from "../data/family.ts";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={"/"}
					element={<FamilyTree familyMember={henning} />}
				/>
				<Route
					path={"/statistics"}
					element={<Statistics family={family} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
