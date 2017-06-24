var adminManagement = angular.module('adminManagement', []);
adminManagement.controller('admin', function ($scope, $http, $window) {

    $scope.login = function () {

        $http({
            method: "POST",
            url: '/admin_login',
            params: {
                email: $scope.login_email,
                password: $scope.login_password,
            }
        }).success(function (result) {
            $window.location.assign('/admin');
        }, function (err) {
            console.log(err);
            $window.location.assign('/loginSignUp');
        });

    };
    $scope.addAdmin = function () {

        $http({
            method: "POST",
            url: '/admin_add',
            params: {
                email: $scope.email,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                address: $scope.address,
                zip: $scope.zip,
                city: $scope.city,
                state: $scope.state,
                contactNumber: $scope.contactNumber
            }
        }).success(function (result) {
            $window.location.assign('/admin_dashboard');
        }, function (err) {
            console.log(err);

        });

    };


});
