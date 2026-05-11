import { HomeStatCard } from "../atoms/HomeStatCard";
import type { StatItem } from "../../data/homeStatsMapper";

type Props = {
	stats: StatItem[];
};

export function HomePlatformStats({ stats }: Props) {
	return (
		<section aria-label="Platform statistics">
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{stats.map((stat) => (
					<HomeStatCard
						key={stat.label}
						label={stat.label}
						value={stat.value}
						icon={stat.icon}
					/>
				))}
			</div>
		</section>
	);
}
