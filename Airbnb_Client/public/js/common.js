$("#home_slider").responsiveSlides({
    auto: true,
    pager: false,
    nav: false,
    //random: true,
    speed: 2000,
    namespace: "home_slider",
    timeout: 8000
});

// var host_banner_content_slider = $("#host_banner_content_slider").responsiveSlides({
//     auto: false,
//     pager: false,
//     nav: false, 
//     speed: 2000,
//     namespace: "host_banner_content"
// });
$('.host_banner_content_slider_item').hide();
$('#host_banner_content_slider_item_0').show();

$("#host_banner_slider").responsiveSlides({
    auto: true,
    pager: false,
    nav: false,
    //random: true,
    speed: 2000,
    timeout: 5000,
    namespace: "host_banner_slider_item",
    before: function (index) {
        items_count = $("#host_banners_count").val();
        current_index = $('.' + this.namespace + '2_on').index();
        next_index = current_index + 1;
        if (next_index > items_count) {
            next_index = 0;
        }
        $("#host_banner_content_slider_item_" + current_index).hide();
        $("#host_banner_content_slider_item_" + next_index).fadeIn(1000);
    },
});

$(function () {
    $("#bottom_slider").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
    });
});
$("#bottom_slider").responsiveSlides({
    auto: true,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
    pager: false,           // Boolean: Show pager, true or false
    nav: true,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: false,           // Boolean: Pause on hover, true or false
    pauseControls: true,    // Boolean: Pause when hovering controls, true or false
    prevText: "Previous",   // String: Text for the "previous" button
    nextText: "Next",       // String: Text for the "next" button
    maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "bottom_slider",   // String: Change the default namespace used
    before: function () {
    },   // Function: Before callback
    after: function () {
    }     // Function: After callback
});
if ($('.manage-listing-row-container').hasClass('has-collapsed-nav') === true) {
    $('#js-manage-listing-nav').addClass('manage-listing-nav');
}


$('.js-show-how-it-works').click(function () {
    $(".js-how-it-works").slideToggle("fast", function () {
        $('.js-how-it-works').show();
    });
});

$('.js-close-how-it-works').click(function () {
    $(".js-how-it-works").slideToggle("fast", function () {
        $('.js-how-it-works').hide();
    });
});
$('#room-type-tooltip').mouseover(function () {

    $('.tooltip-room').show();
});
$('#room-type-tooltip').mouseout(function () {
    $('.tooltip-room').hide();
});
$('[id^="amenity-tooltip"]').mouseover(function () {
    var id = $(this).data('id');
    $('#ame-tooltip-' + id).show();
});
$('[id^="amenity-tooltip"]').mouseout(function () {
    $('[id^="ame-tooltip"]').hide();
});
$('.tool-amenity1').mouseover(function () {
    $('.tooltip-amenity1').show();
});
$('.tool-amenity1').mouseout(function () {
    $('.tooltip-amenity1').hide();
});
$('.tool-amenity2').mouseover(function () {
    $('.tooltip-amenity2').show();
});
$('.tool-amenity2').mouseout(function () {
    $('.tooltip-amenity2').hide();
});
$('a.become').mouseover(function () {
    $('.drop-down-menu-host').show();
});
$('a.become').mouseout(function () {
    $('.drop-down-menu-host').hide();
});
$('.trip-drop').mouseout(function () {
    $('.drop-down-menu-trip').hide();
});
$('.trip-drop').mouseover(function () {
    $('.drop-down-menu-trip').show();
});
$('.inbox-icon').mouseout(function () {
    $('.drop-down-menu-msg').hide();
});
$('.inbox-icon').mouseover(function () {
    $('.drop-down-menu-msg').show();
});
$('.drop-down-menu-host').mouseover(function () {
    $(this).show();
});
$('.drop-down-menu-host').mouseout(function () {
    $(this).hide();
});
$('.drop-down-menu-trip').mouseover(function () {
    $(this).show();
});
$('.drop-down-menu-trip').mouseout(function () {
    $(this).hide();
});
$('.drop-down-menu-msg').mouseover(function () {
    $(this).show();
});
$('.drop-down-menu-msg').mouseout(function () {
    $(this).hide();
});
$('.burger--sm').click(function () {
    $('.header--sm .nav--sm').css('visibility', 'visible');
    $('.makent-header .header--sm .nav-content--sm').css('left', '0', 'important');
});

