'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.ChartConfig
 * @description
 * # ChartConfig
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .value('ChartConfig', function (chartTitleText, yAxisText, tooltipSuffixText, seriesName) {
    return {
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
          text: chartTitleText
        },
        chart: {
          type: 'line'
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
