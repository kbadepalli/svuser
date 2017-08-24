'use strict';

(() => {
  angular.module('app')
  .component('create', {
    templateUrl: 'create/create.html',
    controller: CreateController,
    controllerAs: 'vm'
  });

  CreateController.$inject = [];

  function CreateController() {
    const vm = this;

    vm.user = {
        fullName:null,
        email:null,
        dob:null,
        address:null
    };
    vm.existingUser = null;
    vm.userSaved = false;

      vm.init= function(){
        vm.existingUser = localStorage.getItem('user');
      };

      vm.submitForm = function () {
        localStorage.setItem('user', JSON.stringify(vm.user));
        vm.userSaved = true;
      };

      vm.customCallbackFunction = function( pickedPlace ){
          vm.user.address = pickedPlace;
      };

      vm.init();

  }
})();
