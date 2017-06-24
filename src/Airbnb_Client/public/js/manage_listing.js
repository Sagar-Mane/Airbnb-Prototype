app.controller('manage_listing', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

$(document).on('click', '[data-track="welcome_modal_finish_listing"]', function()
{
	var data_params = {};

	data_params['started'] = 'Yes';

	var data = JSON.stringify(data_params);

	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		$('.welcome-new-host-modal').attr('aria-hidden', 'true');
	});
});

$(document).on('change', '[id^="basics-select-"], [id^="select-"]', function()
{
	var data_params = {};

	data_params[$(this).attr('name')] = $(this).val();

	var data = JSON.stringify(data_params);

	var saving_class = $(this).attr('data-saving');

	$('.'+saving_class+' h5').text('Saving...');
	$('.'+saving_class).fadeIn();

	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('.'+saving_class+' h5').text('Saved!');
     		$('.'+saving_class).fadeOut();
     		$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
     	if(response.data.redirect != '' && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
     	if($scope.beds != '' && $scope.bedrooms != '' && $scope.bathrooms != '' && $scope.bed_type != '')
    	{
    		var track = saving_class.substring(0, saving_class.length - 1);
    		$('[data-track="'+track+'"] a div div .transition').removeClass('visible');
    		$('[data-track="'+track+'"] a div div .transition').addClass('hide');
    		$('[data-track="'+track+'"] a div div .pull-right .nav-icon').removeClass('hide');
    	}
    });

    if($(this).attr('name') == 'beds')
    {
    	if($(this).val() != '')
    	$('#beds_show').show();
    }

});

$(document).on('blur', '[class^="overview-"]', function()
{
	var data_params = {};

	data_params[$(this).attr('name')] = $(this).val();

	var data = JSON.stringify(data_params);

	if($(this).val() != '')
	{
		$('.saving-progress h5').text('Saving...');
		$('.saving-progress').fadeIn();

		$('.name_required_msg').addClass('hide');
		$('.summary_required_msg').addClass('hide');
		$('.name_required').removeClass('invalid');
		$('.summary_required').removeClass('invalid');

	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('.saving-progress h5').text('Saved!');
     		$('.saving-progress').fadeOut();
     		$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
     	if($scope.name != '' && $scope.summary != '')
    	{
    		$('[data-track="description"] a div div .transition').removeClass('visible');
    		$('[data-track="description"] a div div .transition').addClass('hide');
    		$('[data-track="description"] a div div div .icon-ok-alt').removeClass('hide');
    	}
    });
	}
	else
	{ 
	  if($(this).attr('name') == 'name')
	  {
	  	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
	  	$('.name_required').addClass('invalid');
	 	$('.name_required_msg').removeClass('hide');

	 	$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
	 });
	  }
	  else
	  {
	  	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
	  	$('.summary_required').addClass('invalid');
	  	$('.summary_required_msg').removeClass('hide');

	 	$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
	 });
	  	
	  }
    	$('[data-track="description"] a div div .transition').removeClass('hide');
    	$('[data-track="description"] a div div .transition .icon').removeClass('hide');
    	$('[data-track="description"] a div div div .icon-ok-alt').addClass('hide');
    	$('[data-track="description"] a div div div .icon-ok-alt').removeClass('visible');
	}	
});

$(document).on('click', '.nav-item a, .next_step a, #calendar_edit_cancel', function()
{
	if($(this).attr('href') != '')
	{
	var data_params = {};
	var loading = '<div class="" id="js-manage-listing-content-container"><div class="manage-listing-content-wrapper" style="height:100%;"><div class="manage-listing-content" id="js-manage-listing-content"><div><div class="row-space-top-6 basics-loading loading"></div></div></div></div></div>';

	$( "#ajax_container" ).html(loading);

	$http.post($(this).attr('href').replace('manage-listing','ajax-manage-listing'), { data: data_params }).then(function(response) {
		$( "#ajax_container" ).html( $compile(response.data)($scope) );
    });

	var ex_pathname = (window.location.href).split('/');
	var cur_step = $(ex_pathname).get(-1);

	$('#href_'+cur_step).attr('href',window.location.href);

	var ex_pathname = $(this).attr('href').split('/');
	var next_step = $(ex_pathname).get(-1);

	if(next_step != 'calendar')
	{
		$('.manage-listing-row-container').removeClass('has-collapsed-nav');
	}
	else
	{
		if($('#room_status').val() != '')
		{
		$('.manage-listing-row-container').addClass('has-collapsed-nav');
		$('#js-manage-listing-nav').addClass('collapsed');
		}
	}

	if(cur_step == 'calendar' || next_step == 'calendar')
	{
	$http.post($(this).attr('href').replace('manage-listing','ajax-header'), { }).then(function(response) {
		$( "#ajax_header" ).html( $compile(response.data)($scope) );
    });
	}

	$scope.step = next_step;

	window.history.pushState({path:$(this).attr('href')},'',$(this).attr('href'));

	return false;
	}
});

$(document).on('click', '#show_long_term', function()
{
	$('#js-long-term-prices').removeClass('hide');
	$('#js-set-long-term-prices').addClass('hide');
});

$(document).on('click', '#js-add-address, #js-edit-address', function()
{
	var data_params = {};

	$scope.autocomplete_used = false;

	data_params['country'] = $scope.country;
	data_params['address_line_1'] = $scope.address_line_1;
	data_params['address_line_2'] = $scope.address_line_2;
	data_params['city'] = $scope.city;
	data_params['state'] = $scope.state;
	data_params['postal_code'] = $scope.postal_code;
	data_params['latitude'] = $scope.latitude;
	data_params['longitude'] = $scope.longitude;

	var data = JSON.stringify(data_params);

	$('#js-address-container').addClass('enter_address');
	$('#address-flow-view .modal').fadeIn();
	$('#address-flow-view .modal').attr('aria-hidden','false');
	$http.post((window.location.href).replace('manage-listing','enter_address'), { data:data }).then(function(response) 
	{
		$( "#js-address-container" ).html( $compile(response.data)($scope) );
		initAutocomplete();
    });
});

$(document).on('click', '#js-next-btn', function()
{
	var data_params = {};

	data_params['country'] = $scope.country = $('#country').val();
	data_params['address_line_1'] = $scope.address_line_1 = $('#address_line_1').val();
	data_params['address_line_2'] = $scope.address_line_2 = $('#address_line_2').val();
	data_params['city'] = $scope.city = $('#city').val();
	data_params['state'] = $scope.state = $('#state').val();
	data_params['postal_code'] = $scope.postal_code = $('#postal_code').val();
	data_params['latitude'] = $scope.latitude;
	data_params['longitude'] = $scope.longitude;

	var data = JSON.stringify(data_params);
	if(!$scope.autocomplete_used)
		$scope.location_found = true;
	$('#js-address-container .panel').addClass('loading');
	$http.post((window.location.href).replace('manage-listing','location_not_found'), { data:data }).then(function(response) 
	{
		$('#js-address-container .panel').removeClass('loading');
		$('#js-address-container').addClass('location_not_found');
		$( "#js-address-container" ).html( $compile(response.data)($scope) );
    });
});

