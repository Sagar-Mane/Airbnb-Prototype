/**
 * Created by vedant on 11/26/16.
 */
var propertyManagement = angular.module('propertyManagementapp',[]);
propertyManagement.controller('propertyManagement', function($scope, $http, $window){

    $scope.getAllProperties = function(){
        console.log("The property list gets called");
        $http({
            method:'get',
            url:'/getAllProperties'
        }).success(function(data){
            console.log("Getting all the properties " + data);
            $scope.property=data;
        })

    }


    $scope.sortName = 'firstName';
    $scope.sortReverse = false;

    $scope.unapprovedProperty = function(){
        $http({
            method: 'get',
            url: '/unapprovedProperty',

        }).success(function(data){
            $scope.unapproved = data;
        })
    }


    $scope.approveProperty = function(hostId){
        console.log("property to be approved "+ hostId);
        $http({
            method: 'post',
            url: '/approveProperty',
            data:{
                "_id":hostId
            }
        }).success(function(data){
            console.log(data);
            $window.location.assign('/admin_pendingProperty');

        })
    }


    $scope.getProperty = function(id){
        console.log("getProperty gets called "+id);
        $http({
            method:'post',
            url:'/getProperty',
            data:{
                "_id":id
            }
        }).success(function(data){
            console.log("Getting Property " + data);
            $scope.getProp=data;
        })
    };


    $scope.getPendingProperty = function(id){
        $http({
            method:'post',
            url:'/getPendingProperty',
            data:{
                "_id":id
            }
        }).success(function(data){
            console.log("Getting getPending " + data);
            $scope.getPending=data;
        })
    };

});