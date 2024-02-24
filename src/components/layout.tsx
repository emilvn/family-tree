import { type PropsWithChildren, useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GiFamilyTree } from "react-icons/gi";
import type { INavBarProps } from "../types/props.types.ts";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function PageLayout({ children }: PropsWithChildren) {
	return (
		<div className="bg-inact-violet w-full min-h-screen flex flex-col justify-between">
			<Nav />
			<main className="pt-20 pb-10 px-10">{children}</main>
			<Footer />
		</div>
	);
}

function Nav() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [location, setLocation] = useState<"family-tree" | "statistics">(
		"family-tree"
	);

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
		<div className="p-4 fixed w-full flex gap-4 items-center justify-between select-none z-20">
			{windowWidth > 768 && (
				<>
					<h1 className="text-5xl font-bold text-inact-green flex items-center">
						Henning
						<GiFamilyTree />
					</h1>
					<NavBar
						location={location}
						setLocation={setLocation}
					/>
				</>
			)}
			{windowWidth <= 768 && (
				<>
					<h1 className="text-5xl font-bold text-inact-green">
						<GiFamilyTree />
					</h1>
					<NavButton
						location={location}
						setLocation={setLocation}
					/>
				</>
			)}
		</div>
	);
}

function NavButton({ location, setLocation }: INavBarProps) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			{!isOpen && (
				<CiMenuBurger
					onClick={() => setIsOpen(!isOpen)}
					className="text-4xl hover:text-orange-600 text-inact-green cursor-pointer"
				/>
			)}
			{isOpen && (
				<>
					<div className="flex gap-4 text-slate-600 text-xl max-sm:text-sm">
						<NavBar
							location={location}
							setLocation={setLocation}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						/>
						<IoCloseOutline
							onClick={() => setIsOpen(!isOpen)}
							className="text-4xl hover:text-orange-600 text-inact-green cursor-pointer"
						/>
					</div>
				</>
			)}
		</div>
	);
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

function Footer() {
	return (
		<footer className="bg-inact-green h-80 w-full p-4 flex justify-evenly items-center max-lg:flex-col max-lg:items-start gap-4">
			<div className="flex flex-col gap-2 text-slate-200 text-2xl max-sm:text-lg">
				<div className="font-semibold">By Emil V. Nielsen</div>
				<div>
					<a
						href="mailto:emilvnielsen@hotmail.com"
						className="text-orange-600"
					>
						emilvnielsen@hotmail.com
					</a>
				</div>
			</div>
			<div className="text-2xl max-sm:text-xl text-slate-200 flex flex-col gap-2">
				<div className="font-semibold">Socials</div>
				<SocialsLink href={"https://github.com/emilvn"}>
					<FaGithub className="cursor-pointer text-4xl text-slate-200" />{" "}
					Github
				</SocialsLink>
				<SocialsLink
					href={"https://www.linkedin.com/in/emil-nielsen-48b259266/"}
				>
					<FaLinkedin className="cursor-pointer text-4xl text-blue-500" />{" "}
					LinkedIn
				</SocialsLink>
			</div>
		</footer>
	);
}

function SocialsLink({ children, href }: PropsWithChildren & { href: string }) {
	return (
		<a
			href={href}
			className="flex gap-2 text-lg items-center hover:text-orange-600"
		>
			{children}
		</a>
	);
}

export default PageLayout;