$(document).on('click', '#js-next-btn2', function()
{
	var data_params = {};

	if(!$scope.autocomplete_used) {
		var geocoder =  new google.maps.Geocoder();
    	geocoder.geocode( { 'address': $scope.city+', '+$scope.state+', '+$scope.country }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $scope.latitude = results[0].geometry.location.lat();
            $scope.longitude = results[0].geometry.location.lng(); 
          } else {
          }
        });
        $scope.location_found = false;
	}

	data_params['country'] = $scope.country;
	data_params['address_line_1'] = $scope.address_line_1;
	data_params['address_line_2'] = $scope.address_line_2;
	data_params['city'] = $scope.city;
	data_params['state'] = $scope.state;
	data_params['postal_code'] = $scope.postal_code;
	data_params['latitude'] = $scope.latitude;
	data_params['longitude'] = $scope.longitude;

	var data = JSON.stringify(data_params);
	$('#js-address-container .panel').addClass('loading');
	$http.post((window.location.href).replace('manage-listing','verify_location'), { data:data }).then(function(response) 
	{
		$('#js-address-container .panel').removeClass('loading');
		$('#js-address-container').addClass('location_not_found');
		$( "#js-address-container" ).html( $compile(response.data)($scope) );
		setTimeout(function()
		{
			initMap();
		},100);
    });
});

$(document).on('click', '#js-next-btn3', function()
{
	var data_params = {};

	data_params['country'] = $scope.country = $('#country').val();
	data_params['address_line_1'] = $scope.address_line_1 = $('#address_line_1').val();
	data_params['address_line_2'] = $scope.address_line_2 = $('#address_line_2').val();
	data_params['city'] = $scope.city = $('#city').val();
	data_params['state'] = $scope.state = $('#state').val();
	data_params['postal_code'] = $scope.postal_code = $('#postal_code').val();
	data_params['latitude'] = $scope.latitude;
	data_params['longitude'] = $scope.longitude;

	var data = JSON.stringify(data_params);

	$('#js-address-container .panel:first').addClass('loading');
	$http.post((window.location.href).replace('manage-listing','finish_address'), { data:data }).then(function(response) 
	{
		$('#js-address-container .panel').removeClass('loading');

		$('.location-map-container-v2').removeClass('empty-map');
		$('.location-map-container-v2').addClass('map-spotlight-v2');

		$('.location-map-pin-v2').removeClass('moving');
		$('.location-map-pin-v2').addClass('set');
		$('.address-static-map img').remove();
		$('.address-static-map').append('<img width="570" height="275" src="https://maps.googleapis.com/maps/api/staticmap?size=570x275&amp;center='+response.data.latitude+','+response.data.longitude+'&amp;zoom=15&amp;maptype=roadmap&amp;sensor=false&key='+map_key+'">');

		$('.panel-body .text-center').remove();

		$('.panel-body address').removeClass('hide');
		$('.panel-body .js-edit-address-link').removeClass('hide');
		var address_line_2 = (response.data.address_line_2 != '') ? ' / '+response.data.address_line_2 : '';
		$('.panel-body address span:nth-child(1)').text(response.data.address_line_1+address_line_2);
		$('.panel-body address span:nth-child(2)').text(response.data.city + ' '+ response.data.state);
		$('.panel-body address span:nth-child(3)').text(response.data.postal_code);
		$('.panel-body address span:nth-child(4)').text(response.data.country_name);

		$('[data-track="location"] a div div .transition').removeClass('visible');
    	$('[data-track="location"] a div div .transition').addClass('hide');
    	$('[data-track="location"] a div div div .icon-ok-alt').removeClass('hide');

		$('#address-flow-view .modal').fadeOut();
		$('#address-flow-view .modal').attr('aria-hidden','true');
		$('#steps_count').text(response.data.steps_count);
		$scope.steps_count = response.data.steps_count;
		$scope.location_found = false;
    });
});

$(document).on('click', '.modal-close, [data-behavior="modal-close"], .panel-close', function()
{
	$('.modal').fadeOut();
	$('.tooltip').css('opacity','0');
	$('.tooltip').attr('aria-hidden','true');
	$('.modal').attr('aria-hidden','true');
});

initAutocomplete(); // Call Google Autocomplete Initialize Function

// Google Place Autocomplete Code
$scope.location_found = false;
$scope.autocomplete_used = false;
var autocomplete;

function initAutocomplete()
{
	autocomplete = new google.maps.places.Autocomplete(document.getElementById('address_line_1'));
  	autocomplete.addListener('place_changed', fillInAddress);


	/*if($('#address_line_1').val() == '' || $('#state').val() == '' || $('#city').val() == '' )
	{
		$('#js-next-btn').prop('disabled', true);
	}*/

}

$( "#address-flow-view .modal" ).scroll(function() {
 	$(".pac-container").hide();
});

function fillInAddress() 
{
	$scope.autocomplete_used = true;
  	fetchMapAddress(autocomplete.getPlace());
}

if($('#state').val() || $('#city').val() == '')
{
	$('#js-next-btn').prop('disabled', true);
}

$(document).on('keyup', '#state', function()
{
	if($(this).val() == '')
		$('#js-next-btn').prop('disabled', true);
	else
		$('#js-next-btn').prop('disabled', false);
});

$(document).on('keyup', '#city', function()
{
	if($(this).val() == '')
		$('#js-next-btn').prop('disabled', true);
	else
		$('#js-next-btn').prop('disabled', false);
});
/*$(document).on('click', '#address_line_1', function()
{
	if($(this).val() == '')
		$('#js-next-btn').prop('disabled', true);
	else
		$('#js-next-btn').prop('disabled', false);
});*/


var map, geocoder;
function initMap() {

  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parseFloat($scope.latitude), lng: parseFloat($scope.longitude) },
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    }
  });
  
  $('<div/>').addClass('verify-map-pin').appendTo(map.getDiv()).click(function(){
});

map.addListener('dragend', function(){
 	geocoder.geocode({'latLng': map.getCenter()}, function(results, status) 
 	{
		if (status == google.maps.GeocoderStatus.OK) 
		{
			if (results[0]) 
			{
				fetchMapAddress(results[0]);
				$('#js-next-btn3').prop('disabled',false);
			}
		}
	});
       $('.verify-map-pin').removeClass('moving');
       $('.verify-map-pin').addClass('unset');
});

map.addListener('zoom_changed', function(){
 	geocoder.geocode({'latLng': map.getCenter()}, function(results, status) 
 	{
		if (status == google.maps.GeocoderStatus.OK) 
		{
			if (results[0]) 
			{
				fetchMapAddress(results[0]);
			}
		}	
	});
});

