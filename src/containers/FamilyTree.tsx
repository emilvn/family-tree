import PageLayout from "../components/PageLayout.tsx";
import {IFamilyMember} from "../types.ts";
import Tree, {TreeNodeDatum} from "react-d3-tree";
import Card from "../components/Card.tsx";
import {SVGProps} from "react";

function FamilyTree({familyMember}: { familyMember: IFamilyMember }) {
	return (
		<PageLayout>
			<div className="flex items-center p-4 justify-center h-[calc(100vh-80px)]">
				<Tree
					data={familyMember.getTreeData()}
					orientation="horizontal"
					translate={{x: 300, y: 500}}
					collapsible={false}
					nodeSize={{x: 300, y: 200}}
					renderCustomNodeElement={({nodeDatum}) => (
						<FamilyMember
							nodeData={nodeDatum}
							foreignObjectProps={{
								x: -200,
								y: -100,
								width: 300,
								height: 300

							}}/>
					)}
					zoom={1}
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
				<Card>
					<div className="font-bold text-center text-orange-600 text-2xl mb-5">
						{nodeData.name}
						&nbsp;
						{nodeData.attributes?.gender === "M" ? "♂" : "♀"}
					</div>
					<div className="text-xl mb-5">{nodeData.attributes?.age} years old</div>
					<div className="text-xl">Shoe size: {nodeData.attributes?.shoeSize}</div>
				</Card>
			</foreignObject>
		</>
	);
}

export default FamilyTree;