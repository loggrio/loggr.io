'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.chartConfig
 * @description
 * # ChartConfig
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('chartConfig', function () {
    var yAxisText;
    var tooltipSuffixText;
    var titleText;
    var seriesName;
    var configStub = {
      id: '',
      options: {
        lang: {
          contextButtonTitle: 'Graphenoptionen',
          downloadJPEG: 'Graph als JPEG exportieren',
          downloadPDF: 'Graph als PDF exportieren',
          downloadPNG: 'Graph als PNG exportieren',
          downloadSVG: 'Graph als SVG exportieren',
          loading: 'Daten werden geladen...',
          months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          noData: 'Keine Daten zum Anzeigen vorhanden',
          printChart: 'Graph drucken',
          shortMonths: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
          weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
        },
        title: {
          text: ''
        },
        chart: '',
        xAxis: '',
        yAxis: {
          title: {
            text: ''
          }
        },
        tooltip: {
          valueSuffix: ''
        }
      },
      series: [{
        data: [],
        color: '#009688',
        name: ''
      }]
    };

    var setChartTexts = function (sensor) {
      switch (sensor.type) {
        case 'temperature':
          titleText = 'Temperatur' + ' ' + sensor.location;
          yAxisText = 'Temperatur (' + sensor.unit + ')';
          tooltipSuffixText = ' °C';
          seriesName = 'Temperatur';
          break;
        case 'pressure':
          titleText = 'Luftdruck' + ' ' + sensor.location;
          yAxisText = 'Luftdruck (' + sensor.unit + ')';
          tooltipSuffixText = ' ' + sensor.unit;
          seriesName = 'Luftdruck';
        break;
        case 'brightness':
          titleText = 'Helligkeit' + ' ' + sensor.location;
          yAxisText = 'Helligkeit (' + sensor.unit + ')';
          tooltipSuffixText = ' ' + sensor.unit;
          seriesName = 'Helligkeit';
        break;
        case 'humidity':
          titleText = 'Luftfeuchtigkeit' + ' ' + sensor.location;
          yAxisText = 'Relative Luftfeuchtigkeit (' + sensor.unit + ')';
          tooltipSuffixText = ' ' + sensor.unit;
          seriesName = 'Luftfeuchtigkeit';
        break;
        default:
          titleText = 'Error: Unknown sensor type';
          yAxisText = '';
          tooltipSuffixText = '';
          seriesName = '';
      }
    };

    this.getSplineChartConfig = function (sensor) {
      setChartTexts(sensor);

      var chartConfig = angular.copy(configStub);
      chartConfig.id = sensor.id;
      chartConfig.options.title.text = titleText;
      chartConfig.options.chart = {
        zoomType: 'x',
        type: 'spline',
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        }
      };
      chartConfig.options.xAxis = {
        type: 'datetime'
      };
      chartConfig.options.yAxis.title.text = yAxisText;
      chartConfig.options.tooltip.valueSuffix = tooltipSuffixText;
      chartConfig.series[0].name = seriesName;

      return chartConfig;
    };

    this.getColumnChartConfig = function (sensor) {
      setChartTexts(sensor);

      var chartConfig = angular.copy(configStub);
      chartConfig.id = sensor.id;
      chartConfig.options.title.text = titleText;
      chartConfig.options.chart = {
        type: 'column'
      };
      chartConfig.options.yAxis.title.text = yAxisText;
      chartConfig.options.tooltip.valueSuffix = tooltipSuffixText;
      chartConfig.series[0].name = seriesName + ' im Durchschnitt';

      return chartConfig;

    };
  });