map.addListener('drag', function(){
    $('.verify-map-pin').removeClass('unset');
    $('.verify-map-pin').addClass('moving');
});

}

function fetchMapAddress(data)
{
	//console.log(data);
	if(data['types'] == 'street_address')
		$scope.location_found = true;
	var componentForm = {
  		street_number: 'short_name',
  		route: 'long_name',
  		sublocality_level_1: 'long_name',
  		sublocality: 'long_name',
  		locality: 'long_name',
  		administrative_area_level_1: 'long_name',
  		country: 'short_name',
  		postal_code: 'short_name'
	};

	$('#city').val('');
  	$('#state').val('');
  	$('#country').val('');
  	$('#address_line_1').val('');
  	$('#address_line_2').val('');
  	$('#postal_code').val('');

  	var place = data;
  	$scope.street_number = '';
  	for (var i = 0; i < place.address_components.length; i++) 
  	{
    	var addressType = place.address_components[i].types[0];
    	if (componentForm[addressType]) 
    	{
    	  var val = place.address_components[i][componentForm[addressType]];
    	
			if(addressType       == 'street_number')
				$scope.street_number = val;
			if(addressType       == 'route') {
				var street_address = $scope.street_number+' '+val;
				$('#address_line_1').val($.trim(street_address));
			}
			if(addressType       == 'postal_code')
				$('#postal_code').val(val);
			if(addressType       == 'locality')
				$('#city').val(val);
			if(addressType       == 'administrative_area_level_1')
				$('#state').val(val);
			if(addressType       == 'country')
				$('#country').val(val);
    	}
  	}

	var address   = $('#address_line_1').val();
	var latitude  = place.geometry.location.lat();
	var longitude = place.geometry.location.lng();

    /*if($('#address_line_1').val() == '')
    	$('#address_line_1').val($('#city').val());*/

    if($('#state').val() == '' || $('#city').val() == '')
		$('#js-next-btn').prop('disabled', true);
	else
		$('#js-next-btn').prop('disabled', false);

	$scope.latitude = latitude;
	$scope.longitude = longitude;
}

$(document).on('click', '[name="amenities"]', function()
{
	var value = '';
	$('[name="amenities"]').each(function()
	{
	if ($(this).prop('checked')==true)
 	{ 
    	value = value+$(this).val()+',';
 	}
 	});

 	var saving_class = $(this).attr('data-saving');

 	$('.'+saving_class+' h5').text('Saving...');
	$('.'+saving_class).fadeIn();

	$http.post('update_amenities', { data : value }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('.'+saving_class+' h5').text('Saved!');
     		$('.'+saving_class).fadeOut();
     	}else{
     		if(response.data.redirect != ''  && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
     	}
    });
});

$(document).on('click', '#photo-uploader', function()
{
	$('#upload_photos').trigger('click');
});

$(document).on('click', '#js-photo-grid-placeholder', function()
{
	$('#upload_photos2').trigger('click');
});

$scope.featured_image = function(index, photo_id) {
	$http.post('featured_image', { id : $('#room_id').val(), photo_id: photo_id }).then(function(response) 
	{
		
    });
};

function upload()
{
upload2();
$(document).on("change", '#upload_photos', function() {
	var loading = '<div class="" id="js-manage-listing-content-container"><div class="manage-listing-content-wrapper" style="height:100%;z-index:9;"><div class="manage-listing-content" id="js-manage-listing-content"><div><div class="row-space-top-6 basics-loading loading"></div></div></div></div></div>';
	$( "#js-photo-grid" ).append(loading);
	jQuery.ajaxFileUpload({
        url: "../../add_photos/"+$('#room_id').val(),
        secureuri: false,
        fileElementId: "upload_photos",
        dataType: "json",
        async: false,
        success: function(response){
        	$( "#js-photo-grid #js-manage-listing-content-container" ).remove();
        if(response.error_title)
        {
        	$('#js-error .panel-header').text(response.error_title);
        	$('#js-error .panel-body').text(response.error_description);
        	$('.js-delete-photo-confirm').addClass('hide');
        	$('#js-error').attr('aria-hidden',false);
        }
        else
        {
        	$scope.$apply(function()
        	{
           		$scope.photos_list = response;
           		$('#photo_count').css('display','block');
           		$('#steps_count').text(response[0].steps_count);
           		$scope.steps_count = response[0].steps_count;
       		});
       		
           	$('#upload_photos').reset();
       	}
       	upload();
        }
    });
});
}

function upload2()
{
$(document).on("change", '#upload_photos2', function() {
	var loading = '<div class="" id="js-manage-listing-content-container"><div class="manage-listing-content-wrapper" style="height:100%;z-index:9;"><div class="manage-listing-content" id="js-manage-listing-content"><div><div class="row-space-top-6 basics-loading loading"></div></div></div></div></div>';
	$( "#js-photo-grid" ).append(loading);
	jQuery.ajaxFileUpload({
        url: "../../add_photos/"+$('#room_id').val(),
        secureuri: false,
        fileElementId: "upload_photos2",
        dataType: "json",
        async: false,
        success: function(response){
        	$( "#js-photo-grid #js-manage-listing-content-container" ).remove();
           if(response.error_title)
        {
        	$('#js-error .panel-header').text(response.error_title);
        	$('#js-error .panel-body').text(response.error_description);
        	$('.js-delete-photo-confirm').addClass('hide');
        	$('#js-error').attr('aria-hidden',false);
        }
        else
        {
        	$scope.$apply(function()
        	{
           		$scope.photos_list = response;
           		$('#photo_count').css('display','block');
           		$('#steps_count').text(response[0].steps_count);
           		$scope.steps_count = response[0].steps_count;
        	});

           	$('#upload_photos2').reset();
       	}
       	upload2();
        }
    });
});
}

function photos_list()
{
$http.get('photos_list', { }).then(function(response) 
{
	$scope.photos_list = response.data;
	if(response.data.length > 0)
	{
	$('#photo_count').css('display','block');
	}
});
}

upload();

