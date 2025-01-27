'use client'
import classes from "./Statistic.module.scss";
import React, { useEffect, useState } from "react";

interface StatisticData {
  description: string;
  value: number;
}

export default function Statistic() {
  const [data, setData] = useState<StatisticData[] | null>(null);

  useEffect(() => {
    fetch("/statistics.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  if (!data) {
    return <div className={classes.loader}>Loading...</div>;
  }

  return (
    <div className={classes.statisticsContainer}>
      <h1 className={classes.title}>College Statistics</h1>
      <div className={classes.statsGrid}>
        {data.map((stat, index) => (
          <div key={index} className={classes.statCard}>
            <h2 className={classes.statValue}>{stat.value}</h2>
            <p className={classes.statDescription}>{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}