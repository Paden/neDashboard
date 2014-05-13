'use strict';

describe('Directive: gaugeChart', function () {

  // load the directive's module
  beforeEach(module('neDashboardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gauge-chart></gauge-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gaugeChart directive');
  }));
});