/* ajaxfileupload */
jQuery.extend({ handleError: function( s, xhr, status, e ) {if ( s.error ) s.error( xhr, status, e ); else if(xhr.responseText) console.log(xhr.responseText); } });
jQuery.extend({createUploadIframe:function(e,t){var r="jUploadFrame"+e;if(window.ActiveXObject){var n=document.createElement("iframe");n.id=n.name=r,"boolean"==typeof t?n.src="javascript:false":"string"==typeof t&&(n.src=t)}else{var n=document.createElement("iframe");n.id=r,n.name=r}return n.style.position="absolute",n.style.top="-1000px",n.style.left="-1000px",document.body.appendChild(n),n},createUploadForm:function(e,t){var r="jUploadForm"+e,n="jUploadFile"+e,o=jQuery('<form  action="" method="POST" name="'+r+'" id="'+r+'" enctype="multipart/form-data"></form>'),a=jQuery("#"+t),u=jQuery(a).clone();return jQuery(a).attr("id",n),jQuery(a).before(u),jQuery(a).appendTo(o),jQuery(o).css("position","absolute"),jQuery(o).css("top","-1200px"),jQuery(o).css("left","-1200px"),jQuery(o).appendTo("body"),o},ajaxFileUpload:function(e){e=jQuery.extend({},jQuery.ajaxSettings,e);var t=(new Date).getTime(),r=jQuery.createUploadForm(t,e.fileElementId),n=(jQuery.createUploadIframe(t,e.secureuri),"jUploadFrame"+t),o="jUploadForm"+t;e.global&&!jQuery.active++&&jQuery.event.trigger("ajaxStart");var a=!1,u={};e.global&&jQuery.event.trigger("ajaxSend",[u,e]);var c=function(t){var o=document.getElementById(n);try{o.contentWindow?(u.responseText=o.contentWindow.document.body?o.contentWindow.document.body.innerHTML:null,u.responseXML=o.contentWindow.document.XMLDocument?o.contentWindow.document.XMLDocument:o.contentWindow.document):o.contentDocument&&(u.responseText=o.contentDocument.document.body?o.contentDocument.document.body.innerHTML:null,u.responseXML=o.contentDocument.document.XMLDocument?o.contentDocument.document.XMLDocument:o.contentDocument.document)}catch(c){jQuery.handleError(e,u,null,c)}if(u||"timeout"==t){a=!0;var d;try{if(d="timeout"!=t?"success":"error","error"!=d){var l=jQuery.uploadHttpData(u,e.dataType);e.success&&e.success(l,d),e.global&&jQuery.event.trigger("ajaxSuccess",[u,e])}else jQuery.handleError(e,u,d)}catch(c){d="error",jQuery.handleError(e,u,d,c)}e.global&&jQuery.event.trigger("ajaxComplete",[u,e]),e.global&&!--jQuery.active&&jQuery.event.trigger("ajaxStop"),e.complete&&e.complete(u,d),jQuery(o).unbind(),setTimeout(function(){try{jQuery(o).remove(),jQuery(r).remove()}catch(t){jQuery.handleError(e,u,null,t)}},100),u=null}};e.timeout>0&&setTimeout(function(){a||c("timeout")},e.timeout);try{var r=jQuery("#"+o);jQuery(r).attr("action",e.url),jQuery(r).attr("method","POST"),jQuery(r).attr("target",n),r.encoding?r.encoding="multipart/form-data":r.enctype="multipart/form-data",jQuery(r).submit()}catch(d){jQuery.handleError(e,u,null,d)}return window.attachEvent?document.getElementById(n).attachEvent("onload",c):document.getElementById(n).addEventListener("load",c,!1),{abort:function(){}}},uploadHttpData:function(r,type){var data=!type;return data="xml"==type||data?r.responseXML:r.responseText,"script"==type&&jQuery.globalEval(data),"json"==type&&eval("data = "+data),"html"==type&&jQuery("<div>").html(data).evalScripts(),data}});

$scope.delete_photo = function(item, id)
{
	$('#js-error .panel-header').text("Delete Photo");
    $('#js-error .panel-body').text("Are you sure you wish to delete this photo? It's a nice one!");
    $('.js-delete-photo-confirm').removeClass('hide');
    $('#js-error').attr('aria-hidden',false);
    $('.js-delete-photo-confirm').attr('data-id',id);
    var index=$scope.photos_list.indexOf(item);
    $('.js-delete-photo-confirm').attr('data-index',index);
};

$(document).on('click', '.js-delete-photo-confirm', function()
{
	var index = $(this).attr('data-index');
	$http.post('delete_photo', { photo_id : $(this).attr('data-id') }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$scope.photos_list.splice(index,1);
			$('#js-error').attr('aria-hidden',true);
			// photos_list();
			$('#steps_count').text(response.data.steps_count);
			$scope.steps_count = response.data.steps_count;
	
     	}else{
     		if(response.data.redirect != '' && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
     	}
    });
});

$scope.$watch('photos_list', function (value) {

	if($scope.photos_list != undefined)
	{
     if($scope.photos_list.length != 0)
	{
		$('[data-track="photos"] a div div .transition').removeClass('visible');
    	$('[data-track="photos"] a div div .transition').addClass('hide');
    	$('[data-track="photos"] a div div div .icon-ok-alt').removeClass('hide');
	}
	else
	{
		$('[data-track="photos"] a div div .transition').removeClass('hide');
    	$('[data-track="photos"] a div div div .icon-ok-alt').addClass('hide');
	}
	}
});

$scope.$watch('steps_count', function (value) {

	if($scope.steps_count != undefined)
	{
		if($scope.steps_count == 0)
		{
			$('#finish_step').hide();
			$('.js-steps-remaining').addClass('hide');
			$('.js-steps-remaining').removeClass('show');
			$('#js-list-space-button').css('display','');
			$('#js-list-space-tooltip').attr('aria-hidden','false');
			setTimeout(function() {$('#js-list-space-tooltip').attr('aria-hidden','true');}, 3000);
			$('#js-list-space-tooltip').css({'opacity':'1','top': 'auto','bottom':'175px','left':'80px'});
			$('#js-list-space-tooltip').removeClass("animated").addClass("animated");
		}
		else
		{
			$('#finish_step').show();
			$('.js-steps-remaining').removeClass('hide');
			$('.js-steps-remaining').addClass('show');
			$('#js-list-space-button').css('display','none');
			$('#js-list-space-tooltip').attr('aria-hidden','true');
			$('#js-list-space-tooltip').css({'opacity':'0','top': '470px','bottom':'175px','left':'80px' });
		}
	}
});

/*$scope.over_first_photo = function(index)
{
	if(index == 0)
	$('#js-first-photo-text').removeClass('invisible');
};

$scope.out_first_photo = function(index)
{
	if(index == 0)
	$('#js-first-photo-text').addClass('invisible');
};
*/
$scope.keyup_highlights = function(id, value)
{
	$http.post('photo_highlights', { photo_id : id, data : value }).then(function(response) 
	{
		if(response.data.redirect != '' && response.data.redirect != undefined){
 			window.location = response.data.redirect;
 		}

    });
};

