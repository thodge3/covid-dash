import React, { useState, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import "./Map.css";

import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([0, 10000])
    .range(["#ffedea", "#ff5233"]);

const MapChart = ({ allCountry }) => {

    const [content, setContent] = useState("")
    let modAllCountry = allCountry

    const lineChartGrowth = (
        modAllCountry
            ? (
                <ComposableMap data-tip="" projectionConfig={{ scale: 170 }}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const d = modAllCountry.find(s => s.iso2 === geo.properties.ISO_A2);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={d ? colorScale(d["newConfirmed"]) : "#F5F4F6"}
                                        onMouseEnter={() => {
                                            let NAME = ""
                                            let EST = ""
                                            try{
                                                NAME = d['countries']
                                                EST = d["newConfirmed"]
                                                setContent(`${NAME} — ${EST} New Cases`);
                                            }catch(error){
                                                setContent(`No Data Available`);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setContent("");
                                        }}
                                        style={{
                                            default: {
                                              outline: "none"
                                            },
                                            hover: {
                                              outline: "none"
                                            },
                                            pressed: {
                                              outline: "none"
                                            }
                                          }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            ) : null
    );

    return (
        <Fragment>
            <h3>Today's World Hot Spots</h3>
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
            >
                {lineChartGrowth}
            </ComposableMap>
            <ReactTooltip>{content}</ReactTooltip>
        </Fragment>
    );
};

export default MapChart;
