import {PropsWithChildren} from "react";

function PageLayout({children} : PropsWithChildren) {
	return (
		<div className="bg-blue-600 bg-opacity-60 min-h-screen w-full">
			<main className="pt-20">{children}</main>
		</div>
	);
}

export default PageLayout;