'use strict';

angular.module('neDashboardApp').controller('MainCtrl', function( $scope, $timeout, SchedulerService )
{
	function sortInstances( instanceA, instanceB )
	{
		return instanceB.Current.Load - instanceA.Current.Load;
	}

	$scope.showInstanceInfo =  function( instance )
	{
		$scope.clickedInstance =  instance;
	};

	SchedulerService.findInstances().then(function( instances )
	{
		$scope.$evalAsync(function()
		{
			if( !instances || !instances.Instances )
			{
				$scope.error = true;
			}
			else
			{
				$scope.instances       =  instances.Instances.sort(sortInstances);
				$scope.clickedInstance =  $scope.instances[0];
			}
		});
	});
});
