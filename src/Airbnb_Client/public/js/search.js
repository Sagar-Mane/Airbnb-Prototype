$('.sidebar').scroll(function() {
    var scroll = $('.sidebar').scrollTop();
    var height = $('.filters.collapse').height();
    if (scroll >= height + 40) {
        $('.sidebar-header').addClass('fixed-header');
    } else {
        $('.sidebar-header').removeClass('fixed-header');
    }

});

$(document).ready(function(){
    $('label.toggle .toggle__handle').click(function(){
        $('label.toggle').toggleClass('toggle--checked');
        var new_text = $('label.toggle .toggle__handle span').text() == 'Off' ? 'On' : 'Off';
        $('label.toggle .toggle__handle span').html(new_text);
    });
});
app.directive('postsPagination', function(){
    return{
        restrict: 'E',
        template: '<ul class="pagination">'+
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="search_result(1)">&laquo;</a></li>'+
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="search_result(currentPage-1)">&lsaquo; Prev</a></li>'+
        '<li ng-repeat="i in range" ng-class="{active : currentPage == i}">'+
        '<a href="javascript:void(0)" ng-click="search_result(i)">{{i}}</a>'+
        '</li>'+
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="search_result(currentPage+1)">Next &rsaquo;</a></li>'+
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="search_result(totalPages)">&raquo;</a></li>'+
        '</ul>'
    };
});
   app.controller('search-page', ['$scope', '$http', '$compile', '$filter', function($scope, $http, $compile, $filter) {

    $scope.current_date = new Date();

    $scope.totalPages = 0;
    $scope.currentPage = 1;
    $scope.range = [];

    $(document).on('click', '[id^="wishlist-widget-icon-"]', function() {
        if(typeof USER_ID == 'object') {
            window.location.href = APP_URL+'/login';
            return false;
        }
        var name = $(this).data('name');
        var img = $(this).data('img');
        var address = $(this).data('address');
        var host_img = $(this).data('host_img');
        $scope.room_id = $(this).data('room_id');

        $('.background-listing-img').css('background-image','url('+img+')');
        $('.host-profile-img').attr('src',host_img);
        $('.wl-modal-listing__name').text(name);
        $('.wl-modal-listing__address').text(address);
        $('.wl-modal-footer__input').val(address);

        $('.wl-modal__modal').removeClass('hide');
        $('.wl-modal__col:nth-child(2)').addClass('hide');
        $('.row-margin-zero').append('<div id="wish-list-signup-container" style="overflow-y:auto;" class="col-lg-5 wl-modal__col-collapsible"> <div class="loading wl-modal__col"> </div> </div>');
        $http.get(APP_URL+"/wishlist_list?id="+$(this).data('room_id'), {  }).then(function(response)
        {
            $('#wish-list-signup-container').remove();
            $('.wl-modal__col:nth-child(2)').removeClass('hide');
            $scope.wishlist_list = response.data;
        });
    });

    $scope.wishlist_row_select = function(index) {

        $http.post(APP_URL+"/save_wishlist", { data: $scope.room_id, wishlist_id: $scope.wishlist_list[index].id, saved_id: $scope.wishlist_list[index].saved_id }).then(function(response)
        {
            if(response.data == 'null')
                $scope.wishlist_list[index].saved_id = null;
            else
                $scope.wishlist_list[index].saved_id = response.data;
        });

        if($('#wishlist_row_'+index).hasClass('text-dark-gray'))
            $scope.wishlist_list[index].saved_id = null;
        else
            $scope.wishlist_list[index].saved_id = 1;
    };

    $(document).on('submit', '.wl-modal-footer__form', function(event) {
        event.preventDefault();
        $('.wl-modal__col:nth-child(2)').addClass('hide');
        $('.row-margin-zero').append('<div id="wish-list-signup-container" style="overflow-y:auto;" class="col-lg-5 wl-modal__col-collapsible"> <div class="loading wl-modal__col"> </div> </div>');
        $http.post(APP_URL+"/wishlist_create", { data: $('.wl-modal-footer__input').val(), id: $scope.room_id }).then(function(response)
        {
            $('.wl-modal-footer__form').addClass('hide');
            $('#wish-list-signup-container').remove();
            $('.wl-modal__col:nth-child(2)').removeClass('hide');
            $scope.wishlist_list = response.data;
            event.preventDefault();
        });
        event.preventDefault();
    });

    $('.wl-modal__modal-close').click(function()
    {
        var null_count = $filter('filter')($scope.wishlist_list, {saved_id : null});

        if(null_count.length == $scope.wishlist_list.length)
            $('#wishlist-widget-'+$scope.room_id).prop('checked', false);
        else
            $('#wishlist-widget-'+$scope.room_id).prop('checked', true);

        $('.wl-modal__modal').addClass('hide');
    });

    $(document).ready(function(){
        localStorage.removeItem("map_lat_long");
        var room_type = [];
        $('.room-type:checked').each(function(i){
            room_type[i] = $(this).val();
        });

        var property_type = [];
        $('.property_type:checked').each(function(i){
            property_type[i] = $(this).val();
        });

        var amenities = [];
        $('.amenities:checked').each(function(i){
            amenities[i] = $(this).val();
        });
        $('.search_tag').addClass('hide');

        if(room_type !=''){
            $('.room-type_tag').removeClass('hide');
        }
        if(amenities !=''){
            $('.amenities_tag').removeClass('hide');
        }
        if(property_type != ''){
            $('.property_type_tag').removeClass('hide');
        }

        var location_val = $("#location").val();
        $("#header-search-form").val(location_val);
        $( "#slider-3" ).slider({
            range:true,
            min: min_slider_price,
            max: max_slider_price,
            values: [ min_slider_price_value, max_slider_price_value ],
            slide: function( event, ui ) {
                $("#min_value").val(ui.values[ 0 ]);
                $("#min_text").val(ui.values[ 0 ]);

                if(max_slider_price == ui.values[1])
                {
                    $("#max_text").html(ui.values[ 1 ]+'+');
                }
                else
                {
                    $("#max_text").html(ui.values[ 1 ]);
                }
                $("#max_value").val(ui.values[ 1 ]);
            },
            stop: function( event, ui ) {
                $("#min_value").val(ui.values[ 0 ]);
                $("#min_text").html(ui.values[ 0 ]);
                if(max_slider_price == ui.values[1])
                {
                    $("#max_text").html(ui.values[ 1 ]+'+');
                }
                else
                {
                    $("#max_text").html(ui.values[ 1 ]);
                }
                $("#max_value").val(ui.values[ 1 ]);
                $scope.search_result();
            }
        }).find(".ui-slider-handle").removeClass("ui-slider-handle").removeClass("ui-state-default").removeClass("ui-corner-all").addClass("airslide-handle");

        $('#slider-3').removeClass('ui-slider').removeClass('ui-slider-horizontal').removeClass('ui-widget').removeClass('ui-widget-content').removeClass('ui-corner-all');

        $('#slider-3').find('.ui-slider-range').removeClass('ui-slider-range').removeClass('ui-widget-header').removeClass('ui-corner-all').addClass('airslide-progress');

        $('#slider-3').append('<div class="airslide-background"></div>');

        $('.airslide-progress').css('z-index', '1');

        $('.show-more').click(function(){
            $(this).children('span').toggleClass('hide');
            $(this).parent().parent().children('div').children().toggleClass('filters-more');
        });


        $("#more_filters").click(function(){

            $(".toggle-group").css("display", "block");
            $(".toggle-hide").css("display", "none");
        });
    });

    function no_results() {
        if($('.search-results').hasClass('loading'))
            $('#no_results').hide();
        else
            $('#no_results').show();
    }

    var location1 = getParameterByName('location');

    var current_url = (window.location.href).replace('/search', '/searchResult');

    pageNumber = 1;

    if(pageNumber===undefined){
        pageNumber = '1';
    }

    $('.search-results').addClass('loading');
    no_results();
    $http.get(current_url).then(function(response) {
        // $scope.room_result = response;
        $('.search-results').removeClass('loading');
        no_results();
        $scope.room_result = response.data;
        $scope.totalPages   = response.data.last_page;
        $scope.currentPage  = response.data.current_page;
        // Pagination Range
        var pages = [];

        for(var i=1;i<=response.data.last_page;i++) {
            pages.push(i);
        }

        $scope.range = pages;

        marker(response.data);
    });
    $scope.on_mouse = function (index) {
        markers[index].setIcon(getMarkerImage('hover'));
    };
    $scope.out_mouse = function (index) {
        markers[index].setIcon(getMarkerImage('normal'));
    };
    $scope.search_result = function (pageNumber) {

        if(pageNumber===undefined){
            pageNumber = '1';
        }

        var max_price = $("#max_value").val();
        var min_price = $("#min_value").val();

        var room_type = [];
        $('.room-type:checked').each(function(i){
            room_type[i] = $(this).val();
        });
        //alert(room_type);
        if(room_type==''){
            $('.room-type_tag').addClass('hide');
        }

        var property_type = [];
        $('.property_type:checked').each(function(i){
            property_type[i] = $(this).val();
        });
        if(property_type ==''){
            $('.property_type_tag').addClass('hide');
        }
        var amenities = [];
        $('.amenities:checked').each(function(i){
            amenities[i] = $(this).val();
        });
        if(amenities ==''){
            $('.amenities_tag').addClass('hide');
        }
        var checkin = $('#checkin').val();
        var checkout = $('#checkout').val();

        var min_beds = $("#map-search-min-beds").val();
        var min_bathrooms = $("#map-search-min-bathrooms").val();
        var min_bedrooms = $("#map-search-min-bedrooms").val();
        var guest_select = $("#guest-select").val();

        if( $.trim(localStorage.getItem("map_lat_long")) != 'null'){
            var map_details = localStorage.getItem("map_lat_long");
        }
        else
        {
            var map_details	= "";
        }

        instant_book = $('#instant_book:checked').val() == 1 ? 1 : 0;

        setGetParameter('room_type', room_type);
        setGetParameter('property_type', property_type);
        setGetParameter('amenities', amenities);
        setGetParameter('checkin', checkin);
        setGetParameter('checkout', checkout);
        setGetParameter('guests', guest_select);
        setGetParameter('beds', min_beds);
        setGetParameter('bathrooms', min_bathrooms);
        setGetParameter('bedrooms', min_bedrooms);
        setGetParameter('min_price', min_price);
        setGetParameter('max_price', max_price);
        setGetParameter('page', pageNumber);
        setGetParameter('instant_book', instant_book);

        $('.search_tag').addClass('hide');

        if(room_type !=''){
            $('.room-type_tag').removeClass('hide');
        }
        if(amenities !=''){
            $('.amenities_tag').removeClass('hide');
        }
        if(property_type != ''){
            $('.property_type_tag').removeClass('hide');
        }

        var location1 = getParameterByName('location');

        $('.search-results').addClass('loading');
        no_results();
        $http.post('searchResult?page='+pageNumber, {location: location1, min_price: min_price, max_price: max_price, amenities: amenities, property_type: property_type, room_type: room_type, beds: min_beds, bathrooms: min_bathrooms, bedrooms: min_bedrooms, checkin: checkin, checkout: checkout, guest: guest_select,map_details: map_details, instant_book:instant_book })
            .then(function(response) {

                //  $scope.room_result = response;
                // alert(response.data[0].rooms_address.city);
                $scope.room_result = response.data;
                $scope.checkin = checkin;
                $scope.checkout = checkout;
                $scope.totalPages   = response.data.last_page;
                $scope.currentPage  = response.data.current_page;
                // Pagination Range
                var pages = [];

                for(var i=1;i<=response.data.last_page;i++) {
                    pages.push(i);
                }

                $scope.range = pages;

                $('.search-results').removeClass('loading');
                no_results();
                marker(response.data);
            });
    };

    $scope.apply_filter = function()
    {
        $(".toggle-hide").css("display", "block");
        $(".toggle-group").css("display", "none");

        $scope.search_result();
    };
    $scope.remove_filter = function(parameter)
    {
        $('.'+parameter).removeAttr('checked');
        var paramName = parameter.replace('-', '_');
        var paramValue = '';
        setGetParameter(paramName, paramValue)
        $('.'+parameter+'_tag').addClass('hide');

        $scope.search_result();
    };
    function setGetParameter(paramName, paramValue)
    {
        var url = window.location.href;

        if (url.indexOf(paramName + "=") >= 0)
        {
            var prefix = url.substring(0, url.indexOf(paramName));
            var suffix = url.substring(url.indexOf(paramName));
            suffix = suffix.substring(suffix.indexOf("=") + 1);
            suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
            url = prefix + paramName + "=" + paramValue + suffix;
        }
        else
        {
            if (url.indexOf("?") < 0)
                url += "?" + paramName + "=" + paramValue;
            else
                url += "&" + paramName + "=" + paramValue;
        }
        history.pushState(null, null, url);
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var viewport = JSON.parse($('#viewport').val());
    var lat0 = '';
    var long0 = '';
    var lat1 = '';
    var long1 = '';
    var infoBubble;
    var bounds;

    angular.forEach(viewport, function(key, value) {
        lat0 = viewport['southwest']['lat'];
        long0 = viewport['southwest']['lng'];
        lat1 = viewport['northeast']['lat'];
        long1 = viewport['northeast']['lng'];
    });

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(lat0, long0),
        new google.maps.LatLng(lat1, long1)
    );

    $scope.viewport = bounds;

    setTimeout(function() {
        initialize();
        initializeMap();
    }, 1000);


    function initializeMap() {
        // Create the autocomplete object, restricting the search
        // to geographical location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */(document.getElementById('header-search-form')),
            { types: ['geocode'] });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var location  = $('#header-search-form').val();
            var locations = location.replace(" ", "+");
            setGetParameter('location', locations);
            var place = autocomplete.getPlace();
            var latitude  = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();

            if (place && place.geometry && place.geometry.viewport)
                $scope.viewport = place.geometry.viewport;

            $scope.cLat = latitude;
            $scope.cLong = longitude;
            $scope.search_result();
            initialize();
            // window.location.href = window.location.href;
        });
    }

    $scope.zoom = '';
    $scope.cLat = '';
    $scope.cLong= '';
    var html = '';
    var markers = [];
    var map;
    var infowindow = new google.maps.InfoWindow(
        {
            content: html
        });

    initialize();

    function initialize()
    {

        if($scope.zoom == ''){
            var zoom_set = 10;
        }
        else
        {
            var zoom_set = $scope.zoom;
        }
        if($("#lat").val() == 0)
        {
            var zoom_set = 1;
        }
        if($scope.cLat == '' && $scope.cLong == '' ){
            var latitude = $("#lat").val();
            var longitude = $("#long").val();
        }
        else
        {
            var latitude = $scope.cLat;
            var longitude = $scope.cLong;
        }

        var myCenter=new google.maps.LatLng(latitude,longitude);

        var mapProp = {
            scrollwheel: false,
            center:myCenter,
            zoom:zoom_set,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP,
                style:google.maps.ZoomControlStyle.SMALL
            },
            mapTypeControl: false,
            streetViewControl: false,
            navigationControl: false,
        }
        map = new google.maps.Map(document.getElementById("map_canvas"),mapProp);

        map.fitBounds($scope.viewport);

        google.maps.event.addListener(map, 'click', function() {
            if (infoBubble.isOpen()) {
                infoBubble.close();
                infoBubble = new InfoBubble({
                    maxWidth: 3000
                });
            }
        });
        var homeControlDiv = document.createElement('div');
        var homeControl = new HomeControl(homeControlDiv, map);
