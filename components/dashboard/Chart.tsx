"use client";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface ChartProps {
	data: { date: string; revenue: number }[];
}

const aggregateData = (data: any) => {
	const aggregated = data.reduce((acc: any, curr: any) => {
		if (acc[curr.date]) {
			acc[curr.date] += curr.revenue;
		} else {
			acc[curr.date] = curr.revenue;
		}
		return acc;
	}, {});

	return Object.keys(aggregated).map((date) => ({
		date,
		revenue: aggregated[date],
	}));
};

export default function Chart({ data }: ChartProps) {
	const processedData = aggregateData(data);
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={processedData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
					dataKey="revenue"
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
