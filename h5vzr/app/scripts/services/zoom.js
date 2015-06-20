'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.zoom
 * @description
 * # zoom
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('zoom', function () {
    var MONTH = 30 * 24 * 3600 * 1000;
    var WEEK = 7 * 24 * 3600 * 1000;
    var DAY = 24 * 3600 * 1000;
    var HOUR = 3600 * 1000;

    var SINGLE_STEP_RATIO = 0.25;

    var singleStep = function (min, max) {
      return (max - min) * SINGLE_STEP_RATIO;
    };

    this.ranges = [
      {
        name: 'M',
        value: MONTH
      },
      {
        name: 'W',
        value: WEEK
      },
      {
        name: 'T',
        value: DAY
      },
      {
        name: 'S',
        value: HOUR
      }
    ];

    this.isZoomed = false;

    this.selectRange = function(chart, range){
      if (!chart) {
        return;
      }
      var max = chart.series[0].xAxis.dataMax;
      var min = max - range.value;
      chart.xAxis[0].setExtremes(min, max);
      this.isZoomed = true;
    };

    this.zoomIn = function(chart){
      if (!chart) {
        return;
      }
      var extremes = chart.xAxis[0].getExtremes();
      var max = extremes.max;
      var min = extremes.min;
      chart.xAxis[0].setExtremes(min + singleStep(min,max), max - singleStep(min,max));
      this.isZoomed = true;
    };

    this.zoomOut = function(chart){
      if (!chart) {
        return;
      }
      var extremes = chart.xAxis[0].getExtremes();
      var max = extremes.max;
      var min = extremes.min;
      chart.xAxis[0].setExtremes(min - singleStep(min,max), max + singleStep(min,max));
      this.isZoomed = true;
    };

    this.navigateLeft = function(chart){
      if (!chart) {
        return;
      }
      var extremes = chart.xAxis[0].getExtremes();
      var max = extremes.max;
      var min = extremes.min;
      chart.xAxis[0].setExtremes(min - singleStep(min,max), max - singleStep(min,max));
      this.isZoomed = true;
    };

    this.navigateRight = function(chart){
      if (!chart) {
        return;
      }
      var extremes = chart.xAxis[0].getExtremes();
      var max = extremes.max;
      var min = extremes.min;
      chart.xAxis[0].setExtremes(min + singleStep(min,max), max + singleStep(min,max));
      this.isZoomed = true;
    };

    this.resetZoom = function (chart) {
      if (!chart) {
        return;
      }
      chart.zoomOut();
      this.isZoomed = false;
    };

    this.shift = function(chart){
      if (!chart) {
        return;
      }
      var extremes = chart.xAxis[0].getExtremes();
      var max = extremes.max;
      var min = extremes.min;
      var xData = chart.series[0].xData;
      var lastPoint = xData[xData.length - 1];
      var beforeLastPoint = xData[xData.length - 1 - 1];
      var diff = lastPoint - beforeLastPoint;
      chart.xAxis[0].setExtremes(min + diff, max + diff, false);
    };
  });
