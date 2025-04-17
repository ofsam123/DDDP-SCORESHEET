import Chart from "react-apexcharts";

function GeneralChart({ title, data, labels, type, width, height}){
    return(
        <div className="card">
            <div className="card-header">
                <div className="card-title">{title}</div>
            </div>
            <div className="card-body">
                {/* <div id="customers"></div> */}
                <Chart
                    type={type}
                    width={width}
                    height={height}
                    series={data}
                    options={{labels: labels}}
                />
                {/* Row starts */}
                <div className="row gutters">

                </div>
                {/* Row end */}
            </div>
        </div>
    );
}

export default GeneralChart;