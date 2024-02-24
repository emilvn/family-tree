import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import FamilyTree from "./containers/FamilyTree.tsx";
import Statistics from "./containers/Statistics.tsx";
import { henning } from "../data/family.ts";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { GiFamilyTree } from "react-icons/gi";

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

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <BrowserRouter>
            <div className="p-4 fixed w-full flex gap-4 items-center justify-between select-none z-20">
                {
                    windowWidth > 768 &&
                    <>
                        <h1 className="text-5xl font-bold text-inact-green flex items-center">
                            Henning
                            <GiFamilyTree />
                        </h1>
                        <NavBar location={location} setLocation={setLocation} />
                    </>
                }
                {
                    windowWidth <= 768 &&
                    <>
                        <h1 className="text-5xl font-bold text-inact-green">
                            <GiFamilyTree />
                        </h1>
                        <NavButton location={location} setLocation={setLocation} />
                    </>
                }
            </div>
            <Routes>
                <Route path={"/"} element={<FamilyTree familyMember={henning} />} />
                <Route path={"/statistics"} element={<Statistics />} />
            </Routes>
        </BrowserRouter>
    );
}

interface INavBarProps {
    location: "family-tree" | "statistics";
    setLocation: (location: "family-tree" | "statistics") => void;
    onClick?: () => void;
}

function NavBar({ location, onClick, setLocation }: INavBarProps) {
    return (
        <nav className="flex gap-4 text-slate-600 text-xl">
            <Link
                className={`${location === "family-tree" ? "text-orange-600" : "hover:text-orange-600"}  transition-colors`}
                to={"/"}
                onClick={() => {
                    setLocation("family-tree");
                    if (onClick) onClick();
                }}
            >
                Family-tree
            </Link>
            <Link
                className={`${location === "statistics" ? "text-orange-600" : "hover:text-orange-600"} transition-colors`}
                to={"/statistics"}
                onClick={() => {
                    setLocation("statistics");
                    if (onClick) onClick();
                }}
            >
                Statistics
            </Link>
        </nav>
    );
}

function NavButton({ location, setLocation }: INavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            {!isOpen &&
                <CiMenuBurger
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-4xl hover:text-orange-600 text-inact-green cursor-pointer"
                />
            }
            {isOpen && <>
                <div className="flex gap-4 text-slate-600 text-xl max-sm:text-sm">
                    <NavBar
                        location={location}
                        setLocation={setLocation}
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }
                        } />
                    <IoCloseOutline onClick={() => setIsOpen(!isOpen)}
                                    className="text-4xl hover:text-orange-600 text-inact-green cursor pointer" />
                </div>
            </>
            }
        </div>
    );
}

export default App;