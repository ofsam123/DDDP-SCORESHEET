import Chart from "react-apexcharts";

function mintueNinvitaionChart({ title, data, labels, type, width, height, isLoading, error }) {
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
                "rgb(29, 120, 136)", //  (minutes)
               
                "rgb(43, 2, 118)", // invitation
              ],
              dataLabels: {
                enabled: true,
                formatter: (val) => `${val.toFixed(2)}%`,
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

export default mintueNinvitaionChart;