/**
 * Created by vicky on 11/20/2016.
 */
/**
 * http://usejsdoc.org/
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function toDate(dateStr) {
    var parts = dateStr.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

var app = angular.module('App', ['ngFileUpload']);

app.factory('Data', function ($window) {


    return {
        getData: function () {
            return $window.sessionStorage.getItem("Data");
        },
        setData: function (data) {
            $window.sessionStorage.setItem("Data", JSON.stringify(data));
        },
        clearData: function () {
            $window.sessionStorage.clear();
        },

    };
});

app.controller('authentication_controller', function ($scope, $window, $location, $http) {

    $scope.checkLogin = function () {

        var email_id = $scope.email_id;
        var pwd = $scope.password;
        var d = {email_id: email_id, password: pwd};
        $http.post('/signin', d)
            .success(function (data) {
                if (data.success) {
                    $window.location.href = "/";
                    $scope.isWrongCredential = false;
                } else {
                    // $window.location.href = "/login";
                    $scope.isWrongCredential = true;
                }
            })
            .error(function (data) {
                $scope.isWrongCredential = true;
            });
    };

    $scope.registerUser = function () {

        var email_id = $scope.email;
        var pwd = $scope.password;
        var first_name = $scope.first_name;
        var last_name = $scope.last_name;
        if (email_id && pwd && first_name) {
            var d = {email_id: email_id, password: pwd, first_name: first_name, last_name: last_name};
            $http.post('/registerUser', d)
                .success(function (data) {
                    if (data.success) {
                        $window.location.href = "/";
                        $scope.isUserExist = false;
                    } else {
                        $scope.isUserExist = true;
                    }
                })
                .error(function (data) {
                    $scope.isUserExist = true;
                });
        }

    };


});

app.controller('account_user_management', function ($scope, $window, $location, $http) {
    //security code
    $scope.rockerSa = false;
    $scope.rockerSb = true;
    $scope.rockerSo = false;
    $scope.check = function () {
        if ($scope.new_password != $scope.cpassword) {
            $scope.rockerSa = true;
            $scope.rockerSb = false;
        } else {
            $scope.rockerSa = false;
            $scope.rockerSb = true;
        }
    }
    $scope.updatePassword = function () {
        $http({
            method: "POST",
            url: '/updatePassword',
            params: {
                old_password: $scope.old_password,
                new_password: $scope.new_password
            }
        }).success(function (result) {
            if (result == "valid") {
                $scope.rockerSo = false;
                $scope.alert1 = true;
                $window.location.assign('/Account_Security');
            } else if (result == "invalid") {
                $scope.alert1 = false;
                $scope.rockerSo = true;
            }
            console.log("password update API working");
        }).error(function (err) {
            console.log(err);
        })
    }

    //payment code
    $scope.alert2 = false;
    $scope.paymentInit = function () {
        $http({
            method: "GET",
            url: "/cardDetails",
        }).success(function (result) {
            $scope.cname = result[0].firstName + " " + result[0].lastName;
            $scope.cnum = result[0].cardNumber;
            $scope.ccv = result[0].cvv;
            var x = result[0].expDate.split("/");
            $scope.expMonth = x[0];
            $scope.expiryYear = x[1];
        }).error(function (err) {
            console.log(err);
        });
    };

    $scope.creditCard = function () {
        console.log($scope.ccv, $scope.cnum, $scope.expMonth, $scope.expYear);
        $http({
            method: "POST",
            url: '/paymentMethodUpdate',
            params: {
                cvv: $scope.ccv,
                cno: $scope.cnum,
                expm: $scope.expMonth,
                expy: $scope.expYear
            }
        }).success(function (result) {
            if (result == "OK") {
                $scope.alert2 = true;
            }
        }).error(function (err) {
            console.log(err);
        })
    }

    //transaction code
    $scope.transactionInit = function () {
        $http({
            method: "GET",
            url: '/payinTransaction',
            params: {}
        }).success(function (result) {
            $scope.payin = result;

        }).error(function (err) {
            console.log(err);
        });

        $http({
            method: "GET",
            url: '/payoutTransaction',
            params: {}
        }).success(function (result) {
            $scope.payout = result;
        }).error(function (err) {
            console.log(err);
        });
    }
});

app.controller('editUser_controller', function ($scope, $window, $location, $http) {
    $scope.loadEditProfilePage = function () {
        $scope.success_model = false;
        $http.post('/loadEditUserPage')
            .success(function (data) {
                if (data.statusCode == 200) {
                    $scope.user = data.data;
                }
                else {
                    console.log("Error in loading edit profile page");
                }
            })
            .error(function (data) {
            });
    };

    $scope.uploadProfileImage = function () {
        console.log("upload profile image ::");
        var file = $scope.profileImage;
        var uploadUrl = "/uploadProfileImage";
        //fileUpload.uploadFileToUrl(file, uploadUrl);

        $http.post('/uploadProfileImage', file, {'enctype': "multipart/form-data"})
            .success(function (data) {
                console.log("Uploaded");
            })
            .error(function (data) {
                console.log("Not upoaded");
            });
    };

    $scope.saveUserData = function () {

        init();
        console.log("After update");
        console.log($scope.user);
        var validate = true;

        if ($scope.user.firstName == undefined || $scope.user.firstName == "") {
            validate = false;
            $scope.first_invalid = true;
        }

        if ($scope.user.lastName == undefined || $scope.user.lastName == "") {
            validate = false;
            $scope.last_invalid = true;
        }

        if ($scope.user.address == undefined || $scope.user.address == "") {
            validate = false;
            $scope.address_invalid = true;
        }

        if ($scope.user.city == undefined || $scope.user.city == "") {
            validate = false;
            $scope.city_invalid = true;
        }

        if ($scope.user.state == undefined || $scope.user.state == "") {
            validate = false;
            $scope.state_invalid = true;
        }

        if ($scope.user.zip == undefined || $scope.user.zip == "") {
            validate = false;
            $scope.pin_invalid = true;
        }

        if ($scope.user.email == undefined || $scope.user.email == "") {
            validate = false;
            $scope.email_invalid = true;
        }

        if (validate == false) {
            return;
        }

        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test($scope.user.zip);

        if (isValidZip) {
        }
        else {
            $scope.pin_wrong = true;
            validate = false;
        }


        if (validate) {

            $http({
                method: "POST",
                url: '/editUser',
                data: {
                    "firstName": $scope.user.firstName,
                    "lastName": $scope.user.lastName,
                    "address": $scope.user.address,
                    "city": $scope.user.city,
                    "state": $scope.user.state,
                    "zip": $scope.user.zip,
                    "email": $scope.user.email
                }
            }).success(function (data) {

                if (data.statusCode == 401) {
                    console.log("status code 401");
                    $scope.fail_model = true;
                }
                else {
                    console.log("statuscode 200");
                    $scope.success_model = true;

                }
            }).error(function (error) {
                console.log(error);
            });

        }
        else {
            console.log("Non Valdate");
        }

    };


    $scope.loadProfilePhotoPage = function () {


        $http.post('/loadProfilePhotoPage')
            .success(function (data) {
                if (data.statusCode == 200) {

                    $scope.user = data.data;
                    console.log("Data is :")
                    console.log($scope.user);

                }
                else {

                    console.log("Error in loading profile photo page");
                }
            })
            .error(function (data) {

            });


    };


    function init() {

        $scope.ccv_invalid = false;
        $scope.ccv_wrong = false;
        $scope.expdate_invalid = false;
        $scope.expdate_wrong = false;
        $scope.ccnumber_invalid = false;
        $scope.ccnumber_wrong = false;
        $scope.phone_invalid = false;
        $scope.phone_wrong = false;
        $scope.pin_invalid = false;
        $scope.pin_wrong = false;
        $scope.city_invalid = false;
        $scope.state_invalid = false;
        $scope.address_invalid = false;
        $scope.last_invalid = false;
        $scope.first_invalid = false;
        $scope.bdate_invalid = false;
        $scope.fail_model = false;
        $scope.success_model = false;

    }


});


app.controller('review_controller', function ($scope, $window, $location, $http) {

    console.log("in review controller");

    $scope.loadReviewAboutPage = function () {

        $http.post('/loadReviewAboutPage')
            .success(function (data) {
                if (data.statusCode = 200) {
                    $scope.fromHostReview = data.data.fromHostReview;
                    $scope.fromUserReview = data.data.fromUserReview;
                } else {
                    console.log("Error in getting review");
                }
            })
            .error(function (data) {
                console.log(data);
            });
    };

    $scope.loadReviewByPage = function () {

        $http.post('/loadReviewByPage')
            .success(function (data) {
                if (data.statusCode = 200) {
                    $scope.toUserReview = data.data.toUserReview;
                    $scope.toHostReview = data.data.toHostReview;
                } else {
                    console.log("Error in getting review");
                }
            })
            .error(function (data) {
                console.log(data);
            });
    };
});
app.controller('search-page', ['$scope', '$http', '$compile', '$filter', function ($scope, $http, $compile, $filter) {

    $scope.current_date = new Date();
    $scope.totalPages = 0;
    $scope.currentPage = 1;
    $scope.range = [];

    function no_results() {
        if ($('.search-results').hasClass('loading'))
            $('#no_results').hide();
        else
            $('#no_results').show();
    }

    var location1 = getParameterByName('location');


    var current_url = (window.location.href).replace('/search', '/searchResult');


    $(document).ready(function () {
        localStorage.removeItem("map_lat_long");
        var room_type = [];
        $('.room-type:checked').each(function (i) {
            room_type[i] = $(this).val();
        });


        $('.search-results').addClass('loading');
        no_results();
        $http.get(current_url).then(function (response) {
            // $scope.room_result = response;
            $('.search-results').removeClass('loading');
            no_results();
            $scope.room_result = response.data;
            $scope.totalPages = response.data.last_page;
            $scope.currentPage = response.data.current_page;
            $scope.checkin = getParameterByName("checkin");
            $scope.checkout = getParameterByName("checkout");
            $scope.guests = getParameterByName("guests");
            $scope.room_type = getParameterByName("room_type");
            var room_type = getParameterByName("room_type").split(',');

            for (var i = 0; i < room_type.length; i++) {
                switch (room_type[i]) {
                    case "Entire home/apt":
                        $scope.room_type_1 = true;
                        break;
                    case "Private room":
                        $scope.room_type_2 = true;
                        break;
                    case "Shared room":
                        $scope.room_type_3 = true;
                        break;
                    default:
                        $scope.room_type_1 = false;
                        $scope.room_type_2 = false;
                        $scope.room_type_3 = false;

                }
            }
            initialize(response.data);

//            marker(response.data);
        });
        var location_val = $("#location").val();
        $("#header-search-form").val(location_val);

    });


    function initialize(response) {

        var latitude = $("#lat").val();
        var longitude = $("#long").val();

        var myOptions = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

        setMarkers(map, response)
        // marker(map,response);

    }

    function setMarkers(map, response) {

        var marker;
        var data = response.data;
        var guests = 1;
        for (var i = 0; i < data.length; i++) {

            var name = data[i].name;
            var lat = Number(data[i].rooms_address.latitude);
            var lon = Number(data[i].rooms_address.longitude);
            var labelTxt = "$" + data[i].rooms_price.night;
            latlngset = new google.maps.LatLng(lat, lon);

            /*
             var image = {
             url: 'images/locate-pin.png',
             size: new google.maps.Size(32, 32),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(0, 32)
             };
             var shape = {
             coords: [1, 1, 1, 20, 18, 20, 18, 1],
             type: 'poly'
             };
             */

            var marker = new MarkerWithLabel({
                position: latlngset,
                map: map,
                labelContent: labelTxt,
                labelAnchor: new google.maps.Point(18, 65),
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
                icon: pinSymbol("red")
            });

            map.setCenter(marker.getPosition());

            var html = '<div id="info_window_' + data[i].id + '" class="listing listing-map-popover" data-price="' + data[i].rooms_price.currency.symbol + '" data-id="' + data[i].id + '" data-user="' + data[i].user_id + '"  data-name="' + data[i].name + '" data-lng="' + data[i].rooms_address.longitude + '" data-lat="' + data[i].rooms_address.latitude + '"><div class="panel-image listing-img">';
            html += '<a class="media-photo media-cover" target="listing_' + data[i].id + '" ><div class="listing-img-container media-cover text-center"><img id="marker_image_' + data[i].id + '" rooms_image = "" alt="' + data[i].name + '" class="img-responsive-height" data-current="0" src="' + APP_URL + '/images/' + data[i].photo_name + '"></div></a>';
            html += '<a class="link-reset panel-overlay-bottom-left panel-overlay-label panel-overlay-listing-label" target="listing_' + data[i].id + '" ><div>';

            var instant_book = '';

            if (data[i].booking_type == 'instant_book')
                instant_book = '<span aria-label="Book Instantly" data-behavior="tooltip" class="h3 icon-beach"><i class="icon icon-instant-book icon-flush-sides"></i></span>';

            html += '<sup class="h6 text-contrast">' + data[i].rooms_price.currency.symbol + '</sup><span class="h3 text-contrast price-amount">' + data[i].rooms_price.night + '</span><sup class="h6 text-contrast"></sup>' + instant_book + '</div></a></div>';
            html += '<div class="panel-body panel-card-section"><div class="media"><h3 class="h5 listing-name text-truncate row-space-top-1" itemprop="name" title="' + data[i].name + '">' + name + '</a></h3>';

            var star_rating = '';

            if (data[i].overall_star_rating != '')
                star_rating = ' · ' + data[i].overall_star_rating;

            var reviews_count = '';
            var review_plural = (data[i].reviews_count > 1) ? 's' : '';

            if (data[i].reviews_count != 0)
                reviews_count = ' · ' + data[i].reviews_count + ' review' + review_plural;

            html += '<div class="text-muted listing-location text-truncate" itemprop="description"><a class="text-normal link-reset" >' + data[i].room_type_name + star_rating + reviews_count + '</a></div></div></div></div>';

            createInfoWindow(marker, html, map);

        }
    }

    function pinSymbol(color) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 2,
            scale: 2
        };
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function setGetParameter(paramName, paramValue) {
        var url = window.location.href;

        if (url.indexOf(paramName + "=") >= 0) {
            var prefix = url.substring(0, url.indexOf(paramName));
            var suffix = url.substring(url.indexOf(paramName));
            suffix = suffix.substring(suffix.indexOf("=") + 1);
            suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
            url = prefix + paramName + "=" + paramValue + suffix;
        }
        else {
            if (url.indexOf("?") < 0)
                url += "?" + paramName + "=" + paramValue;
            else
                url += "&" + paramName + "=" + paramValue;
        }
        history.pushState(null, null, url);
    }

    function createInfoWindow(marker, popupContent, map) {
        infoBubble = new InfoBubble({
            maxWidth: 3000
        });

        var contentString = $compile(popupContent)($scope);
        google.maps.event.addListener(marker, 'click', function () {

            if (infoBubble.isOpen()) {
                infoBubble.close();
                infoBubble = new InfoBubble({
                    maxWidth: 3000
                });
            }

            infoBubble.addTab('', contentString[0]);

            var borderRadius = 0;
            infoBubble.setBorderRadius(borderRadius);
            var maxWidth = 300;
            infoBubble.setMaxWidth(maxWidth);

            var maxHeight = 300;
            infoBubble.setMaxHeight(maxHeight);
            var minWidth = 282;
            infoBubble.setMinWidth(minWidth);

            var minHeight = 245;
            infoBubble.setMinHeight(minHeight);

            infoBubble.open(map, marker);
        });
    }

    $scope.apply_filter = function () {
        $scope.search_result();
    };


    $scope.search_result = function () {

        var room_type = [];
        $('.room-type:checked').each(function (i) {
            room_type[i] = $(this).val();
        });
        //alert(room_type);
        if (room_type == '') {
            $('.room-type_tag').addClass('hide');
        }

        var checkin = $('#checkin').val();
        var checkout = $('#checkout').val();
        var guest_select = $("#guest-select").val();

        setGetParameter('room_type', room_type);
        setGetParameter('checkin', checkin);
        setGetParameter('checkout', checkout);
        setGetParameter('guests', guest_select);


        var location1 = getParameterByName('location');

        $('.search-results').addClass('loading');
        no_results();
        var change_url = "/search?";
        change_url += "location=" + location1 + "&";
        change_url += "room_type=" + room_type + "&";
        change_url += "checkin=" + checkin + "&";
        change_url += "checkout=" + checkout + "&";
        change_url += "guests=" + guest_select;
        var encoded_url = encodeURI(change_url);
        window.location.href = encoded_url;

    };

    $(document).on('click', '.rooms-slider', function () {
        var rooms_id = $(this).attr("data-room_id");
        var img_url = $("#rooms_image_" + rooms_id).attr("src").substr(29);
        var room;
        for (var i = 0; i < $scope.room_result.data.length; i++) {
            var temp = $scope.room_result.data[i];
            if (temp.id === rooms_id) {
                room = temp;
                break;
            }
        }
        var images = room.images;
        if ($(this).is(".target-prev") == true) {
            var set_img_url = (images) ? ((images.indexOf(img_url) === images.length - 1) ? images[0] : images[images.indexOf(img_url) + 1]) : "";
            set_img_url = APP_URL + "/images/" + set_img_url;
            $("#rooms_image_" + rooms_id).attr("src", set_img_url);
        } else {
            var set_img_url = (images) ? ((images.indexOf(img_url) === 0) ? images[images.length - 1] : images[images.indexOf(img_url) - 1]) : "";
            set_img_url = APP_URL + "/images/" + set_img_url;
            $("#rooms_image_" + rooms_id).attr("src", set_img_url);
        }
    });
}])

