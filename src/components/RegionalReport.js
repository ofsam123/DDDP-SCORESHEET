import { useEffect } from "react";
import Chart from "react-apexcharts";

function RegionalReport({ title, males, females }){
    
    useEffect(()=>{

    },[males,females])
    return(
        <div className="card">
            <div className="card-header">
                <div className="card-title">{title}</div>
            </div>
            <div className="card-body pt-0">
                <Chart
                    type='bar'
                    width={'100%'}
                    height={400}
                    series={[males,females]}
                    options={
                        {
                        chart: {
                            stacked: true
                        },
                        xaxis:{
                            categories:[
                                            '2020','2021','2022','2023','2024','2025',
                                            '2026','A2027','2028','2029','2030'
                                        ]
                        }
                    }
     
                }
                />
            </div>
        </div>
    );
}

export default RegionalReport;