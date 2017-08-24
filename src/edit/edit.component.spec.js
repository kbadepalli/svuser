
describe('Edit Component', function() {

    let editController;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($componentController){
        localStorage.clear();
        editController = $componentController('edit');
    }));

    it('Should be created', function () {
        expect(editController).toBeTruthy();
        expect(editController.user).toBe(null);
    });

    it('Should get the user from local storage', function () {
        const user = {
            fullName:"Smith XXX",
            email:"test@test.com",
            dob:"15/09/2010",
            address:{place_id:'abc', geometry:{location:{lat:40,lng:60}}}
        };
        localStorage.setItem('user', JSON.stringify(user));
        editController.init();
        expect(editController.user).not.toBe(null);
    });
    it('Should update user to local storage on form submit', function () {
        const user = {
            fullName:"Smith X",
            email:"test@test.com",
            dob:"15/09/2010",
            address:{geometry:{location:{lat:40,lng:60}}}
        };
        editController.user = user;
        editController.submitForm();
        const savedUser = JSON.parse(localStorage.getItem('user'));
        expect(savedUser).not.toBe(null);
        expect(savedUser.fullName).toEqual("Smith X");
        expect(savedUser.address.geometry.location.lat).toEqual(40);
    });

});
