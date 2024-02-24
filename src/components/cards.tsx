import type { PropsWithChildren } from "react";

function TreeCard({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col rounded-3xl text-inact-green p-4 bg-slate-100">
			{children}
		</div>
	);
}

function OuterCard({ children }: PropsWithChildren) {
	return (
		<div className="bg-slate-50 border rounded-2xl w-full">{children}</div>
	);
}

export { TreeCard, OuterCard };
