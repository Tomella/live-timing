(function (angular) {

	'use strict';

	angular.module("lt.type", [])

	.directive('ltHead', ['$rootScope', function($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/type/type.html",
         link: function(scope) {
            $rootScope.$on("lt.tick.data", function(event, data) {
               scope.head = data.head;
            });
         }
      };
	}]);

})(angular);