$(document).on('change', '[id^="price-select-"]', function()
{
	var data_params = {};

	data_params[$(this).attr('name')] = $(this).val();
	data_params['night'] = $('#price-night').val();
	data_params['currency_code'] = $('#price-select-currency_code').val();

	var data = JSON.stringify(data_params);

	var saving_class = $(this).attr('data-saving');

	$('.'+saving_class+' h5').text('Saving...');
	$('.'+saving_class).fadeIn();

	$http.post('update_price', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('[data-error="price"]').text('');
			$('[data-error="weekly_price"]').text('');
			$('[data-error="monthly_price"]').text('');
			$('.input-prefix').html(response.data.currency_symbol);
			$('.'+saving_class+' h5').text('Saved!');
     		$('.'+saving_class).fadeOut();
     		$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
     	else
     	{	
     		if(response.data.redirect != '' && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
     		$('[data-error="price"]').html(response.data.msg);
     		$('.'+saving_class).fadeOut();
     	}
    });
});

$(document).on('blur', '.autosubmit-text[id^="price-"]', function()
{
	var data_params = {};

	data_params[$(this).attr('name')] = $(this).val();
	this_val = Math.round($(this).val()); 
	$(this).val(this_val);
	data_params['currency_code'] = $('#price-select-currency_code').val();
	if($(this).attr('name') == 'additional_guest'){
		data_params['guests'] = $('#price-select-guests_included').val();
	}
	var data = JSON.stringify(data_params);

	var saving_class = $(this).attr('data-saving');
	var error_class = 'price'; 
	if($(this).attr('name') != 'night'){ error_class = $(this).attr('name'); }
	$('.'+saving_class+' h5').text('Saving...');

	if($('#price-night').val() != 0)
	{
	$('.'+saving_class).fadeIn();
	$http.post('update_price', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('[data-error="'+error_class+'"]').text('');
			$('.input-prefix').html(response.data.currency_symbol);
			$('.'+saving_class+' h5').text('Saved!');
     		$('.'+saving_class).fadeOut();
     		$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
     	else
     	{
     		if(response.data.redirect != '' && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
     		if(response.data.attribute != '' && response.data.attribute != undefined){
     			$('[data-error="'+response.data.attribute+'"]').removeClass('hide');
     			$('[data-error="'+response.data.attribute+'"]').html(response.data.msg);
     		}else{
     			$('[data-error="price"]').html(response.data.msg);
     		}
     		$('.'+saving_class).fadeOut();
     	}
     	if($('#price-night').val() != 0)
		{
			$('#price-night-old').val($('#price-night').val());
			$('[data-track="pricing"] a div div .transition').removeClass('visible');
    		$('[data-track="pricing"] a div div .transition').addClass('hide');
    		$('[data-track="pricing"] a div div div .icon-ok-alt').removeClass('hide');
		}
    });
	}
	else
	{
		if($('#price-night-old').val() == 0)
		{
			$('#price-night').val($('#price-night-old').val());
    		$('[data-track="pricing"] a div div .transition').removeClass('hide');
    		$('[data-track="pricing"] a div div div .icon-ok-alt').addClass('hide');
    	}
    	else
    	{
    		$('#price-night').val($('#price-night-old').val());
			$('[data-track="pricing"] a div div .transition').removeClass('visible');
    		$('[data-track="pricing"] a div div .transition').addClass('hide');
    		$('[data-track="pricing"] a div div div .icon-ok-alt').removeClass('hide');	
    	}
	}
});

$(document).on('change', '[id$="_checkbox"]', function()
{
	if($(this).prop('checked') == false)
	{
		var data_params = {};

		var id = $(this).attr('id');
		var selector = '[data-checkbox-id="'+id+'"] > div > div > div > input';

		$(selector).val('');

		if(id == 'price_for_extra_person_checkbox')
		{
			$('[data-checkbox-id="'+id+'"] > div > div > #guests-included-select > div > select').val(1);
			
			data_params[$('[data-checkbox-id="'+id+'"] > div > div > #guests-included-select > div > select').attr('name')] = 1;
		}

	data_params[$(selector).attr('name')] = $(selector).val();
	data_params['currency_code'] = $('#price-select-currency_code').val();

	var data = JSON.stringify(data_params);

	var saving_class = $(selector).attr('data-saving');

	$('.'+saving_class+' h5').text('Saving...');
	$('.'+saving_class).fadeIn();

	$http.post('update_price', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('.input-prefix').html(response.data.currency_symbol);
			$('.'+saving_class+' h5').text('Saved!');
     		$('.'+saving_class).fadeOut();
     		$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}
    });
	}
});

$(document).on('click', '[id^="available-"]', function()
{
	var data_params = {};

	var value = $(this).attr('data-slug');

	data_params['calendar_type'] = value.charAt(0).toUpperCase() + value.slice(1);;

	var data = JSON.stringify(data_params);	

	$('.saving-progress h5').text('Saving...');

	$('.saving-progress').fadeIn();

	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$scope.selected_calendar = value;
			$('[data-slug="'+value+'"]').addClass('selected');
			$('.saving-progress h5').text('Saved!');
     		$('.saving-progress').fadeOut();
     		$('#steps_count').text(response.data.steps_count);
     		$scope.steps_count = response.data.steps_count;
     	}else{
     		if(response.data.redirect != '' && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
     	}
    	$('[data-track="calendar"] a div div .transition').removeClass('visible');
    	$('[data-track="calendar"] a div div .transition').addClass('hide');
    	$('[data-track="calendar"] a div div .pull-right .nav-icon').removeClass('hide');
    });
});

$(document).on('mouseover', '[id^="available-"]', function()
{
	$('[id^="available-"]').removeClass('selected');
});

$(document).on('mouseout', '[id^="available-"]', function()
{
	$('[id="available-'+$scope.selected_calendar+'"]').addClass('selected');
});

var ex_pathname = (window.location.href).split('/');
$scope.step = $(ex_pathname).get(-1);
	photos_list();

$(document).on('click', '#finish_step', function()
{
	$http.get('rooms_steps_status', { }).then(function(response)
	{
		for(var key in response.data) 
		{
			if(response.data[key] == '0')
			{
				$('#href_'+key).trigger('click');
				return false;
			}
		}
	});
});

$(document).on('click', '#js-list-space-button', function()
{
	var data_params = {};

	data_params['status'] = 'Listed';

	var data = JSON.stringify(data_params);

	$http.post('update_rooms', { data:data }).then(function(response)
	{
		$http.get('rooms_data', {}).then(function(response)
		{
			$('#symbol_finish').html(response.data.symbol);
			$scope.popup_photo_name         = response.data.photo_name;
			$scope.popup_night              = response.data.night;
			$scope.popup_room_name          = response.data.name;
			$scope.popup_room_type_name     = response.data.room_type_name;
			$scope.popup_property_type_name = response.data.property_type_name;
			$scope.popup_state              = response.data.state;
			$scope.popup_country            = response.data.country_name;
			$('.finish-modal').attr('aria-hidden','false');
			$('.finish-modal').removeClass('hide');
		});
	});
});

