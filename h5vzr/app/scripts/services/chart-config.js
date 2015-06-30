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
    // Initial chartconfig-scaffold, to be filled with chart-options
    var configStub = {
      id: '',
      options: {
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
        },
        navigation: {
          buttonOptions: {
            enabled: false
          }
        }
      },
      series: [{
        data: [],
        color: '#009688',
        name: ''
      }],
    };

    /**
     * Translate textual sensorunits into numerical ones
     */
    function setUnit(sensorUnit) {
      switch (sensorUnit) {
        case 'grad_celsius':
          return '°C';
        case 'lumen':
          return 'lm';
        case 'percent':
          return '%';
        case 'hectopascal':
          return 'hPa';
        default:
          return '';
      }
    }

    /**
     * Set texts for chart labels
     */
    function setChartTexts(sensor) {
      var unitText = setUnit(sensor.unit);

      switch (sensor.type) {
        case 'temperature':
          titleText = 'Temperatur' + ' ' + sensor.location;
          yAxisText = 'Temperatur (' + unitText + ')';
          tooltipSuffixText = ' ' + unitText;
          seriesName = 'Temperatur';
          break;
        case 'pressure':
          titleText = 'Luftdruck' + ' ' + sensor.location;
          yAxisText = 'Luftdruck (' + unitText + ')';
          tooltipSuffixText = ' ' + unitText;
          seriesName = 'Luftdruck';
        break;
        case 'brightness':
          titleText = 'Helligkeit' + ' ' + sensor.location;
          yAxisText = 'Helligkeit (' + unitText + ')';
          tooltipSuffixText = ' ' + unitText;
          seriesName = 'Helligkeit';
        break;
        case 'humidity':
          titleText = 'Luftfeuchtigkeit' + ' ' + sensor.location;
          yAxisText = 'Relative Luftfeuchtigkeit (' + unitText + ')';
          tooltipSuffixText = ' ' + unitText;
          seriesName = 'Luftfeuchtigkeit';
        break;
        default:
          titleText = 'Error: Unknown sensor type';
          yAxisText = '';
          tooltipSuffixText = '';
          seriesName = '';
      }
    }

    /**
     * Set charttype to spline and fill config-scaffold with labels
     */
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

    /**
     * Set charttype to column and fill config-scaffold with labels
     */
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
