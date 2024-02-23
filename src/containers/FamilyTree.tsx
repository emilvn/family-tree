import PageLayout from "../components/layout.tsx";
import {IFamilyMember} from "../types.ts";
import Tree, {TreeNodeDatum} from "react-d3-tree";
import {OuterCard, TreeCard} from "../components/cards.tsx";
import {SVGProps, useEffect, useState} from "react";
import {IoIosFemale, IoIosMale} from "react-icons/io";

function FamilyTree({familyMember}: { familyMember: IFamilyMember }) {
	const [nodeWidth, setNodeWidth] = useState(window.innerWidth / 4);
	const [nodeHeight, setNodeHeight] = useState(window.innerHeight / 4);

	useEffect(() => {
		function handleResize() {
			setNodeWidth(window.innerWidth / 4);
			setNodeHeight(window.innerHeight / 4);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<PageLayout>
			<OuterCard>
				<div className="h-[80vh]">
					<Tree
						data={familyMember.getTreeData()}
						orientation={nodeWidth > nodeHeight ? "horizontal" : "vertical"}
						translate={
							nodeWidth > nodeHeight
								? {x: nodeWidth / 2, y: nodeHeight * 1.65}
								: {x: nodeWidth * 1.65, y: nodeHeight/2}
						}
						collapsible={false}
						nodeSize={{x: nodeWidth * 1.1, y: nodeHeight}}
						renderCustomNodeElement={({nodeDatum}) => (
							<FamilyMember
								nodeData={nodeDatum}
								foreignObjectProps={{
									x: -nodeWidth / 3,
									y: -nodeHeight / 2.25,
									width: nodeWidth,
									height: nodeHeight

								}}/>
						)}
					/>
				</div>
			</OuterCard>
		</PageLayout>
	);
}

interface IFamilyMemberProps {
	nodeData: TreeNodeDatum;
	foreignObjectProps: SVGProps<SVGForeignObjectElement>;
}

function FamilyMember({nodeData, foreignObjectProps = {}}: IFamilyMemberProps) {
	return (
		<>
			<foreignObject {...foreignObjectProps}>
				<TreeCard>
					<div className="font-extrabold text-inact-green text-2xl mb-5 flex items-center justify-center">
						{nodeData.name}
						&nbsp;
						{nodeData.attributes?.gender === "M" ? <IoIosMale/> : <IoIosFemale/>}
					</div>
					<div className="text-xl mb-5">{nodeData.attributes?.age} years old</div>
					<div className="text-xl">Shoe size: {nodeData.attributes?.shoeSize}</div>
				</TreeCard>
			</foreignObject>
		</>
	);
}

export default FamilyTree;