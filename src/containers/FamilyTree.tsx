import PageLayout from "../components/layout.tsx";
import {IFamilyMember} from "../types.ts";
import Tree, {TreeNodeDatum} from "react-d3-tree";
import {OuterCard, TreeCard} from "../components/cards.tsx";
import {SVGProps, useEffect, useState} from "react";
import {IoIosFemale, IoIosMale} from "react-icons/io";

function FamilyTree({familyMember}: { familyMember: IFamilyMember }) {
	const MIN_NODE_WIDTH = 200;
	const MIN_NODE_HEIGHT = 200;
	const MAX_NODE_WIDTH = 300;
	const MAX_NODE_HEIGHT = 400;
	const MAX_ZOOM = 1.5;
	const MIN_ZOOM = 0.65;

	const zoom = Math.min(Math.max(window.innerWidth / 1920, MIN_ZOOM), MAX_ZOOM);
	const initialWidth = Math.max(window.innerWidth / 4, MIN_NODE_WIDTH);
	const initialHeight = Math.max(window.innerHeight / 4, MIN_NODE_HEIGHT);

	const [nodeWidth, setNodeWidth] = useState(Math.min(initialWidth, MAX_NODE_WIDTH));
	const [nodeHeight, setNodeHeight] = useState(Math.min(initialHeight, MAX_NODE_HEIGHT));
	const [zoomLevel, setZoomLevel] = useState(zoom);

	useEffect(() => {
		function handleResize() {
			const newWidth = Math.max(window.innerWidth / 4, MIN_NODE_WIDTH);
			const newHeight = Math.max(window.innerHeight / 4, MIN_NODE_HEIGHT);
			const newZoom = Math.min(Math.max(window.innerWidth / 1920, MIN_ZOOM), MAX_ZOOM);
			setNodeWidth(Math.min(newWidth, MAX_NODE_WIDTH));
			setNodeHeight(Math.min(newHeight, MIN_NODE_HEIGHT));
			setZoomLevel(newZoom);
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
								? {x: nodeWidth / 2, y: nodeHeight * 1.5}
								: {x: nodeWidth, y: nodeHeight / 2}
						}
						collapsible={false}
						nodeSize={
							nodeWidth > nodeHeight
								? {x: nodeWidth * 2, y: nodeHeight}
								: {x: nodeWidth, y: nodeHeight * 1.5}
						}
						renderCustomNodeElement={({nodeDatum}) => (
							<FamilyMember
								nodeData={nodeDatum}
								foreignObjectProps={{
									x: -nodeWidth / 2,
									y: -nodeHeight / 3.5,
									width: nodeWidth,
									height: nodeHeight

								}}/>
						)}
						zoom={zoomLevel}
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