import PageLayout from "../components/layout.tsx";
import {IFamilyMember} from "../types.ts";
import Tree, {TreeNodeDatum} from "react-d3-tree";
import {TreeCard} from "../components/cards.tsx";
import {SVGProps, useEffect, useState} from "react";

function FamilyTree({familyMember}: { familyMember: IFamilyMember }) {
	const [nodeWidth, setNodeWidth] = useState(window.innerWidth/4);
	const [nodeHeight, setNodeHeight] = useState(window.innerHeight/4);

	useEffect(() => {
		function handleResize() {
			setNodeWidth(window.innerWidth/4);
			setNodeHeight(window.innerHeight/4);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	} ,[]);

	return (
		<PageLayout>
			<div className="flex items-center p-4 justify-center h-[calc(100vh-80px)]">
				<Tree
					data={familyMember.getTreeData()}
					orientation="horizontal"
					translate={{x: nodeWidth, y: nodeHeight*1.75}}
					collapsible={false}
					nodeSize={{x: nodeWidth*1.1, y: nodeHeight}}
					renderCustomNodeElement={({nodeDatum}) => (
						<FamilyMember
							nodeData={nodeDatum}
							foreignObjectProps={{
								x: -200,
								y: -100,
								width: nodeWidth,
								height: nodeHeight

							}}/>
					)}
				/>
			</div>
		</PageLayout>
	);
}

interface IFamilyMemberProps {
	nodeData: TreeNodeDatum;
	foreignObjectProps: SVGProps<SVGForeignObjectElement>;
}

function FamilyMember({nodeData, foreignObjectProps ={}}: IFamilyMemberProps) {
	return (
		<>
			<foreignObject {...foreignObjectProps}>
				<TreeCard>
					<div className="font-bold text-center text-orange-600 text-2xl mb-5">
						{nodeData.name}
						&nbsp;
						{nodeData.attributes?.gender === "M" ? "♂" : "♀"}
					</div>
					<div className="text-xl mb-5">{nodeData.attributes?.age} years old</div>
					<div className="text-xl">Shoe size: {nodeData.attributes?.shoeSize}</div>
				</TreeCard>
			</foreignObject>
		</>
	);
}

export default FamilyTree;