$('.nav-mask--sm').click(function () {
    $('.header--sm .nav--sm').css('visibility', 'hidden');
    $('.makent-header .header--sm .nav-content--sm').css('left', '-285px');
});

$('.search-modal-trigger, #sm-search-field').click(function () {
    $('#search-modal--sm').removeClass('hide');
    $('#search-modal--sm').attr('aria-hidden', 'false');
});

$('.search-modal-container .modal-close').click(function () {
    $('#search-modal--sm').addClass('hide');
    $('#search-modal--sm').attr('aria-hidden', 'true');
});
$('.list-nav-link a').click(function () {
    $('.listing-nav-sm').removeClass('collapsed');
});
$('#href_pricing').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_terms').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#remove-manage').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_booking').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_basics').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_description').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_location').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_amenities').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_photos').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_details').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_guidebook').click(function () {
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_calendar').click(function () {
    $('#js-manage-listing-nav').addClass('manage-listing-nav');
});
$('#href_calendar').click(function () {
    $('#ajax_container').removeClass('mar-left-cont');
});
$('#href_calendar').click(function () {
    $('#js-manage-listing-nav').removeClass('pos-abs');
});
if (typeof(google) == 'undefined') {
    window.location.href = APP_URL + '/in_secure';
}
homeAutocomplete();
var home_autocomplete;
var home_mob_autocomplete;

function homeAutocomplete() {
    if (document.getElementById('location')) {
        home_autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'));
        home_autocomplete.addListener('place_changed', trigger_checkin);
    }

}

var current_url = window.location.href.split('?')[0];
var last_part = current_url.substr(current_url.lastIndexOf('/'));
var last_part1 = current_url.substr(current_url.lastIndexOf('/') + 1);
if (last_part != '/s') {
    headerAutocomplete();
} else {
    $("#header-search-form").keypress(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });
}

var header_autocomplete;
var sm_autocomplete;

function headerAutocomplete() {
    if (document.getElementById('header-search-form')) {
        header_autocomplete = new google.maps.places.Autocomplete(document.getElementById('header-search-form'));
        google.maps.event.addListener(header_autocomplete, 'place_changed', function () {
            $('#header-search-settings').addClass('shown');
            $("#header-search-checkin").datepicker("show");
        });
    }
    if (document.getElementById('search-modal--sm')) {
        sm_autocomplete = new google.maps.places.Autocomplete(document.getElementById('header-location--sm'));
        google.maps.event.addListener(sm_autocomplete, 'place_changed', function () {
            $("#modal_checkin").datepicker("show");
        });
    }
    // comment this if block
    if (document.getElementById('header-search-form-mob')) {
        header_autocomplete = new google.maps.places.Autocomplete(document.getElementById('header-search-form-mob'));
        google.maps.event.addListener(header_autocomplete, 'place_changed', function () {
            var location = $('#header-search-form-mob').val();
            var locations = location.replace(" ", "+");
            window.location.href = APP_URL + '/s?location=' + locations;
        });
    }

}

$("#header-search-checkin").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: 0,
    beforeShow: function (input, inst) {
        setTimeout(function () {
            inst.dpDiv.find('a.ui-state-highlight').removeClass('ui-state-highlight');
            $('.ui-datepicker').css('z-index', 99999999999999);
        }, 100);
    },
    onSelect: function (date) {
        var header_checkout = $('#header-search-checkin').datepicker('getDate');
        header_checkout.setDate(header_checkout.getDate() + 1);
        $('#header-search-checkout').datepicker('setDate', header_checkout);
        $('#header-search-checkout').datepicker('option', 'minDate', header_checkout);
        setTimeout(function () {
            $("#header-search-checkout").datepicker("show");
        }, 20);
    }
});
$('#header-search-checkout').datepicker({
    dateFormat: "dd-mm-yy",
    minDate: 1,
    beforeShow: function (input, inst) {
        setTimeout(function () {
            $('.ui-datepicker').css('z-index', 99999999999999);
        }, 100);
    },
    onClose: function () {
        var header_checkin = $('#checkin').datepicker('getDate');
        var header_checkout = $('#header-search-checkout').datepicker('getDate');
        if (header_checkout <= header_checkin) {
            var minDate = $('#header-search-checkout').datepicker('option', 'minDate');
            $('#header-search-checkout').datepicker('setDate', minDate);
        }
    }
});

