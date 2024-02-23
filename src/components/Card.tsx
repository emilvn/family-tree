import {PropsWithChildren} from "react";

function Card({children}:PropsWithChildren) {
	return (
		<div className="flex flex-col border rounded text-slate-50 w-56 h-48 p-4 bg-slate-300">
			{children}
		</div>
	);
}

export default Card;