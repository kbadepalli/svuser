
describe('Create Component', function() {

    let createController;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($componentController){
        localStorage.clear();
        createController = $componentController('create');
    }));

    it('Should be created', function () {
        expect(createController).toBeTruthy();
        expect(createController.existingUser).toBe(null);
    });

    it('Should get existing user from local storage', function () {
        user = {
            fullName:"Smith XXX",
            email:"test@test.com",
            dob:"15/09/2010",
        };

        localStorage.setItem('user', JSON.stringify(user));
        createController.init();
        expect(createController.existingUser).not.toBe(null);
    });

    it('Should save user to local storage on form submit', function () {
        const user = {
            fullName:"Smith XXX",
            email:"test@test.com",
            dob:"15/09/2010",
            address:{geometry:{location:{lat:40,lng:60}}}
        };

        createController.user = user;
        createController.submitForm();
        const savedUser = JSON.parse(localStorage.getItem('user'));
        expect(savedUser).not.toBe(null);
        expect(savedUser.fullName).toEqual("Smith XXX");
        expect(savedUser.address.geometry.location.lat).toEqual(40);
    });

});
