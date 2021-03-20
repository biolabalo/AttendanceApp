import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.addLicense('CH123616381');
am4core.useTheme(am4themes_animated);
const colors = ['#26A595', '#e89828', '#d12100'];

export function position_line(data, id, totals_data, filterType) {
  // Create chart instance
  var chart = am4core.create(id, am4charts.XYChart);
  chart.data = data;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = '50%';
  dateAxis.renderer.ticks.template.disabled = true;
  dateAxis.renderer.line.opacity = 0;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.minGridDistance = 40;
  // dateAxis.dataFields.dateX = 'date';
  dateAxis.startLocation = 0.4;
  dateAxis.endLocation = 0.6;
  // dateAxis.renderer.labels.template.disabled = true;
  dateAxis.renderer.labels.template.fill = '#888';
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.dateFormats.setKey('day', filterType === 'week' ? 'eeeee' : 'dd');

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.line.opacity = 0;
  valueAxis.renderer.ticks.template.disabled = true;
  valueAxis.min = 0;
  valueAxis.renderer.labels.template.fontSize = 12;
  valueAxis.renderer.labels.template.fill = '#888';
  valueAxis.title.fill = '#888';
  valueAxis.renderer.grid.template.disabled = true;
  valueAxis.title.text = 'No. of staffs';

  const seriesMap = Object.keys(data[0]).reduce((acc, cur, i) => {
    if (cur !== 'date') {
      return [...acc, { valueY: cur }];
    }
    return acc;
  }, []);

  seriesMap.forEach((series, i) => {
    const capitalized =
      series.valueY.charAt(0).toUpperCase() + series.valueY.slice(1);

    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = 'date';
    lineSeries.dataFields.valueY = series.valueY;
    // lineSeries.dataFields.customValue = 'date';
    // lineSeries.dataFields.cost = 'cost';
    // lineSeries.tooltipText = 'Population: {valueY.value}\n Cost: {cost.value}';
    lineSeries.tooltipHTML = `
        <p style="color: ${colors[i]}; font-size: 0.8rem; text-align:center">{dateX.formatDate('dd MMM yyyy')}</p>
        <p style="color: ${colors[i]}; font-size: 0.8rem; text-align:center"><strong>{valueY.value}</strong> ${capitalized}</p>
    `;

    lineSeries.tooltip.getFillFromObject = false;
    lineSeries.tooltip.background.fill = am4core.color('#FFF');

    lineSeries.tooltip.getStrokeFromObject = true;
    lineSeries.tooltip.background.strokeWidth = 0;

    lineSeries.legendSettings.labelText = `${series.valueY}: ${
      totals_data[series.valueY]
    }`;
    lineSeries.legendSettings.fill = colors[i];

    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.tensionX = 0.8;

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color(colors[i]));
    gradient.addColor(am4core.color('#fffcf9'));

    lineSeries.stroke = colors[i];
    lineSeries.fill = gradient;
    gradient.rotation = 90;
  });

  chart.legend = new am4charts.Legend();
  chart.legend.position = 'top';
  chart.legend.contentAlign = 'left';

  chart.legend.useDefaultMarker = true;
  let marker = chart.legend.markers.template.children.getIndex(0);
  marker.cornerRadius(12, 12, 12, 12);

  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 12;
  markerTemplate.height = 12;

  chart.legend.labels.template.fontSize = '12px';
  chart.legend.valueLabels.template.fontSize = '12px';
  chart.legend.paddingBottom = 40;

  chart.legend.labels.template.fill = am4core.color('#888');
  chart.legend.valueLabels.template.fill = am4core.color('#888');

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = 'panX';
  chart.cursor.lineX.opacity = 0;
  chart.cursor.lineY.opacity = 0;

  return chart;
}
