/**
 * Created by vedant on 11/26/16.
 */
/**
 * Created by vedant on 11/26/16.
 */
var hostManagement = angular.module('hostManagementapp',[]);
hostManagement.controller('hostManagement', function($scope, $http, $window){

    $scope.getAllHosts = function(){
        console.log("The Host list gets called");
        $http({
            method:'get',
            url:'/getAllHosts'
        }).success(function(data){
            console.log("Getting all the hosts " + data);
            $scope.host=data;
        })

    }

    $scope.sortName = 'firstName';
    $scope.sortReverse = false;


    $scope.unapprovedHost = function(){
        $http({
            method: 'get',
            url: '/unapprovedHost'
        }).success(function(data){
            console.log(data);
            $scope.unapprovedhost = data;
        })
    }


    $scope.approveHost = function(hostId){
        console.log("user to be approved "+ hostId);
        $http({
            method: 'post',
            url: '/approveHost',
            data:{
                "_id":hostId
            }
        }).success(function(data){
            console.log(data);
            $window.location.assign('/admin_pendingHost');

           // $scope.approveHost = data;

        })
    }


    $scope.getHost = function(id){
        console.log("getHost gets called "+id);
        $http({
            method:'post',
            url:'/getHost',
            data:{
                "_id":id
            }
        }).success(function(data){
            console.log("Getting host " + data);
            $scope.a=data;
        })
    };


    $scope.getPendingHost = function(id){
        console.log("getPendingHost gets called "+id);
        $http({
            method:'post',
            url:'/getPendingHost',
            data:{
                "_id":id
            }
        }).success(function(data){
            console.log("Getting Pending host " + data);
            $scope.getPendingHost=data;
        })
    };

});