$("#modal_checkin").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: 0,
    beforeShow: function (input, inst) {
        setTimeout(function () {
            inst.dpDiv.find('a.ui-state-highlight').removeClass('ui-state-highlight');
        }, 100);
    },
    onSelect: function (date) {
        var modal_checkout = $('#modal_checkin').datepicker('getDate');
        modal_checkout.setDate(modal_checkout.getDate() + 1);
        $('#modal_checkout').datepicker('setDate', modal_checkout);
        $('#modal_checkout').datepicker('option', 'minDate', modal_checkout);
        setTimeout(function () {
            $("#modal_checkout").datepicker("show");
        }, 20);
    }
});

$('#modal_checkout').datepicker({
    dateFormat: "dd-mm-yy",
    minDate: 1,
    onClose: function () {
        var modal_checkin = $('#checkin').datepicker('getDate');
        var modal_checkout = $('#modal_checkout').datepicker('getDate');
        if (modal_checkout <= modal_checkin) {
            var minDate = $('#modal_checkout').datepicker('option', 'minDate');
            $('#modal_checkout').datepicker('setDate', minDate);
        }
    }
});


$('#searchbar-form').submit(function (event) {
    if ($('#location').val() == '') {
        $('.searchbar__location-error').removeClass('hide');
        event.preventDefault();
    }
    else
        $('.searchbar__location-error').addClass('hide');
});

$('#location, #header-location--sm').keyup(function () {
    $('.searchbar__location-error').addClass('hide');
});

$('.search-form').submit(function (event) {
    var header_checkin = $('#header-search-checkin').val();
    var header_checkout = $('#header-search-checkout').val();
    var header_guests = $('#header-search-guests').val();
    var header_room_type = '';

    $('[id^="header_room_type"]').each(function () {
        if ($(this).is(':checked'))
            header_room_type += $(this).val() + ',';
    });
    header_room_type = header_room_type.slice(0, -1);
    var location = $('#header-search-form').val();
    var locations = location.replace(" ", "+");
    window.location.href = APP_URL + '/search?location=' + locations + '&checkin=' + header_checkin + '&checkout=' + header_checkout + '&guests=' + header_guests + '&room_type=' + header_room_type;
    event.preventDefault();
});

$('#search-form--sm-btn').click(function (event) {
    var location = $('#header-location--sm').val();
    if (location == '') {
        $('.searchbar__location-error').removeClass('hide');
        return false;
    }
    else
        $('.searchbar__location-error').addClass('hide');

    var sm_checkin = $('#modal_checkin').val();
    var sm_checkout = $('#modal_checkout').val();
    var sm_guests = $('#modal_guests').val();
    var sm_room_type = '';

    $('[id^="room-type-"]').each(function () {
        if ($(this).is(':checked'))
            sm_room_type += $(this).val() + ',';
    });
    sm_room_type = sm_room_type.slice(0, -1);
    var locations = location.replace(" ", "+");
    window.location.href = APP_URL + '/s?location=' + locations + '&checkin=' + sm_checkin + '&checkout=' + sm_checkout + '&guests=' + sm_guests + '&room_type=' + sm_room_type;
    event.preventDefault();
});

// Hide header search form when click outside of that container
$('html').click(function () {
    $("#header-search-settings").removeClass('shown');
});

$('#header-search-settings').click(function (event) {
    event.stopPropagation();
});

function trigger_checkin() {
    $("#checkin").datepicker("show");
}

$("#checkin").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: 0,
    beforeShow: function (input, inst) {
        setTimeout(function () {
            inst.dpDiv.find('a.ui-state-highlight').removeClass('ui-state-highlight');
        }, 100);
    },
    onSelect: function (date) {
        var checkout = $('#checkin').datepicker('getDate');
        checkout.setDate(checkout.getDate() + 1);
        $('#checkout').datepicker('setDate', checkout);
        $('#checkout').datepicker('option', 'minDate', checkout);
        setTimeout(function () {
            $("#checkout").datepicker("show");
        }, 20);
    }
});