app.controller('room_details_controller', function ($scope, $window, $location, $http) {
    var room_id = getParameterByName('propertyId');
    $scope.checkin = getParameterByName("checkin");
    $scope.checkout = getParameterByName("checkout");
    $scope.guests = getParameterByName("guests");
    var url = "/detail?propertyId=" + room_id;
    $http.get(url).then(function (response) {
        $scope.room_result = response.data;
        document.title = $scope.room_result.name;
        $scope.video_url = "videos/" + $scope.room_result.video_url;
        url = "/hostReviewsCount?hostId=" + $scope.room_result.users.id;
        $http.get(url).then(function (response) {
            $scope.hostReviews = response.data;
        });
    });

    $scope.placeBid = function () {
        $http
        ({
            method: 'POST',
            url: '/updateBasePrice',
            data: {
                "propertyId": $scope.room_result.id,
                "maxBidPrice": $scope.bidAmount,
                "hostId": $scope.room_result.users.id
            }
        }).success(function (data) {
            if (data.code == 200) {
                $scope.room_result.rooms_price.night = $scope.bidAmount;
                $window.location.href = "/";
            }
        });
    }

    $scope.book = function () {

        $scope.alert=false;
        if(($scope.checkin != "") && ($scope.checkout != "")) {


            var days = daydiff(toDate($scope.checkin), toDate($scope.checkout));
            var change_url = "/getPaymentPage?";
            change_url += "propertyId=" + $scope.room_result.id + "&";
            change_url += "checkin=" + $scope.checkin + "&";
            change_url += "checkout=" + $scope.checkout + "&";
            change_url += "guests=" + $scope.guests + "&";
            change_url += "nights=" + days;
            window.location.href = change_url;
        }
        else{
            $scope.alert=true;
        }
    };

    function daydiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    $(document).on('click', '.rooms-slider', function () {
        var rooms_id = $(this).attr("data-room_id");
        var img_url = $("#rooms_image_" + rooms_id).attr("src").substr(29);

        console.log($scope.room_result);

        var images = $scope.room_result.images;
        if ($(this).is(".target-prev") == true) {
            var set_img_url = (images) ? ((images.indexOf(img_url) === images.length - 1) ? images[0] : images[images.indexOf(img_url) + 1]) : "";
            set_img_url = APP_URL + "/images/" + set_img_url;
            $("#rooms_image_" + rooms_id).attr("src", set_img_url);
        } else {
            var set_img_url = (images) ? ((images.indexOf(img_url) === 0) ? images[images.length - 1] : images[images.indexOf(img_url) - 1]) : "";
            set_img_url = APP_URL + "/images/" + set_img_url;
            $("#rooms_image_" + rooms_id).attr("src", set_img_url);
        }
    });
});


