'use strict';

/**
 * @ngdoc overview
 * @name groceryListApp
 * @description
 * # groceryListApp
 *
 * Main module of the application.
 */
angular
  .module('groceryListApp', [
    'ngResource',
    'ngRoute',
    'lbServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'AuthLogoutController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