//  homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(homeControlDiv);

        google.maps.event.addListener(map, 'dragend', function() {
            //alert('dsfd');
            if (infoBubble.isOpen()) {
                infoBubble.close();
                infoBubble = new InfoBubble({
                    maxWidth: 3000
                });
            }
            $scope.zoom = map.getZoom();

            var zoom = map.getZoom();
            var bounds = map.getBounds();
            var minLat = bounds.getSouthWest().lat();
            var minLong = bounds.getSouthWest().lng();
            var maxLat = bounds.getNorthEast().lat();
            var maxLong = bounds.getNorthEast().lng();
            var cLat = bounds.getCenter().lat();
            var cLong = bounds.getCenter().lng();

            $scope.cLat = bounds.getCenter().lat();
            $scope.cLong = bounds.getCenter().lng();

            var map_lat_long = zoom+'~'+bounds+'~'+minLat+'~'+minLong+'~'+maxLat+'~'+maxLong+'~'+cLat+'~'+cLong;
            //alert(map_lat_long);
            localStorage.setItem("map_lat_long", map_lat_long);
            var redo_search = '';
            $('.map-auto-refresh-checkbox:checked').each(function(i){
                redo_search = $(this).val();
            });
            //alert(redo_search);
            if(redo_search == 'true'){
                $scope.search_result();
            }else{
                $(".map-auto-refresh").addClass('hide');
                $(".map-manual-refresh").removeClass('hide');
            }
        } );

        google.maps.event.addListener(map, 'click', function() {
            if (infoBubble.isOpen()) {
                infoBubble.close();
                infoBubble = new InfoBubble({
                    maxWidth: 3000
                });
            }
        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
            if (infoBubble.isOpen()) {
                infoBubble.close();
                infoBubble = new InfoBubble({
                    maxWidth: 3000
                });
            }
            $scope.zoom = map.getZoom();

            var zoom = map.getZoom();
            var bounds = map.getBounds();
            var minLat = bounds.getSouthWest().lat();
            var minLong = bounds.getSouthWest().lng();
            var maxLat = bounds.getNorthEast().lat();
            var maxLong = bounds.getNorthEast().lng();
            var cLat = bounds.getCenter().lat();
            var cLong = bounds.getCenter().lng();
            $scope.cLat = bounds.getCenter().lat();
            $scope.cLong = bounds.getCenter().lng();
            var map_lat_long = zoom+'~'+bounds+'~'+minLat+'~'+minLong+'~'+maxLat+'~'+maxLong+'~'+cLat+'~'+cLong;
            localStorage.setItem("map_lat_long", map_lat_long);
            var redo_search = '';
            $('.map-auto-refresh-checkbox:checked').each(function(i){
                redo_search = $(this).val();
            });
            //  alert(redo_search);
            if(redo_search == 'true'){
                $scope.search_result();
            }else{
                $(".map-auto-refresh").addClass('hide');
                $(".map-manual-refresh").removeClass('hide');
            }
        });


