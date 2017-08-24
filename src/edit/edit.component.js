'use strict';

(() => {
    angular.module('app')
        .component('edit', {
            templateUrl: 'edit/edit.html',
            controller: EditController,
            controllerAs: 'vm'
        });

    EditController.$inject = [];

    function EditController() {
        const vm = this;
        vm.user = null;
        vm.init= function(){
            const user = localStorage.getItem('user');
            if(user) {
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
            localStorage.setItem('user', JSON.stringify(vm.user))
        };

        vm.customCallbackFunction = function( pickedPlace ){
            vm.user.address = pickedPlace;
        };

        vm.init();

    }
})();
