import {PropsWithChildren} from "react";

function Card({children}:PropsWithChildren) {
	return (
		<div className="flex flex-col border rounded text-slate-50 w-56 max-w-[25vw] h-[25vh] p-4 bg-slate-300">
			{children}
		</div>
	);
}

export default Card;