//marker(response);
    }
    function HomeControl(controlDiv, map) {
        var controlText = document.createElement('div');
        controlText.style.position = 'relative';
        controlText.style.padding = '5px';
        controlText.style.margin = '-65px 0px 0px 50px';
        controlText.style.fontSize='14px';
        controlText.innerHTML = '<div class="map-refresh-controls google"><a   class="map-manual-refresh btn btn-primary  hide" style="background-color:#ff5a5f;color: #ffffff;">Redo Search Here<i class="icon icon-refresh icon-space-left"></i></a><div class="panel map-auto-refresh"><label class="checkbox"><input type="checkbox" checked="checked" name="redo_search" value="true" class="map-auto-refresh-checkbox"><small>Search as I move the map</small></label></div></div>'
        controlDiv.appendChild(controlText);

        // Setup click-event listener: simply set the map to London
        google.maps.event.addDomListener(controlText, 'click', function() {
        });
    }
    function marker(response){
        var checkout = $scope.checkout;
        var checkin = $scope.checkin;
        var guests = $scope.guests;
        setAllMap(null);
        markers = [];
        angular.forEach(response.data, function(obj){

            var html = '<div id="info_window_'+obj["id"]+'" class="listing listing-map-popover" data-price="'+obj["rooms_price"]["currency"]["symbol"]+'" data-id="'+obj["id"]+'" data-user="'+obj["user_id"]+'" data-url="/rooms/'+obj["id"]+'" data-name="'+obj["name"]+'" data-lng="'+obj['rooms_address']["longitude"]+'" data-lat="'+obj['rooms_address']["latitude"]+'"><div class="panel-image listing-img">';
            html += '<a class="media-photo media-cover" target="listing_'+obj["id"]+'" href="'+APP_URL+'/rooms/'+obj["id"]+'?checkin='+checkin+'&checkout='+checkout+'&guests='+guests+'"><div class="listing-img-container media-cover text-center"><img id="marker_image_'+obj["id"]+'" rooms_image = "" alt="'+obj["name"]+'" class="img-responsive-height" data-current="0" src="'+APP_URL+'/images/'+obj["photo_name"]+'"></div></a>';
            html += '<div class="target-prev target-control block-link marker_slider" ng-click="marker_slider($event)"  data-room_id="'+obj["id"]+'"><i class="icon icon-chevron-left icon-size-2 icon-white"></i></div><a class="link-reset panel-overlay-bottom-left panel-overlay-label panel-overlay-listing-label" target="listing_'+obj["id"]+'" href="'+APP_URL+'/rooms/'+obj["id"]+'?checkin='+checkin+'&checkout='+checkout+'&guests='+guests+'"><div>';

            var instant_book = '';

            if(obj["booking_type"] == 'instant_book')
                instant_book = '<span aria-label="Book Instantly" data-behavior="tooltip" class="h3 icon-beach"><i class="icon icon-instant-book icon-flush-sides"></i></span>';

            html += '<sup class="h6 text-contrast">'+obj["rooms_price"]["currency"]["symbol"]+'</sup><span class="h3 text-contrast price-amount">'+obj["rooms_price"]["night"]+'</span><sup class="h6 text-contrast"></sup>'+instant_book+'</div></a><div class="target-next target-control marker_slider block-link" ng-click="marker_slider($event)" data-room_id="'+obj["id"]+'"><i class="icon icon-chevron-right icon-size-2 icon-white"></i></div></div>';
            html += '<div class="panel-body panel-card-section"><div class="media"><h3 class="h5 listing-name text-truncate row-space-top-1" itemprop="name" title="'+obj["name"]+'">'+obj["name"]+'</a></h3>';

            var star_rating = '';

            if(obj['overall_star_rating'] != '')
                star_rating = ' · '+obj['overall_star_rating'];

            var reviews_count = '';
            var review_plural = (obj['reviews_count'] > 1) ? 's' : '';

            if(obj['reviews_count'] != 0)
                reviews_count = ' · '+obj['reviews_count']+' review'+review_plural;

            html += '<div class="text-muted listing-location text-truncate" itemprop="description"><a class="text-normal link-reset" href="'+APP_URL+'/rooms/'+obj["id"]+'?checkin='+checkin+'&checkout='+checkout+'&guests='+guests+'">'+obj["room_type_name"]+star_rating+reviews_count+'</a></div></div></div></div>';
            var lat = obj["rooms_address"]["latitude"];
            var lng = obj["rooms_address"]["longitude"];
            var point = new google.maps.LatLng(lat,lng);
            var name = obj["name"];
            var currency_symbol = obj["rooms_price"]["currency"]["symbol"] ;
            var currency_value = obj["rooms_price"]["night"];
            var marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: getMarkerImage('normal'),
                title: name,
                zIndex: 1
            });
            markers.push(marker);
            google.maps.event.addListener(marker, "mouseover", function() {
                marker.setIcon(getMarkerImage('hover'));
            });
            google.maps.event.addListener(marker, "mouseout", function() {
                marker.setIcon(getMarkerImage('normal'));
            });
            createInfoWindow(marker, html);

        });
    }
    function createInfoWindow(marker, popupContent) {
        infoBubble = new InfoBubble({
            maxWidth: 3000
        });

        var contentString = $compile(popupContent)($scope);
        google.maps.event.addListener(marker, 'click', function() {

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

            infoBubble.open(map,marker);
        });
    }

    function getMarkerImage(type) {
        var image = 'map-pin-set-3460214b477748232858bedae3955d81.png';

        if(type == 'hover')
            image = 'hover-map-pin-set-3460214b477748232858bedae3955d81.png';

        var gicons = new google.maps.MarkerImage("images/"+image,
            new google.maps.Size(50, 50),
            new google.maps.Point(0,0),
            new google.maps.Point(9, 20));

        return gicons;

    }
    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    $('.footer-toggle').click(function()
    {
        $( ".footer-container" ).slideToggle( "fast", function() {
            if($(".footer-container").is(":visible"))
            {
                $('.open-content').hide();
                $('.close-content').show();
            }
            else
            {
                $('.open-content').show();
                $('.close-content').hide();
            }
        });
    });


    $(document).on('click', '.map-manual-refresh', function() {
        $(".map-manual-refresh").addClass('hide');
        $(".map-auto-refresh").removeClass('hide');
        $scope.search_result();
    });
    $(document).on('click', '.rooms-slider', function() {

        var rooms_id = $(this).attr("data-room_id");
        var dataurl = $("#rooms_image_"+rooms_id).attr("rooms_image");
        var img_url =$("#rooms_image_"+rooms_id).attr("src");
        if($.trim(dataurl) ==''){
            $(this).parent().addClass("loading");
            $http.post('rooms_photos', {rooms_id: rooms_id})
                .then(function(response) {
                    angular.forEach(response.data, function(obj){
                        if($.trim(dataurl) ==''){
                            dataurl = obj['name'];
                        }
                        else
                            dataurl = dataurl +','+ obj['name'];
                    });

                    $("#rooms_image_"+rooms_id).attr("rooms_image", dataurl);
                    var img_explode = img_url.split('rooms/'+rooms_id+'/');

                    var all_image = dataurl.split(',');
                    var rooms_img_count = all_image.length;
                    var i = 0;
                    var set_img_no = '';
                    angular.forEach(all_image, function(img){
                        if($.trim(img) == $.trim(img_explode[1]) ){
                            set_img_no = i;
                        }
                        i++;
                    });
                    if($(this).is(".target-prev") == true){
                        var cur_img = set_img_no-1;
                        var count = rooms_img_count-1;
                    }
                    else{
                        var cur_img = set_img_no+1;
                        var count = 0;
                    }

                    if(typeof (all_image[cur_img]) != 'undefined' && $.trim(all_image[cur_img]) !="null" ){
                        var img = all_image[cur_img];
                    }
                    else
                    {

                        var img = all_image[count];
                    }

                    var set_img_url = img_explode[0]+'rooms/'+rooms_id+'/'+img;

                    $(".panel-image").removeClass("loading");
                    $("#rooms_image_"+rooms_id).attr("src",set_img_url);
                });
        }
        else
        {
            $(this).parent().addClass("loading");
            var img_explode = img_url.split('rooms/'+rooms_id+'/');

            var all_image = dataurl.split(',');
            var rooms_img_count = all_image.length;
            var i = 0;
            var set_img_no = '';
            angular.forEach(all_image, function(img){
                if($.trim(img) == $.trim(img_explode[1]) ){
                    set_img_no = i;
                }
                i++;
            });
            if($(this).is(".target-prev") == true){
                var cur_img = set_img_no-1;
                var count = rooms_img_count-1;
            }
            else{
                var cur_img = set_img_no+1;
                var count = 0;
            }

            if(typeof (all_image[cur_img]) != 'undefined' && $.trim(all_image[cur_img]) !="null" ){
                var img = all_image[cur_img];
            }
            else
            {
                var img = all_image[count];
            }
            var set_img_url = img_explode[0]+'rooms/'+rooms_id+'/'+img;

            $(".panel-image").removeClass("loading");
            $("#rooms_image_"+rooms_id).attr("src",set_img_url);

        }

    });


    $scope.marker_slider = function($event){

        $event.stopPropagation();
        var this_elm = angular.element($event.currentTarget);

        var rooms_id = $($event.currentTarget).attr("data-room_id");
        var dataurl = $("#marker_image_"+rooms_id).attr("rooms_image");
        var img_url =$("#marker_image_"+rooms_id).attr("src");
        if($.trim(dataurl) ==''){
            $($event.currentTarget).parent().addClass("loading");
            $http.post('rooms_photos', {rooms_id: rooms_id})
                .then(function(response) {
                    angular.forEach(response.data, function(obj){
                        if($.trim(dataurl) ==''){
                            dataurl = obj['name'];
                        }
                        else
                            dataurl = dataurl +','+ obj['name'];
                    });

                    $("#marker_image_"+rooms_id).attr("rooms_image", dataurl);
                    var img_explode = img_url.split('rooms/'+rooms_id+'/');

                    var all_image = dataurl.split(',');
                    var rooms_img_count = all_image.length;
                    var i = 0;
                    var set_img_no = '';
                    angular.forEach(all_image, function(img){
                        if($.trim(img) == $.trim(img_explode[1]) ){
                            set_img_no = i;
                        }
                        i++;
                    });
                    if($($event.currentTarget).is(".target-prev") == true){
                        var cur_img = set_img_no-1;
                        var count = rooms_img_count-1;
                    }
                    else{
                        var cur_img = set_img_no+1;
                        var count = 0;
                    }

                    if(typeof (all_image[cur_img]) != 'undefined' && $.trim(all_image[cur_img]) !="null" ){
                        var img = all_image[cur_img];
                    }
                    else
                    {

                        var img = all_image[count];
                    }

                    var set_img_url = img_explode[0]+'rooms/'+rooms_id+'/'+img;

                    $(".panel-image").removeClass("loading");
                    $("#marker_image_"+rooms_id).attr("src",set_img_url);
                });
        }
        else
        {
            $($event.currentTarget).parent().addClass("loading");
            var img_explode = img_url.split('rooms/'+rooms_id+'/');

            var all_image = dataurl.split(',');
            var rooms_img_count = all_image.length;
            var i = 0;
            var set_img_no = '';
            angular.forEach(all_image, function(img){
                if($.trim(img) == $.trim(img_explode[1]) ){
                    set_img_no = i;
                }
                i++;
            });
            if($($event.currentTarget).is(".target-prev") == true){
                var cur_img = set_img_no-1;
                var count = rooms_img_count-1;
            }
            else{
                var cur_img = set_img_no+1;
                var count = 0;
            }

            if(typeof (all_image[cur_img]) != 'undefined' && $.trim(all_image[cur_img]) !="null" ){
                var img = all_image[cur_img];
            }
            else
            {
                var img = all_image[count];
            }
            var set_img_url = img_explode[0]+'rooms/'+rooms_id+'/'+img;

            $(".panel-image").removeClass("loading");
            $("#marker_image_"+rooms_id).attr("src",set_img_url);

        }

    }

    $(document).on('click', '.marker_slider', function(e) {
        var rooms_id = $(this).attr("data-room_id");
        var dataurl = $("#marker_image_"+rooms_id).attr("rooms_image");
        var img_url =$("#marker_image_"+rooms_id).attr("src");
        if($.trim(dataurl) ==''){
            $(this).parent().addClass("loading");
            $http.post('rooms_photos', {rooms_id: rooms_id})
                .then(function(response) {
                    angular.forEach(response.data, function(obj){
                        if($.trim(dataurl) ==''){
                            dataurl = obj['name'];
                        }
                        else
                            dataurl = dataurl +','+ obj['name'];
                    });

                    $("#marker_image_"+rooms_id).attr("rooms_image", dataurl);
                    var img_explode = img_url.split('rooms/'+rooms_id+'/');

                    var all_image = dataurl.split(',');
                    var rooms_img_count = all_image.length;
                    var i = 0;
                    var set_img_no = '';
                    angular.forEach(all_image, function(img){
                        if($.trim(img) == $.trim(img_explode[1]) ){
                            set_img_no = i;
                        }
                        i++;
                    });
                    if($(this).is(".target-prev") == true){
                        var cur_img = set_img_no-1;
                        var count = rooms_img_count-1;
                    }
                    else{
                        var cur_img = set_img_no+1;
                        var count = 0;
                    }

                    if(typeof (all_image[cur_img]) != 'undefined' && $.trim(all_image[cur_img]) !="null" ){
                        var img = all_image[cur_img];
                    }
                    else
                    {

                        var img = all_image[count];
                    }

                    var set_img_url = img_explode[0]+'rooms/'+rooms_id+'/'+img;

                    $(".panel-image").removeClass("loading");
                    $("#marker_image_"+rooms_id).attr("src",set_img_url);
                });
        }
        else
        {
            $(this).parent().addClass("loading");
            var img_explode = img_url.split('rooms/'+rooms_id+'/');

            var all_image = dataurl.split(',');
            var rooms_img_count = all_image.length;
            var i = 0;
            var set_img_no = '';
            angular.forEach(all_image, function(img){
                if($.trim(img) == $.trim(img_explode[1]) ){
                    set_img_no = i;
                }
                i++;
            });
            if($(this).is(".target-prev") == true){
                var cur_img = set_img_no-1;
                var count = rooms_img_count-1;
            }
            else{
                var cur_img = set_img_no+1;
                var count = 0;
            }

            if(typeof (all_image[cur_img]) != 'undefined' && $.trim(all_image[cur_img]) !="null" ){
                var img = all_image[cur_img];
            }
            else
            {
                var img = all_image[count];
            }
            var set_img_url = img_explode[0]+'rooms/'+rooms_id+'/'+img;

            $(".panel-image").removeClass("loading");
            $("#marker_image_"+rooms_id).attr("src",set_img_url);

        }

    });
    $(document).on('change', '[id^="map-search"]', function() {
        var i = 0;
        $('[id^="map-search"]').each(function() {
            if($(this).is(':checkbox'))
            {
                if($(this).is(':checked'))
                {
                    i++;
                }
            }
            else if($(this).val() != '') {
                i++
            }
        });

        if (i == 0) {
            $('#more_filter_submit').attr('disabled', 'disabled');
        } else {
            $('#more_filter_submit').removeAttr('disabled');
        }
    });

    $(document).on('click', '#cancel-filter', function() {
        $('[id^="map-search"]').each(function() {
            if($(this).is(':checkbox'))
            {
                $(this).attr('checked', false);
            }
            else
            {
                $(this).val('');
            }
        });

        $('#more_filter_submit').attr('disabled', 'disabled');

        $(".toggle-hide").css("display", "block");
        $(".toggle-group").css("display", "none");

        $scope.search_result();
    });

}]);
