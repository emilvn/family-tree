import PageLayout from "../components/layout.tsx";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { family } from "../../data/family.ts";
import "chart.js/auto";
import type { IFamilyMember } from "../types/types.ts";
import { calculateAverageShoeSize } from "../utils/statistics.ts";
import { OuterCard } from "../components/cards.tsx";
import { FaShoePrints } from "react-icons/fa";
import { IoIosFemale, IoIosMale } from "react-icons/io";

function Statistics() {
	return (
		<PageLayout>
			<div className="flex gap-4 max-lg:flex-col">
				<AgeBarChart />
				<ShoeSizeStatistics familyMembers={family} />
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
				borderWidth: 0,
				barPercentage: 0.5
			}
		]
	};

	const options: ChartOptions<"bar"> = {
		maintainAspectRatio: false
	};

	return (
		<OuterCard>
			<div className="p-4 h-[60vh]">
				<div className="text-inact-green text-3xl max-sm:text-xl text-center">
					Ages in the family
				</div>
				<div className="h-full pb-8 max-sm:pb-14 w-full">
					<Bar
						data={data}
						options={options}
					/>
				</div>
			</div>
		</OuterCard>
	);
}

interface IShoeSizeStatisticsProps {
	familyMembers: IFamilyMember[];
}

function ShoeSizeStatistics({ familyMembers }: IShoeSizeStatisticsProps) {
	const females = familyMembers.filter((m) => m.gender === "F");
	const males = familyMembers.filter((m) => m.gender === "M");
	const averageF = calculateAverageShoeSize(females);
	const averageM = calculateAverageShoeSize(males);

	return (
		<OuterCard>
			<div className="text-inact-green text-3xl max-sm:text-xl text-center pt-4 max-md:pb-10">
				Average shoe sizes
				<FaShoePrints className="text-4xl inline ml-2 max-md:hidden" />
			</div>
			<div className="flex justify-evenly items-center h-full max-md: pb-10">
				<div className="md:text-8xl text-4xl font-extrabold flex items-center">
					<IoIosMale className="md:text-7xl" />
					{averageM}
				</div>
				<div className="md:text-8xl text-4xl font-extrabold flex items-center">
					<IoIosFemale className="md:text-7xl" />
					{averageF}
				</div>
			</div>
		</OuterCard>
	);
}

export default Statistics;