$(document).on('blur', '[id^="help-panel"] > textarea', function()
{
	var data_params = {};

	var input_name = $(this).attr('name');
	
	data_params[input_name] = $(this).val();

	var data = JSON.stringify(data_params);

	$('.saving-progress h5').text('Saving...');
	
	if(input_name != 'neighborhood_overview' && input_name != 'transit')
		$('.help-panel-saving').fadeIn();
	else
		$('.help-panel-neigh-saving').fadeIn();
	
	$http.post('update_description', { data:data }).then(function(response)
	{
		if(response.data.success == 'true')
		{
			$('.saving-progress h5').text('Saved!');

			if(input_name != 'neighborhood_overview' && input_name != 'transit')
				$('.help-panel-saving').fadeOut();
			else
				$('.help-panel-neigh-saving').fadeOut();
		}else{
			if(response.data.redirect != '' && response.data.redirect != undefined){
     			window.location = response.data.redirect;
     		}
		}
	});
});

$(document).on('click', '#collapsed-nav', function()
{
	if($('#js-manage-listing-nav').hasClass('collapsed'))
    	$('#js-manage-listing-nav').removeClass('collapsed');
	else
    	$('#js-manage-listing-nav').addClass('collapsed');
 });

$(document).on('click', '.month-nav', function()
{
	var month = $(this).attr('data-month');
	var year = $(this).attr('data-year');

	var data_params = {};

	data_params['month'] = month;
	data_params['year'] = year;

	var data = JSON.stringify(data_params);

	$('.ui-datepicker-backdrop').removeClass('hide');
	$('.spinner-next-to-month-nav').addClass('loading');

	$http.post($(this).attr('href').replace('manage-listing','ajax-manage-listing'), { data:data }).then(function(response) {
		$( "#ajax_container" ).html( $compile(response.data)($scope) );
		$('.spinner-next-to-month-nav').removeClass('loading');
		$('.ui-datepicker-backdrop').addClass('hide');
    });
	return false;
});

$(document).on('change', '#calendar_dropdown', function()
{
	var year_month = $(this).val();
	var year = year_month.split('-')[0];
	var month = year_month.split('-')[1];

	var data_params = {};

	data_params['month'] = month;
	data_params['year'] = year;

	var data = JSON.stringify(data_params);

	$('.ui-datepicker-backdrop').removeClass('hide');
	$('.spinner-next-to-month-nav').addClass('loading');

	$http.post($(this).attr('data-href').replace('manage-listing','ajax-manage-listing'), { data:data }).then(function(response) {
		$('.ui-datepicker-backdrop').addClass('hide');
		$('.spinner-next-to-month-nav').removeClass('loading');
		$( "#ajax_container" ).html( $compile(response.data)($scope) );
    });
	return false;
});

 /*Start - Calendar Date Selection*/

$(document).on('click', '.tile', function()
{
	if(!$(this).hasClass('other-day-selected') && !$(this).hasClass('selected') && !$(this).hasClass('tile-previous'))
	{
		var current_tile = $(this).attr('id');
		$('#'+current_tile).addClass('first-day-selected last-day-selected selected');
		$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+current_tile+'> .date');

		var clicked_li = $(this).index();

		var start_top = $(this).position().top+36, start_left = $(this).position().left-5, end_top = start_top+5, end_left = start_left+85;
		
        //$('.tile-selection-handle').removeClass('hide');
	$('.days-container').append('<div><div style="left:'+start_left+'px;top:'+start_top+'px;" class="tile-selection-handle tile-handle-left"><div class="tile-selection-handle__inner"><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span></div></div></div><div><div style="left: '+end_left+'px; top: '+end_top+'px;" class="tile-selection-handle tile-handle-right"><div class="tile-selection-handle__inner"><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span></div></div></div>');


		$('.tile').each(function()
		{
			if(current_tile != $(this).attr('id'))
				$(this).addClass('other-day-selected');
		});

		calendar_edit_form();
	}else{
		if(!$(this).hasClass('selected')){

			$('.first-day-selected').removeClass('first-day-selected')
			$('.last-day-selected').removeClass('last-day-selected');
			$('.selected').removeClass('selected');  
			$('.tile-selection-container').remove(); 
			$('.tile-selection-handle').parent().remove(); 
			$('.other-day-selected').removeClass('other-day-selected');
			$('.calendar-edit-form').addClass('hide');
			
		}
	}
});
$(document).on('mouseup', '.tile-selection-handle, .tile', function()
{
	selected_li_status = 0;

	var last_id = $('.selected').last().attr('id');
	var first_id = $('.selected').first().attr('id');

	$('*').removeClass('first-day-selected last-day-selected');
	$('.selected').first().addClass('first-day-selected');
	$('.selected').last().addClass('last-day-selected');

	var position = $('#'+last_id).position();
	var first_position = $('#'+first_id).position();

	var start_top = first_position.top+35, start_left = first_position.left-5, end_top = position.top+40, end_left = position.left+80;

	$('.days-container > div > .tile-selection-handle:last').remove();
	$('.days-container > div > .tile-selection-handle:first').remove();

	$('.days-container').append('<div><div style="left:'+start_left+'px;top:'+start_top+'px;" class="tile-selection-handle tile-handle-left"><div class="tile-selection-handle__inner"><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span></div></div></div><div><div style="left: '+end_left+'px; top: '+end_top+'px;" class="tile-selection-handle tile-handle-right"><div class="tile-selection-handle__inner"><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span><span class="tile-selection-handle__ridge"></span></div></div></div>');
		
	calendar_edit_form();
});


var selected_li_status = 0;
var direction = '';

$(document).on('mousedown', '.tile-selection-handle', function()
{
	selected_li_status = 1;
	if($(this).hasClass('tile-handle-left'))
		direction = 'left';
	else
		direction = 'right';
});

var oldx = 0;
var oldy = 0;

