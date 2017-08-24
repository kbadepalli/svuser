'use strict';
(() => {
  angular.module('app', ['ngRoute', 'ngPlacesMap'])
  .config(['$routeProvider', '$locationProvider',($routeProvider, $locationProvider) => {
    $routeProvider
    .when('/create', {
      template: '<create></create>'
    })
    .when('/view', {
      template: '<view></view>'
    })
    .when('/edit', {
      template: '<edit></edit>'
    })
    .otherwise({
      redirectTo: '/create'
    });

    $locationProvider.html5Mode(true);
  }]);
})();
