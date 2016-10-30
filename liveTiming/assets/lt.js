/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

"use strict";

(function (angular) {

	'use strict';

	angular.module("LtApp", ["lt.head", "lt.race", "lt.table", "lt.type", "lt.templates"]).run(['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {
		pollService();

		function pollService() {
			$timeout(pollService, 10000);
			$http.get("proxy/http://www.motogp.com/en/json/live_timing/1").then(function (response) {
				$rootScope.$broadcast("lt.tick.data", response.data.lt);
			});
		}
	}]);
})(angular);
'use strict';

(function (angular) {

   'use strict';

   angular.module("lt.head", []).directive('ltHead', ['$rootScope', function ($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/head/head.html",
         link: function link(scope) {
            $rootScope.$on("lt.tick.data", function (event, data) {
               scope.head = data.head;
            });
         }
      };
   }]).filter("minutes", function () {
      return function (seconds) {
         if (+seconds < 60) {
            return seconds;
         }
         return Math.floor(seconds / 60) + ":" + (seconds % 60 > 9 ? "" : "0") + seconds % 60;
      };
   });
})(angular);
'use strict';

(function (angular) {

   'use strict';

   angular.module("lt.race", []).directive('ltRace', ['$rootScope', function ($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/race/race.html",
         scope: {
            riders: "="
         },
         link: function link(scope) {}
      };
   }]);
})(angular);
'use strict';

(function (angular) {

   'use strict';

   angular.module("lt.table", []).directive('ltTable', ['$rootScope', function ($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/table/table.html",
         scope: {
            riders: "="
         },
         link: function link(scope) {}
      };
   }]).filter('fastest', function () {
      return function (riders) {
         return riders.sort(function (a, b) {
            if (!a.lap_time && !b.lap_time) {
               return 0;
            }

            if (!a.lap_time) {
               return -1;
            }

            if (!b.lap_time) var parts = a.f;
         });
      };
   });
})(angular);
'use strict';

