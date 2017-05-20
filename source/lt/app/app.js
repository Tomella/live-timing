(function (angular) {

	'use strict';

	angular.module("LtApp", ["lt.head", "lt.race", "lt.table", "lt.type", "lt.templates"])

	.run(['$http', '$rootScope', '$timeout', function($http, $rootScope, $timeout) {
		let parameters = UrlParameters.parameters();
      let number = parameters.id ? parameters.id : 103;

      pollService();


		function pollService() {
			$timeout(pollService, 10000);
			$http.get("proxy/http://www.motogp.com/en/json/live_timing/" + number).then(function(response) {
				$rootScope.$broadcast("lt.tick.data", response.data.lt);
			});
		}
	}]);

})(angular);