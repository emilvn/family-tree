import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import FamilyTree from "./containers/FamilyTree.tsx";
import Statistics from "./containers/Statistics.tsx";
import {henning} from "../data/family.ts";
import {useEffect, useState} from "react";

function App() {

	return (
		<BrowserRouter>
			<NavBar/>
			<Routes>
				<Route path={"/"} element={<FamilyTree familyMember={henning}/>}/>
				<Route path={"/statistics"} element={<Statistics/>}/>
			</Routes>
		</BrowserRouter>
	)
}

function NavBar() {
	const [location, setLocation] = useState<"family-tree" | "statistics">("family-tree");

	useEffect(() => {
		if (window.location.pathname === "/") {
			setLocation("family-tree");
		} else if (window.location.pathname === "/statistics") {
			setLocation("statistics");
		}
	}, []);

	return (
		<nav className="p-4 fixed w-full flex gap-4 items-center justify-between select-none">
			<h1 className="text-4xl font-bold text-slate-900">Henning</h1>
			<div className="flex gap-4 text-slate-600 text-xl">
				<Link
					className={`${location === "family-tree" ? "text-orange-600" : "hover:text-orange-600"}  transition-colors`}
					to={"/"}
					onClick={() => setLocation("family-tree")}
				>
					Family Tree
				</Link>
				<Link
					className={`${location === "statistics" ? "text-orange-600" : "hover:text-orange-600"} transition-colors`}
					to={"/statistics"}
					onClick={() => setLocation("statistics")}
				>
					Statistics
				</Link>
			</div>
		</nav>
	)
}

export default App;