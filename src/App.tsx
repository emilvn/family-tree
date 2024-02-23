import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import FamilyTree from "./containers/FamilyTree.tsx";
import Statistics from "./containers/Statistics.tsx";
import {henning} from "../data/family.ts";

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

function NavBar(){
	return (
		<nav className="p-4 fixed w-full flex gap-4 items-center justify-between select-none">
			<h1 className="text-4xl font-bold text-slate-200">Henning</h1>
			<div className="flex gap-4 text-slate-300">
				<Link className="hover:text-slate-50" to={"/"}>Family Tree</Link>
				<Link className="hover:text-slate-50" to={"/statistics"}>Statistics</Link>
			</div>
		</nav>
	)
}

export default App;