app.controller('payment_controller', function ($scope, $window, $location, $http) {

    var propertyId = getParameterByName("propertyId");
    var guest = getParameterByName("guests");
    var checkin = getParameterByName("checkin");
    var checkout = getParameterByName("checkout");
    var totalperday;
    var days = getParameterByName("nights");

    $scope.loadPaymentPage = function () {
        $http.post('/loadPaymentPage')
            .success(function (data) {
                if (data.statusCode == 200) {
                    var user = data.data;
                    $scope.cardNumber = user.cardNumber;
                    $scope.cvv = user.cvv;
                    $scope.firstName = user.firstName;
                    $scope.lastName = user.lastName;
                    $scope.zip = user.zip;
                    var ccDate = user.expDate.split("/");
                    $scope.expMonth = ccDate[0];
                    $scope.expYear = ccDate[1];
                } else {
                    console.log("Error occured to get data");
                }
            })
            .error(function (data) {
                console.log(data);
            });

        $http({
            method: "POST",
            url: '/getPropertyDetails',
            data: {
                "propertyId": propertyId
            }
        }).success(function (data) {
            if (data.statusCode == 200) {

                console.log("PROPPERTY");
                console.log(data.data);
                var property = data.data;
                totalperday = property.price;
                $scope.hostId = property.hostId._id;
                $scope.propertName = property.name;
                $scope.location = property.city + ", " + property.state + ", " + property.country;
                $scope.guest = guest;
                $scope.checkin = checkin;
                $scope.checkout = checkout;
                $scope.totalperday = totalperday;
                $scope.days = days;
                $scope.imageUrl = property.mediaId.imageUrl[0];
            }
        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.confirmBooking = function () {
        $scope.card_wrong = false;
        $scope.dates_wrong = false;
        $scope.cvv_wrong = false;

        var cardnumber = $scope.cardNumber;
        var expMonth = $scope.expMonth;
        var expYear = $scope.expYear;
        var cvv = $scope.cvv;
        var guest1 = guest;
        var checkin1 = checkin;
        var checkout1 = checkout;
        var properyId1 = propertyId;
        var price = totalperday;
        var days1 = days;
        var hostId = $scope.hostId;

        var date = new Date();
        var currMonth = date.getMonth();
        var currYear = date.getFullYear();
        var check = false;


        if (expYear > currYear) {
            check = true;
        } else if (expYear == currYear) {
            if (expMonth >= currMonth)
                check = true;
            else
                $scope.dates_wrong = true;
        } else {
            $scope.dates_wrong = true;
        }

        if (!validateCardNumber(cardnumber)) {
            $scope.card_wrong = true;
        }

        if (!validateCCV(cvv)) {
            $scope.cvv_wrong = true;
        }

        if (check && validateCardNumber(cardnumber) && validateCCV(cvv)) {
            $http({
                method: "POST",
                url: '/confirmBooking',
                data: {
                    "propertyId": properyId1,
                    "cardNumber": cardnumber,
                    "expMonth": expMonth,
                    "expYear": expYear,
                    "cvv": cvv,
                    "guest": guest1,
                    "checkin": checkin1,
                    "checkout": checkout1,
                    "price": price,
                    "days": days1,
                    "hostId": hostId
                }
            }).success(function (data) {
                if (data.statusCode == 200) {
                    window.location.href = '/yourTrips';
                }
            }).error(function (error) {
                console.log(error);
            });
        }
    };

    function validateCardNumber(number) {
        var regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(number))
            return false;
        return true;
    }

    function validateCCV(number) {
        var regex = new RegExp("^[0-9]{3}$");
        if (!regex.test(number))
            return false;
        return true;
    }
});


app.controller('itinerary_controller', function ($scope, $http, $window) {

    var tripId = getParameterByName("tripId");
    $http.post('/itinerary', {tripId: tripId})
        .success(function (data) {
            console.log(data);
            var info = data.data;
            $scope.trips = info.trip;
            $scope.bills = info.bill;
        })
        .error(function (data) {
            console.log(data);
        });
});

app.controller('addListing_controller', function ($scope, $http, Data, $window, Upload) {

    $scope.formData = Data.getData();
    console.log($scope.formData);
    var address = JSON.parse($scope.formData).address.split(",");
    Data.clearData();
    $scope.address_1 = address[0];
    $scope.city = address[address.length - 3];
    $scope.state = address[address.length - 2];
    $scope.country = address[address.length - 1];
    $scope.photosDiv = true;
    $scope.locationDiv = true;
    $scope.pricingDiv = true;
    $scope.calendarDiv = true;
    $scope.basicsDiv = false;
    $scope.descriptionDiv = true;
    $scope.photoP = true;
    $scope.videoDisp = true;
    $scope.alertimages = false;
    $scope.alertvideo = false;

    $scope.photosList = [];

    $scope.biddingChange = function () {
        if ($scope.bidding == true) {
            $scope.biddingDiv = false;
        } else {
            $scope.biddingDiv = true;
        }

    }

    $scope.loadPhotos = function () {
        $scope.photoP = false;
    }

    $scope.loadVideo = function () {
        console.log($scope.video);
        $scope.videoDisp = false;
    }

    $scope.selectBasicsDiv = function () {
        $scope.basicsDiv = false;
        $scope.locationDiv = true;
        $scope.photosDiv = true;
        $scope.descriptionDiv = true;
        $scope.pricingDiv = true;
        $scope.calendarDiv = true;
    };

    $scope.selectLocationDiv = function () {
        $scope.basicsDiv = true;
        $scope.locationDiv = false;
        $scope.photosDiv = true;
        $scope.descriptionDiv = true;
        $scope.pricingDiv = true;
        $scope.calendarDiv = true;
    };

    $scope.selectDescriptionDiv = function () {
        $scope.basicsDiv = true;
        $scope.locationDiv = true;
        $scope.photosDiv = true;
        $scope.descriptionDiv = false;
        $scope.pricingDiv = true;
        $scope.calendarDiv = true;
    };

    $scope.selectPhotosDiv = function () {
        $scope.basicsDiv = true;
        $scope.locationDiv = true;
        $scope.photosDiv = false;
        $scope.descriptionDiv = true;
        $scope.pricingDiv = true;
        $scope.calendarDiv = true;
    };

    $scope.selectPricingDiv = function () {

        $scope.basicsDiv = true;
        $scope.locationDiv = true;
        $scope.photosDiv = true;
        $scope.descriptionDiv = true;
        $scope.pricingDiv = false;
        $scope.calendarDiv = true;
    };

    $scope.selectCalendarDiv = function () {
        $scope.basicsDiv = true;
        $scope.locationDiv = true;
        $scope.photosDiv = true;
        $scope.descriptionDiv = true;
        $scope.pricingDiv = true;
        $scope.calendarDiv = false;
    };

    $scope.addNewListing = function () {
        console.log($scope.photosList);
        console.log($scope.videoUrl);
        $http
        ({
            method: 'POST',
            url: '/addNewListing',
            data: {
                "media": $scope.photosList,
                "video": $scope.videoUrl,
                "maxGuest": JSON.parse($scope.formData).accommodates,
                "roomType": JSON.parse($scope.formData).roomType,
                "propertyType": JSON.parse($scope.formData).roomType,
                "address": $scope.address_1,
                "city": $scope.city,
                "state": $scope.state,
                "country": $scope.country,
                "zipCode": $scope.pinCode,
                "bedrooms": $scope.bedrooms,
                "beds": $scope.beds,
                "bathrooms": $scope.bathrooms,
                "name": $scope.name,
                "description": $scope.summary,
                "price": $scope.base_price,
                "latitude": JSON.parse($scope.formData).latitude,
                "longitude": JSON.parse($scope.formData).longitude,
                "createdDate": Date.now(),
                "isApproved": false,
                "isBidding": $scope.bidding,
                "startDate": ($scope.bidding === true && $scope.startDate) ? toDate($scope.startDate).getTime() : 0,
                "endDate": ($scope.bidding === true && $scope.startDate) ? toDate($scope.endDate).getTime() : 0
            }
        }).success(function (data) {
            if (data.result.statusCode == 200) {
                $window.location.assign("yourListings");
            }
        });
    }

    /*Images upload*/
    $scope.submitImages = function () {
        if ($scope.images) {
            $scope.uploadImages($scope.images);
        }
    };

    // upload on file select
    $scope.uploadImages = function (files) {
        $scope.alertimages = false;
        for (var i = 0; i < files.length; i++) {
            Upload.upload({
                url: '/uploadImage',
                data: {
                    file: files[i]
                }
            }).then(function (resp) {
                $scope.photosList.push(resp.data.url);
                $scope.alertimages = true;
            }, function (resp) {
                console.log('Error status: ' + resp.statusCode);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
    };

    /*Video upload*/
    $scope.submitVideo = function () {
        if ($scope.video) {
            $scope.uploadVideo($scope.video);
        }
    };

    // upload on file select
    $scope.uploadVideo = function (file) {
        $scope.alertvideo = false;
        Upload.upload({
            url: '/uploadVideo',
            data: {
                file: file
            }
        }).then(function (resp) {
            $scope.videoUrl = resp.data.url;
            $scope.alertvideo = true;
        }, function (resp) {
            console.log('Error status: ' + resp.statusCode);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});

app.controller('addProperty_controller', function ($scope, $http, Data, $window) {

    $scope.accommodates_value = 1;
    $scope.city_show = false;
    var i = 0;

    $scope.city_rm = function () {
        $scope.city_show = false;
    };

    $scope.property_type = function (id, name, icon) {
        $scope.property_type_id = id;
        $scope.selected_property_type = name;
        $scope.property_type_icon = icon;
        $('.fieldset_property_type_id .active-selection').css('display', 'block');
    };

    $scope.property_type_rm = function () {
        $scope.property_type_id = '';
        $scope.selected_property_type = '';
        $scope.property_type_icon = '';
    };

    $scope.property_change = function (value) {
        $scope.property_type_id = value;
        $scope.selected_property_type = $('#property_type_dropdown option:selected').text();
        $scope.property_type_icon = $('#property_type_dropdown option:selected').attr('data-icon-class');
        $('.fieldset_property_type_id .active-selection').css('display', 'block');
    };

    $scope.room_type = function (id, name, icon) {
        $scope.room_type_id = id;
        $scope.selected_room_type = name;
        $scope.room_type_icon = icon;
        $('.fieldset_room_type .active-selection').css('display', 'block');
    };

    $scope.room_type_rm = function () {
        $scope.room_type_id = '';
        $scope.selected_room_type = '';
        $scope.room_type_icon = '';
    };
    $scope.room_change = function (value) {
        $scope.room_type_id = value;
        $scope.selected_room_type = $('#room_type_dropdown option:selected').text();
        $scope.room_type_icon = $('#room_type_dropdown option:selected').attr('data-icon-class');
        $('.fieldset_room_type .active-selection').css('display', 'block');
    };

    $scope.change_accommodates = function (value) {
        $scope.selected_accommodates = value;
        $('.fieldset_person_capacity .active-selection').css('display', 'block');
        i = 1;
    };

    $scope.accommodates_rm = function () {
        $scope.selected_accommodates = '';
    };

    $scope.city_click = function () {
        if (i == 0)
            $scope.change_accommodates(1);
    };

    initAutocomplete(); // Call Google Autocomplete Initialize Function

// Google Place Autocomplete Code

    var autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        country: 'short_name',
        postal_code: 'short_name'
    };

    function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('location_input'));
        autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
        $scope.city = '';
        $scope.state = '';
        $scope.country = '';

        var place = autocomplete.getPlace();

        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];

                if (addressType == 'street_number')
                    $scope.street_number = val;
                if (addressType == 'route')
                    $scope.route = val;
                if (addressType == 'postal_code')
                    $scope.postal_code = val;
                if (addressType == 'locality')
                    $scope.city = val;
                if (addressType == 'administrative_area_level_1')
                    $scope.state = val;
                if (addressType == 'country')
                    $scope.country = val;
            }
        }
        var address = $('#location_input').val();
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

        $scope.address = address;
        $scope.city_show = true;
        $scope.latitude = latitude;
        $scope.longitude = longitude;
        $scope.$apply();
        $('.fieldset_city .active-selection').css('display', 'block');
    }

    $scope.saveFormData = function () {
        var data =
        {
            "accommodates": $scope.accommodates_value,
            "roomType": $scope.selected_room_type,
            "propertyType": $scope.selected_property_type,
            "address": $scope.address,
            "latitude": $scope.latitude,
            "longitude": $scope.longitude
        }
        Data.setData(data);
        $window.location.assign('addListing');
    }
});


app.controller('profile_controller', function ($scope, $http, $window) {
    $scope.numberOfTotalReviews = 0;

    $scope.initProfile = function (ssn) {
        var userSSN = window.location.pathname.split('/')[2] || "Unknown";
        console.log(userSSN);
        if (userSSN == "Unknown") {
            userSSN = ssn;
        }
        $http({
            method: 'GET',
            url: '/getUserProfile/' + userSSN
        })
            .success(function (data) {
                $scope.user = data.user;
                $scope.getUserReview($scope.user._id);
                $scope.getHostReview($scope.user._id);
                $scope.getProperties($scope.user._id);
            })
    };

    $scope.getUserReview = function (userId) {
        $http({
            method: 'GET',
            url: '/getUserReview/' + userId
        })
            .success(function (data) {
                $scope.userReviews = data.userReview;
                $scope.numberOfUserReviews = $scope.userReviews.length;
                $scope.numberOfTotalReviews = $scope.numberOfTotalReviews + $scope.numberOfUserReviews;
            });
    };

    $scope.getHostReview = function (userId) {
        $http({
            method: 'GET',
            url: '/getHostReview/' + userId
        })
            .success(function (data) {
                $scope.hostReviews = data.hostReview;
                $scope.numberOfHostReviews = $scope.hostReviews.length;
                $scope.numberOfTotalReviews = $scope.numberOfTotalReviews + $scope.numberOfHostReviews;
            });
    };

    $scope.getProperties = function (userId) {

        $http({
            method: 'GET',
            url: '/getActiveListings/' + userId
        })
            .success(function (data) {
                $scope.listed = data.listed;
                $scope.unlisted = data.unlisted;
                $scope.pending = data.pending;
                $scope.numberOfProperties = $scope.listed.length;
            });
    };
});

app.controller('yourTrips_controller', function ($scope, $http, $sce, Upload) {

    $scope.isItinerary = false;
    $scope.toggle = [];
    $scope.writeReviewPro = [];
    $scope.images = [];

    $http({
        method: 'GET',
        url: '/getUserTrips'
    })
        .success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].checkIn = new Date(data[i].checkIn).toLocaleDateString();
                data[i].checkOut = new Date(data[i].checkOut).toLocaleDateString();
            }
            $scope.trips = data;
        });

    $scope.deleteTrip = function (tripId) {

        $http({
            method: 'DELETE',
            url: '/deleteTrip?tripId=' + tripId
        })
            .success(function (data) {
                console.log(data);
                for (var i = 0; i < $scope.trips.length; i++) {
                    if ($scope.trips[i]._id === tripId) {
                        $scope.trips.splice(i, 1);
                        break;
                    }
                }
            })
    };

    $scope.viewItinerary = function (tripId) {
        $http({
            method: 'POST',
            url: '/itinerary',
            data: {"tripId": tripId}
        })
            .success(function (data) {
                $scope.isItinerary = true;
                $scope.tripItinerary = $sce.trustAsHtml(data);
            })
    };

    $scope.toggleReview = function ($index) {
        $scope.writeReview[$index] = true;
        //!$scope.writeReview[$index];
    };

    $scope.submitReviewtoHost = function (review, userId, rating, image, $index) {

        if (!review) {
            return;
        }

        $http({
            method: 'POST',
            url: '/addHostReview',
            data: {"hostId": userId, "review": review, "rating": rating, "image": image}
        })
            .success(function (data) {
                $scope.reviewadded = true;
            })
    };

    $scope.submitReviewtoProperty = function (review, userId, rating, propertyId, index) {
        if (!review) {
            console.log('No Review');
            return;
        }
        var file = ($scope.images[index]) ? $scope.images[index][0] : null;
        Upload.upload({
            url: '/uploadImage',
            data: {
                "file": file
            }
        }).then(function (resp) {
            if (resp.data.statusCode == 200) {
                console.log("Stause code " + resp.data.statusCode);
                var url = resp.data.url;
                $http({
                    method: 'POST',
                    url: '/addPropertyReview',
                    data: {"hostId": userId, "review": review, "rating": rating, "url": url, "propertyId": propertyId}
                })
                    .success(function (data) {
                        if (data.statusCode == 200) {
                            $scope.reviewadded = true;
                        } else {
                            console.log("Error occured to add review");
                        }
                    })
            }
            else if (resp.data.statusCode == 201) {
                $http({
                    method: 'POST',
                    url: '/addPropertyReview',
                    data: {"hostId": userId, "review": review, "rating": rating, "propertyId": propertyId}
                })
                    .success(function (data) {

                        if (data.statusCode == 200) {
                            $scope.reviewadded = true;
                            console.log("Review Added without image");
                        }
                        else {
                            console.log("Error occured to add review");
                        }
                    })
            } else {
                console.log("Error 401");
            }
        }, function (resp) {
            console.log('Error status: ' + resp.statusCode);
        });
    };
});


