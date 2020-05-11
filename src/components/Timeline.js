import React from 'react';
import Chart from "react-apexcharts";

export default function Timeline({series, options}) {
		return (
			<div id="chart">
				<Chart options={options} series={series} type="rangeBar" height={350} />
			</div>
		)
}