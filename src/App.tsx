import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import FamilyTree from "./containers/FamilyTree.tsx";
import Statistics from "./containers/Statistics.tsx";
import {henning} from "../data/family.ts";
import {useEffect, useState} from "react";
import {CiMenuBurger} from "react-icons/ci";
import {IoCloseOutline} from "react-icons/io5";

function App() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [location, setLocation] = useState<"family-tree" | "statistics">("family-tree");

	useEffect(() => {
		if (window.location.pathname === "/") {
			setLocation("family-tree");
		} else if (window.location.pathname === "/statistics") {
			setLocation("statistics");
		}
	}, []);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<BrowserRouter>
			<div className="p-4 fixed w-full flex gap-4 items-center justify-between select-none">
				<h1 className="text-5xl font-bold text-inact-green">
					Henning
				</h1>
				{
					windowWidth > 768 &&
					<NavBar location={location} setLocation={setLocation}/>
				}
				{
					windowWidth <= 768 &&
					<NavButton location={location} setLocation={setLocation}/>
				}
			</div>
			<Routes>
				<Route path={"/"} element={<FamilyTree familyMember={henning}/>}/>
				<Route path={"/statistics"} element={<Statistics/>}/>
			</Routes>
		</BrowserRouter>
	)
}

interface INavBarProps {
	location: "family-tree" | "statistics";
	setLocation: (location: "family-tree" | "statistics") => void;
}

function NavBar({location, setLocation}: INavBarProps) {
	return (
		<nav className="flex gap-4 text-slate-600 text-xl">
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
		</nav>
	)
}

function NavButton({location, setLocation}: INavBarProps) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav>
			{!isOpen &&
				<CiMenuBurger
					onClick={() => setIsOpen(!isOpen)}
					className="text-4xl hover:text-orange-600 text-inact-green"
				/>
			}
			{isOpen && <>
				<div className="flex gap-4 text-slate-600 text-xl max-sm:text-sm">
					<Link
						className={`${location === "family-tree" ? "text-orange-600" : "hover:text-orange-600"}  transition-colors`}
						to={"/"}
						onClick={() => {
							setIsOpen(false)
							setLocation("family-tree")
						}}
					>
						Family Tree
					</Link>
					<Link
						className={`${location === "statistics" ? "text-orange-600" : "hover:text-orange-600"} transition-colors`}
						to={"/statistics"}
						onClick={() => {
							setIsOpen(false)
							setLocation("statistics")
						}}
					>
						Statistics
					</Link>
					<IoCloseOutline onClick={() => setIsOpen(!isOpen)} className="text-4xl hover:text-orange-600 text-inact-green"/>
				</div>
			</>
			}
		</nav>
	);
}

export default App;