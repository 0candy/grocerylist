'use strict';

/**
 * @ngdoc function
 * @name groceryListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the groceryListApp
 */
angular.module('groceryListApp')
  .controller('MainCtrl', ['$scope', 'Grocerylist', 'Shopper', '$location',
    function ($scope, Grocerylist, Shopper, $location) {
    $scope.check="";
    $scope.isError = false;

    function getGroceryList() {
      if (Shopper.isAuthenticated() || Shopper.getCurrentId() != null) {
        Grocerylist
          .find({
            filter: {
              where: {
                shopperId: Shopper.getCurrentId()
                }
              }
          })
          .$promise
          .then(function(results) {
            $scope.groceries = results;
            console.log($scope.groceries);
          });
      }
      else {
        $location.path('/login');        
      }
    }

    getGroceryList();

    $scope.addItem = function() {
      Grocerylist
        .create({
          name: $scope.newItem.name,
          purchased: false,
          shopperId: Shopper.getCurrentId()
        })
        .$promise
        .then(function(newItem) {
          $scope.newItem = '';
          $scope.groceryForm.content.$setPristine();
          $('.focus').focus();
          getGroceryList();
        });
    };

    $scope.removeItem = function(item) {
      Grocerylist
        .deleteById(item)
        .$promise
        .then(function() {
          getGroceryList();
        });
    };

    $scope.updateItem = function(item) {
      Grocerylist
        .update({
          where:{
            id:item.id
          }
        }, {
          purchased:item.purchased
        }, function(ob1) {
          }, function(err) {
            console.log(err);
          });
    };

    $scope.checkList = function() {
      Grocerylist.complete({shopperId: Shopper.getCurrentId()}, function(value) {
        $scope.check = value.complete;
      });
    };

    $scope.logout = function() {
      Shopper.logout(Shopper.getCurrentId());
      $location.path('/login');
    }
  }])
  .controller('AuthLoginController', ['$scope', 'Shopper', '$location', function($scope, Shopper, $location) {
    $scope.login = function() {
      Shopper.login(null, {
        email: $scope.user.email,
        password: $scope.user.password
      }, function(user) {
        console.log(user);
        $location.path('/main');
       }, function(err, token) {
        if (err) {
          $scope.isError = "Invalid email and/or password.  Please try again.";
        }
     });
    };
  }])
  .controller('RegisterController', ['$scope', 'Shopper', '$location', function($scope, Shopper, $location) {
    $scope.register = function() {
      Shopper.create({
        email: $scope.user.email,
        password: $scope.user.password
        }, function(value, users) {
          console.log(users);
          $scope.isError = "User has been successfully registered.";
          $location.path('/login');
        }, function(err, token) {
          if (err) {
            $scope.isError = err.data.error.message;
          }
     });
    };
  }]);