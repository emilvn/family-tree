import {PropsWithChildren} from "react";

function TreeCard({children}:PropsWithChildren) {
	return (
		<div className="flex flex-col rounded-3xl text-inact-green w-56 max-w-[25vw] h-[20vh] min-h-40 p-4 bg-slate-100">
			{children}
		</div>
	);
}

function OuterCard({children}:PropsWithChildren) {
	return (
		<div className="bg-slate-50 border rounded-2xl w-full">
			{children}
		</div>
	);
}

function InnerCard({children}:PropsWithChildren) {
	return (
		<div className="bg-orange-300 p-20 rounded-xl text-4xl">
			{children}
		</div>
	);
}

export {TreeCard, OuterCard, InnerCard};