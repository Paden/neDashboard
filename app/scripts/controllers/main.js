'use strict';

angular.module('neDashboardApp').controller('MainCtrl', function( $scope, $timeout, cfpLoadingBar, SchedulerService )
{

	var guageOptions = {};
	guageOptions.options =
	{
		chart     : { type: 'solidgauge' },
		tooltip   : { enabled: false },
		exporting : { enabled: false },
	    credits   : { enabled: false },
		title     : { style: 'font-size:8px' },
		pane      :
		{
			center: ['50%', '10%'],
			size: '40%',
			startAngle : -90,
			endAngle   : 270,
			background : {
				backgroundColor : (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
				innerRadius     : '60%',
				outerRadius     : '100%',
				shape           : 'circle'
            }
	    },
	    yAxis:
	    {
			lineWidth         : 0,
			minorTickInterval : null,
			tickPixelInterval : 400,
			tickWidth         : 0,
			labels            : { y: 16 },
			min               : 0,
			max               : 100,
			showLastLabel     : false,
			showFirstLabel    : false,
			stops             : [
				[0.1, '#55BF3B'], // green
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
	    },
        plotOptions:
        {
            solidgauge:
            {
                dataLabels:
                {
					y           : -12,
					borderWidth : 0,
					useHTML     : true
                }
            }
        }
	};

	guageOptions.series =  [{
		data : [0],
        dataLabels: {}
    }];

    function createTemplateForGauge( str )
    {
    	return '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span></div>'
    }

    function createChartInstance( instance, i )
	{
		var delay      =  2500 + 350 * ( i % 12 );

		instance.ServiceName =  instance.ServiceName.replace( 'Brazos.Platform.Services.', '' );
		instance.ServiceName =  instance.ServiceName.replace( 'Noesis.Platform.Services.', '' );

		instance.chart =  angular.copy(guageOptions);
		instance.chart.options.title.text =  instance.ServiceName;
		instance.chart.series[0].data[0] = 0;
		instance.chart.series[0].dataLabels.format = createTemplateForGauge( instance.ServiceName );

		$timeout(function()
		{
			instance.chart.series[0].data[0] = instance.Current.Load > 100? 100 : instance.Current.Load;
			cfpLoadingBar.inc( cfpLoadingBar.status() + instanceFrac );
		}, delay);

		return instance;
	}

	function sortInstances( instanceA, instanceB )
	{
		return instanceB.Current.Load - instanceA.Current.Load;
	}


	SchedulerService.findInstances().then(function( instances )
	{
		$scope.$evalAsync(function()
		{
			var numOfInstances =  0,
				instanceFrac;
			cfpLoadingBar.start();
			if( !instances || !instances.Instances )
			{
				$scope.error = true;
				cfpLoadingBar.complete();
			}
			else
			{
				numOfInstances   =  instances.Instances.length;
				instanceFrac     =  1 / numOfInstances;

				cfpLoadingBar.set(0);

				$scope.instances =  instances.Instances.sort(sortInstances).map(createChartInstance);
			}

			$timeout(function()
			{
				cfpLoadingBar.complete();
			}, 2500 + 350 * 12, false);
		});
	});
});
