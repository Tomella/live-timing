(function (angular) {

   'use strict';

   angular.module("lt.race", [])

   .directive('ltRace', ['$rootScope', function($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/race/race.html",
         scope: {
            riders: "="
         },
         link: function(scope) {
         }
      };
   }]);

})(angular);