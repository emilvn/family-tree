import PageLayout from "../components/layout.tsx";
import type { IFamilyMember } from "../types/models.types.ts";
import Tree from "react-d3-tree";
import { OuterCard, TreeCard } from "../components/cards.tsx";
import { useEffect, useState } from "react";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { GiFamilyTree } from "react-icons/gi";
import type {
	IFamilyMemberProps,
	IRenderNodeProps,
	IToolBarProps
} from "../types/props.types.ts";

function FamilyTree({ familyMember }: { familyMember: IFamilyMember }) {
	const MIN_NODE_WIDTH = 200;
	const MIN_NODE_HEIGHT = 200;
	const MAX_NODE_WIDTH = 300;
	const MAX_NODE_HEIGHT = 400;
	const MAX_ZOOM = 1.5;
	const MIN_ZOOM = 0.65;

	const zoom = Math.min(
		Math.max(window.innerWidth / 1920, MIN_ZOOM),
		MAX_ZOOM
	);
	const initialWidth = Math.max(window.innerWidth / 4, MIN_NODE_WIDTH);
	const initialHeight = Math.max(window.innerHeight / 4, MIN_NODE_HEIGHT);

	const [nodeWidth, setNodeWidth] = useState(
		Math.min(initialWidth, MAX_NODE_WIDTH)
	);
	const [nodeHeight, setNodeHeight] = useState(
		Math.min(initialHeight, MAX_NODE_HEIGHT)
	);
	const [zoomLevel, setZoomLevel] = useState(zoom);
	const [isHorizontal, setIsHorizontal] = useState(
		window.innerWidth > window.innerHeight
	);

	useEffect(() => {
		function handleResize() {
			const newWidth = Math.max(window.innerWidth / 4, MIN_NODE_WIDTH);
			const newHeight = Math.max(window.innerHeight / 4, MIN_NODE_HEIGHT);
			const newZoom = Math.min(
				Math.max(window.innerWidth / 1920, MIN_ZOOM),
				MAX_ZOOM
			);
			setNodeWidth(Math.min(newWidth, MAX_NODE_WIDTH));
			setNodeHeight(Math.min(newHeight, MIN_NODE_HEIGHT));
			setZoomLevel(newZoom);
			setIsHorizontal(window.innerWidth > window.innerHeight);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<PageLayout>
			<OuterCard>
				<div className="h-[80vh] relative">
					<div className="absolute w-full text-center text-3xl max-sm:text-xl text-inact-green">
						Family Tree
					</div>
					<ToolBar
						isHorizontal={isHorizontal}
						setIsHorizontal={setIsHorizontal}
					/>
					<Tree
						data={familyMember.getTreeData()}
						orientation={isHorizontal ? "horizontal" : "vertical"}
						translate={
							isHorizontal
								? {
										x: nodeWidth,
										y: window.innerHeight / 2
									}
								: {
										x: window.innerWidth / 2,
										y: nodeHeight
									}
						}
						nodeSize={
							isHorizontal
								? { x: nodeWidth * 2, y: nodeHeight }
								: { x: nodeWidth, y: nodeHeight * 1.5 }
						}
						renderCustomNodeElement={({ nodeDatum }) =>
							renderFamilyMemberNode({
								nodeDatum,
								nodeWidth,
								nodeHeight,
								isHorizontal
							})
						}
						zoom={zoomLevel}
					/>
				</div>
			</OuterCard>
		</PageLayout>
	);
}

function renderFamilyMemberNode({
	nodeDatum,
	nodeWidth,
	nodeHeight,
	isHorizontal
}: IRenderNodeProps) {
	return (
		<FamilyMember
			nodeData={nodeDatum}
			foreignObjectProps={
				isHorizontal
					? {
							x: -nodeWidth / 2,
							y: -nodeHeight / 2.75,
							width: nodeWidth,
							height: nodeHeight
						}
					: {
							x: -nodeWidth / 2,
							y: -nodeHeight / 2,
							width: nodeWidth,
							height: nodeHeight
						}
			}
		/>
	);
}

function FamilyMember({
	nodeData,
	foreignObjectProps = {}
}: IFamilyMemberProps) {
	return (
		<>
			<foreignObject {...foreignObjectProps}>
				<TreeCard>
					<div className="font-extrabold text-inact-green text-2xl mb-5 flex items-center justify-center">
						{nodeData.name}
						&nbsp;
						{nodeData.attributes?.gender === "M" ? (
							<IoIosMale />
						) : (
							<IoIosFemale />
						)}
					</div>
					<div className="text-xl mb-5">
						{nodeData.attributes?.age} years old
					</div>
					<div className="text-xl">
						Shoe size: {nodeData.attributes?.shoeSize}
					</div>
				</TreeCard>
			</foreignObject>
		</>
	);
}

function ToolBar({ isHorizontal, setIsHorizontal }: IToolBarProps) {
	return (
		<div className="absolute bottom-0 right-0 flex gap-2 bg-slate-200 bg-opacity-50 backdrop-blur-sm rounded-tl-3xl w-40 hover:bg-slate-300">
			<div
				className="flex justify-between gap-2 select-none cursor-pointer w-full h-full p-4"
				onClick={() => setIsHorizontal(!isHorizontal)}
			>
				<GiFamilyTree
					className={`text-xl transform
                        ${isHorizontal ? "rotate-180" : "rotate-90"}
                    `}
				/>
				<div>{isHorizontal ? "Vertical" : "Horizontal"}</div>
			</div>
		</div>
	);
}

export default FamilyTree;
