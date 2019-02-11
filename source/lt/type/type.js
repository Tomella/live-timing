{
	angular.module("lt.type", [])

	.directive('ltType', ['$rootScope', function($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/type/type.html",
         link: function(scope) {
            $rootScope.$on("lt.tick.data", function(event, data) {
               scope.isRace = data.head && data.head.session_name === "Race";
               scope.riders = [];
               angular.forEach(data.rider, function(rider) {
                  scope.riders.push(rider);
               });
            });
         }
      };
	}]);
}