$(document).on('mouseover', '.tile', function(e)
{
	if(e.pageX > oldx && direction == 'right')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			var id = $(this).attr('id');
			$('#'+id).removeClass('other-day-selected');
			$('#'+id).addClass('selected');

			if(!$('#'+$(this).attr('id')+' > div').hasClass('tile-selection-container'))
			{
				$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+$(this).attr('id')+'> .date');
			}

			var last_index = $('.selected').last().index();
			var first_index = $('.selected').first().index();

			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');
			
			for(var i=(first_index+1); i<=last_index; i++)
			{
					var classd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				if(classd.includes("tile-previous")== false)
				{
				var id = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('id');
				$('#'+id).addClass('selected');
				$('#'+id).removeClass('other-day-selected');

				if(!$('#'+id+' > div').hasClass('tile-selection-container'))
				{
					$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
				}
				}
				else
					return false;
			}
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}
	}
	else if(e.pageX < oldx && direction == 'right')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			var id = $(".days-container > .list-unstyled > li:nth-child("+$(this).index()+")").next().next().attr('id');

			var id2 = $(".days-container > .list-unstyled > li:nth-child("+$(this).index()+")").next().attr('id');
			
			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');

			$('#'+id).removeClass('selected');
			$('#'+id).addClass('other-day-selected');
			$(this).removeClass('selected');
			$(this).addClass('other-day-selected');
			$('#'+id2+' > div.tile-selection-container').remove();
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}

		if($('.selected').length == 0)
		{
			selected_li_status = 0;
			$('.tile').each(function()
			{
				$(this).removeClass('other-day-selected last-day-selected first-day-selected');
				$('.tile-selection-container').remove();
				$('.tile-selection-handle').remove();
			});
		}
	}

	if(e.pageX > oldx && direction == 'left')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
		var id = $(".days-container > .list-unstyled > li:nth-child("+$(this).index()+")").attr('id');

		var id2 = $(".days-container > .list-unstyled > li:nth-child("+$(this).index()+")").attr('id');
		
		$('*').removeClass('first-day-selected last-day-selected');
		$('.selected').first().addClass('first-day-selected');
		$('.selected').last().addClass('last-day-selected');

		$('#'+id).removeClass('selected');
		$('#'+id).addClass('other-day-selected');
		$(this).removeClass('selected');
		$(this).addClass('other-day-selected');
		$('#'+id2+' > div.tile-selection-container').remove();
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}
	}
	else if(e.pageX < oldx && direction == 'left')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			var id = $(".days-container > .list-unstyled > li:nth-child("+$(this).index()+")").next().next().attr('id');

			var id2 = $(".days-container > .list-unstyled > li:nth-child("+$(this).index()+")").next().attr('id');
			
			$('#'+id).addClass('selected');
			$('#'+id).removeClass('other-day-selected');
			$(this).addClass('selected');
			$(this).removeClass('other-day-selected');

			var last_index = $('.selected').last().index();
			var first_index = $('.selected').first().index();
			
			for(var i=(first_index+1); i<=last_index; i++)
			{
				var classd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				if(classd.includes("tile-previous")== false)
				{
				var id = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('id');
				$('#'+id).addClass('selected');
				$('#'+id).removeClass('other-day-selected');

				if(!$('#'+id+' > div').hasClass('tile-selection-container'))
				{
					$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
				}
				$('#'+id).removeClass('first-day-selected last-day-selected');
			    }
			    else
			     return false;

			}

			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');

			if(!$('#'+id+' > div').hasClass('tile-selection-container'))
			{
				$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
			}
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}

		if($('.selected').length == 0)
		{
			selected_li_status = 0;
			$('.tile').each(function()
			{
				$(this).removeClass('other-day-selected last-day-selected first-day-selected');
				$('.tile-selection-container').remove();
				$('.tile-selection-handle').remove();
			});
		}
	}

	if(e.pageY > oldy && direction == 'right')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			var id = $(this).attr('id');
			$('#'+id).removeClass('other-day-selected');
			$('#'+id).addClass('selected');

			if(!$('#'+$(this).attr('id')+' > div').hasClass('tile-selection-container'))
			{
				$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+$(this).attr('id')+'> .date');
			}

			var last_index = $('.selected').last().index();
			var first_index = $('.selected').first().index();

			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');
			
			for(var i=(first_index+1); i<=last_index; i++)
			{
				var classd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				if(classd.includes("tile-previous")== false)
				{
				var id = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('id');
				$('#'+id).addClass('selected');
				$('#'+id).removeClass('other-day-selected');

				if(!$('#'+id+' > div').hasClass('tile-selection-container'))
				{
					$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
				}
			    }
			    else
			     return false;
			}
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}
	}

	if(e.pageY < oldy && direction == 'right')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			if(!$(this).hasClass('selected'))
			{
			var id = $(this).attr('id');
			var last_index = $(this).index();
			var first_index = $('.selected').first().index();
			
			$('.selected').addClass('other-day-selected');
			$('.selected').removeClass('selected');

			for(var i=(first_index+1); i<=(last_index+1); i++)
			{
				var idsd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				console.log(idsd);
			for(var i=(first_index+1);  i<=(last_index+1); i++)
			{
				var classd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				if(classd.includes("tile-previous")== false)
				{
				var id = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('id');
				$('#'+id).addClass('selected');
				$('#'+id).removeClass('other-day-selected');

				if(!$('#'+id+' > div').hasClass('tile-selection-container'))
				{
					$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
				}
			}
			else
				return false;
			}
			}
			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');
			}
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}
	}

	if(e.pageY < oldy && direction == 'left')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			var id = $(this).attr('id');
			$('#'+id).removeClass('other-day-selected');
			$('#'+id).addClass('selected');

			if(!$('#'+$(this).attr('id')+' > div').hasClass('tile-selection-container'))
			{
				$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+$(this).attr('id')+'> .date');
			}

			var last_index = $('.selected').last().index();
			var first_index = $('.selected').first().index();

			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');
			
			for(var i=(first_index+1); i<=last_index; i++)
			{
				var classd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				if(classd.includes("tile-previous")== false)
				{
				var id = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('id');
				$('#'+id).addClass('selected');
				$('#'+id).removeClass('other-day-selected');

				if(!$('#'+id+' > div').hasClass('tile-selection-container'))
				{
					$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
				}
			}
			    else
			    	return false;
			}
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}
	}

	if(e.pageY > oldy && direction == 'left')
	{
		if(selected_li_status == 1 && !$(this).hasClass('tile-previous'))
		{
			if(!$(this).hasClass('selected'))
			{
			var id = $(this).attr('id');
			var first_index = $(this).index();
			var last_index = $('.selected').last().index();
			
			$('.selected').addClass('other-day-selected');
			$('.selected').removeClass('selected');

			for(var i=(first_index+1); i<=(last_index+1); i++)
			{		
				var classd = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('class');
				if(classd.includes("tile-previous")== false)
				{			
				var id = $(".days-container > .list-unstyled > li:nth-child("+i+")").attr('id');
				$('#'+id).addClass('selected');
				$('#'+id).removeClass('other-day-selected');

				if(!$('#'+id+' > div').hasClass('tile-selection-container'))
				{
					$('<div class="tile-selection-container"><div class="tile-selection"></div></div>').insertBefore('#'+id+'> .date');
				}
				}
				else
					return false;			}
			$('*').removeClass('first-day-selected last-day-selected');
			$('.selected').first().addClass('first-day-selected');
			$('.selected').last().addClass('last-day-selected');
			}
		}
		else if($(this).hasClass('tile-previous'))
		{
			 $(this).trigger('mouseup');
		}
	}
	oldx = e.pageX;
	oldy = e.pageY;
});


