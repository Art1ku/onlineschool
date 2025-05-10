"use client"; // Next.js App Router требует "use client" для работы с DOM

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Инициализация графика
        const myChart = echarts.init(chartRef.current);

        // Конфигурация графика
        myChart.setOption({
            title: {
                text: "ECharts Example",
            },
            tooltip: {},
            xAxis: {
                data: ["Shirt", "Cardigan", "Chiffon", "Pants", "Heels", "Socks"],
            },
            yAxis: {},
            series: [
                {
                    name: "Sales",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20],
                },
            ],
        });

        // Очистка при размонтировании
        return () => {
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default BarChart;
