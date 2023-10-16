import React, { useEffect, useCallback, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";
ChartJS.register(ArcElement, Tooltip);

function ChartFun ({ categorySums }) {
  const categoryColors = {
    "Main expenses": "rgba(254, 208, 87, 1)",
    Products: "rgba(255, 216, 208, 1)",
    Car: "rgba(253, 148, 152, 1)",
    "Self care": "rgba(197, 186, 255, 1)",
    "Child care": "rgba(110, 120, 232, 1)",
    "Household products": "rgba(74, 86, 226, 1)",
    Education: "rgba(129, 225, 255, 1)",
    Leisure: "rgba(36, 204, 167, 1)",
    "Other expenses": "rgba(0, 173, 132, 1)",
    Entertainment: "rgba(203, 242, 111, 1)",
  };

  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
      },
    ],
  });

  const [cutout, setCutout] = useState(85);

  const options = {
    maintainAspectRatio: false,
    cutout: cutout,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const updateCutoutPercentage = useCallback(() => {
    if (window.innerWidth < 768) {
      setCutout(85);
    } else if (window.innerWidth > 768 && window.innerWidth < 1279) {
      setCutout(100);
    } else if (window.innerWidth > 1280) {
      setCutout(85);
    }
  }, []);

  useEffect(() => {
    if (categorySums) {
      const labels = Object.keys(categorySums);
      const backgroundColors = Object.keys(categorySums).map((category) => {
        return categoryColors[category] || "rgba(0, 0, 0, 1)";
      });
      const dataValues = labels.map((category) => categorySums[category]);
      setChartData((prevChartData) => ({
        ...prevChartData,
        labels,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: dataValues,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
          },
        ],
      }));
    }
  }, [categorySums]);

  useEffect(() => {
    window.addEventListener("resize", updateCutoutPercentage);
    updateCutoutPercentage();

    return () => {
      window.removeEventListener("resize", updateCutoutPercentage);
    };
  }, [updateCutoutPercentage]);

  return <Doughnut data={chartData} options={options} className={css.chart} />;
}

export default ChartFun;
