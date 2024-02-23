import {PropsWithChildren} from "react";

function PageLayout({children} : PropsWithChildren) {
	return (
		<div className="bg-slate-500 min-h-screen w-full">
			<main className="pt-20">{children}</main>
		</div>
	);
}

export default PageLayout;