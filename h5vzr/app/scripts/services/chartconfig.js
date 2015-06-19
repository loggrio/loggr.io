'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.ChartConfig
 * @description
 * # ChartConfig
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .value('ChartConfig', function (sensor) {
    var yAxisText;
    var tooltipSuffixText;
    var titleText;
    var seriesName;

    switch (sensor.type) {
      case 'temperature':
        titleText = 'Temperatur' + ' ' + sensor.location;
        yAxisText = 'Temperatur (°C)';
        tooltipSuffixText = ' °C';
        seriesName = 'Temperatur';
      break;
      case 'pressure':
        titleText = 'Luftdruck' + ' ' + sensor.location;
        yAxisText = 'Luftdruck (hPa)';
        tooltipSuffixText = ' hPa';
        seriesName = 'Luftdruck';
      break;
      case 'brightness':
        titleText = 'Helligkeit' + ' ' + sensor.location;
        yAxisText = 'Helligkeit (lm)';
        tooltipSuffixText = ' lm';
        seriesName = 'Helligkeit';
      break;
      case 'humidity':
        titleText = 'Luftfeuchtigkeit' + ' ' + sensor.location;
        yAxisText = 'Relative Luftfeuchtigkeit (%)';
        tooltipSuffixText = ' %';
        seriesName = 'Luftfeuchtigkeit';
      break;
      default:
        console.log('Unbekanner Sensor');
    }

    return {
      id: sensor.id,
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
          text: titleText
        },
        chart: {
          zoomType: 'x',
          type: 'spline'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: yAxisText
          }
        },
        tooltip: {
          valueSuffix: tooltipSuffixText
        }
      },
      series: [{
        data: [],
        color: '#009688',
        name: seriesName
      }]
    };
  });