(function (angular) {

   'use strict';

   angular.module("lt.type", []).directive('ltType', ['$rootScope', function ($rootScope) {
      return {
         restrict: 'AE',
         templateUrl: "lt/type/type.html",
         link: function link(scope) {
            $rootScope.$on("lt.tick.data", function (event, data) {
               scope.isRace = data.head && data.head.session_name === "Race";
               scope.riders = [];
               angular.forEach(data.rider, function (rider) {
                  scope.riders.push(rider);
               });
            });
         }
      };
   }]);
})(angular);
angular.module("lt.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("lt/head/head.html","<table class=\"center\">\r\n   <tbody>\r\n      <tr>\r\n         <th>Event</th>\r\n         <td ng-bind=\"head.event_tv_name\"></td>\r\n         <th>Circuit</th>\r\n         <td ng-bind=\"head.circuit_name\"></td>\r\n      </tr>\r\n      <tr>\r\n         <th>Category</th>\r\n         <td ng-bind=\"head.category\"></td>\r\n         <th>Session</th>\r\n         <td ng-bind=\"head.session_name\"></td>\r\n      </tr>\r\n      <tr>\r\n         <th>Duration</th>\r\n         <td ng-bind=\"head.duration\"></td>\r\n         <th>Remaining</th>\r\n         <td>\r\n            <span ng-show=\"head.session_status_id == \'F\'\">Finalized</span>\r\n            <i class=\"fa fa-flag fa-2x\" style=\"color:darkred\" aria-hidden=\"true\" ng-show=\"head.session_status_id == \'I\'\"></i>\r\n            <span ng-bind=\"head.remaining | minutes\" ng-show=\"head.session_status_id != \'F\' && head.remaining\" ></span>\r\n            <i class=\"fa fa-flag-checkered fa-2x\" ng-show=\"head.session_status_id != \'F\' && !head.remaining\" ></i>\r\n         </td>\r\n         <th>Last update</th>\r\n         <td ng-bind=\"head.date_formated\"></td>\r\n      </tr>\r\n   </tbody>\r\n</table>\r\n");
$templateCache.put("lt/race/race.html","<table class=\"center\">\r\n   <thead>\r\n      <th>Pos.</th>\r\n      <th>No.</th>\r\n      <th>Rider</th>\r\n      <th>Team</th>\r\n      <th>Elapsed</th>\r\n      <th>Gap Prev.</th>\r\n      <th>Last Lap</th>\r\n      <th>Laps</th>\r\n      <th>Status</th>\r\n   </thead>\r\n   <tbody>\r\n      <tr ng-repeat=\"rider in riders\" ng-class=\"{fastest: rider.last_lap == rider.num_lap, odd: $odd}\">\r\n         <td>{{$index + 1}}</td>\r\n         <td>{{rider.rider_number}}</td>\r\n         <td>{{rider.rider_name}} {{rider.rider_surname}} </td>\r\n         <td><span ng-show=\"rider.team_name && rider.team_name != \'undefined\'\">{{rider.team_name}}</span></td>\r\n         <td class=\"fixed-width\">\r\n            <span ng-show=\"rider.lap_time && $first\" class=\"lap-time\">{{rider.lap_time}}</span>\r\n            <span ng-hide=\"$first\">{{rider.gap_first}}</span>\r\n         </td>\r\n         <td class=\"fixed-width\"><span ng-hide=\"$first\">{{rider.gap_prev}}</span></td>\r\n         <td class=\"fixed-width\">{{rider.last_lap_time}}</td>\r\n         <td class=\"fixed-width\">{{rider.last_lap}}</td>\r\n         <td style=\"text-align: center;\" ng-class=\"{inpit: rider.status_name != \'CL\', ontrack:  rider.status_name == \'CL\'}\">{{rider.status_name}}</td>\r\n      </tr>\r\n   </tbody>\r\n</table>\r\n");
$templateCache.put("lt/table/table.html","<table class=\"center\">\r\n   <thead>\r\n      <th>Pos.</th>\r\n      <th>No.</th>\r\n      <th>Rider</th>\r\n      <th>Team</th>\r\n      <th>Best Lap</th>\r\n      <th>Gap 1st</th>\r\n      <th>Gap Prev.</th>\r\n      <th>Last Lap</th>\r\n      <th>Laps</th>\r\n      <th>On Track</th>\r\n   </thead>\r\n   <tbody>\r\n      <tr ng-repeat=\"rider in riders\" ng-class=\"{fastest: rider.last_lap == rider.num_lap, odd: $odd}\">\r\n         <td>\r\n            <span ng-show=\"rider.status_name != \'NC\'\">{{$index + 1}}</span>\r\n            <span ng-show=\"rider.status_name == \'NC\'\">NC</span>\r\n         </td>\r\n         <td>{{rider.rider_number}}</td>\r\n         <td>{{rider.rider_name}} {{rider.rider_surname}} </td>\r\n         <td><span ng-show=\"rider.team_name && rider.team_name != \'undefined\'\">{{rider.team_name}}</span></td>\r\n         <td>\r\n            <span ng-show=\"rider.lap_time\" class=\"lap-time\">\r\n               {{rider.lap_time}}\r\n               <span ng-hide=\"rider.num_lap\">({{rider.num_lap}})</span>\r\n            </span>\r\n         </td>\r\n         <td><span ng-hide=\"$first\">{{rider.gap_first}}</span></td>\r\n         <td><span ng-hide=\"$first\">{{rider.gap_prev}}</span></td>\r\n         <td>{{rider.last_lap_time}}</td>\r\n         <td>{{rider.last_lap}}</td>\r\n         <td style=\"text-align: center;\" ng-class=\"{inpit: rider.on_pit, ontrack: !rider.on_pit}\">{{rider.on_pit?\'In\':\'Out\'}}</td>\r\n      </tr>\r\n   </tbody>\r\n</table>\r\n");
$templateCache.put("lt/type/type.html","<div>\r\n   <lt-table ng-if=\"!isRace\" riders=\"riders\"></lt-table>\r\n   <lt-race ng-if=\"isRace\" riders=\"riders\"></lt-race>\r\n</div>");}]);