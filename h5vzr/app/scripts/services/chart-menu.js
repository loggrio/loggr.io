'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.chartMenu
 * @description
 * # chartMenu
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('chartMenu', function () {

    function getDateStamp() {
      var date = new Date();
      var day = date.getDate();
      var month = parseInt(date.getMonth()) + 1; // <- crazy mf!
      var year = date.getFullYear();
      return day + '.' + month + '.' + year;
    }

    this.contextMenu = function (charts) {
      return {
        print: {
          label: 'Drucken',
          icon: 'print',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            chart.print();
          }
        },
        jpg: {
          label: 'Als JPG exportieren',
          icon: 'image',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'image/jpeg',
              filename: filename
            });
          }
        },
        png: {
          label: 'Als PNG exportieren',
          icon: 'image',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'image/png',
              filename: filename
            });
          }
        },
        pdf: {
          label: 'Als PDF exportieren',
          icon: 'picture_as_pdf',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'application/pdf',
              filename: filename
            });
          }
        },
        svg: {
          label: 'Als SVG exportieren',
          icon: 'photo_size_select_large',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'image/svg+xml',
              filename: filename
            });
          }
        }
      };
    };

  });
