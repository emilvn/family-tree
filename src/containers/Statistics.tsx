import PageLayout from "../components/layout.tsx";
import {Bar} from "react-chartjs-2";
import type {ChartData} from "chart.js";
import {family} from "../../data/family.ts";
import "chart.js/auto";
import type {IFamilyMember} from "../types.ts";
import {calculateAverageShoeSize} from "../utils/statistics.ts";
import {InnerCard, OuterCard} from "../components/cards.tsx";

function Statistics() {
	return (
		<PageLayout>
			<div className="flex gap-4 max-lg:flex-col">
				<AgeBarChart/>
				<ShoeSizeStatistics familyMembers={family}/>
			</div>
		</PageLayout>
	);
}

function AgeBarChart() {
	const names = family.map((member) => member.name);
	const data: ChartData<"bar"> = {
		labels: names,
		datasets: [
			{
				label: "Age",
				data: family.map((member) => member.age),
				backgroundColor: "#ea580c",
				borderWidth: 0
			}
		]
	};

	return <OuterCard>
		<div className="text-slate-900 text-2xl text-center">Ages of the family</div>
		<Bar data={data}/>
	</OuterCard>
}

interface IShoeSizeStatisticsProps {
	familyMembers: IFamilyMember[];
}

function ShoeSizeStatistics({familyMembers}: IShoeSizeStatisticsProps) {
	const females = familyMembers.filter((m) => m.gender === "F");
	const males = familyMembers.filter((m) => m.gender === "M");
	const averageF = calculateAverageShoeSize(females);
	const averageM = calculateAverageShoeSize(males);

	return (
		<OuterCard>
			<div className="text-slate-900 text-2xl text-center">Average Shoe sizes</div>
			<div className="flex justify-evenly items-center mt-10">
				<InnerCard>♂ {averageM}</InnerCard>
				<InnerCard>♀ {averageF}</InnerCard>
			</div>
		</OuterCard>
	);
}

export default Statistics;