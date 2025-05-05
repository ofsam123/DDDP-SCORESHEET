import { Layout, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const indicators = [
  {
      indicator: 'No. of Public Basic Schools in the District',
      id: 'Ue9tu0manQ1',
      value: 0
  },
  {
      indicator: 'No. of Public Junior High Schools in the District',
      id: 'kKE7K9CouWK',
      value: 0
  },
  {
      indicator: 'No. of Public Senior High Schools in the District',
      id: 'A6OyLGjSZ0n',
      value: 0
  },

  {
    indicator: 'No. of Public Basic Schools supported by the District Assembly',
    id: 'jU6XzQqBTm1',
    value: 0
},
{
    indicator: 'No. of Public Junior High Schools supported by the District Assembly',
    id: 'M2RCgQWP1Tq',
    value: 0
},
{
    indicator: 'No. of Public Senior High Schools supported by the District Assembly',
    id: 'Ncev2XYlyqy',
    value: 0
},
];

function EducationServiceSupport({ year, district }) {

    const { Header, Content } = Layout;
    const { Title, Text } = Typography;

    const [educations, setEducations] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(()=>{
      getIndicators();
    }, []);

     const getIndicators = () => {
            axios.get(
                `/analytics.json?dimension=dx:Ue9tu0manQ1;kKE7K9CouWK;A6OyLGjSZ0n;jU6XzQqBTm1&dimension=ou:LEVEL-3;${district}&filter=pe:${year}-01-01;${year}-12-31`)
                .then(res => {
                    const data = res.data?.rows;
                    // console.log("Educations: ",data)
    
                    if (data?.length > 0) {
                        // const percentage = calculatePercentage(data[1][2], data[0][2]);
                        // Update indicator values based on result
                        const updatedIndicators = indicators.map(ind => {
                            const match = data.find(r => r[0] === ind.id);
                            return {
                                ...ind,
                                value: match ? parseFloat(match[2]) : 0
                            };
                        });
    
                        console.log("Educations: ",updatedIndicators);
    
                        // Map from indicator name to table field
                        const indicatorToFieldMap = {
                            'No. of projects with contingency provision': 'contingencyProvision',
                            'No. of projects with contingency used': 'contingencyUse',
                            'No. of projects with contingency used with written justification': 'contingencyJustification',
                            'No. of projects with contingency duly approved and used': 'contingencyApproved'
                        };
    
                        // Build the row object
                        const row = {};
    
                        updatedIndicators.forEach(ind => {
                            const key = indicatorToFieldMap[ind.indicator];
                            if (key) {
                                row[key] = ind.value;
                            }
                        });
    
                        // setContingengy([row])
    
                        
                        // if(row.contingencyProvision > 0 && row.contingencyUse > 0){
                        //     setScoreII(1)
                        // }
    
                    }
    
    
                }).catch(err => console.log(err));
        }

    const columns = [
       
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category',
            },
            {
              title: 'KG & Primary',
              dataIndex: 'kgPrimary',
              key: 'kgPrimary',
            },
            {
              title: 'JHS',
              dataIndex: 'jhs',
              key: 'jhs',
            },
            {
              title: 'KG/Prim./JHS',
              dataIndex: 'kgPrimJhs',
              key: 'kgPrimJhs',
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total',
            },
      ];
      
      const data = [
        {
          key: '1',
          category: 'No. of public schools',
          kgPrimary: 16,
          jhs: 10,
          kgPrimJhs: 14,
          total: 40,
        },
        {
          key: '2',
          category: 'No. of public schools supported by DA',
          kgPrimary: 9,
          jhs: 2,
          kgPrimJhs: 4,
          total: 15,
        },
        {
          key: '3',
          category: '% of public schools supported',
          kgPrimary: '',
          jhs: '',
          kgPrimJhs: '',
          total: '37.5%',
        },
        {
          key: '4',
          category: 'Nature of support',
          kgPrimary: '',
          jhs: '',
          kgPrimJhs: '',
          total: 'Supplementary reading books, provision of borehole with hand pump, desks, re-roofing of classroom blocks, support for Mock Exams',
        },
      ];


    return (
        <>
            <Title level={3} style={{ marginTop: "20px" }}>PI 5.0 - 5.1 Support to Education Services</Title>
            <Title level={4} style={{ marginTop: "20px" }}>Assessment Guide/ Requirement</Title>
            <Content>
            From the DCD and District Director of Education receive information on 
            the list of public schools in the District and challenges faced by the schools:<br /><br />
                <ol>
                    <li type="i">
                    If the Assembly has supported at least 15% of the Public Schools within the district to address 
                    their challenges (furniture, teaching and learning materials (TLMs), etc.), score 2
                    </li>
            

                </ol>

            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>
                Maximum Score <strong>2</strong>
            </Title>

            <Title level={5} style={{ marginTop: "20px" }}>
                PI 5.0-5.1 Actual Score: <strong>Score</strong>
            </Title>


            <Title level={5} style={{ marginTop: "20px" }}>
             Evidence of financial irregularities
            </Title>
            {<Table
                columns={columns}
                dataSource={data || []}
                pagination={false} bordered />}

        </>
    );
}

export default EducationServiceSupport;
