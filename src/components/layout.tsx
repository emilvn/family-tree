import {PropsWithChildren} from "react";

function PageLayout({children} : PropsWithChildren) {
	return (
		<div className="bg-slate-200 min-h-screen w-full">
			<main className="pt-20 px-10">{children}</main>
		</div>
	);
}

export default PageLayout;