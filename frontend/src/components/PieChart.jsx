import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0, 0], // Initial values
    labels: ["Pending", "Hold For Review", "Reported to Authority", "Rejected"],
  });

  useEffect(() => {
    const fetchPetitionStatus = async () => {
      try {
        const response = await axios.get("/api/");
        const petitions = response.data;

        // Count status occurrences
        const statusCounts = {
          Pending: 0,
          HoldForReview: 0,
          ReportedToAuthority: 0,
          Rejected: 0,
        };

        petitions.forEach((petition) => {
          if (statusCounts.hasOwnProperty(petition.status)) {
            statusCounts[petition.status]++;
          }
        });

        // Update state with counted values
        setChartData({
          series: Object.values(statusCounts),
          labels: Object.keys(statusCounts),
        });

      } catch (error) {
        console.error("Error fetching petition data:", error);
      }
    };

    fetchPetitionStatus();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center mt-4">
        <Chart 
          options={{ 
            chart: { type: "pie" },
            labels: chartData.labels,
            colors: ["#6b6868", "#F59E0B", "#10B981", "#EF4444"], 
            legend: { position: "bottom" },
          }}
          series={chartData.series} 
          type="pie" 
          width="250%" 
        />
      </div>
    </div>
  );
};

export default PieChart;