function calendar_edit_form()
{
	$('.calendar-edit-form').removeClass('hide');

	if($('.selected').length > 1)
	{
		$('.calendar-edit-form > form > .panel-body').first().show();
	}
	else
	{
		$('.calendar-edit-form > form > .panel-body').first().hide();
	}

	if($('.selected').hasClass('status-b'))
	{
		$scope.segment_status = 'not available';
		$('#unavi').addClass("segmented-control__option--selected");
		$('#avi').removeClass("segmented-control__option--selected");
		$('#avi').removeClass("segmented-control__option--selected");
	}
	else
	{
		$scope.segment_status = 'available';
		$('#avi').addClass("segmented-control__option--selected")
		$('#unavi').removeClass("segmented-control__option--selected")
		$('#unavi').removeClass("segmented-control__option--selected")
	}
	$('#calendar-edit-end').val('');
	$('#calendar-edit-start').val('');
	var start_date = $('.first-day-selected').first().attr('id');
	var end_date = $('.last-day-selected').last().attr('id');

	$scope.calendar_edit_price = $('#'+start_date).find('.price > span:last').text();
	$('.sidebar-price').val($scope.calendar_edit_price);
	$scope.notes = $('#'+start_date).find('.tile-notes-text').text();
	$scope.isAddNote = ($scope.notes != '') ? true : false;
if(start_date!=end_date)
{
	$("#calendar-edit-start").datepicker({
    	dateFormat: "dd-mm-yy",
    	minDate: 0,
    	onSelect: function (date) 
    	{
    	    var checkout = $("#calendar-edit-start").datepicker('getDate');
    	    $('#calendar-edit-end').datepicker('option', 'minDate', checkout);
    	    $('#calendar-edit-start').datepicker('option', 'maxDate', checkout);
    	    setTimeout(function(){
    	        $('#calendar-edit-end').datepicker("show");
    	    },20);
    	}
	});

	$('#calendar-edit-end').datepicker({
    	dateFormat: "dd-mm-yy",
    	minDate: 1,
    	onClose: function () 
    	{
    	    var checkin = $("#calendar-edit-start").datepicker('getDate');
    	    var checkout = $('#calendar-edit-end').datepicker('getDate');
    	    $('#calendar-edit-end').datepicker('option', 'minDate', checkout);
    	    $('#calendar-edit-start').datepicker('option', 'maxDate', checkout);
    	    if (checkout <= checkin) 
    	    {
    	        var minDate = $('#calendar-edit-end').datepicker('option', 'minDate');
    	        $('#calendar-edit-end').datepicker('setDate', minDate);
    	    }
    	}
	});

	$('#calendar-edit-start').datepicker('setDate', change_format(start_date));
	$('#calendar-edit-end').datepicker('setDate', change_format(end_date));

   	$('#calendar-edit-start').datepicker('option', 'maxDate', change_format(start_date));
   	$('#calendar-edit-end').datepicker('option', 'minDate', change_format(end_date));
  }
  else
  {
  	$('#calendar-edit-start').val(change_format(start_date));
	$('#calendar-edit-end').val(change_format(end_date));
  } 	
}

function change_format(date)
{
	var split_date = date.split('-');
	return split_date[2]+'-'+split_date[1]+'-'+split_date[0];
}

$scope.calendar_edit_submit = function(href)
{
	$http.post('calendar_edit', { status: $scope.segment_status, start_date: $('#calendar-edit-start').val(), end_date: $('#calendar-edit-end').val(), price: $scope.calendar_edit_price, notes: $scope.notes }).then(function(response) 
	{
	var year_month = $('#calendar_dropdown').val();
	var year = year_month.split('-')[0];
	var month = year_month.split('-')[1];

	var data_params = {};

	data_params['month'] = month;
	data_params['year'] = year;

	var data = JSON.stringify(data_params);

	$('.ui-datepicker-backdrop').removeClass('hide');
	$('.spinner-next-to-month-nav').addClass('loading');

	$http.post(href.replace('manage-listing','ajax-manage-listing'), { data:data }).then(function(response) {
		$('.ui-datepicker-backdrop').addClass('hide');
		$('.spinner-next-to-month-nav').removeClass('loading');
		$( "#ajax_container" ).html( $compile(response.data)($scope) );
    });
	return false;
	});
};

 /*End - Calendar Date Selection*/

$(document).on('change', '#availability-dropdown > div > select', function()
{
    var data_params = {};

    data_params['status'] = $(this).val();

    var data = JSON.stringify(data_params);

    $http.post('update_rooms', { data:data }).then(function(response) 
    {
        if(data_params['status'] == 'Unlisted')
        {
            $('#availability-dropdown > i').addClass('dot-danger');
            $('#availability-dropdown > i').removeClass('dot-success');
        }
        else if(data_params['status'] == 'Listed')
        {
            $('#availability-dropdown > i').removeClass('dot-danger');
            $('#availability-dropdown > i').addClass('dot-success');
        }
    });
});

$(document).on('click', '#export_button', function()
{
	$('#export_popup').attr('aria-hidden', 'false');
});

$(document).on('click', '#import_button', function()
{
	$('#import_popup').attr('aria-hidden', 'false');
});

$scope.booking_select = function(value)
{
	var data_params = {};

	data_params['booking_type'] = value;

	var data = JSON.stringify(data_params);

	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('#before_select').addClass('hide');
			$('#'+value).removeClass('hide');
     	}
    });
}

$scope.booking_change = function(value)
{
	var data_params = {};

	data_params['booking_type'] = '';

	var data = JSON.stringify(data_params);

	$http.post('update_rooms', { data:data }).then(function(response) 
	{
		if(response.data.success == 'true')
		{
			$('#before_select').removeClass('hide');
			$('#'+value).addClass('hide');
     	}
    });
}

}]);

app.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            
            angular.element(elem).on("keypress", function(e) {
            	var num = this.value.match(/^\d+$/);
			    if (num === null) {
			        this.value = "";
			    }
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);
var pathname = document.getElementById("href_calendar").href; 
if($(location).attr('href')== pathname){
    $('#ajax_container').removeClass('mar-left-cont');
     $('#js-manage-listing-nav').removeClass('pos-abs');
}
$('.list-nav-link a').click(function()
{
    $('.listing-nav-sm').removeClass('collapsed');
});
$('#href_pricing').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
      $('#ajax_container').addClass('mar-left-cont');
});
$('#href_terms').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#remove-manage').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_booking').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_basics').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_description').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_location').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_amenities').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_photos').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_details').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_guidebook').click(function()
{
    $('#js-manage-listing-nav').removeClass('manage-listing-nav');
    $('#js-manage-listing-nav').addClass('pos-abs');
    $('#ajax_container').addClass('mar-left-cont');
});
$('#href_calendar').click(function()
{
     $('#js-manage-listing-nav').addClass('manage-listing-nav');
});
$('#href_calendar').click(function()
{ 
     $('#ajax_container').removeClass('mar-left-cont');


});


$('#href_calendar').click(function()
{
     $('#js-manage-listing-nav').removeClass('pos-abs');
});
