'use strict';

var moduleDependencies =  [ 'chieffancypants.loadingBar', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'CommonWebServices', 'highcharts-ng'],
    neDashboardApp     =  angular.module('neDashboardApp', moduleDependencies);

neDashboardApp.config(function( $routeProvider, $locationProvider, cfpLoadingBarProvider )
{
  $routeProvider
    .when('/',
    {
      templateUrl: 'partials/main',
      controller : 'MainCtrl'
    })
    .otherwise({ redirectTo: '/' });

    cfpLoadingBarProvider.includeSpinner = false;
    $locationProvider.html5Mode(true);
})

neDashboardApp.value('DefaultSchedulerEndpoint', 'https://dapp.noesisenergy.com/Scheduler/RestResolver.svc/jsonp');