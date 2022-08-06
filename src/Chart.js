



import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({filter, chartId}) => {
  const width = window.innerWidth * .6;
  const height = window.innerHeight * .75;
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-dabvu'});  
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({
    chartId: chartId,
    height: height,
    width: width
}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
        console.log("setting filter", filter)
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return <div className="chart" ref={chartDiv}/>;
};

export default Chart;