'use strict';

angular.module('neDashboardApp').directive('gaugeChart', function( $timeout )
{
	var numOfInstances = 0;
	var guageOptions = {};
	guageOptions.options =
	{
		animation : false,
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

    function createChartInstance( instance )
	{
		var delay       =  1500 + 75 * numOfInstances,
			chart       =  angular.copy(guageOptions),
			serviceName =  instance.ServiceName.replace( 'Brazos.Platform.Services.', '' );
		    serviceName = serviceName.replace( 'Noesis.Platform.Services.', '' );
		numOfInstances++;

		chart.options.title.text          =  serviceName;
		chart.series[0].data[0]           =  0;
		chart.series[0].dataLabels.format =  createTemplateForGauge( serviceName );

		$timeout(function()
		{
			chart.series[0].data[0] = instance.Current.Load > 100? 100 : instance.Current.Load;
		}, delay);

		return chart;
	}

    return {
      template: '<highchart config="chart"></highchart>',
      scope: { 'instance' : '=' },
      restrict: 'E',
      link: function postLink(scope, element, attrs)
      {
        scope.$watch('instance', function( instance )
        {
        	if( typeof instance !== 'object' ) { return; }

        	scope.$evalAsync(function()
        	{
        		scope.chart =  createChartInstance( instance );
        	});
        });
      }
    };
});
