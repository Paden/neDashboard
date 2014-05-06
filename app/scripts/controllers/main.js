'use strict';

angular.module('neDashboardApp').controller('MainCtrl', function( $scope, $http, cfpLoadingBar, SchedulerService )
{
	cfpLoadingBar.start();

	SchedulerService.findInstances().then(function( instances )
	{
		cfpLoadingBar.complete();
	});
});
