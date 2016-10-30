(function (angular) {

	'use strict';

	angular.module("lt.head", [])

	.directive('ltHead', ['$rootScope', function($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/head/head.html",
         link: function(scope) {
            $rootScope.$on("lt.tick.data", function(event, data) {
               scope.head = data.head;
            });
         }
      };
	}])

   .filter("minutes", function() {
      return function(seconds) {
         if(+seconds < 60) {
            return seconds;
         }
         return Math.floor(seconds/ 60) + ":" + (seconds % 60 > 9?"":"0") + seconds % 60;
      }
   });

})(angular);