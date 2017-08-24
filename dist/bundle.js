'use strict';

(function () {
  angular.module('app', ['ngRoute', 'ngPlacesMap']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/create', {
      template: '<create></create>'
    }).when('/view', {
      template: '<view></view>'
    }).when('/edit', {
      template: '<edit></edit>'
    }).otherwise({
      redirectTo: '/create'
    });

    $locationProvider.html5Mode(true);
  }]);
})();
'use strict';

(function () {
  angular.module('app').component('create', {
    templateUrl: 'create/create.html',
    controller: CreateController,
    controllerAs: 'vm'
  });

  CreateController.$inject = [];

  function CreateController() {
    var vm = this;

    vm.user = {
      fullName: null,
      email: null,
      dob: null,
      address: null
    };
    vm.existingUser = null;
    vm.userSaved = false;

    vm.init = function () {
      vm.existingUser = localStorage.getItem('user');
    };

    vm.submitForm = function () {
      localStorage.setItem('user', JSON.stringify(vm.user));
      vm.userSaved = true;
    };

    vm.customCallbackFunction = function (pickedPlace) {
      vm.user.address = pickedPlace;
    };

    vm.init();
  }
})();
'use strict';

(function () {
    angular.module('app').component('edit', {
        templateUrl: 'edit/edit.html',
        controller: EditController,
        controllerAs: 'vm'
    });

    EditController.$inject = [];

    function EditController() {
        var vm = this;
        vm.user = null;
        vm.init = function () {
            var user = localStorage.getItem('user');
            if (user) {
                vm.user = JSON.parse(user);
                vm.user.dob = new Date(vm.user.dob);
                vm.initAddress = {
                    place_id: vm.user.address.place_id,
                    geometry: {
                        location: {
                            A: vm.user.address.geometry.location.lat,
                            F: vm.user.address.geometry.location.lng
                        }
                    },
                    zoom: 7
                };
            }
        };
        vm.submitForm = function () {
            localStorage.setItem('user', JSON.stringify(vm.user));
        };

        vm.customCallbackFunction = function (pickedPlace) {
            vm.user.address = pickedPlace;
        };

        vm.init();
    }
})();
'use strict';

(function () {
  angular.module('app').component('appHeader', {
    templateUrl: 'header/header.html',
    controller: HeaderController,
    controllerAs: 'vm'
  });

  HeaderController.$inject = ['$rootScope', '$location'];

  function HeaderController($rootScope, $location) {
    var vm = this;
    vm.menu = $location.path().slice(1);

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      vm.menu = $location.path().slice(1);
    });
  }
})();