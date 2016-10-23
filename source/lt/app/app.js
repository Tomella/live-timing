(function (angular) {

	'use strict';

	angular.module("LtApp", ["lt.head", "lt.race", "lt.table", "lt.type", "lt.templates"])

	.run(['$http', '$rootScope', '$timeout', function($http, $rootScope, $timeout) {
		pollService();

		function pollService() {
			$timeout(pollService, 10000);
			$http.get("proxy/http://www.motogp.com/en/json/live_timing/1").then(function(response) {
				$rootScope.$broadcast("lt.tick.data", response.data.lt);
			});
		}
	}]);

})(angular);