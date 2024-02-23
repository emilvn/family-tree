import {PropsWithChildren} from "react";

function TreeCard({children}:PropsWithChildren) {
	return (
		<div className="flex flex-col border rounded text-slate-50 w-56 max-w-[25vw] h-[25vh] p-4 bg-slate-300">
			{children}
		</div>
	);
}

function OuterCard({children}:PropsWithChildren) {
	return (
		<div className="bg-slate-300 border rounded-2xl p-4 w-full">
			{children}
		</div>
	);
}

function InnerCard({children}:PropsWithChildren) {
	return (
		<div className="bg-slate-200 p-20 rounded-xl text-4xl">
			{children}
		</div>
	);
}

export {TreeCard, OuterCard, InnerCard};