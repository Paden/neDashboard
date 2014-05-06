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
  })
  .value('DefaultSchedulerEndpoint', 'https://dapp.noesisenergy.com/Scheduler/RestResolver.svc/jsonp');

angular.module('neDashboardApp').service('SchedulerService', noesis.webServices.SchedulerService.make());