$('#checkout').datepicker({
    dateFormat: "dd-mm-yy",
    minDate: 1,
    onClose: function () {
        var checkin = $('#checkin').datepicker('getDate');
        var checkout = $('#checkout').datepicker('getDate');
        if (checkout <= checkin) {
            var minDate = $('#checkout').datepicker('option', 'minDate');
            $('#checkout').datepicker('setDate', minDate);
        }
    }
});

// Coupon Code
var app = angular.module('App', []);
app.controller('payment', ['$scope', '$http', function ($scope, $http) {
    $('.open-coupon-section-link').click(function () {
        $("#billing-table").addClass("coupon-section-open");
        $('#restric_apply').hide();
    });

    $('.cancel-coupon').click(function () {
        $("#billing-table").removeClass("coupon-section-open");
        $('#restric_apply').show();
    });

    $('#apply-coupon').click(function () {
        var coupon_code = $('.coupon-code-field').val();

        $http.post(APP_URL + '/payments/apply_coupon', {coupon_code: coupon_code}).then(function (response) {
            if (response.data.message) {
                $("#coupon_disabled_message").show();
                $('#coupon_disabled_message').text(response.data.message);
                $("#after_apply_remove").hide();
            }
            else {
                $("#coupon_disabled_message").hide();
                $("#restric_apply").hide();
                $("#after_apply").hide();
                $("#after_apply_remove").show();
                $("#after_apply_coupon").show();
                $("#after_apply_amount").show();
                $('#applied_coupen_amount').text(response.data.coupon_amount);
                $('#payment_total').text(response.data.coupen_applied_total);
                window.location.reload();
            }
        });
    });

    $('#remove_coupon').click(function () {
        $http.post(APP_URL + '/payments/remove_coupon', {}).then(function (response) {
            window.location.reload();
        });
    });

}]);
// Coupon Codeopen-coupon-section-link 


$('#payment-method-select').change(function () {
    if ($(this).val() == 'paypal') {
        $('#payment-method-cc').hide();
        $('.cc').hide();
        $('.' + $(this).val()).addClass('active');
        $('.' + $(this).val()).addClass('active');
        $('.' + $(this).val() + ' > .payment-logo').removeClass('inactive');
    }
    else {
        $('#payment-method-cc').show();
        $('.cc').show();
        $('.paypal').removeClass('active');
        $('.paypal > .payment-logo').addClass('inactive');
    }
    $('[name="payment_method"]').val($(this).val());
});

$('#country-select').change(function () {
    $('#billing-country').text($("#country-select option:selected").text());
    $('[name="country"]').val($(this).val());
});

$('#billing-country').text($("#country-select option:selected").text());
$('[name="country"]').val($("#country-select option:selected").val());

app.controller('footer', ['$scope', '$http', function ($scope, $http) {

    $('#currency_footer').change(function () {
        $http.post(APP_URL + "/set_session", {currency: $(this).val()}).then(function (data) {
            location.reload();
        });
    });

    $('#language_footer').change(function () {
        $http.post(APP_URL + "/set_session", {language: $(this).val()}).then(function (data) {
            location.reload();
        });
    });

    $('.room_status_dropdown').change(function () {
        var data_params = {};

        data_params['status'] = $(this).val();

        var data = JSON.stringify(data_params);

        var id = $(this).attr('data-room-id');

        $http.post('manage-listing/' + id + '/update_rooms', {data: data}).then(function (response) {
            if (data_params['status'] == 'Unlisted') {
                $('[data-room-id="div_' + id + '"] > i').addClass('dot-danger');
                $('[data-room-id="div_' + id + '"] > i').removeClass('dot-success');
            }
            else if (data_params['status'] == 'Listed') {
                $('[data-room-id="div_' + id + '"] > i').removeClass('dot-danger');
                $('[data-room-id="div_' + id + '"] > i').addClass('dot-success');
            }
        });
    });

    $(document).on('click', '.wl-modal-footer__text', function () {
        $('.wl-modal-footer__form').removeClass('hide');
    });

    $('#send-email').unbind("click").click(function () {
        var emails = $('#email-list').val();
        if (emails != '') {
            $http.post('invite/share_email', {emails: emails}).then(function (response) {
                if (response.data == "true") {
                    $('#success_message').fadeIn(800);
                    $('#success_message').fadeOut();
                    $('#email-list').val('');
                } else {
                    $('#error_message').fadeIn(800);
                    $('#error_message').fadeOut();
                }
            });
        }
    });

}]);

