import Chart from "react-apexcharts";

function GeneralChart({ title, data, labels, type, width, height, isLoading, error }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{title}</div>
      </div>
      <div className="card-body">
        {isLoading ? (
          <div>Loading data...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <Chart
            type={type}
            width={width}
            height={height}
            series={data}
            options={{
              labels: labels,
              colors: [
                "rgb(29, 82, 136)", // General Meetings (matches generalmeetingsData)
                "rgb(255, 165, 0)", // Executive Meetings
                "rgb(136, 136, 136)", // Statutory Meetings
                "rgb(22, 35, 65)", // Sub Structure Meetings
              ],
              dataLabels: {
                enabled: true,
                formatter: (val) => `${val.toFixed(2)}%`,
                style: {
                  color: 'white',
                },
              },
              tooltip: {
                y: {
                  formatter: (val) => `${val.toFixed(2)}% of total meetings`,
                },
                custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                  const value = w.config.series[seriesIndex];
                  return `
                    <div style="padding: 10px; background: #333; color: white; border-radius: 5px;">
                      ${value.toFixed(2)}% of total meetings
                    </div>
                  `;
                },
              },
              legend: {
                position: "bottom",
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: "100%",
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}

export default GeneralChart;