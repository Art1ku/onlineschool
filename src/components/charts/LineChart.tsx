"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LineChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current);

        // Конфигурация графика
        myChart.setOption({
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                data: ["A", "B", "C", "D", "E"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "Продажи",
                    data: [10, 22, 28, 43, 49],
                    type: "line",
                    areaStyle: {
                        color: "rgba(30, 136, 229, 0.5)", // Прозрачный фон
                    },
                    lineStyle: {
                        color: "#1E88E5", // Цвет линии
                        width: 3, // Толщина линии
                    },
                    itemStyle: {
                        color: "#1E88E5", // Цвет точек
                    },
                    smooth: true, // Плавные линии
                },
            ],
        });

        return () => {
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ height: "100%" }} />;
};

export default LineChart;