app.controller('activeListings_controller', function ($scope, $http, $window) {

    $scope.reviewadded = false;
    $scope.activeListings = true;
    $scope.pendingListings = false;
    $scope.reservationListings = false;
    $scope.unapprovedReservationListings = false;
    $scope.pastText = "View Past Reservations";

    $http({
        method: 'GET',
        url: '/getActiveListings'
    })
        .success(function (data) {
            $scope.listed = data.listed;
            $scope.unlisted = data.unlisted;
            $scope.pending = data.pending;


        });

    $http({
        method: 'GET',
        url: '/getReservations'
    })
        .success(function (data) {
            $scope.upcoming = data.upcoming;
            $scope.past = data.past;
            $scope.unapproved = data.unapproved;
            console.log($scope.past);

        });


    $scope.acceptTrip = function (tripId) {

        console.log(tripId);

        $http({
            method: 'POST',
            url: '/acceptTrip',
            data: {"tripId": tripId}
        })
            .then(function success(data) {

                    $window.location.href = "/yourListings";
                },
                function error(err) {
                    console.log(err);

                })
    };

    $scope.clickPending = function () {
        $scope.activeListings = false;
        $scope.pendingListings = true;
        $scope.reservationListings = false;
        $scope.unapprovedReservationListings = false;
    };

    $scope.clickActive = function () {
        $scope.activeListings = true;
        $scope.pendingListings = false;
        $scope.reservationListings = false;
        $scope.unapprovedReservationListings = false;
    };

    $scope.clickReservation = function () {
        $scope.activeListings = false;
        $scope.pendingListings = false;
        $scope.reservationListings = true;
        $scope.unapprovedReservationListings = false;
    };

    $scope.clickUnapprovedReservation = function () {
        $scope.activeListings = false;
        $scope.pendingListings = false;
        $scope.reservationListings = false;
        $scope.unapprovedReservationListings = true;
    };

    $scope.clickPast = function () {

        $scope.showPast = !$scope.showPast;
        if ($scope.pastText == "View Past Reservations")
            $scope.pastText = "Hide Past Reservations";
        else
            $scope.pastText = "View Past Reservations";
    };

    $scope.toggleReview = function () {

        $scope.writeReview = !$scope.writeReview;
    };

    $scope.submitReview = function (review, userId, rating, image) {

        $scope.reviewadded = false;
        if (!review) {
            console.log('No Review');
            return;
        }

        console.log(rating);
        console.log("USER ID");
        console.log(review, userId);
        $http({
            method: 'POST',
            url: '/addUserReview',
            data: {"userId": userId, "review": review, "rating": rating, "image": image}
        })
            .success(function (data) {
                console.log(data);

                $scope.reviewadded = true;
            })
    };
});

app.controller('receipt_controller', function ($scope, $http, Data, $window, Upload) {
    $scope.deleteBill = function (billId) {
        $http({
            method: 'DELETE',
            url: '/deleteBill?billId=' + billId
        })
            .success(function (data) {
                console.log(data);

                $scope.reviewadded = true;
            })
    };
});