app.controller('payout_preferences', ['$scope', '$http', function ($scope, $http) {

    $('#add-payout-method-button').click(function () {
        $('#payout_popup1').removeClass('hide').attr("aria-hidden", "false");
    });

    $('#address').submit(function () {
        var validation_container = '<div class="alert alert-error alert-error alert-header"><a class="close alert-close" href="javascript:void(0);"></a><i class="icon alert-icon icon-alert-alt"></i>';
        if ($('#payout_info_payout_address1').val() == '') {
            $('#popup1_flash-container').html(validation_container + 'Address cannot be blank.</div>');
            return false;
        }
        if ($('#payout_info_payout_city').val() == '') {
            $('#popup1_flash-container').html(validation_container + 'City cannot be blank.</div>');
            return false;
        }
        if ($('#payout_info_payout_zip').val() == '') {
            $('#popup1_flash-container').html(validation_container + 'Postal Code cannot be blank.</div>');
            return false;
        }
        if ($('#payout_info_payout_country').val() == null) {
            $('#popup1_flash-container').html(validation_container + 'Country cannot be blank.</div>');
            return false;
        }

        $('#payout_info_payout2_address1').val($('#payout_info_payout_address1').val());
        $('#payout_info_payout2_address2').val($('#payout_info_payout_address2').val());
        $('#payout_info_payout2_city').val($('#payout_info_payout_city').val());
        $('#payout_info_payout2_state').val($('#payout_info_payout_state').val());
        $('#payout_info_payout2_zip').val($('#payout_info_payout_zip').val());
        $('#payout_info_payout2_country').val($('#payout_info_payout_country').val());

        $('#payout_popup1').addClass('hide');
        $('#payout_popup2').removeClass('hide').attr("aria-hidden", "false");
    });

    $('#select-payout-method-submit').click(function () {
        var validation_container = '<div class="alert alert-error alert-error alert-header"><a class="close alert-close" href="javascript:void(0);"></a><i class="icon alert-icon icon-alert-alt"></i>';
        if ($('[id="payout2_method"]:checked').val() == undefined) {
            $('#popup2_flash-container').html(validation_container + 'Choose Payout Method.</div>');
            return false;
        }

        $('#payout_info_payout3_address1').val($('#payout_info_payout2_address1').val());
        $('#payout_info_payout3_address2').val($('#payout_info_payout2_address2').val());
        $('#payout_info_payout3_city').val($('#payout_info_payout2_city').val());
        $('#payout_info_payout3_state').val($('#payout_info_payout2_state').val());
        $('#payout_info_payout3_zip').val($('#payout_info_payout2_zip').val());
        $('#payout_info_payout3_country').val($('#payout_info_payout2_country').val());
        $('#payout3_method').val($('#payout2_method').val());

        $('#payout_popup2').addClass('hide');
        $('#payout_popup3').removeClass('hide').attr("aria-hidden", "false");
    });
    $('#payout_paypal').submit(function () {
        var validation_container = '<div class="alert alert-error alert-error alert-header"><a class="close alert-close" href="javascript:void(0);"></a><i class="icon alert-icon icon-alert-alt"></i>';
        var emailChar = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (emailChar.test($('#paypal_email').val())) {
            return true;
        } else {
            $('#popup3_flash-container').removeClass('hide');
            return false;
        }
    });
    $('.panel-close').click(function () {
        $(this).parent().parent().parent().parent().parent().addClass('hide');
    });

    $('[id$="_flash-container"]').on('click', '.alert-close', function () {
        $(this).parent().parent().html('');
    });

}]);

