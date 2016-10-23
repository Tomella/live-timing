(function (angular) {

   'use strict';

   angular.module("lt.table", [])

   .directive('ltTable', ['$rootScope', function($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/table/table.html",
         scope: {
            riders: "="
         },
         link: function(scope) {
         }
      };
   }])

   .filter('fastest', function() {
      return function(riders) {
         return riders.sort(function(a, b) {
            if(!a.lap_time && !b.lap_time) {
               return 0;
            }

            if(!a.lap_time) {
               return -1;
            }

            if(!b.lap_time)
            var parts = a.f;
         });
      };
   });

})(angular);