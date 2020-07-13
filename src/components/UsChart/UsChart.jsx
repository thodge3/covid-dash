import React, { useState, useEffect } from 'react';
import { fetchGitData } from '../../api';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';

// import styles from './UsChart.module.css';


const UsChart = ({ data, countryName }) => {
    const [dailyData, setDailyData] = useState([]);

    let modDataConfirmed = null;
    let modDataRecovered = null;
    let modDataDeaths = null;
    let modDates = null;
    let modPositiveIncrease = [];
    let scatter = [];

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchGitData());
        }

        fetchAPI();
    }, []);


    try {
        modDataConfirmed = data.map(({ positive }) => positive);
        modDataRecovered = data.map(({ recovered }) => recovered);
        modDataDeaths = data.map(({ deaths }) => deaths);
        modDates = data.map(({ date }) => date);

        for (let i = 0; i < modDataConfirmed.length; i++) {
            if (i === 0) {
                modPositiveIncrease.push(0)
            } else {
                modPositiveIncrease.push(modDataConfirmed[i] - modDataConfirmed[i - 1])
            }
        }

        for (let i = 0; i < modDataConfirmed.length; i++) {
            scatter.push({
                name: modDates[i],
                x: modDataConfirmed[i] + 0.0001,
                y: modPositiveIncrease[i] + 0.0001,
            })
        }
    
        scatter = scatter.filter(item => item.y > 0)
    
        /*
        // modPositiveIncrease = dailyData.map(({ positiveIncrease }) => positiveIncrease).reverse();
        scatter = dailyData.map(({ positive, positiveIncrease, date }) => ({
            name: date,
            x: positive,
            y: positiveIncrease,
        }))

        console.log(scatter)
        */

    } catch (error) {
        console.log(error);
    }




    const options = {
        chart: {
            zoomType: 'x',
            resetZoomButton: {
                position: {
                    // align: 'right', // by default
                    // verticalAlign: 'top', // by default
                    x: 0,
                    y: -30
                }
            }
        },
        title: {
            text: `${countryName} Daily Confirmed COVID-19 Cases`
        },
        yAxis: {
            floor: 0,
            startOnTick: false

        },
        xAxis: {
            categories: modDates,
            tickInterval: 15
        },
        credits: false,
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        series: [
            {
                name: "Positive",
                data: modDataConfirmed,
                color: 'rgba(0, 0, 255, 0.5)',
            },
            {
                name: "Recovered",
                data: modDataRecovered,
                color: 'rgba(0, 255, 0, 0.5)',
            },
            {
                name: "Deaths",
                data: modDataDeaths,
                color: 'rgba(255, 0, 0, 0.5)',
            }
        ],
    }

    const options2 = {
        chart: {
            zoomType: 'x',
            resetZoomButton: {
                position: {
                    // align: 'right', // by default
                    // verticalAlign: 'top', // by default
                    x: 0,
                    y: -30
                }
            }
        },
        title: {
            text: `${countryName} COVID-19 Cases Growth (Log-Log)`
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Growth Rate (log daily new cases)'
            },
            type: 'logarithmic',
            allowNegativeLog: true
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Total Confirmed Cases (log)'
            },
            type: 'logarithmic',
            allowNegativeLog: true
        },
        credits: false,
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        series: [
            {
                name: "Growth Curve",
                data: _.orderBy(scatter, ['x'],['asc']),
                color: 'rgba(0, 0, 255, 0.5)',
            }
        ]
    }
    const options3 = {
        chart: {
            zoomType: 'x',
            resetZoomButton: {
                position: {
                    // align: 'right', // by default
                    // verticalAlign: 'top', // by default
                    x: 0,
                    y: -30
                }
            }
        },
        title: {
            text: `${countryName} Daily Growth Confirmed COVID-19 Cases`
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Daily New Cases'
            },
        },
        xAxis: {
            categories: modDates,
            tickInterval: 15
        },
        credits: false,
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        series: [
            {
                name: "Daily Case Increase",
                data: modPositiveIncrease,
                color: 'rgba(0, 0, 255, 0.5)',
            }
        ]
    }


    const growthChart = (
        scatter
            ? (<HighchartsReact
                highcharts={Highcharts}
                options={options2}
            />) : null

    );

    const lineChart = (
        modDataConfirmed
            ? (<HighchartsReact
                highcharts={Highcharts}
                options={options}
            />) : null

    );

    const lineChartGrowth = (
        modPositiveIncrease
            ? (<HighchartsReact
                highcharts={Highcharts}
                options={options3}
            />) : null

    );

    return (
        <Container fluid>
            <Row>
                <Col lg={true}>
                    {growthChart}
                </Col>
                <Col lg={true}>
                    {lineChart}
                </Col>
                <Col lg={true}>
                    {lineChartGrowth}
                </Col>
            </Row>
        </Container >
    )
}

export default UsChart;