app.directive('postsPaginationTransaction', function () {
    return {
        restrict: 'E',
        template: '<ul class="pagination"><h3 class="status-text text-center" ng-show="loading">Loading...</h3><h3 class="status-text text-center" ng-hide="result.length">No Transactions</h3>' +
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="pagination_result(type, 1)">&laquo;</a></li>' +
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="pagination_result(type, currentPage-1)">&lsaquo; Prev</a></li>' +
        '<li ng-repeat="i in range" ng-class="{active : currentPage == i}">' +
        '<a href="javascript:void(0)" ng-click="pagination_result(type, i)">{{i}}</a>' +
        '</li>' +
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="pagination_result(type, currentPage+1)">Next &rsaquo;</a></li>' +
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="pagination_result(type, totalPages)">&raquo;</a></li>' +
        '</ul>'
    };
}).controller('transaction_history', ['$scope', '$http', function ($scope, $http) {

    $scope.paid_out = 0;

    $('li > .tab-item').click(function () {
        var tab_name = $(this).attr('aria-controls');
        var tab_selected = $(this).attr('aria-selected');
        if (tab_selected == 'false') {
            $('.tab-item').attr('aria-selected', 'false');
            $(this).attr('aria-selected', 'true');
            $('.tab-panel').hide();
            $('#' + tab_name).show();
        }
        $scope.type = tab_name;
        $scope.pagination_result(tab_name, 1);
    });

    $('[class^="payout-"]').change(function () {
        var type = $(this).parent().parent().parent().parent().attr('id');
        $scope.type = type;
        $scope.pagination_result(type, 1);
    });

    $scope.pagination_result = function (type, page) {
        var data_params = {};

        data_params['type'] = type;

        data_params['payout_method'] = $('#' + data_params['type'] + ' .payout-method').val();
        data_params['listing'] = $('#' + data_params['type'] + ' .payout-listing').val();
        data_params['year'] = $('#' + data_params['type'] + ' .payout-year').val();
        data_params['start_month'] = $('#' + data_params['type'] + ' .payout-start-month').val();
        data_params['end_month'] = $('#' + data_params['type'] + ' .payout-end-month').val();

        var data = JSON.stringify(data_params);

        if (page == undefined)
            page = 1;

        if (type == 'completed-transactions')
            $scope.completed_csv_param = 'type=' + data_params['type'] + '&payout_method=' + data_params['payout_method'] + '&listing=' + data_params['listing'] + '&year=' + data_params['year'] + '&start_month=' + data_params['start_month'] + '&end_month=' + data_params['end_month'] + '&page=' + page;

        if (type == 'future-transactions')
            $scope.future_csv_param = 'type=' + data_params['type'] + '&payout_method=' + data_params['payout_method'] + '&listing=' + data_params['listing'] + '&page=' + page;

        $scope.result_show = false;
        $scope.loading = true;
        $http.post(APP_URL + '/users/result_transaction_history?page=' + page, {data: data}).then(function (response) {
            $scope.loading = false;
            $scope.result = response.data.data;
            if ($scope.result.length)
                $scope.result_show = true;
            $scope.totalPages = response.data.last_page;
            $scope.currentPage = response.data.current_page;
            $scope.type = type;

            var pages = [];
            for (var i = 1; i <= response.data.last_page; i++) {
                pages.push(i);
            }
            $scope.range = pages;

            var total = 0;
            for (var i = 0; i < $scope.result.length; i++) {
                total += $scope.result[i].amount;
            }
            $scope.paid_out = $scope.result[0].currency_symbol + total;
        });
    }

    $scope.pagination_result('completed-transactions', 1);

}]);

app.controller('reviews', ['$scope', '$http', function ($scope, $http) {

    $('li > .tab-item').click(function () {
        var tab_name = $(this).attr('aria-controls');
        var tab_selected = $(this).attr('aria-selected');
        if (tab_selected == 'false') {
            $('.tab-item').attr('aria-selected', 'false');
            $(this).attr('aria-selected', 'true');
            $('.tab-panel').hide();
            $('#' + tab_name).show();
        }
    });

}]);

