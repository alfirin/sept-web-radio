"use strict";var septWebRadioApp=angular.module("septWebRadioApp",["ngRoute","septWebRadioControllers","ui.bootstrap"]);septWebRadioApp.config(["$routeProvider","$locationProvider",function(a,b){a.when("/index",{templateUrl:"views/main/main.html",controller:"MainCtrl"}).when("/stage",{templateUrl:"views/stage/stage.html",controller:"StageCtrl"}).when("/replay",{templateUrl:"views/replay/replay.html",controller:"ReplayCtrl"}).when("/topical",{templateUrl:"views/topical/topical.html",controller:"TopicalCtrl"}).when("/door",{templateUrl:"views/door/door.html",controller:"DoorCtrl"}).when("/backstage",{templateUrl:"views/backstage/backstage.html",controller:"BackstageCtrl"}).otherwise({redirectTo:"/index"}),b.html5Mode(!0)}]);var appControllers=angular.module("septWebRadioControllers",[]);appControllers.controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),appControllers.controller("StageCtrl",["$scope",function(a){a.title="Stage"}]),appControllers.controller("ReplayCtrl",["$scope",function(a){a.title="Replay"}]),appControllers.controller("TopicalCtrl",["$scope",function(a){a.title="Topical"}]),appControllers.controller("DoorCtrl",["$scope",function(a){a.title="Door"}]),appControllers.controller("BackstageCtrl",["$scope",function(a){a.title="Back Stage"}]);