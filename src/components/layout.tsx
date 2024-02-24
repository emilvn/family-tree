import { PropsWithChildren } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function PageLayout({ children }: PropsWithChildren) {
    return (
        <div className="bg-inact-violet w-full min-h-screen flex flex-col justify-between">
            <main className="pt-20 pb-10 px-10">{children}</main>
            <Footer />
        </div>
    );
}

function Footer() {
    return <footer
        className="bg-inact-green h-80 w-full p-4 flex justify-evenly items-center max-lg:flex-col max-lg:items-start gap-4">
        <div className="flex flex-col gap-2 text-slate-200 text-2xl max-sm:text-lg">
            <div className="font-semibold">
                By Emil V. Nielsen
            </div>
            <div>
                <a href="mailto:emilvnielsen@hotmail.com"
                   className="text-orange-600">emilvnielsen@hotmail.com</a>
            </div>
        </div>
        <div className="text-2xl max-sm:text-xl text-slate-200 flex flex-col gap-2">
            <div className="font-semibold">Socials</div>
            <SocialsLink href={"https://github.com/emilvn"}>
                <FaGithub className="cursor-pointer text-4xl text-slate-200" /> Github
            </SocialsLink>
            <SocialsLink href={"https://www.linkedin.com/in/emil-nielsen-48b259266/"}>
                <FaLinkedin className="cursor-pointer text-4xl text-blue-500" /> LinkedIn
            </SocialsLink>
        </div>
    </footer>;
}

interface ISocialsLinkProps extends PropsWithChildren {
    href: string;

}

function SocialsLink({ children, href }: ISocialsLinkProps) {
    return <a href={href} className="flex gap-2 text-lg items-center hover:text-orange-600">
        {children}
    </a>;
}

export default PageLayout;