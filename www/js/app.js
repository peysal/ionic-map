// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('map', ['ionic'])

.controller('MapCtrl', function ($scope, $ionicLoading, $compile) {
    function initialize() {
        var myLatlng = new google.maps.LatLng(2.920231, 101.658045);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>**Bye-bye the best office**</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'show me'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        $scope.map = map;
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            var currentLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
            $scope.map.setCenter(currentLatlng);
            var currentMarker = new google.maps.Marker({
                position: currentLatlng,
                map: $scope.map,
                title: 'show me'
            });
            $scope.loading.hide();

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>**So cost cutting ya here**</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });
            google.maps.event.addListener(currentMarker, 'click', function () {
                infowindow.open($scope.map, currentMarker);
            });

        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function () {
        alert('Lets move to cost cutting office')
    };

});
