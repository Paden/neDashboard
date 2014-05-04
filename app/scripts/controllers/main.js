'use strict';

angular.module('neDashboardApp')
  .controller('MainCtrl', function ($scope, $http, cfpLoadingBar) {
  	cfpLoadingBar.start();
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      cfpLoadingBar.complete();
    });
  });
