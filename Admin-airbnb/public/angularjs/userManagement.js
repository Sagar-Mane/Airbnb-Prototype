/**
 * Created by vedant on 11/26/16.
 */
var userManagement = angular.module('userManagementapp',[]);



userManagement.controller('userManagement', function ($scope, $http) {


    $scope.getAllUsers = function(){
        console.log("This gets called");
        $http({
            method:'get',
            url:'/getAllUsers'
        }).success(function(data){
            console.log("Getting all the users " + data);
            $scope.user=data;
        })
    };

        $scope.sortName = 'firstName';
        $scope.sortReverse = false;


    $scope.getUser = function(id){
        console.log("getUser gets called "+id);
        $http({
            method:'post',
            url:'/getUser',
            data:{
                "_id":id
            }
        }).success(function(data){
            console.log(data);
            $scope.a=data;
        })
    };


    });