app.controller('help', ['$scope', '$http', function ($scope, $http) {

    $('.navtree-list .navtree-next').click(function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        $('#navtree').css({'left': '-300px'});
        $('.subnav-list li:first-child a').attr('aria-selected', 'false');
        $('.subnav-list li').append('<li> <a class="subnav-item" href="#" data-node-id="0" aria-selected="true"> ' + name + ' </a> </li>');
        $('#navtree-' + id).css({'display': 'block'});
    });

    $('.navtree-list .navtree-back').click(function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        $('#navtree').css({'left': '0px'});
        $('.subnav-list li:first-child a').attr('aria-selected', 'true');
        $('.subnav-list li').last().remove();
        $('#navtree-' + id).css({'display': 'none'});
    });

    $('#help_search').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: APP_URL + "/ajax_help_search",
                type: "GET",
                dataType: "json",
                data: {term: request.term},
                success: function (data) {
                    response(data);
                }
            });
        },
        search: function () {
            $(this).addClass('loading');
        },
        open: function () {
            $(this).removeClass('loading');
        }
    })
        .autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<a href='" + APP_URL + "/help/article/" + item.id + "/" + item.question + "' class='article-link article-link-panel link-reset'><div class='hover-item__content'><div class='col-middle-alt article-link-left'><i class='icon icon-light-gray icon-size-2 article-link-icon icon-description'></i></div><div class='col-middle-alt article-link-right'>" + item.value + "</div></div></a>")
            .appendTo(ul);
    };

}]);

app.controller('reviews_edit_host', ['$scope', '$http', function ($scope, $http) {

    $('.next-facet').click(function () {
        $('#double-blind-copy').addClass('hide');
        $('#host-summary').removeClass('hide');
        $('#guest').removeClass('hide');
    });

    $('.review_submit').click(function () {
        var section = $(this).parent().parent().attr('id');

        var data_params = {};

        $('#' + section + '-form input, #' + section + ' textarea').each(function () {
            if ($(this).attr('type') != 'radio') {
                data_params[$(this).attr('name')] = $(this).val();
            }
            else {
                if ($(this).is(':checked'))
                    data_params[$(this).attr('name')] = $(this).val();
            }
        });

        var id = $('#reservation_id').val();
        if (section == 'host-summary' || section == 'guest') {
            if ($('#review_comments').val() == '') {
                $('[for="review_comments"]').show();
                $('#review_comments').addClass('invalid');
                return false;
            }
            else {
                $('[for="review_comments"]').hide();
                $('#review_comments').removeClass('invalid');
            }
            if (section == 'host-summary') {
                if (!$('[name="rating"]').is(':checked')) {
                    $('[for="review_rating"]').show();
                    return false;
                }
                else
                    $('[for="review_rating"]').hide();
            }
        }

        data_params['review_id'] = $('#review_id').val();

        var data = JSON.stringify(data_params);

        $('.review-container').addClass('loading');
        $http.post(APP_URL + '/reviews/edit/' + id, {data: data}).then(function (response) {
            $('.review-container').removeClass('loading');
            if (response.data.success) {
                if (section == 'host-details' || section == 'guest')
                    window.location.href = APP_URL + '/users/reviews';
                $('#review_id').val(response.data.review_id);
                $('#' + section).addClass('hide');
                $('#' + section).next().removeClass('hide');
            }
        });
    });

}]);

$(document).on('change', '#user_profile_pic', function () {
    $('#ajax_upload_form').submit();
});

// cancel reservation

$(document).ready(function () {

    $("[id$='-trigger']").click(function () {

        var reservation_id = $(this).attr('id').replace('-trigger', '');
        $("#reserve_code").val(reservation_id);
        $("#reserve_id").val(reservation_id);
        //$("#cancel_reservation_form").attr('action' , APP_URL+'/trips/guest_cancel_reservation')
        var id = '#cancel-modal';
        $(id).removeClass('hide');
        $(id).addClass('show');
        $(id).attr('aria-hidden', 'false');
    });

    $("[id$='-trigger-pending']").click(function () {

        var reservation_id = $(this).attr('id').replace('-trigger-pending', '');
        $("#reserve_code_pending").val(reservation_id);
        $("#reserve_id").val(reservation_id);
        //$("#cancel_reservation_form").attr('action' , APP_URL+'/trips/guest_cancel_pending_reservation')
        var id = '#pending-cancel-modal';
        $(id).removeClass('hide');
        $(id).addClass('show');
        $(id).attr('aria-hidden', 'false');
    });

    $('[data-behavior="modal-close"]').click(function (event) {
        event.preventDefault();
        $('.modal').removeClass('show');
        $('.modal').attr('aria-hidden', 'true');
    });

    // $('#decline_reason').change(function()
    // {
    //     if($(this).val() == 'other')
    //     {
    //         $('#decline_reason_other_div').removeClass('hide');
    //         $('#decline_reason_other_div').addClass('show');
    //     }
    // });

});
