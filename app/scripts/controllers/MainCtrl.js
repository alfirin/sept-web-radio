'use strict';

/* Main Controller  */

angular.module('septWebRadioControllers').controller('MainCtrl', ['$scope', 'applicationServices', 'Page', '$location',
  function ($scope, applicationServices, Page, $location) {

    $scope.connexionButtonLabel = undefined;
    $scope.user = applicationServices.user;
    $scope.Page = Page;

    applicationServices.getInitApplication().then(function (data) {
      $scope.user = data;

      // Check if the user is connected
      if (data) {
        // The user is connected
      }
      $scope.connexionButtonLabel = applicationServices.getConnexionLabel();
    });

    $scope.logInLogOutClick = function () {
      applicationServices.logInLogOut().then(function (label) {
        $scope.connexionButtonLabel = label;
      });
    };

    $scope.go = function ( path ) {
      $location.path( path );
    };
  }]
);