(function (angular) {

   'use strict';

   angular.module("lt.table", [])

   .directive('ltTable', ['$rootScope', function($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/table/table.html",
         link: function(scope) {
            $rootScope.$on("lt.tick.data", function(event, data) {
               scope.riders = [];
               angular.forEach(data.rider, function(rider) {
                  scope.riders.push(rider);
               });
            });
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