import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 10000])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({allCountry}) => {

    let modAllCountry = allCountry
    //console.log(modAllCountry)
    
    const lineChartGrowth = (
        modAllCountry
            ? (<Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const d = modAllCountry.find(s => s.iso2 === geo.properties.ISO_A2);
                    console.log(d)
                    //console.log(geographies)
                    //console.log(modAllCountry)
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill = {d ? colorScale(d["newConfirmed"]) : "#F5F4F6"}
                      />
                    );
                  })
                }
              </Geographies>
              ) : null
    );

  return (
    <ComposableMap 
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {lineChartGrowth}
        
    </ComposableMap>
  );
};

export default MapChart;
