const cleanData = data => {
  /*
    Takes in raw api data, reformats it for chart.js

    :data: <array> array filled with objects containing raw data
    :returns: <obj> data object formatted for chart.js
  */
  console.log(data);
  if (!data || data.length === 0) return {};

  const keys = Object.keys(data[0]["Time Series (60min)"]);
  const formattedData = {
    labels: keys,
    datasets: buildDataSet(data)
  };

  return {
    type: 'line',
    data: formattedData
  }
}

const buildDataSet = data => {
  /*
    Takes in the raw data, prepares it for the chart

    :data: <array> array filled with objects containing raw data
    :returns: <array> formatted data
  */

  const formattedData = data.map((dataSet, i) => {
    const colors = [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    const dataItem = {
      data: [],
      label: dataSet["Meta Data"]["2. Symbol"],
      borderColor: colors[i],
      backgroundColor: colors[i],
      fill: false
    };
    const keys = Object.keys(dataSet["Time Series (60min)"])

    keys.map(key => dataItem.data.push(dataSet["Time Series (60min)"][key]['4. close']));

    return dataItem;
  });

  return formattedData;
}

export default cleanData;
