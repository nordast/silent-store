"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";
import styles from "./styles/DashboardChart.module.css";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const DashboardChart = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: used, 10: used, fill: "white" }];

  const percent = Number(calculatePercentage(used));
  const endAngle = used ? (percent * 360) / 100 : 0;

  return (
    <Card className={styles.root}>
      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className={styles.container}>
          <RadialBarChart
            data={chartData}
            startAngle={270}
            endAngle={endAngle + 270}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-white/20 last:fill-brand"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="storage" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={styles.percentage}
                        >
                          {used ? percent.toString().replace(/^0+/, "") : "0"}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className={styles.details}>
        <CardTitle className={styles.title}>Available Storage</CardTitle>
        <CardDescription className={styles.description}>
          {used ? convertFileSize(used) : "2GB"} / 2GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
