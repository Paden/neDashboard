'use strict';

angular.module('neDashboardApp', [
  'chieffancypants.loadingBar',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    cfpLoadingBarProvider.includeSpinner = false;
    $locationProvider.html5Mode(true);
  });