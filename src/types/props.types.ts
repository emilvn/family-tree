import type { TreeNodeDatum } from "react-d3-tree";
import type { SVGProps } from "react";

export interface IRenderNodeProps {
	nodeDatum: TreeNodeDatum;
	nodeWidth: number;
	nodeHeight: number;
	isHorizontal: boolean;
}

export interface IFamilyMemberProps {
	nodeData: TreeNodeDatum;
	foreignObjectProps: SVGProps<SVGForeignObjectElement>;
}

export interface IToolBarProps {
	isHorizontal: boolean;
	setIsHorizontal: (isHorizontal: boolean) => void;
}

export interface INavBarProps {
	location: "family-tree" | "statistics";
	setLocation: (location: "family-tree" | "statistics") => void;
	onClick?: () => void;
}
