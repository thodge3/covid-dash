import React, { Fragment } from 'react';
// import { fetchStateData } from '../../api';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';

const StateChart = ({ state, stateDisplay, stateData, country }) => {

    let modDataConfirmed = null;
    let modDataRecovered = null;
    let modDataDeaths = null;
    let modDates = null;
    let modPositiveIncrease = [];
    let modHospitalIncrease = [];
    let modHospitalCurrent = [];
    let scatter = [];

    if (stateData !== null) {
        modDataConfirmed = stateData.map(({ positive }) => positive).reverse();
        modDataRecovered = stateData.map(({ recovered }) => recovered).reverse();
        modDataDeaths = stateData.map(({ deaths }) => deaths).reverse();
        modDates = stateData.map(({ date }) => date).reverse();
        modPositiveIncrease = stateData.map(({ positiveIncrease }) => positiveIncrease).reverse();
        modHospitalIncrease = stateData.map(({ hospitalIncrease }) => hospitalIncrease).reverse();
        modHospitalCurrent = stateData.map(({ hospitalCurrent }) => hospitalCurrent).reverse();
        scatter = stateData.map(({ positive, positiveIncrease, date }) => ({
            name: date,
            x: positive + 0.001,
            y: positiveIncrease + 0.001,
        }))
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
            text: `${stateDisplay} Daily Confirmed COVID-19 Cases`
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
            },
            {
                name: "Hospitalizations",
                data: modHospitalCurrent,
                color: '#58508d',
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
            text: `${stateDisplay} COVID-19 Cases Growth (Log-Log)`
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
            text: `${stateDisplay} Daily Growth Confirmed COVID-19 Cases`
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
            },
            {
                name: "Daily Hospitalization Increase",
                data: modHospitalIncrease,
                color: 'rgba(255, 0, 0, 0.5)',
            }
        ]
    }


    const growthChart = (
        state
            ? (<HighchartsReact
                highcharts={Highcharts}
                options={options2}
            />) : null

    );

    const lineChart = (
        state
            ? (<HighchartsReact
                highcharts={Highcharts}
                options={options}
            />) : null

    );

    const lineChartGrowth = (
        state
            ? (<HighchartsReact
                highcharts={Highcharts}
                options={options3}
            />) : null

    );

    const stateSelect = (
        country === 'united-states'
            ? (
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
            ) : null
    )

    return (
        <Fragment>
            {stateSelect}
        </Fragment>
    )
}

export default StateChart;